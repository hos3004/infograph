'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Player } from '@remotion/player';
import { MainComposition } from '../remotion/MainComposition';
import { SlideData, VisualEffect, TextPreset, TextAnimationPreset, TEXT_PRESETS } from '../remotion/types';
import { Upload, Trash2, Video as VideoIcon, Save, Music, Layers, RefreshCw, Sparkles, Type } from 'lucide-react';

const TEXT_ANIMATION_OPTIONS: { value: TextAnimationPreset; label: string }[] = [
  { value: 'live-reveal-dot', label: 'كشف سينمائي حي + نقطة' },
  { value: 'broadcast-split', label: 'أسطر إخبارية متتابعة' },
  { value: 'news-ledger', label: 'تقرير بصري / News Ledger' },
  { value: 'number-hero', label: 'عداد إحصائي متحرك' },
  { value: 'layered-title', label: 'نظام عنوان طبقي' },
  { value: 'morph-compare', label: 'مقارنة متغيرة' },
  { value: 'impact-shock', label: 'صدمة خفيفة' },
  { value: 'word-by-word', label: 'كلمة كلمة' },
  { value: 'timeline-marker', label: 'مؤشر زمني' },
  { value: 'cinematic-reveal', label: 'كشف سينمائي بسيط' },
  { value: 'split-lines-stagger', label: 'أسطر متعاكسة' },
  { value: 'highlight-sweep', label: 'لمعة عابرة' },
  { value: 'kinetic-keyword', label: 'كلمة بطلة' },
  { value: 'motion-blur', label: 'حركة ضبابية قديمة' },
  { value: 'typewriter', label: 'كتابة Typewriter قديمة' },
];

