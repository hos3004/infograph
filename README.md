# Infographic Video Generator

أداة داخلية لفريق الجرافيك والمونتاج لإنتاج فيديوهات إنفوجراف قصيرة بسرعة وجودة عالية باستخدام **Next.js + Remotion + Electron**.

المشروع يدعم حالياً نسختين:

1. **Web App** للتجربة والتشغيل المحلي داخل المتصفح.
2. **Desktop V2** كتطبيق Electron مخصص للعمل اليومي وتصدير الفيديوهات محلياً.

> حالة المشروع الحالية: Prototype متقدم / MVP داخلي قابل للتجربة، ويحتاج مرحلة تنظيف واختبار قبل الاعتماد الإنتاجي الكامل.

---

## الهدف من المشروع

تقليل الوقت المطلوب لإنتاج فيديوهات إنفوجراف تلفزيونية أو رقمية عبر واجهة بسيطة تسمح بـ:

- رفع صور أو فيديوهات للشرائح.
- ترتيب الشرائح بالسحب والإفلات.
- إضافة نصوص عربية متحركة.
- اختيار مؤثرات بصرية جاهزة.
- إضافة موسيقى وOverlay وشاشة ختام.
- توليد تعليق صوتي لكل شريحة باستخدام Gemini TTS.
- تصدير فيديو نهائي MP4 بجودة 1920×1080.

---

## التقنيات المستخدمة

- **Next.js 14** لنسخة الويب والـ API routes.
- **React 18** للواجهة والمعاينة.
- **Remotion 4** لبناء وتصدير الفيديو.
- **Electron 30** لنسخة Desktop V2.
- **FFmpeg / FFprobe** للتعامل مع الفيديو والصوت.
- **Gemini TTS** لتوليد التعليق الصوتي العربي لكل شريحة.

---

## أهم المزايا الحالية

### 1. إدارة الشرائح

- رفع عدة صور مرة واحدة.
- دعم الصور والفيديوهات كشرائح.
- ترتيب الشرائح Drag & Drop.
- حذف الشرائح.
- إضافة نص منفصل لكل شريحة.

### 2. النصوص المتحركة

يدعم المشروع نظام Text Animation Presets داخل Remotion، منها:

- `live-reveal-dot`
- `broadcast-split`
- `news-ledger`
- `number-hero`
- `layered-title`
- `morph-compare`
- `impact-shock`
- `word-by-word`
- `timeline-marker`
- `cinematic-reveal`
- `split-lines-stagger`
- `highlight-sweep`
- `kinetic-keyword`
- `motion-blur`
- `typewriter`

يمكن استخدام `++` داخل النص لتقسيم المحتوى إلى أجزاء حسب الـ preset.

مثال مناسب لـ `news-ledger`:

```txt
تقرير خاص ++ الفقر يضغط على البيوت المصرية ++ ارتفاع الأسعار غيّر شكل الحياة اليومية داخل الأسرة ++ 40% من الدخل يذهب للطعام
```

وفي preset مثل `kinetic-keyword` يمكن استخدام `** **` لتحديد كلمة بطلة:

```txt
أزمة **معيشة** ++ تظهر آثارها في كل بيت
```

### 3. المؤثرات البصرية

يدعم المشروع مؤثرات اختيارية:

- Dust particles
- Light leaks
- Bokeh
- Scanlines
- Film grain
- Vignette
- Cinematic bars

### 4. الصوتيات

- اختيار موسيقى من مجلد assets.
- التحكم في مستوى الموسيقى في Desktop V2.
- إرفاق Voiceover خارجي في Desktop V2.
- توليد Voiceover لكل شريحة باستخدام Gemini TTS في نسخة الويب.
- حفظ ملفات الصوت المولدة داخل `temp/voiceovers`.

### 5. الرندر والتصدير

- إخراج MP4 باستخدام Remotion Renderer.
- دعم H.264.
- دعم صوت AAC في Desktop Worker.
- حفظ الملفات الناتجة محلياً داخل مجلد Output/Outputs حسب وضع التشغيل.

---

## هيكل المشروع المهم

