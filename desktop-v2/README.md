# Desktop V2 Architecture

هذه بنية جديدة مستقلة لتطبيق الديسكتوب، مبنية لتجنب المشاكل التي ظهرت في المسار القديم:

- لا يوجد `Next.js server` داخل التطبيق.
- لا يوجد API routes وقت التشغيل.
- لا يوجد رندر عبر HTTP داخلي.
- يوجد `Electron main` خفيف.
- يوجد `preload` لواجهة IPC آمنة.
- يوجد `worker` مستقل لعمليات Remotion الثقيلة.
- يوجد مجلد generated خاص بـ Remotion bundle يمكن بناؤه مسبقاً قبل التغليف.
- يوجد خادم وسائط مصغر ومؤقت خاص بعملية الرندر فقط، بدلاً من خادم تطبيق كامل.

## الهدف من Desktop V2

المشكلة الأساسية في النسخة القديمة لم تكن في نافذة Electron نفسها، بل في تداخل ثلاث طبقات وقت التشغيل:

1. `Electron`
2. `Next standalone server`
3. `Remotion bundle()` وقت الرندر

في هذه النسخة الجديدة يتم الفصل كالآتي:

1. **Electron Main**
   مسؤول فقط عن فتح النافذة، تشغيل worker، والربط عبر IPC.
2. **Renderer**
   واجهة محلية ثابتة من ملفات `HTML/CSS/JS` بدون خادم.
3. **Render Worker**
   عملية منفصلة تتولى `selectComposition()` و`renderMedia()`.
4. **Media Bridge**
   خادم HTTP محلي صغير جداً يُنشأ أثناء الرندر فقط لخدمة الصور والفيديو والصوت إلى Headless Chrome.
5. **Prebuilt Bundle**
   يفضّل بناؤه مسبقاً في `desktop-v2/generated/remotion-bundle`.

## المجلدات

- `desktop-v2/main.cjs`
  نقطة دخول التطبيق المكتبي الجديد.
- `desktop-v2/preload.cjs`
  جسر آمن بين الواجهة وElectron.
- `desktop-v2/renderer/`
  الواجهة المحلية الجديدة.
- `desktop-v2/worker/render-worker.cjs`
  عملية مستقلة للرندر.
- `desktop-v2/shared/`
  منطق المسارات والأصول وتطبيع payload.
- `desktop-v2/scripts/build-remotion-bundle.mjs`
  أمر بناء مسبق لحزمة Remotion.

## مبادئ هذه البنية

- **Fast startup**
  فتح التطبيق لا ينتظر خادماً داخلياً.
- **Clear failure boundary**
  فشل الرندر لا يعني فشل فتح التطبيق.
- **No hidden localhost**
  لا اعتماد على خادم UI أو API داخلي. المنفذ الوحيد المؤقت هو لجسر الوسائط أثناء الرندر.
- **Packaged-first mindset**
  كل مسار runtime مبني على `APP_HOME` و`resources`.
- **Shared rendering core**
  الـ composition الحالية في `src/remotion` تبقى قابلة لإعادة الاستخدام.
- **Out-of-repo runtime**
  أثناء التطوير يتم حفظ الكاش والمخرجات في `%LOCALAPPDATA%\\InfographicGeneratorDesktopV2Dev` بدلاً من تضخيم مجلد المشروع.

## أوامر مقترحة للتطوير

1. بناء حزمة Remotion مسبقاً:
   `npm run desktop:v2:bundle`
2. تشغيل Desktop V2:
   `npm run desktop:v2`

## التوسع التالي

الخطوة التالية المنطقية بعد هذا الأساس:

1. ربط واجهة `Desktop V2` بمعاينة محلية للفيديو.
2. إضافة نسخ الصور المختارة إلى `Temp` عند الحاجة.
3. إضافة إعداد تغليف خاص بـ `Desktop V2` بدلاً من البناء القديم.
