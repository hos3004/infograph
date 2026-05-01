"use client";
import React, { useEffect, useState } from 'react';
import { 
  Play, Layers, Type, Music, Settings, Layout, 
  RotateCw, FolderOpen, Save, X, Maximize, RefreshCcw, 
  Volume2, FastForward, CheckCircle
} from 'lucide-react';

export default function InfographV2() {
  const [activeTab, setActiveTab] = useState<'slides' | 'text' | 'audio'>('slides');
  const [overlayFiles, setOverlayFiles] = useState<string[]>([]);
  const [musicFiles, setMusicFiles] = useState<string[]>([]);
  const [endPageFiles, setEndPageFiles] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadAssets() {
      try {
        const [overlaysRes, musicRes, endPageRes] = await Promise.all([
          fetch('/api/assets?type=overlays'),
          fetch('/api/assets?type=music'),
          fetch('/api/assets?type=endpage'),
        ]);

        const [overlaysData, musicData, endPageData] = await Promise.all([
          overlaysRes.json(),
          musicRes.json(),
          endPageRes.json(),
        ]);

        if (cancelled) {
          return;
        }

        setOverlayFiles(Array.isArray(overlaysData.files) ? overlaysData.files : []);
        setMusicFiles(Array.isArray(musicData.files) ? musicData.files : []);
        setEndPageFiles(Array.isArray(endPageData.files) ? endPageData.files : []);
      } catch {
        if (!cancelled) {
          setOverlayFiles([]);
          setMusicFiles([]);
          setEndPageFiles([]);
        }
      }
    }

    loadAssets();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <style>{`
        /* Overriding global layout */
        .container { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
        .header, footer { display: none !important; }
        body { background-color: #f1f5f9; color: #0f172a; }
        
        .v2-root {
          font-family: var(--font-arabic), 'AvenirArabic', 'Segoe UI', Tahoma, Arial, sans-serif;
          min-height: 100vh; display: flex; flex-direction: column; background-color: #f1f5f9; color: #0f172a; direction: rtl;
        }
        
        /* Typography Helpers */
        .muted-text { color: #64748b; font-size: 0.9rem; }
        .accent-text { color: #3b82f6; font-weight: 600; }
        
        /* Top Navigation */
        .top-bar { display: flex; justify-content: space-between; align-items: center; background: #ffffff; padding: 1rem 2rem; border-bottom: 1px solid #e2e8f0; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); height: 70px; flex-shrink: 0; }
        .logo-section { display: flex; align-items: center; gap: 0.75rem; font-size: 1.5rem; font-weight: 700; color: #1e293b; }
        .brand-logo-image { height: 42px; width: auto; max-width: 180px; object-fit: contain; display: block; }
        .top-bar-btns { display: flex; gap: 1rem; }
        .btn-blue { background-color: #3b82f6; color: white; padding: 0.5rem 1.5rem; border-radius: 6px; font-weight: 600; border: none; cursor: pointer; transition: background 0.2s; }
        .btn-blue:hover { background-color: #2563eb; }
        .btn-blue-outline { background-color: transparent; color: #3b82f6; padding: 0.5rem 1.5rem; border-radius: 6px; font-weight: 600; border: 1px solid #3b82f6; cursor: pointer; transition: all 0.2s; }
        .btn-blue-outline:hover { background-color: #eff6ff; }
        
        .main-content { display: flex; flex: 1; gap: 1.5rem; padding: 1.5rem; height: calc(100vh - 70px); min-height: 0; overflow: hidden; box-sizing: border-box; }
        
        /* Right Panel tabs */
        .right-panel { flex: 1; min-height: 0; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .tabs-header { display: flex; border-bottom: 1px solid #e2e8f0; background: #f8fafc; flex-shrink: 0; }
        .tab-btn { flex: 1; padding: 1.25rem 1rem; border: none; background: transparent; font-weight: 600; font-size: 1.1rem; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.2s; border-bottom: 2px solid transparent; }
        .tab-btn:hover { background: #f1f5f9; }
        .tab-btn.active { color: #3b82f6; border-bottom: 2px solid #3b82f6; background: #ffffff; }
        .tab-content { padding: 1.5rem; flex: 1; min-height: 0; overflow-y: auto; scrollbar-gutter: stable; }
        .tab-panel { display: block; }
        .tab-panel[hidden] { display: none !important; }
        
        /* Left main panel */
        .left-panel { flex: 1.2; min-height: 0; display: flex; flex-direction: column; gap: 1rem; overflow-y: auto;}
        .preview-container { background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1rem; display: flex; flex-direction: column; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); flex-shrink: 0; }
        
        /* Player */
        .player-wrapper { width: 100%; aspect-ratio: 16/9; background: #000000; border-radius: 8px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; color: #334155; flex-direction: column; }
        .preview-player-ui { width: 100%; position: absolute; bottom: 0; left: 0; padding: 1rem; background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%); display: flex; flex-direction: column; gap: 0.5rem; }
        .preview-control-row { display: flex; align-items: center; gap: 1rem; color: white; margin-bottom: 0.5rem; direction: ltr; }
        .preview-icon-btn { background: transparent; border: none; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .preview-icon-btn:hover { color: #3b82f6; }
        .preview-time-inline { font-size: 0.85rem; font-family: monospace; }
        .range-input { width: 100%; accent-color: #3b82f6; margin: 0; }
        
        /* Piano Keys (Effects) */
        .piano-effects-bar { display: flex; width: 100%; height: 50px; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; background: #f8fafc; margin-top: 0.5rem;}
        .piano-key-label { cursor: pointer; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; border-left: 1px solid #e2e8f0; transition: all 0.2s; color: #64748b; font-size: 0.8rem; font-weight: 600;}
        .piano-key-label:first-child { border-left: none; }
        .piano-key-label:hover { background: #e2e8f0; color: #3b82f6; }
        .effect-checkbox { display: none; }
        .effect-checkbox:checked + .piano-key-content { color: #3b82f6; font-weight: bold; }
        
        /* Save Section & Progress */
        .save-section { background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); display: flex; flex-direction: column; gap: 1rem; flex-shrink: 0; }
        
        .progress-box { background: #f8fafc; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0; }
        .progress-meta { display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .progress-track { width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; }
        .progress-fill { height: 100%; width: 0%; background: #3b82f6; transition: width 0.3s ease; }
        
        /* UI Components */
        .setting-group { margin-bottom: 1.5rem; background: #f8fafc; padding: 1rem; border-radius: 8px; border: 1px solid #f1f5f9; }
        .setting-label { font-weight: 600; color: #334155; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center; }
        .input-v2 { width: 100%; padding: 0.75rem; border-radius: 6px; border: 1px solid #cbd5e1; color: #1e293b; font-family: inherit; background: #ffffff; }
        .input-v2:focus { outline: none; border-color: #3b82f6; }
        
        .btn-secondary { background: #f8fafc; border: 1px solid #cbd5e1; color: #475569; padding: 0.75rem; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.2s; }
        .btn-secondary:hover { background: #f1f5f9; color: #0f172a; border-color: #94a3b8; }
        
        .color-presets { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .preset-btn { width: 32px; height: 32px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; transition: 0.2s; }
        .preset-btn:hover { transform: scale(1.1); }
        .preset-orange { background: #fdba74; } .preset-red { background: #fca5a5; } .preset-blue { background: #93c5fd; } .preset-gold { background: #fde047; } .preset-dark { background: #334155; }
        
        /* Slides list area */
        .slides-list { min-height: 100px; max-height: 200px; overflow-y: auto; background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .empty-state { text-align: center; color: #94a3b8; padding: 2rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
      `}</style>

      <div className="v2-root" id="app-infographic">
        {/* TOP BAR */}
        <header className="top-bar">
          <div className="logo-section">
            <img
              id="brand-logo"
              className="brand-logo-image"
              src="/api/serve-asset?type=assets&file=logo.png"
              alt="فيديوجراف"
            />
            <span>فيديوجراف</span>
            <span id="runtime-summary" style={{display: 'none'}}>Loading...</span>
          </div>
          <div className="top-bar-btns">
            <button className="btn-blue">الأنفوجراف</button>
            <button className="btn-blue-outline">المتداول</button>
          </div>
        </header>

        <div className="main-content">
          
          {/* RIGHT PANEL - TABS */}
          <div className="right-panel">
            <div className="tabs-header">
              <button className={`tab-btn ${activeTab === 'slides' ? 'active' : ''}`} onClick={() => setActiveTab('slides')}><Layers size={20} strokeWidth={1.5}/> الشرائح</button>
              <button className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`} onClick={() => setActiveTab('text')}><Type size={20} strokeWidth={1.5}/> النصوص</button>
              <button className={`tab-btn ${activeTab === 'audio' ? 'active' : ''}`} onClick={() => setActiveTab('audio')}><Music size={20} strokeWidth={1.5}/> الصوتيات</button>
            </div>

            <div className="tab-content" style={{paddingBottom: '2rem'}}>
              {/* === TAB: SLIDES === */}
              <div className="tab-panel" hidden={activeTab !== 'slides'} aria-hidden={activeTab !== 'slides'}>
                  <div className="setting-group">
                    <label className="setting-label">
                      <span>إدارة الصور (<span id="slides-count">0</span>)</span>
                      <button id="pick-slides-btn" className="btn-blue-outline" style={{padding: '0.2rem 0.5rem', fontSize:'0.8rem'}}>+ إضافة صور</button>
                    </label>
                    <div id="slides-list" className="slides-list">
                      <div id="empty-state" className="empty-state">
                        <span style={{fontSize: '1.5rem'}}>⤴</span>
                        <strong>اسحب وأفلت الصور هنا</strong>
                        <span style={{fontSize:'0.8rem'}}>سيتم قصها تلقائياً لملء الشاشة</span>
                      </div>
                    </div>
                  </div>

                  <div className="setting-group">
                    <label className="setting-label">مدة الشريحة (بالثواني)</label>
                    <input id="slide-duration-input" type="number" className="input-v2" defaultValue={5} min={2} max={15} />
                  </div>

                  <div className="setting-group">
                    <label className="setting-label">الإطار العلوي</label>
                    <select id="overlay-select" className="input-v2" defaultValue="">
                      <option value="">بدون إطار</option>
                      {overlayFiles.map((file) => (
                        <option key={file} value={file}>{file}</option>
                      ))}
                    </select>
                  </div>

                  <div className="setting-group">
                    <label className="setting-label">شاشة الختام</label>
                    <select id="endpage-select" className="input-v2" defaultValue="">
                      <option value="">بدون شاشة ختام</option>
                      {endPageFiles.map((file) => (
                        <option key={file} value={file}>{file}</option>
                      ))}
                    </select>
                    <span id="endpage-duration-hint" className="muted-text" style={{display:'block', marginTop:'0.5rem'}}></span>
                  </div>
              </div>

              {/* === TAB: TEXT === */}
              <div className="tab-panel" hidden={activeTab !== 'text'} aria-hidden={activeTab !== 'text'}>
                  <div className="setting-group">
                    <label className="setting-label">موضع النص من الأسفل <span id="bottom-offset-value" className="accent-text">160px</span></label>
                    <input id="bottom-offset-input" type="range" className="range-input" min={40} max={280} step={10} defaultValue={160} />
                  </div>

                  <div className="setting-group">
                    <label className="setting-label">حجم الخط <span id="font-size-value" className="accent-text">46px</span></label>
                    <input id="font-size-input" type="range" className="range-input" min={24} max={96} step={2} defaultValue={46} />
                  </div>

                  <div className="setting-group">
                    <label className="setting-label">حركة دخول النص</label>
                    <div style={{display:'flex', gap:'1rem', marginTop: '0.5rem'}}>
                      <label style={{display:'flex', alignItems:'center', gap:'0.5rem', cursor:'pointer'}}>
                        <input type="radio" name="textAnimationType" value="typewriter" />
                        <span>آلة كاتبة</span>
                      </label>
                      <label style={{display:'flex', alignItems:'center', gap:'0.5rem', cursor:'pointer'}}>
                        <input type="radio" name="textAnimationType" value="motion-blur" defaultChecked />
                        <span>دخول ناعم (Blur)</span>
                      </label>
                    </div>
                  </div>

                  <div className="setting-group">
                    <label className="setting-label">لون شريط النص</label>
                    <div id="text-preset-buttons" className="color-presets">
                      <button className="preset-btn preset-orange" data-preset="orange"></button>
                      <button className="preset-btn preset-red" data-preset="red"></button>
                      <button className="preset-btn preset-blue" data-preset="blue"></button>
                      <button className="preset-btn preset-gold" data-preset="gold"></button>
                      <button className="preset-btn preset-dark" data-preset="dark"></button>
                    </div>
                    <select id="text-preset-select" style={{display:'none'}}>
                      <option value="dark">Dark</option><option value="gold">Gold</option>
                      <option value="blue">Blue</option><option value="red">Red</option><option value="orange">Orange</option>
                    </select>
                  </div>

                  <div className="setting-group" id="cinematic-bar-size-container">
                    <label className="setting-label">
                      سُمك الإطار السينمائي <span id="bar-size-value" className="accent-text">6%</span>
                    </label>
                    <input id="bar-size-input" type="range" className="range-input" min={2} max={25} step={1} defaultValue={6} />
                  </div>
              </div>

              {/* === TAB: AUDIO === */}
              <div className="tab-panel" hidden={activeTab !== 'audio'} aria-hidden={activeTab !== 'audio'}>
                  <div className="setting-group">
                    <label className="setting-label" style={{marginBottom: '1rem'}}>
                      التعليق الصوتي 
                      <span id="voiceover-meta" className="accent-text" style={{fontSize: '0.8rem'}}></span>
                    </label>
                    <div style={{display:'flex', gap:'0.5rem', alignItems:'center', marginBottom: '1rem'}}>
                      <button id="pick-voiceover-btn" className="btn-blue-outline" style={{padding: '0.4rem 1rem'}}>إرفاق ملف</button>
                      <span id="voiceover-filename" className="muted-text" style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1}} title="بدون تعليق صوتی">بدون</span>
                      <button id="clear-voiceover-btn" className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}><X size={16}/></button>
                    </div>
                    <label className="setting-label">مستوى التعليق <span id="voiceover-volume-value" className="accent-text">100%</span></label>
                    <input id="voiceover-volume-input" type="range" className="range-input" min={0} max={100} step={1} defaultValue={100} />
                  </div>

                  <div className="setting-group">
                    <label className="setting-label">الموسيقى</label>
                    <select id="music-select" className="input-v2" style={{marginBottom: '1rem'}} defaultValue="">
                      <option value="">بدون موسيقى</option>
                      {musicFiles.map((file) => (
                        <option key={file} value={file}>{file}</option>
                      ))}
                    </select>
                    <label className="setting-label">مستوى الموسيقى <span id="music-volume-value" className="accent-text">50%</span></label>
                    <input id="music-volume-input" type="range" className="range-input" min={0} max={100} step={1} defaultValue={50} />
                  </div>
              </div>
            </div>
          </div>

          {/* LEFT PANEL - PREVIEW & ACTIONS */}
          <div className="left-panel">
            <div className="preview-container">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.8rem'}}>
                <h2 style={{fontSize:'1.1rem', margin:0, color:'#1e293b'}}>المعاينة</h2>
                <button id="preview-fullscreen-btn" className="btn-secondary" style={{padding:'0.3rem 0.6rem', fontSize:'0.8rem', background: 'transparent', border: 'none'}}><Maximize size={16}/> ملء الشاشة</button>
              </div>

              {/* Player Area */}
              <div id="preview-stage-shell" className="player-wrapper">
                <div id="preview-stage" style={{ width: '100%', height: '100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <div id="preview-exact-root" style={{ width: '100%', height: '100%', position: 'absolute' }}></div>
                  <Play size={48} strokeWidth={1} color="#334155" style={{opacity: 0.2}} />
                </div>
                
                {/* Embedded Controls overlay */}
                <div className="preview-player-ui">
                  <div className="preview-control-row">
                    <button id="preview-play-btn" className="preview-icon-btn"><Play size={20} fill="white" /></button>
                    <button id="preview-mute-btn" className="preview-icon-btn"><Volume2 size={20} /></button>
                    <span id="preview-time-inline" className="preview-time-inline">00:00 / 00:00</span>
                    <button id="preview-restart-btn" className="preview-icon-btn"><RefreshCcw size={18} /></button>
                  </div>
                  <input id="preview-seek" type="range" className="range-input" min={0} max={1000} defaultValue={0} style={{height: '4px'}} />
                </div>
              </div>

              {/* Piano Keys Visual Effects */}
              <div style={{ marginBottom: '0.2rem', marginTop: '1rem', fontWeight: 600, color: '#334155' }}>تأثيرات بصرية</div>
              <div className="piano-effects-bar">
                <label className="piano-key-label" title="غبار">
                  <input type="checkbox" value="dust" className="effect-checkbox" defaultChecked />
                  <span className="piano-key-content">غبار</span>
                </label>
                <label className="piano-key-label" title="إضاءة">
                  <input type="checkbox" value="light-leak" className="effect-checkbox" defaultChecked />
                  <span className="piano-key-content">إضاءة</span>
                </label>
                <label className="piano-key-label" title="بريق">
                  <input type="checkbox" value="bokeh" className="effect-checkbox" defaultChecked />
                  <span className="piano-key-content">بريق</span>
                </label>
                <label className="piano-key-label" title="خطوط شاشة">
                  <input type="checkbox" value="scanlines" className="effect-checkbox" />
                  <span className="piano-key-content">شبكة</span>
                </label>
                <label className="piano-key-label" title="تحبيب">
                  <input type="checkbox" value="grain" className="effect-checkbox" />
                  <span className="piano-key-content">حبيبات</span>
                </label>
                <label className="piano-key-label" title="تظليل">
                  <input type="checkbox" value="vignette" className="effect-checkbox" />
                  <span className="piano-key-content">تظليل</span>
                </label>
                <label className="piano-key-label" title="إطار سينمائي">
                  <input type="checkbox" value="cinematic-bars" id="cinematic-bars-checkbox" className="effect-checkbox" />
                  <span className="piano-key-content">سينمائي</span>
                </label>
              </div>
            </div>

            {/* Render Section & Progress */}
            <div className="save-section">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                <div>
                  <h3 style={{margin:0, color:'#1e293b'}}>رندر الفيديو</h3>
                  <p id="status-text" className="muted-text" style={{margin:'0.3rem 0 0 0'}}>لم يبدأ الرندر بعد</p>
                </div>
                <label style={{display:'flex', alignItems:'center', gap:'0.4rem', cursor:'pointer', color:'#f59e0b', fontWeight:600, fontSize:'0.9rem'}}>
                  <input type="checkbox" id="turbo-render-checkbox" defaultChecked />
                  <FastForward size={18} strokeWidth={2}/>
                  Turbo Mode
                </label>
              </div>

              <div className="progress-box">
                <div className="progress-meta">
                  <span id="progress-label" className="muted-text">في الانتظار...</span>
                  <strong id="progress-percent" className="accent-text">0%</strong>
                </div>
                <div className="progress-track">
                  <div id="progress-fill" className="progress-fill"></div>
                </div>
              </div>
              <div id="render-result" style={{fontSize: '0.9rem', color: '#10b981', display:'none', alignItems:'center', gap:'0.5rem', marginTop: '-0.5rem'}}></div>

              <div style={{display:'flex', gap:'0.75rem', marginTop: '0.5rem'}}>
                <button id="refresh-assets-btn" className="btn-secondary" style={{flex:1}}>
                  <RotateCw size={18} color="#64748b" /> تحديث الأصول
                </button>
                <button id="render-btn" className="btn-blue" style={{flex:2, display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem', fontSize:'1.1rem'}}>
                  <Play size={20} fill="white" /> رندر
                </button>
                <button id="cancel-render-btn" className="btn-blue" style={{flex:2, display:'none', backgroundColor:'#ef4444', alignItems:'center', justifyContent:'center', gap:'0.5rem', fontSize:'1.1rem'}}>
                  إيقاف
                </button>
                <button id="open-output-btn" className="btn-secondary" style={{flex:1}}>
                  <FolderOpen size={18} color="#10b981" /> المخرجات
                </button>
              </div>
            </div>
            
          </div>
        </div>

        {/* Modal Portals */}
        <div id="success-modal-overlay" style={{ display: 'none', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center', maxWidth: '400px' }}>
            <CheckCircle size={48} color="#10b981" style={{margin:'0 auto 1rem'}} />
            <h2 style={{margin:'0 0 0.5rem 0', color:'#1e293b'}}>اكتمل الرندر بنجاح!</h2>
            <p className="muted-text" style={{margin:0}}>تم حفظ الفيديو النهائي وجاهز للنشر الآن.</p>
            <div id="modal-file-path" style={{background:'#f1f5f9', padding:'0.75rem', borderRadius:'6px', margin:'1.5rem 0', fontSize:'0.85rem', wordBreak:'break-all'}}></div>
            <div style={{display:'flex', gap:'1rem', justifyContent:'center'}}>
              <button id="modal-reveal-btn" className="btn-secondary" style={{flex:1}}>فتح المجلد</button>
              <button id="modal-close-btn" className="btn-blue" style={{flex:1}}>رائع، شكراً!</button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