```txt
src/
  app/
    api/
      render/                 # رندر نسخة الويب
      upload/                 # رفع ملفات الشرائح
      assets/                 # قراءة ملفات overlays/music/endpage
      serve-asset/            # خدمة ملفات assets
      temp/                   # خدمة الملفات المؤقتة
      voiceover/              # توليد النص والصوت
  remotion/
    MainComposition.tsx       # الكومبوزيشن الرئيسي
    Slide.tsx                 # عرض الشريحة والنصوص
    VisualEffects.tsx         # المؤثرات البصرية
    Root.tsx                  # تسجيل Composition
    text-animations/          # Presets النصوص المتحركة

desktop-v2/
  main.cjs                    # مدخل تطبيق Electron
  preload.cjs                 # واجهة IPC آمنة للـ Renderer
  renderer/                   # واجهة Desktop V2
  worker/                     # Worker الرندر المحلي
  shared/                     # مسارات، أصول، payload normalization
  scripts/                    # بناء preview/bundle
  motadawel/                  # نموذج إضافي داخل نفس تطبيق Desktop

public/assets/
  overlays/                   # ملفات overlay
  music/                      # ملفات الموسيقى
  endpage/                    # شاشة الخاتمة
  fonts/                      # الخطوط
```

---

## متطلبات التشغيل

- Node.js نسخة LTS حديثة.
- npm.
- Windows مفضل حالياً بسبب اعتماد بعض مسارات Desktop وFFmpeg على بيئة ويندوز.
- يفضل وجود `ffmpeg.exe` داخل:

```txt
bin/ffmpeg.exe
```

في حالة عدم وجوده، يحاول المشروع استخدام الحزم المرفقة مثل `ffmpeg-static` و `ffprobe-static`.

---

## إعداد Gemini TTS

لتفعيل توليد الصوت، أنشئ ملف `.env.local` في جذر المشروع وضع أحد المفاتيح التالية:

```env
GEMINI_API_KEY=your_key_here
```

أو:

```env
GOOGLE_GENAI_API_KEY=your_key_here
```

أو للتوافق القديم:

```env
GOOGLE_TTS_API_KEY=your_key_here
```

> ملاحظة: Gemini TTS قد يصل إلى Rate Limit بسرعة أثناء التجارب المتكررة، خصوصاً عند توليد صوت لعدد كبير من الشرائح دفعة واحدة.

---

## تشغيل نسخة الويب

### 1. تثبيت الحزم

```bash
npm install
```

### 2. تشغيل بيئة التطوير

```bash
npm run dev
```

ثم افتح:

```txt
http://localhost:3000
```

### 3. مكان الفيديو الناتج

نسخة الويب تحفظ الفيديو النهائي داخل:

```txt
output/
```

ويتم إنشاء ملف باسم مشابه:

```txt
Video_1710000000000.mp4
```

---

## تشغيل Desktop V2

Desktop V2 هو الاتجاه الأساسي للتشغيل اليومي، لأنه يستخدم Electron وWorker منفصل للرندر.

### تشغيل نسخة Desktop V2 في وضع التطوير

```bash
npm run desktop:v2
```

هذا الأمر يقوم أولاً ببناء preview player ثم يفتح تطبيق Electron.

### بناء Preview فقط

```bash
npm run desktop:v2:preview
```

### بناء Remotion Bundle فقط

```bash
npm run desktop:v2:bundle
```

### بناء نسخة Desktop V2 محلية

```bash
npm run desktop:v2:build
```

### تنظيف ملفات Desktop المؤقتة

```bash
npm run desktop:v2:clean
```

---

## أماكن ملفات Assets

في وضع التطوير، يقرأ المشروع غالباً من:

```txt
public/assets/
```

وفي النسخة المجمعة Packaged Desktop يتم نسخ الأصول إلى مجلد:

```txt
Assets/
```

المجلدات المطلوبة:

```txt
public/assets/overlays/
public/assets/music/
public/assets/endpage/
public/assets/fonts/
```

الامتدادات المدعومة تقريبياً:

- Overlays: `.mov`, `.mp4`, `.webm`, `.png`, `.gif`, `.jpg`, `.jpeg`
- Music: `.mp3`, `.wav`, `.aac`, `.m4a`
- End Page: `.mp4`, `.mov`, `.jpg`, `.jpeg`, `.png`
- Fonts: `.ttf`, `.otf`, `.woff`, `.woff2`

---