export default function Dashboard() {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [overlay, setOverlay] = useState<string | null>(null);
  const [music, setMusic] = useState<string | null>(null);
  const [endPage, setEndPage] = useState<string | null>(null);
  const [endPageDurationFrames, setEndPageDurationFrames] = useState<number>(0);
  const [effects, setEffects] = useState<VisualEffect[]>([]);

  // Text appearance
  const [textBottomOffset, setTextBottomOffset] = useState(160); // px in 1920×1080 (160 = TV safe zone)
  const [textFontSize, setTextFontSize]         = useState(46);  // px
  const [textPreset, setTextPreset]             = useState<TextPreset>('dark');
  const [textAnimationType, setTextAnimationType] = useState<TextAnimationPreset>('live-reveal-dot');
  const [parallaxEnabled, setParallaxEnabled] = useState(true);

  // Drag & drop state
  const dragIndexRef = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [isGeneratingVoiceovers, setIsGeneratingVoiceovers] = useState(false);
  const [renderResult, setRenderResult] = useState<{ url: string; path: string } | null>(null);

  const toggleEffect = (fx: VisualEffect) =>
    setEffects(prev => prev.includes(fx) ? prev.filter(e => e !== fx) : [...prev, fx]);

  // ── Detect end page video duration automatically ────────────────────────────
  const detectEndPageDuration = (filename: string | null) => {
    if (!filename) { setEndPageDurationFrames(0); return; }
    const vid = document.createElement('video');
    vid.preload = 'metadata';
    vid.src = `/api/serve-asset?type=assets&subfolder=endpage&file=${encodeURIComponent(filename)}`;
    vid.onloadedmetadata = () => {
      const frames = Math.ceil(vid.duration * 30); // 30fps
      setEndPageDurationFrames(frames);
    };
    vid.onerror = () => setEndPageDurationFrames(5 * 30); // fallback 5s
  };

  // ── Drag & Drop handlers ───────────────────────────────────────────────────
  const handleDragStart = (index: number) => { dragIndexRef.current = index; };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const from = dragIndexRef.current;
    if (from === null || from === index) { setDragOverIndex(index); return; }
    setSlides(prev => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(index, 0, item);
      dragIndexRef.current = index;
      return next;
    });
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    dragIndexRef.current = null;
    setDragOverIndex(null);
  };

  // Dynamic asset lists loaded from actual folders
  const [overlayFiles, setOverlayFiles]   = useState<string[]>([]);
  const [musicFiles, setMusicFiles]       = useState<string[]>([]);
  const [endPageFiles, setEndPageFiles]   = useState<string[]>([]);
  const [assetsLoading, setAssetsLoading] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Load real files from disk on mount ────────────────────────────────────
  const loadAssets = async () => {
    setAssetsLoading(true);
    try {
      const [ovRes, muRes, epRes] = await Promise.all([
        fetch('/api/assets?type=overlays'),
        fetch('/api/assets?type=music'),
        fetch('/api/assets?type=endpage'),
      ]);
      const ovData = await ovRes.json();
      const muData = await muRes.json();
      const epData = await epRes.json();
      setOverlayFiles(ovData.files ?? []);
      setMusicFiles(muData.files ?? []);
      setEndPageFiles(epData.files ?? []);

      // Clear selection if file no longer exists
      if (overlay  && !ovData.files.includes(overlay))  setOverlay(null);
      if (music    && !muData.files.includes(music))     setMusic(null);
      if (endPage  && !epData.files.includes(endPage))   setEndPage(null);
    } catch {
      // silently keep empty lists
    } finally {
      setAssetsLoading(false);
    }
  };

  useEffect(() => { loadAssets(); }, []);

  // Pretty display name: remove extension and replace dashes/underscores with spaces
  const prettify = (filename: string) =>
    filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');

  const slideDurationInSeconds = 5; // Each slide = 5 seconds

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    setIsUploading(true);
    const formData = new FormData();
    Array.from(event.target.files).forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if (data.uploadedPaths) {
        const newSlides = data.uploadedPaths.map((path: string, index: number) => ({
          id: Date.now().toString() + index,
          imageUrl: path,
          text: '',
        }));
        setSlides(prev => [...prev, ...newSlides]);
      }
    } catch (e) {
      console.error('Upload failed', e);
      alert('حدث خطأ أثناء الرفع');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const updateSlideText = (id: string, text: string) => {
    setSlides(slides.map(s => s.id === id ? { ...s, text } : s));
  };

  const removeSlide = (id: string) => {
    setSlides(slides.filter(s => s.id !== id));
  };

  const handleGenerateVoiceovers = async () => {
    const slidesWithText = slides.filter(s => s.text && s.text.trim().length > 0);
    if (slidesWithText.length === 0) {
      return alert('يرجى إضافة نص لشريحة واحدة على الأقل');
    }

    setIsGeneratingVoiceovers(true);
    try {
      const res = await fetch('/api/voiceover/generate-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slides,
          maxWords: 24,
          languageCode: 'ar-XA',
          ssmlGender: 'MALE',
          speakingRate: 0.92,
          pitch: 0,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert('فشل توليد السرد الصوتي: ' + (data?.details || data?.error || 'خطأ غير معروف'));
        return;
      }

      if (Array.isArray(data.slides)) {
        setSlides(data.slides);
      }

      if (Array.isArray(data.errors) && data.errors.length > 0) {
        alert(`تم التوليد مع ${data.errors.length} خطأ — راجع وحدة التحكم للتفاصيل`);
        console.warn('Voiceover errors', data.errors);
      }
    } catch (err) {
      console.error(err);
      alert('خطأ في الاتصال بالخادم');
    } finally {
      setIsGeneratingVoiceovers(false);
    }
  };

  const handleRender = async () => {
    if (slides.length === 0) return alert('يرجى رفع صورة واحدة على الأقل');

    setIsRendering(true);
    setRenderResult(null);
    try {
      const res = await fetch('/api/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slides,
          overlay,
          music,
          endPage,
          effects,
          endPageDurationFrames,
          textBottomOffset,
          textFontSize,
          textPreset,
          textAnimationType,
          parallaxEnabled,
          slideDurationInSeconds
        })
      });

      const data = await res.json();
      if (data.success) {
        setRenderResult({ url: data.downloadUrl, path: data.outputPath });
      } else {
        alert('فشل الرندر: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('خطأ في الاتصال بالخادم');
    } finally {
      setIsRendering(false);
    }
  };

  // Compute duration for the player
  const durationInFrames = useMemo(() => {
    const fps = 30;
    const framesPerSlide = slideDurationInSeconds * fps;
    const overlapFrames = 30; // 1s
    const validLength = slides.filter(s => s.imageUrl).length;
    const endPageFrames = endPage ? (4 * fps) : 0;
    
    if (validLength === 0) return 30; // 1 sec default empty state
    return (validLength * (framesPerSlide - overlapFrames)) + overlapFrames + endPageFrames;
  }, [slides, endPage, slideDurationInSeconds]);

  // Props payload for the Remotion Player (browser preview)
  const inputProps = {
    slides,
    overlay: overlay ? `/api/serve-asset?type=assets&subfolder=overlays&file=${encodeURIComponent(overlay)}` : null,
    music:   music   ? `/api/serve-asset?type=assets&subfolder=music&file=${encodeURIComponent(music)}`   : null,
    endPage: endPage ? `/api/serve-asset?type=assets&subfolder=endpage&file=${encodeURIComponent(endPage)}` : null,
    slideDurationInSeconds,
    effects,
    endPageDurationFrames,
    textBottomOffset,
    textFontSize,
    textPreset,
    textAnimationType,
    parallaxEnabled,
  };

  return (
    <div className="main-flex">
      <div className="slides-section">
        <div className="panel" style={{ padding: '0 0 1.5rem 0', background: 'transparent', border: 'none' }}>
           <h2 style={{marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px'}}>
             <VideoIcon size={24} color={'var(--accent)'} /> المعاينة (Preview)
           </h2>
           <div className="player-container" dir="ltr">
             <Player
               component={MainComposition}
               inputProps={inputProps}
               durationInFrames={Math.max(10, durationInFrames)}
               compositionWidth={1920}
               compositionHeight={1080}
               fps={30}
               style={{
                 width: '100%',
                 // height is derived automatically from compositionHeight/compositionWidth ratio
               }}
               controls
               autoPlay={false}
               loop
             />
           </div>
        </div>

        <div className="panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{margin: 0}}>الشرائح ({slides.length})</h2>
            <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
              <Upload size={18} /> {isUploading ? 'جاري الرفع...' : 'إضافة صور'}
            </button>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileUpload} 
            />
          </div>

          {slides.length === 0 ? (
             <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
                <Upload size={48} color="var(--text-secondary)" style={{marginBottom: '1rem'}} />
                <h3>اسحب وأفلت الصور هنا أو اضغط للاختيار</h3>
                <p style={{color: 'var(--text-secondary)'}}>الصور سيتم قصها تلقائياً لملء الشاشة بدون أي مساحات فارغة</p>
             </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {slides.map((slide, index) => (
                 <div
                   key={slide.id}
                   className="slide-card"
                   draggable
                   onDragStart={() => handleDragStart(index)}
                   onDragOver={e => handleDragOver(e, index)}
                   onDragEnd={handleDragEnd}
                   style={{
                     cursor: 'grab',
                     border: dragOverIndex === index ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                     transition: 'border-color 0.15s',
                   }}
                 >
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', padding: '0 4px', cursor: 'grab', opacity: 0.4 }}>
                     {[0,1,2].map(di => (
                       <div key={di} style={{ width: '16px', height: '2px', background: 'currentColor', borderRadius: '2px' }} />
                     ))}
                   </div>
                   <div style={{fontWeight: 'bold', width: '24px', textAlign: 'center', fontSize: '0.9rem'}}>{index + 1}</div>
                   <img src={slide.imageUrl} alt={`Slide ${index}`} className="slide-img-preview" />
                   <div className="slide-content">
                      <input
                        type="text"
                        className="input-field"
                        placeholder="أدخل النص الاختياري لهذه الشريحة..."
                        value={slide.text}
                        onChange={(e) => updateSlideText(slide.id, e.target.value)}
                      />
                      {slide.voiceoverUrl && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--success)', marginTop: '4px' }}>
                          ✅ صوت
                        </div>
                      )}
                   </div>
                   <button className="btn btn-danger" style={{padding: '0.75rem'}} onClick={() => removeSlide(slide.id)} title="حذف">
                     <Trash2 size={20} />
                   </button>
                 </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="settings-section">
        <div className="panel">
          <h2 style={{marginTop: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem'}}>
             إعدادات الفيديو
          </h2>
          
          <div className="settings-group" style={{marginTop: '1rem'}}>
             <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <Layers size={18} /> اختيار الإطار (Overlay)
               </span>
               <button
                 onClick={loadAssets}
                 title="تحديث القائمة"
                 style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: 0 }}
               >
                 <RefreshCw size={14} />
               </button>
             </label>
             <select
               className="input-field"
               value={overlay || ''}
               onChange={e => setOverlay(e.target.value || null)}
               disabled={assetsLoading}
             >
               <option value="">بدون إطار</option>
               {overlayFiles.length === 0 && !assetsLoading && (
                 <option disabled>— لا توجد ملفات في /public/assets/overlays/ —</option>
               )}
               {overlayFiles.map(f => (
                 <option key={f} value={f}>{prettify(f)}</option>
               ))}
             </select>
          </div>

          <div className="settings-group" style={{marginTop: '1.5rem'}}>
             <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <Music size={18} /> اختيار الموسيقى
               </span>
             </label>
             <select
               className="input-field"
               value={music || ''}
               onChange={e => setMusic(e.target.value || null)}
               disabled={assetsLoading}
             >
               <option value="">بدون موسيقى</option>
               {musicFiles.length === 0 && !assetsLoading && (
                 <option disabled>— لا توجد ملفات في /public/assets/music/ —</option>
               )}
               {musicFiles.map(f => (
                 <option key={f} value={f}>{prettify(f)}</option>
               ))}
             </select>
           </div>

          <div className="settings-group" style={{marginTop: '1.5rem'}}>
             <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
               <VideoIcon size={18} /> شاشة الختام (End Page)
             </label>
             <select
               className="input-field"
               value={endPage || ''}
               onChange={e => {
                 const val = e.target.value || null;
                 setEndPage(val);
                 detectEndPageDuration(val);
               }}
               disabled={assetsLoading}
             >
               <option value="">بدون شاشة ختام</option>
               {endPageFiles.length === 0 && !assetsLoading && (
                 <option disabled>— لا توجد ملفات في /public/assets/endpage/ —</option>
               )}
               {endPageFiles.map(f => (
                 <option key={f} value={f}>{prettify(f)}</option>
               ))}
             </select>
             {endPage && endPageDurationFrames > 0 && (
               <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px', display: 'block' }}>
                 ⏱ مدة الفيديو: {(endPageDurationFrames / 30).toFixed(1)} ثانية
               </span>
             )}
          </div>

          {/* ── Text Settings ─────────────────────────────────────── */}
          <div className="settings-group" style={{marginTop: '1.5rem'}}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
              <Type size={18} /> إعدادات النص
            </label>

            {/* Position slider */}
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                <span>📍 موضع النص من الأسفل</span>
                <span style={{ color: 'var(--accent-hover)', fontWeight: 600 }}>{textBottomOffset}px</span>
              </div>
              <input
                type="range" min={60} max={450} step={10}
                value={textBottomOffset}
                onChange={e => setTextBottomOffset(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                <span>أسفل الشاشة</span><span>وسط الشاشة</span>
              </div>
            </div>

            {/* Font size slider */}
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                <span>🔤 حجم الخط</span>
                <span style={{ color: 'var(--accent-hover)', fontWeight: 600 }}>{textFontSize}px</span>
              </div>
              <input
                type="range" min={28} max={80} step={2}
                value={textFontSize}
                onChange={e => setTextFontSize(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                <span>صغير</span><span>كبير</span>
              </div>
            </div>

            {/* Color presets */}
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>🎨 لون شريط النص</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(Object.entries(TEXT_PRESETS) as [TextPreset, typeof TEXT_PRESETS[TextPreset]][]).map(([key, val]) => {
                const names: Record<TextPreset, string> = { dark: 'داكن', gold: 'ذهبي', blue: 'أزرق', red: 'أحمر', orange: 'برتقالي' };
                const active = textPreset === key;
                return (
                  <button
                    key={key}
                    onClick={() => setTextPreset(key)}
                    title={names[key]}
                    style={{
                      flex: 1,
                      padding: '4px 8px',
                      whiteSpace: 'nowrap',
                      borderRadius: '8px',
                      border: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
                      backgroundColor: val.bg,
                      color: val.color,
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      fontFamily: 'inherit',
                      boxShadow: active ? '0 0 0 2px var(--accent)' : 'none',
                      transition: 'all 0.15s',
                    }}
                  >
                    {names[key]}
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: '0.9rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '6px',
                }}
              >
                نمط حركة النص
              </label>
              <div
                role="radiogroup"
                aria-label="نمط حركة النص"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: '0.45rem',
                }}
              >
                {TEXT_ANIMATION_OPTIONS.map(option => {
                  const active = textAnimationType === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      title={option.value}
                      onClick={() => setTextAnimationType(option.value)}
                      style={{
                        minHeight: 42,
                        padding: '0.45rem 0.55rem',
                        borderRadius: 8,
                        border: `1px solid ${active ? 'var(--accent)' : 'var(--border-color)'}`,
                        background: active ? 'rgba(59,130,246,0.16)' : 'var(--bg-input)',
                        color: active ? 'var(--accent)' : 'var(--text-primary)',
                        cursor: 'pointer',
                        fontSize: '0.76rem',
                        fontWeight: active ? 800 : 600,
                        lineHeight: 1.35,
                        textAlign: 'center',
                        fontFamily: 'inherit',
                        boxShadow: active ? '0 0 0 2px rgba(59,130,246,0.16)' : 'none',
                      }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '0.75rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={parallaxEnabled}
                  onChange={e => setParallaxEnabled(e.target.checked)}
                  style={{ accentColor: 'var(--accent)' }}
                />
                تفعيل عمق سينمائي بعد الظهور
              </label>

              <div
                style={{
                  marginTop: '0.6rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.76rem',
                  lineHeight: 1.7,
                }}
              >
                يمكن استخدام ++ لتقسيم السطور.
                <br />
                number-hero: 60% ++ من الأسر تحت ضغط المعيشة
                <br />
                layered-title: سبب 01 ++ ارتفاع الأسعار ++ يضغط على الأسر
                <br />
                morph-compare: الفقر|الغلاء|البطالة|الديون
                <br />
                kinetic-keyword: أزمة **معيشة** ++ تظهر آثارها في كل بيت
              </div>
            </div>
          </div>

          <div className="settings-group" style={{marginTop: '1.5rem'}}>
             <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Sparkles size={18} /> تأثيرات بصرية (اختياري)
             </label>
             <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
               {(
                 [
                   { id: 'dust',       label: '✨ جزيئات' },
                   { id: 'light-leak', label: '🌅 إضاءة' },
                   { id: 'bokeh',      label: '🔆 مؤثر'  },
                 ] as { id: VisualEffect; label: string }[]
               ).map(({ id, label }) => {
                 const active = effects.includes(id);
                 return (
                   <button
                     key={id}
                     onClick={() => toggleEffect(id)}
                     style={{
                       padding: '6px 14px',
                       borderRadius: '20px',
                       border: `1px solid ${active ? 'var(--accent)' : 'var(--border-color)'}`,
                       backgroundColor: active ? 'rgba(59,130,246,0.2)' : 'transparent',
                       color: active ? 'var(--accent-hover)' : 'var(--text-secondary)',
                       cursor: 'pointer',
                       fontSize: '0.85rem',
                       transition: 'all 0.2s',
                       fontFamily: 'inherit',
                     }}
                   >
                     {label}
                   </button>
                 );
               })}
             </div>
          </div>

        </div>

        <div className="panel" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'var(--accent)', padding: '0.8rem', marginTop: '-0.3rem' }}>
           <button
             className="btn"
             style={{ width: '100%', fontSize: '1rem', padding: '0.7rem', marginBottom: '0.6rem' }}
             onClick={handleGenerateVoiceovers}
             disabled={isGeneratingVoiceovers || slides.length === 0}
           >
             {isGeneratingVoiceovers ? 'جاري توليد السرد الصوتي...' : 'توليد سرد صوتي للشرائح'}
           </button>

           <button
             className="btn btn-success"
             style={{ width: '100%', fontSize: '1.1rem', padding: '0.8rem' }}
             onClick={handleRender}
             disabled={isRendering}
           >
             {isRendering ? (
               'جاري التصدير...'
             ) : (
               <><Save size={22} /> تصدير الفيديو (Render)</>
             )}
           </button>

           {isRendering && (
             <div style={{ marginTop: '1rem' }}>
               <div style={{ fontSize: '0.9rem', color: 'var(--accent)', textAlign: 'center' }}>يجري بناء الفيديو في الخلفية...</div>
               <div className="progress-bar-bg">
                 {/* Simulate progress locally since server render happens in a single promise on backend without SSE for now */}
                 <div className="progress-bar-fill" style={{ width: '100%', animation: 'pulse 1s infinite alternate' }} />
               </div>
             </div>
           )}

           {renderResult && !isRendering && (
             <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid var(--success)', textAlign: 'center' }}>
                <p style={{ color: 'var(--success)', marginTop: 0, fontWeight: 'bold' }}>تم التصدير بنجاح!</p>
                <div style={{ fontSize: '0.8rem', wordBreak: 'break-all', marginBottom: '1rem' }}>
                  المسار: {renderResult.path}
                </div>
                <a href={renderResult.url} download className="btn" style={{ width: '100%', textDecoration: 'none' }}>
                  تحميل الفيديو
                </a>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
