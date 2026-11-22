# I2P — Image to PDF

**Developed by Long Bùi** · Version 1.0.1

I2P turns a collection of photos into a multi-page PDF. The image processing and PDF construction happen locally in the browser or Android WebView. There is no upload endpoint and no account requirement.

## Cách mở nhanh trên máy tính (khuyến nghị)

Trong gói phát hành có tệp `I2P-Portable.html` ở thư mục gốc. Chỉ cần giải nén toàn bộ gói, sau đó mở trực tiếp `I2P-Portable.html` bằng Chrome hoặc Microsoft Edge. Đây là bản một tệp duy nhất, đã nhúng CSS, JavaScript và logo; không cần giữ các tệp phụ cạnh nó. Sau khi chọn ảnh và nhấn **Xuất PDF**, file được tải về thư mục Downloads của trình duyệt.

Nếu mở `www/index.html` mà thấy trang chữ đen nền trắng, thiếu logo hoặc nút không hoạt động, trình duyệt đã không tải được một hay nhiều tệp phụ (`styles.css`, `app.js`, `assets`). Hãy dùng `I2P-Portable.html` hoặc giải nén toàn bộ dự án và giữ nguyên cấu trúc thư mục; không mở `index.html` trực tiếp bên trong cửa sổ ZIP.

Lưu ý: bản Portable mở bằng `file://` dùng được các chức năng chuyển ảnh sang PDF nhưng không đăng ký Service Worker/PWA. Muốn cài PWA, hãy chạy thư mục `www` qua HTTPS hoặc localhost.

## Main functions

- Select multiple images (JPG, PNG, WebP and other formats the device browser can decode).
- Reorder pages, rotate an individual image by 90°, remove images and preview the selected page.
- Choose A3, A4, A5, Letter, Legal or a custom page size; portrait/landscape; page margins.
- Place images using Contain (preserve the full image), Cover (crop to fill) or Stretch; adjust the image scale from 50% to 120%.
- Apply original color, grayscale, document black-and-white or sepia filters.
- Adjust brightness, contrast and sharpening; optionally run a local auto-level enhancement pass.
- Choose JPEG quality and PDF rendering resolution (96, 150, 200 or 300 DPI).
- Save the resulting PDF from a desktop/mobile browser. The Android app writes it to `Downloads/I2P`.
- Vietnamese/English interface, light/dark/system appearance and persistent settings.

## Important image-quality note

“Auto enhance” is a conventional local image adjustment (luminance-level balancing), not an AI super-resolution or deblurring model. It cannot reliably reconstruct detail that was never captured or was lost to motion blur, focus blur or low resolution. For text-heavy homework, test the grayscale or document black-and-white filter and inspect the PDF before submitting it.

## Run on a computer

1. Extract this project folder.
2. Open `www/index.html` in a modern Chromium-based browser (Chrome or Edge). Image selection and PDF export work directly from the local file.
3. To enable offline caching and the browser's install option, serve the `www` folder over HTTPS (or localhost). For example, from the `www` folder run a local static server and open its localhost URL. Then use the browser's **Install app** option.

No npm package installation is needed for the web version.

The app includes a visible **Cài ứng dụng / Install app** button. On HTTPS hosting, it opens the native browser install prompt where supported, and otherwise shows platform-specific installation steps. See `PUBLISH-AND-INSTALL.md` for public GitHub Pages deployment and installation on desktop, Android and iOS.

## Publish the public website

A ready-to-use GitHub Pages workflow is included at `.github/workflows/deploy-pages.yml`. Create a public GitHub repository named `I2P`, push this project to the `main` branch, then configure **Settings → Pages → Source → GitHub Actions**. The workflow publishes the `www/` directory automatically. The public URL will normally look like `https://YOUR-ACCOUNT.github.io/I2P/`. Detailed steps are in `PUBLISH-AND-INSTALL.md`.

## Install on Android

### As an installable web app (PWA)

Host the contents of `www/` over HTTPS, open the website in Chrome, then choose **Add to Home screen** / **Install app**. The PWA is responsive and its core assets are cached for offline use after the first successful load. This method does not produce an APK file.

### Build the native Android APK

The `android/` folder is a native Android WebView shell. It bundles the same local web app, opens Android's document picker for multiple images, and saves exported PDFs to `Downloads/I2P`. It has no network permission and does not send images to a server.

Requirements:

- Android Studio with Android SDK Platform 36 and Build Tools 36.0.0, or a matching command-line Android SDK.
- JDK 17.
- Gradle 9.6.0 available on PATH (the project declares Android Gradle Plugin 9.5.0).

From the project root, run `build-apk.bat` on Windows or `./build-apk.sh` on macOS/Linux. The script copies the latest web files into the Android assets folder and invokes Gradle. You can also build manually from the `android/` folder:

```bash
gradle --no-daemon :app:assembleDebug
```

The debug APK is generated at:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

It can be installed on Android 10 (API 29) or later. For command-line installation with an attached device:

```bash
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

A GitHub Actions workflow is included at `.github/workflows/build-apk.yml`. Push the project to a GitHub repository, then run **Actions → Build I2P Android APK → Run workflow**. The workflow builds the debug APK and uploads it as the `I2P-debug-apk` artifact. A release APK intended for public distribution should be signed with your own release keystore; do not distribute a debug build as a production release.

## Android build configuration

The project currently uses AGP 9.5.0 with Gradle 9.6.0 and compiles against Android API 36. The AGP/Gradle pairing follows the Android Gradle Plugin compatibility table. See:

- https://developer.android.com/build/releases/about-agp
- https://developer.android.com/build

## Project layout

```text
I2P/
├── www/                         # PWA / browser app
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── manifest.webmanifest
│   ├── service-worker.js
│   └── assets/
├── android/                     # Native Android WebView wrapper
│   └── app/src/main/
│       ├── assets/www/           # Bundled web app (copied from www/)
│       └── java/com/longbui/i2p/
└── .github/workflows/build-apk.yml
```

## Privacy and practical limits

- Files are selected and processed on-device; the app does not contain an image-upload API or analytics code.
- The app keeps preferences only in local browser/WebView storage. It does not persist imported images as a project after closing the app.
- Some formats (notably HEIC/HEIF) are not decoded by every browser/WebView. Convert those to JPG or PNG before import when the device cannot preview them.
- Very large source images or many 300-DPI pages can use substantial RAM. I2P caps the generated content canvas to reduce the chance of a browser crash; in that case the effective output resolution may be lower than the selected DPI and the app displays a notice.
- Always open the exported PDF once and check page order, cropping and text legibility before submitting coursework.

© 2026 Long Bùi. All rights reserved.