## ملاحظات مهمة للمطورين

### Remotion Composition

اسم الكومبوزيشن الرئيسي:

```txt
InfographicVideo
```

الملف الرئيسي:

```txt
src/remotion/MainComposition.tsx
```

### إضافة Text Animation جديد

غالباً ستحتاج تعديل الملفات التالية:

```txt
src/remotion/types.ts
src/remotion/text-animations/TextAnimationRenderer.tsx
src/remotion/text-animations/presets/
src/app/page.tsx
desktop-v2/renderer/app.js
desktop-v2/shared/payload.cjs
```

بعد تعديل Desktop Preview يجب تشغيل:

```bash
npm run desktop:v2:preview
```

### إضافة Visual Effect جديد

غالباً ستحتاج تعديل:

```txt
src/remotion/types.ts
src/remotion/VisualEffects.tsx
src/app/page.tsx
desktop-v2/renderer/app.js
desktop-v2/shared/payload.cjs
```

---

## نقاط تحتاج مراجعة قبل اعتماد النسخة

### 1. توحيد FPS

يوجد حالياً اختلاف يجب مراجعته:

- Remotion Root يعمل على 30fps.
- بعض أجزاء Desktop Preview تستخدم 25fps.

الأفضل توحيد المشروع كله على FPS واحد، ويفضل 30fps لأن نسخة Remotion الأساسية مبنية عليه.

### 2. إضافة esbuild كاعتماد مباشر

سكريبت Desktop Preview يستخدم `esbuild`، لذلك يفضل إضافته صراحة:

```bash
npm install -D esbuild
```

### 3. فحص TypeScript و ESLint

حالياً يتم تجاهل أخطاء TypeScript و ESLint أثناء build في `next.config.mjs` لتسهيل التطوير. قبل الإصدار المستقر، يجب تشغيل:

```bash
npx tsc --noEmit
npm run lint
```

### 4. اختبار الرندر الطويل

يجب اختبار:

- فيديو 10 شرائح.
- فيديو 20 شريحة.
- موسيقى + Voiceover.
- End Page طويل.
- مؤثرات متعددة.
- صور كبيرة الحجم.
- فيديوهات كشرائح.

---

## خارطة الطريق المقترحة

### المرحلة 1: تثبيت الأساس

- توحيد FPS.
- إضافة `esbuild` كـ devDependency.
- اختبار build وrender.
- تنظيف warnings الواضحة.

### المرحلة 2: حفظ المشاريع

- إضافة Save Project بصيغة `.igp`.
- إضافة Open Project.
- حفظ ترتيب الشرائح والنصوص والإعدادات.
- حماية المستخدم من فقدان العمل عند إغلاق التطبيق.

### المرحلة 3: Presets إنتاجية

- Preset وثائقي.
- Preset إخباري.
- Preset اقتصادي.
- Preset قانوني/برلماني.
- Preset Social Media سريع.

### المرحلة 4: تحسين الصوت

- اختيار صوت Gemini من الواجهة.
- التحكم في سرعة الصوت.
- إعادة توليد صوت شريحة واحدة فقط.
- Cache للصوتيات حتى لا يتم استهلاك quota بلا داعٍ.

### المرحلة 5: نسخة Desktop مستقرة

- Build كامل.
- مجلد Assets واضح بجوار التطبيق.
- مجلد Outputs واضح.
- شاشة About / Version.
- Logs سهلة الوصول.
- زر Reset Cache.

---

## أوامر مفيدة

```bash
npm install
npm run dev
npm run desktop:v2
npm run desktop:v2:preview
npm run desktop:v2:bundle
npm run desktop:v2:build
npm run desktop:v2:clean
```

---

## حالة المشروع المختصرة

المشروع الآن يحتوي على أساس قوي لإنتاج فيديوهات إنفوجراف متحركة:

- الواجهة موجودة.
- الرندر موجود.
- النصوص المتحركة موجودة.
- نسخة Desktop V2 موجودة.
- Gemini Voiceover موجود.

لكن قبل الاعتماد الكامل، الأولوية هي:

1. توحيد FPS.
2. تثبيت dependencies الناقصة.
3. اختبار Desktop build.
4. إضافة حفظ وفتح مشروع.
5. تحسين التوثيق العملي لفريق الاستخدام.
