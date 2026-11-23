'use strict';

(() => {
  const $ = (id) => document.getElementById(id);
  const DB_NAME = 'i2p-settings-v1';
  const defaultSettings = {
    language: 'vi', theme: 'system', paperSize: 'A4', orientation: 'portrait',
    customWidth: 210, customHeight: 297, margin: 10, fitMode: 'contain', imageScale: 100,
    filter: 'original', autoEnhance: false, brightness: 100, contrast: 100,
    sharpness: 0, quality: 85, dpi: 200, colorMode: 'color'
  };
  const pageSizes = {
    A3: [297, 420], A4: [210, 297], A5: [148, 210],
    Letter: [215.9, 279.4], Legal: [215.9, 355.6]
  };
  const translations = {
    vi: {
      localOnly: 'Xử lý trên thiết bị', eyebrow: 'CÔNG CỤ DÀNH CHO SINH VIÊN',
      headline: 'Gom ảnh thành <span class="accent-text">một file PDF.</span>',
      subheadline: 'Sắp xếp trang, tối ưu ảnh chụp bài tập và xuất PDF trong vài bước.',
      imagesAdded: 'Ảnh đã thêm', totalSize: 'Dung lượng ảnh', sourceStep: 'NGUỒN ẢNH',
      addPhotos: 'Thêm ảnh của bạn', addPhotosHint: 'Chọn nhiều ảnh cùng lúc. Bạn có thể đổi thứ tự trước khi xuất.',
      clearAll: 'Xóa tất cả', dropTitle: 'Kéo ảnh vào đây hoặc <span>chọn ảnh</span>',
      dropHint: 'JPG, PNG, WebP · Có thể chọn nhiều ảnh', pageOrder: 'Thứ tự trang', noPhotos: 'Chưa có ảnh nào được thêm',
      emptyTitle: 'Danh sách đang trống', emptyHint: 'Ảnh bạn chọn sẽ xuất hiện tại đây.',
      orderHint: 'Thứ tự từ trên xuống sẽ là thứ tự trang trong PDF.', exportStep: 'XUẤT TỆP', exportPdf: 'Tạo file PDF',
      outputName: 'Tên file', pages: 'Số trang', pageSize: 'Khổ giấy', imageQuality: 'Chất lượng',
      createPdf: 'Xuất PDF', privacyNote: 'Ảnh được xử lý trên thiết bị, không tải lên máy chủ.',
      preview: 'Xem trước trang', previewHint: 'Bản xem trước sẽ hiển thị tại đây',
      previewCaption: 'Mô phỏng bố cục trang PDF', editStep: 'CHỈNH SỬA', pageSettings: 'Thiết lập trang & ảnh',
      reset: 'Đặt lại', paperLayout: 'Khổ giấy & bố cục', paperSize: 'Khổ giấy', orientation: 'Hướng giấy',
      custom: 'Tùy chỉnh', portrait: 'Dọc', landscape: 'Ngang', widthMm: 'Rộng (mm)', heightMm: 'Cao (mm)',
      margin: 'Lề trang', imageFit: 'Cách đặt ảnh', imageScale: 'Kích cỡ ảnh trong trang', fit: 'Vừa trang (giữ tỉ lệ)', fill: 'Lấp đầy (cắt viền)',
      stretch: 'Kéo giãn', fitHelp: '“Vừa trang” giữ nguyên tỉ lệ và không cắt nội dung ảnh.',
      imageFilter: 'Bộ lọc ảnh', filter: 'Bộ lọc', original: 'Giữ nguyên màu', grayscale: 'Thang xám',
      bw: 'Trắng đen tài liệu', sepia: 'Sepia', autoEnhance: 'Tự động cải thiện',
      autoEnhanceHint: 'Cân bằng vùng sáng/tối và độ tương phản', brightness: 'Độ sáng', contrast: 'Tương phản',
      sharpness: 'Làm nét', enhanceHelp: 'Cải thiện ảnh chỉ có tác dụng với ảnh đủ dữ liệu; không thể khôi phục chi tiết đã mất do out nét.',
      outputQuality: 'Chất lượng đầu ra', jpegQuality: 'Nén ảnh trong PDF', resolution: 'Độ phân giải',
      smallFile: '96 DPI · Nhẹ', colorMode: 'Chế độ màu', color: 'Màu', gray: 'Xám',
      qualityHelp: '300 DPI và chất lượng nén cao tạo file lớn hơn. Với bài tập thông thường, 150–200 DPI thường đủ dùng.',
      footerTag: 'Image to PDF', developedBy: 'Developed by LB', allRights: 'Bản quyền thuộc về tác giả', privacyPolicy: 'Quyền riêng tư',
      preferences: 'TÙY CHỌN', appSettings: 'Cài đặt ứng dụng', language: 'Ngôn ngữ',
      languageHint: 'Chọn ngôn ngữ hiển thị', appearance: 'Giao diện', appearanceHint: 'Tự chọn sáng hoặc tối',
      light: 'Sáng', dark: 'Tối', system: 'Theo thiết bị', aboutText: 'Công cụ chuyển ảnh sang PDF chạy ngoại tuyến, ưu tiên quyền riêng tư.',
      copyright: 'Bản quyền và quyền tác giả được bảo lưu.', done: 'Hoàn tất',
      added: 'Đã thêm ảnh', unsupported: 'Một số ảnh không thể mở hoặc không được hỗ trợ.',
      noImages: 'Hãy thêm ít nhất một ảnh trước khi xuất PDF.',
      processing: 'Đang xử lý trang', complete: 'Đã tạo PDF thành công.',
      exportFailed: 'Không thể tạo PDF. Hãy thử giảm DPI hoặc chọn ít ảnh hơn.',
      savedAndroid: 'Đã lưu PDF vào thư mục Downloads/I2P.',
      saveFailedAndroid: 'Không thể lưu PDF vào thiết bị Android.',
      confirmClear: 'Xóa toàn bộ ảnh khỏi danh sách?', removed: 'Đã xóa ảnh.',
      resetDone: 'Đã đặt lại thông số chỉnh sửa.', noImageSelected: 'Không có ảnh để xem trước.',
      page: 'trang', pagesUnit: 'trang', dpiLimited: 'Độ phân giải đã được giới hạn để tránh dùng quá nhiều bộ nhớ.',
      selectImage: 'Chọn ảnh', moveUp: 'Chuyển lên', moveDown: 'Chuyển xuống', rotate: 'Xoay 90°', remove: 'Xóa ảnh',
      qualityLow: 'Tiêu chuẩn', qualityMedium: 'Tốt', qualityHigh: 'Cao',
      fileTooLarge: 'Ảnh vượt quá 50 MB nên đã được bỏ qua.', imageLoadError: 'Không đọc được ảnh này.',
      invalidCustom: 'Kích thước tùy chỉnh phải nằm trong khoảng rộng 50–500 mm và cao 50–700 mm.',
      installApp: 'Cài ứng dụng', installed: 'I2P đã được cài trên thiết bị.',
      installHttps: 'Để cài I2P, hãy mở website qua địa chỉ HTTPS (không mở tệp HTML trực tiếp).',
      installAndroid: 'Android: mở bằng Chrome, nhấn menu ⋮ rồi chọn Cài đặt ứng dụng hoặc Thêm vào màn hình chính.',
      installIos: 'iPhone/iPad: mở bằng Safari, nhấn Chia sẻ rồi chọn Thêm vào Màn hình chính.',
      installMac: 'Mac: trong Safari chọn File → Add to Dock; hoặc dùng Chrome và chọn biểu tượng Cài đặt trên thanh địa chỉ.',
      installDesktop: 'Máy tính: dùng Chrome/Edge, chọn biểu tượng Cài đặt trên thanh địa chỉ hoặc menu → Cài đặt I2P.'
    },
    en: {
      localOnly: 'Processed on device', eyebrow: 'A PRACTICAL STUDENT TOOL',
      headline: 'Turn photos into <span class="accent-text">one PDF.</span>',
      subheadline: 'Arrange pages, optimize assignment scans and export a PDF in a few steps.',
      imagesAdded: 'Images added', totalSize: 'Image size', sourceStep: 'SOURCE IMAGES',
      addPhotos: 'Add your images', addPhotosHint: 'Select multiple images. Reorder them before exporting.',
      clearAll: 'Clear all', dropTitle: 'Drop images here or <span>browse files</span>',
      dropHint: 'JPG, PNG, WebP · Multiple files supported', pageOrder: 'Page order', noPhotos: 'No images added yet',
      emptyTitle: 'Your list is empty', emptyHint: 'The images you select will appear here.',
      orderHint: 'The top-to-bottom order becomes the PDF page order.', exportStep: 'EXPORT', exportPdf: 'Create PDF',
      outputName: 'File name', pages: 'Pages', pageSize: 'Paper', imageQuality: 'Quality',
      createPdf: 'Export PDF', privacyNote: 'Images are processed on your device and are never uploaded.',
      preview: 'Page preview', previewHint: 'Your page preview will appear here',
      previewCaption: 'Preview of the PDF page layout', editStep: 'EDIT', pageSettings: 'Page & image settings',
      reset: 'Reset', paperLayout: 'Paper & layout', paperSize: 'Paper size', orientation: 'Orientation',
      custom: 'Custom', portrait: 'Portrait', landscape: 'Landscape', widthMm: 'Width (mm)', heightMm: 'Height (mm)',
      margin: 'Page margin', imageFit: 'Image placement', imageScale: 'Image size on page', fit: 'Contain (keep ratio)', fill: 'Cover (crop edges)',
      stretch: 'Stretch', fitHelp: 'Contain preserves the image ratio and does not crop content.',
      imageFilter: 'Image filters', filter: 'Filter', original: 'Original color', grayscale: 'Grayscale',
      bw: 'Document black & white', sepia: 'Sepia', autoEnhance: 'Auto enhance',
      autoEnhanceHint: 'Balance highlights, shadows and contrast', brightness: 'Brightness', contrast: 'Contrast',
      sharpness: 'Sharpness', enhanceHelp: 'Enhancement works best with usable source detail; it cannot restore detail lost to blur.',
      outputQuality: 'Output quality', jpegQuality: 'Image compression', resolution: 'Resolution',
      smallFile: '96 DPI · Small', colorMode: 'Color mode', color: 'Color', gray: 'Grayscale',
      qualityHelp: '300 DPI and high JPEG quality create larger files. 150–200 DPI is usually sufficient for assignments.',
      footerTag: 'Image to PDF', developedBy: 'Developed by LB', allRights: 'Copyright belongs to the author', privacyPolicy: 'Privacy',
      preferences: 'PREFERENCES', appSettings: 'App settings', language: 'Language',
      languageHint: 'Choose the display language', appearance: 'Appearance', appearanceHint: 'Choose light or dark mode',
      light: 'Light', dark: 'Dark', system: 'Use device setting', aboutText: 'An offline image-to-PDF tool designed with privacy in mind.',
      copyright: 'All copyright and authorship rights reserved.', done: 'Done',
      added: 'Images added', unsupported: 'Some images could not be opened or are unsupported.',
      noImages: 'Add at least one image before exporting.',
      processing: 'Processing page', complete: 'PDF created successfully.',
      exportFailed: 'Could not create the PDF. Try lowering DPI or using fewer images.',
      savedAndroid: 'PDF saved to Downloads/I2P.',
      saveFailedAndroid: 'Could not save the PDF on this Android device.',
      confirmClear: 'Remove all images from the list?', removed: 'Image removed.',
      resetDone: 'Editing settings have been reset.', noImageSelected: 'No image to preview.',
      page: 'page', pagesUnit: 'pages', dpiLimited: 'Resolution was limited to avoid excessive memory use.',
      selectImage: 'Select image', moveUp: 'Move up', moveDown: 'Move down', rotate: 'Rotate 90°', remove: 'Remove image',
      qualityLow: 'Standard', qualityMedium: 'Good', qualityHigh: 'High',
      fileTooLarge: 'This image exceeds 50 MB and was skipped.', imageLoadError: 'This image could not be read.',
      invalidCustom: 'Custom size must be 50–500 mm wide and 50–700 mm high.',
      installApp: 'Install app', installed: 'I2P is installed on this device.',
      installHttps: 'To install I2P, open the HTTPS website (do not open the HTML file directly).',
      installAndroid: 'Android: open in Chrome, tap ⋮, then choose Install app or Add to Home screen.',
      installIos: 'iPhone/iPad: open in Safari, tap Share, then choose Add to Home Screen.',
      installMac: 'Mac: in Safari choose File → Add to Dock, or use Chrome and choose the install icon in the address bar.',
      installDesktop: 'Computer: use Chrome/Edge, select the install icon in the address bar or Menu → Install I2P.'
    }
  };

  let settings = { ...defaultSettings };
  let images = [];
  let selectedId = null;
  let toastTimer = 0;
  let exportLock = false;
  let mediaQuery = null;
  let deferredInstallPrompt = null;

  function t(key) {
    const lang = settings.language || 'vi';
    return (translations[lang] && translations[lang][key]) || translations.vi[key] || key;
  }

  function showToast(message, type = 'success') {
    const node = document.createElement('div');
    node.className = `toast ${type === 'error' ? 'error' : ''}`;
    node.textContent = message;
    $('toastRegion').appendChild(node);
    window.setTimeout(() => node.remove(), 3600);
  }

  function loadSettings() {
    try {
      const stored = JSON.parse(localStorage.getItem(DB_NAME) || '{}');
      settings = { ...defaultSettings, ...stored };
    } catch (_) {
      settings = { ...defaultSettings };
    }
    Object.keys(defaultSettings).forEach((key) => {
      const element = $(key);
      if (!element) return;
      const value = settings[key];
      if (element.type === 'checkbox') element.checked = Boolean(value);
      else if (value !== undefined && value !== null) element.value = String(value);
    });
    $('language').value = settings.language;
    $('themeSelect').value = settings.theme;
  }

  function persistSettings() {
    try { localStorage.setItem(DB_NAME, JSON.stringify(settings)); } catch (_) { /* Private browsing may disable storage. */ }
  }

  function resolveTheme() {
    if (settings.theme === 'system') {
      if (!mediaQuery) mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      return mediaQuery.matches ? 'dark' : 'light';
    }
    return settings.theme;
  }

  function applyTheme() {
    document.documentElement.dataset.theme = resolveTheme();
    $('themeSelect').value = settings.theme;
  }

  function applyLanguage() {
    document.documentElement.lang = settings.language;
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.dataset.i18n;
      if (translations[settings.language]?.[key]) node.innerHTML = translations[settings.language][key];
    });
    document.title = 'I2P — Image to PDF';
    renderList();
    updateSummary();
    updatePreview();
  }

  function syncSettingsFromUI() {
    Object.keys(defaultSettings).forEach((key) => {
      const element = $(key);
      if (!element) return;
      if (element.type === 'checkbox') settings[key] = element.checked;
      else if (element.type === 'number' || element.type === 'range') settings[key] = Number(element.value);
      else settings[key] = element.value;
    });
    settings.language = $('language').value;
    settings.theme = $('themeSelect').value;
    persistSettings();
  }

  function getPageDimensions() {
    let [w, h] = settings.paperSize === 'Custom'
      ? [Number(settings.customWidth), Number(settings.customHeight)]
      : pageSizes[settings.paperSize] || pageSizes.A4;
    if (settings.orientation === 'landscape' && h > w) [w, h] = [h, w];
    if (settings.orientation === 'portrait' && w > h) [w, h] = [h, w];
    return { widthMm: w, heightMm: h };
  }

  function mmToPt(mm) { return mm * 72 / 25.4; }

  function getPageGeometry() {
    const dims = getPageDimensions();
    const pageWidthPt = mmToPt(dims.widthMm);
    const pageHeightPt = mmToPt(dims.heightMm);
    const marginPt = mmToPt(Number(settings.margin));
    const contentWidthPt = Math.max(1, pageWidthPt - marginPt * 2);
    const contentHeightPt = Math.max(1, pageHeightPt - marginPt * 2);
    return { ...dims, pageWidthPt, pageHeightPt, marginPt, contentWidthPt, contentHeightPt };
  }

  function getSelectedImage() {
    return images.find((item) => item.id === selectedId) || images[0] || null;
  }

  function formatBytes(bytes) {
    if (!bytes) return '0 KB';
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  function renderList() {
    const list = $('imageList');
    list.replaceChildren();
    if (!images.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-list';
      const art = document.createElement('div'); art.className = 'empty-illustration';
      for (let i = 0; i < 3; i++) art.appendChild(document.createElement('span'));
      const title = document.createElement('strong'); title.textContent = t('emptyTitle');
      const hint = document.createElement('p'); hint.textContent = t('emptyHint');
      empty.append(art, title, hint); list.appendChild(empty);
      $('listFooter').hidden = true;
    } else {
      images.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = `image-item ${item.id === selectedId ? 'selected' : ''}`;
        row.dataset.id = item.id;
        row.setAttribute('role', 'button');
        row.setAttribute('tabindex', '0');
        row.setAttribute('aria-label', `${t('selectImage')}: ${item.file.name}`);

        const thumb = document.createElement('div'); thumb.className = 'image-thumb';
        const img = document.createElement('img'); img.src = item.url; img.alt = '';
        img.style.transform = `rotate(${item.rotation}deg)`;
        thumb.appendChild(img);

        const detail = document.createElement('div'); detail.className = 'image-detail';
        const name = document.createElement('strong'); name.textContent = item.file.name;
        const info = document.createElement('small'); info.textContent = `${item.width} × ${item.height} px · ${formatBytes(item.file.size)}`;
        detail.append(name, info);

        const actions = document.createElement('div'); actions.className = 'image-actions';
        const actionSpecs = [
          ['move-up', '↑', t('moveUp'), index === 0],
          ['move-down', '↓', t('moveDown'), index === images.length - 1],
          ['rotate', '↻', t('rotate'), false],
          ['remove', '×', t('remove'), false]
        ];
        actionSpecs.forEach(([action, label, title, disabled]) => {
          const button = document.createElement('button');
          button.type = 'button'; button.className = `mini-action ${action === 'remove' ? 'remove' : ''}`;
          button.dataset.action = action; button.title = title; button.setAttribute('aria-label', title);
          button.textContent = label; button.disabled = disabled;
          actions.appendChild(button);
        });
        row.append(thumb, detail, actions);
        list.appendChild(row);
      });
      $('listFooter').hidden = false;
    }
    $('imageCount').textContent = String(images.length);
    $('totalSize').textContent = formatBytes(images.reduce((sum, item) => sum + item.file.size, 0));
    $('pageBadge').textContent = `${images.length} ${t('pagesUnit')}`;
    $('listHint').textContent = images.length ? `${images.length} ${t('pagesUnit')}` : t('noPhotos');
    $('clearAll').disabled = images.length === 0;
    $('exportButton').disabled = images.length === 0 || exportLock;
    updateSummary();
  }

  async function addFiles(fileList) {
    const files = Array.from(fileList || []).filter((file) => file.type.startsWith('image/'));
    if (!files.length) return;
    let added = 0;
    for (const file of files) {
      if (file.size > 50 * 1024 * 1024) { showToast(t('fileTooLarge'), 'error'); continue; }
      const url = URL.createObjectURL(file);
      try {
        const image = new Image();
        image.decoding = 'async';
        image.src = url;
        await new Promise((resolve, reject) => {
          image.onload = resolve;
          image.onerror = reject;
        });
        if (!image.naturalWidth || !image.naturalHeight) throw new Error('Empty image');
        const item = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          file, url, img: image, width: image.naturalWidth, height: image.naturalHeight,
          rotation: 0
        };
        images.push(item); added++;
      } catch (_) {
        URL.revokeObjectURL(url);
        showToast(t('imageLoadError'), 'error');
      }
    }
    if (!selectedId && images.length) selectedId = images[0].id;
    renderList(); updatePreview();
    if (added) showToast(`${t('added')}: ${added}`, 'success');
  }

  function selectImage(id) {
    if (!images.some((item) => item.id === id)) return;
    selectedId = id;
    renderList(); updatePreview();
  }

  function removeImage(id) {
    const index = images.findIndex((item) => item.id === id);
    if (index < 0) return;
    URL.revokeObjectURL(images[index].url);
    images.splice(index, 1);
    if (selectedId === id) selectedId = images[Math.min(index, images.length - 1)]?.id || null;
    renderList(); updatePreview(); showToast(t('removed'));
  }

  function moveImage(id, delta) {
    const index = images.findIndex((item) => item.id === id);
    const next = index + delta;
    if (index < 0 || next < 0 || next >= images.length) return;
    [images[index], images[next]] = [images[next], images[index]];
    renderList(); updatePreview();
  }

  function handleListClick(event) {
    const row = event.target.closest('.image-item');
    if (!row) return;
    const actionButton = event.target.closest('[data-action]');
    const id = row.dataset.id;
    if (!actionButton) { selectImage(id); return; }
    const action = actionButton.dataset.action;
    if (action === 'move-up') moveImage(id, -1);
    if (action === 'move-down') moveImage(id, 1);
    if (action === 'rotate') {
      const item = images.find((entry) => entry.id === id);
      if (item) item.rotation = (item.rotation + 90) % 360;
      renderList(); updatePreview();
    }
    if (action === 'remove') removeImage(id);
  }

  function fitAndDraw(ctx, image, rotation, x, y, boxWidth, boxHeight, fitMode, imageScale = 100) {
    const angle = ((rotation % 360) + 360) % 360;
    const rotated = angle === 90 || angle === 270;
    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;
    const rotatedWidth = rotated ? naturalHeight : naturalWidth;
    const rotatedHeight = rotated ? naturalWidth : naturalHeight;
    let drawWidth; let drawHeight;
    const userScale = Math.max(0.1, Number(imageScale) / 100);
    if (fitMode === 'stretch') {
      drawWidth = (rotated ? boxHeight : boxWidth) * userScale;
      drawHeight = (rotated ? boxWidth : boxHeight) * userScale;
    } else {
      const scale = (fitMode === 'cover'
        ? Math.max(boxWidth / rotatedWidth, boxHeight / rotatedHeight)
        : Math.min(boxWidth / rotatedWidth, boxHeight / rotatedHeight)) * userScale;
      drawWidth = naturalWidth * scale;
      drawHeight = naturalHeight * scale;
    }
    ctx.save();
    if (fitMode === 'cover' || userScale > 1) {
      ctx.beginPath(); ctx.rect(x, y, boxWidth, boxHeight); ctx.clip();
    }
    ctx.translate(x + boxWidth / 2, y + boxHeight / 2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
    ctx.restore();
  }

  function applyEnhance(canvas, options) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const width = canvas.width; const height = canvas.height;
    if (!width || !height) return;
    const frame = ctx.getImageData(0, 0, width, height);
    const data = frame.data;

    if (options.autoEnhance) {
      const histogram = new Uint32Array(256);
      const sampleStep = Math.max(4, Math.floor((width * height) / 300000));
      let samples = 0;
      for (let i = 0; i < data.length; i += sampleStep * 4) {
        const luma = Math.max(0, Math.min(255, Math.round(.2126 * data[i] + .7152 * data[i + 1] + .0722 * data[i + 2])));
        histogram[luma]++; samples++;
      }
      const percentile = (fraction) => {
        const target = samples * fraction; let count = 0;
        for (let i = 0; i < 256; i++) { count += histogram[i]; if (count >= target) return i; }
        return 255;
      };
      const low = percentile(.025); const high = percentile(.975);
      if (high - low > 18) {
        const scale = 255 / (high - low);
        for (let i = 0; i < data.length; i += 4) {
          const lum = .2126 * data[i] + .7152 * data[i + 1] + .0722 * data[i + 2];
          const adjusted = Math.max(0, Math.min(255, (lum - low) * scale));
          const shift = adjusted - lum;
          data[i] = Math.max(0, Math.min(255, data[i] + shift));
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + shift));
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + shift));
        }
      }
    }

    if (options.filter === 'bw' || options.colorMode === 'gray') {
      const threshold = 170;
      for (let i = 0; i < data.length; i += 4) {
        const lum = .2126 * data[i] + .7152 * data[i + 1] + .0722 * data[i + 2];
        const value = options.filter === 'bw' ? (lum >= threshold ? 255 : 0) : Math.round(lum);
        data[i] = value; data[i + 1] = value; data[i + 2] = value;
      }
    }

    if (options.sharpness > 0 && width > 2 && height > 2) {
      const source = new Uint8ClampedArray(data);
      const amount = options.sharpness * .24;
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const p = (y * width + x) * 4;
          for (let channel = 0; channel < 3; channel++) {
            const neighbors = source[p - 4 + channel] + source[p + 4 + channel] + source[p - width * 4 + channel] + source[p + width * 4 + channel];
            data[p + channel] = source[p + channel] * (1 + 4 * amount) - neighbors * amount;
          }
        }
      }
    }
    ctx.putImageData(frame, 0, 0);
  }

  function drawPageToCanvas(item, canvas, geometry, dpi, preview = false) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const ratio = preview ? canvas.width / geometry.pageWidthPt : canvas.width / geometry.contentWidthPt;
    const pageMargin = preview ? geometry.marginPt * ratio : 0;
    const contentWidth = preview ? geometry.contentWidthPt * ratio : canvas.width;
    const contentHeight = preview ? geometry.contentHeightPt * ratio : canvas.height;
    ctx.save();
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    const brightness = Number(settings.brightness);
    const contrast = Number(settings.contrast);
    const filterParts = [`brightness(${brightness}%)`, `contrast(${contrast}%)`];
    if (settings.filter === 'grayscale' || settings.filter === 'bw' || settings.colorMode === 'gray') filterParts.push('grayscale(1)');
    if (settings.filter === 'sepia' && settings.colorMode === 'color') filterParts.push('sepia(.85)');
    ctx.filter = filterParts.join(' ');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    fitAndDraw(ctx, item.img, item.rotation, pageMargin, pageMargin, contentWidth, contentHeight, settings.fitMode, settings.imageScale);
    ctx.restore();
    if (settings.autoEnhance || settings.filter === 'bw' || settings.colorMode === 'gray' || settings.sharpness > 0) {
      applyEnhance(canvas, settings);
    }
    return canvas;
  }

  function updatePreview() {
    const item = getSelectedImage();
    const canvas = $('previewCanvas');
    const placeholder = $('previewPlaceholder');
    if (!item) {
      canvas.style.display = 'none'; placeholder.style.display = 'flex';
      $('previewCounter').textContent = '— / —';
      return;
    }
    const geometry = getPageGeometry();
    const ratio = geometry.pageWidthPt / geometry.pageHeightPt;
    let width = 420; let height = Math.round(width / ratio);
    if (height > 620) { height = 620; width = Math.round(height * ratio); }
    canvas.width = width; canvas.height = height;
    canvas.style.display = 'block'; placeholder.style.display = 'none';
    const frame = canvas.parentElement;
    frame.style.aspectRatio = `${geometry.pageWidthPt} / ${geometry.pageHeightPt}`;
    drawPageToCanvas(item, canvas, geometry, 96, true);
    const index = images.findIndex((entry) => entry.id === item.id) + 1;
    $('previewCounter').textContent = `${index} / ${images.length}`;
  }

  function updateSummary() {
    const geometry = getPageGeometry();
    const quality = Number(settings.quality);
    const qualityLabel = quality < 70 ? t('qualityLow') : quality < 90 ? t('qualityMedium') : t('qualityHigh');
    $('summaryPages').textContent = String(images.length);
    $('summaryPaper').textContent = settings.paperSize === 'Custom'
      ? `${geometry.widthMm}×${geometry.heightMm}` : `${settings.paperSize} · ${t(settings.orientation)}`;
    $('summaryQuality').textContent = qualityLabel;
    $('imageCount').textContent = String(images.length);
    $('totalSize').textContent = formatBytes(images.reduce((sum, item) => sum + item.file.size, 0));
  }

  function updateSliderOutputs() {
    $('brightnessValue').textContent = `${settings.brightness}%`;
    $('contrastValue').textContent = `${settings.contrast}%`;
    $('sharpnessValue').textContent = String(settings.sharpness);
    $('imageScaleValue').textContent = `${settings.imageScale}%`;
    $('qualityValue').textContent = `${settings.quality}%`;
  }

  function refreshAfterSettingChange() {
    syncSettingsFromUI();
    applyTheme();
    if (settings.paperSize === 'Custom') $('customSize').hidden = false;
    else $('customSize').hidden = true;
    updateSliderOutputs(); updateSummary(); updatePreview();
  }

  function resetEditingSettings() {
    const keep = { language: settings.language, theme: settings.theme };
    settings = { ...defaultSettings, ...keep };
    Object.keys(settings).forEach((key) => {
      const element = $(key);
      if (!element) return;
      if (element.type === 'checkbox') element.checked = Boolean(settings[key]);
      else if (settings[key] !== undefined) element.value = String(settings[key]);
    });
    $('customSize').hidden = true;
    persistSettings(); updateSliderOutputs(); applyLanguage(); updatePreview();
    showToast(t('resetDone'));
  }

  function sanitizeFilename(name) {
    let safe = String(name || 'i2p-document').trim().replace(/[<>:"/\\|?*\x00-\x1F]/g, '-').replace(/[. ]+$/g, '');
    safe = safe.replace(/\.pdf$/i, '');
    if (!safe) safe = 'i2p-document';
    return `${safe.slice(0, 80)}.pdf`;
  }

  function bytes(text) { return new TextEncoder().encode(text); }
  function concatBytes(parts) {
    const length = parts.reduce((sum, part) => sum + part.length, 0);
    const output = new Uint8Array(length); let offset = 0;
    for (const part of parts) { output.set(part, offset); offset += part.length; }
    return output;
  }

  function makePdfBlob(pages) {
    const objectCount = 2 + pages.length * 3;
    const objects = new Array(objectCount + 1);
    objects[1] = bytes('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
    const kids = pages.map((_, index) => `${3 + index * 3} 0 R`).join(' ');
    objects[2] = bytes(`2 0 obj\n<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>\nendobj\n`);

    pages.forEach((page, index) => {
      const pageId = 3 + index * 3;
      const contentId = pageId + 1;
      const imageId = pageId + 2;
      const imageX = page.marginPt;
      const imageY = page.marginPt;
      const imageW = page.pageWidthPt - page.marginPt * 2;
      const imageH = page.pageHeightPt - page.marginPt * 2;
      const content = bytes(`q\n${imageW.toFixed(3)} 0 0 ${imageH.toFixed(3)} ${imageX.toFixed(3)} ${imageY.toFixed(3)} cm\n/Im0 Do\nQ\n`);
      const imageHeader = bytes(`${imageId} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${page.widthPx} /Height ${page.heightPx} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.jpegBytes.length} >>\nstream\n`);
      const imageFooter = bytes('\nendstream\nendobj\n');
      objects[pageId] = bytes(`${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.pageWidthPt.toFixed(3)} ${page.pageHeightPt.toFixed(3)}] /Resources << /XObject << /Im0 ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>\nendobj\n`);
      objects[contentId] = concatBytes([bytes(`${contentId} 0 obj\n<< /Length ${content.length} >>\nstream\n`), content, bytes('endstream\nendobj\n')]);
      objects[imageId] = concatBytes([imageHeader, page.jpegBytes, imageFooter]);
    });

    const header = new Uint8Array([ ...bytes('%PDF-1.4\n%'), 0xE2, 0xE3, 0xCF, 0xD3, 0x0A ]);
    const outputParts = [header];
    const offsets = new Array(objectCount + 1).fill(0);
    let offset = header.length;
    for (let id = 1; id <= objectCount; id++) {
      offsets[id] = offset;
      outputParts.push(objects[id]);
      offset += objects[id].length;
    }
    const xrefOffset = offset;
    let xref = `xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`;
    for (let id = 1; id <= objectCount; id++) xref += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`;
    xref += `trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
    outputParts.push(bytes(xref));
    return new Blob([concatBytes(outputParts)], { type: 'application/pdf' });
  }

  function canvasToJpeg(canvas, quality) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('JPEG encoding failed')), 'image/jpeg', quality);
    });
  }

  function updateProgress(done, total, textOverride) {
    const progress = $('exportProgress');
    progress.hidden = false;
    $('progressBar').style.width = `${Math.round(done / Math.max(1, total) * 100)}%`;
    $('progressText').textContent = textOverride || `${t('processing')} ${done}/${total}`;
  }

  async function savePdf(blob, filename) {
    if (window.I2PAndroid && typeof window.I2PAndroid.savePdf === 'function') {
      const arrayBuffer = await blob.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      let binary = '';
      const chunkSize = 0x8000;
      for (let i = 0; i < data.length; i += chunkSize) {
        binary += String.fromCharCode(...data.subarray(i, Math.min(i + chunkSize, data.length)));
      }
      const base64 = btoa(binary);
      const result = window.I2PAndroid.savePdf(base64, filename);
      if (result === true || result === 'true') showToast(t('savedAndroid'));
      else showToast(t('saveFailedAndroid'), 'error');
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = filename; link.rel = 'noopener';
    document.body.appendChild(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 30000);
    showToast(t('complete'));
  }

  async function exportPdf() {
    if (exportLock) return;
    if (!images.length) { showToast(t('noImages'), 'error'); return; }
    if (settings.paperSize === 'Custom') {
      const w = Number(settings.customWidth); const h = Number(settings.customHeight);
      if (w < 50 || w > 500 || h < 50 || h > 700 || !Number.isFinite(w + h)) {
        showToast(t('invalidCustom'), 'error'); return;
      }
    }
    exportLock = true; $('exportButton').disabled = true;
    updateProgress(0, images.length);
    try {
      const geometry = getPageGeometry();
      const desiredDpi = Number(settings.dpi);
      let widthPx = Math.max(1, Math.round(geometry.contentWidthPt * desiredDpi / 72));
      let heightPx = Math.max(1, Math.round(geometry.contentHeightPt * desiredDpi / 72));
      const maxPixels = 12000000; const maxSide = 5200;
      const scaleCap = Math.min(1, Math.sqrt(maxPixels / (widthPx * heightPx)), maxSide / Math.max(widthPx, heightPx));
      const wasLimited = scaleCap < 0.999;
      if (wasLimited) { widthPx = Math.max(1, Math.floor(widthPx * scaleCap)); heightPx = Math.max(1, Math.floor(heightPx * scaleCap)); }
      const pageData = [];
      const quality = Number(settings.quality) / 100;
      for (let i = 0; i < images.length; i++) {
        updateProgress(i, images.length);
        await new Promise((resolve) => window.setTimeout(resolve, 0));
        const canvas = document.createElement('canvas');
        canvas.width = widthPx; canvas.height = heightPx;
        drawPageToCanvas(images[i], canvas, geometry, desiredDpi, false);
        const jpegBlob = await canvasToJpeg(canvas, quality);
        const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());
        pageData.push({
          jpegBytes, widthPx, heightPx,
          pageWidthPt: geometry.pageWidthPt, pageHeightPt: geometry.pageHeightPt,
          marginPt: geometry.marginPt
        });
        canvas.width = 1; canvas.height = 1;
      }
      updateProgress(images.length, images.length, 'Building PDF…');
      const pdfBlob = makePdfBlob(pageData);
      const filename = sanitizeFilename($('fileName').value);
      await savePdf(pdfBlob, filename);
      if (wasLimited) showToast(t('dpiLimited'), 'error');
      $('progressBar').style.width = '100%';
    } catch (error) {
      console.error('I2P PDF export failed:', error);
      showToast(t('exportFailed'), 'error');
    } finally {
      exportLock = false;
      $('exportButton').disabled = images.length === 0;
      window.setTimeout(() => { $('exportProgress').hidden = true; $('progressBar').style.width = '0%'; }, 4500);
    }
  }

  function attachEvents() {
    $('fileInput').addEventListener('change', async (event) => {
      await addFiles(event.target.files);
      event.target.value = '';
    });
    $('dropzone').addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); $('fileInput').click(); }
    });
    $('dropzone').addEventListener('dragover', (event) => { event.preventDefault(); $('dropzone').classList.add('drag-over'); });
    $('dropzone').addEventListener('dragleave', () => $('dropzone').classList.remove('drag-over'));
    $('dropzone').addEventListener('drop', async (event) => {
      event.preventDefault(); $('dropzone').classList.remove('drag-over'); await addFiles(event.dataTransfer.files);
    });
    $('imageList').addEventListener('click', handleListClick);
    $('imageList').addEventListener('keydown', (event) => {
      if ((event.key === 'Enter' || event.key === ' ') && event.target.classList.contains('image-item')) {
        event.preventDefault(); selectImage(event.target.dataset.id);
      }
    });
    $('clearAll').addEventListener('click', () => {
      if (!images.length) return;
      if (!window.confirm(t('confirmClear'))) return;
      images.forEach((item) => URL.revokeObjectURL(item.url));
      images = []; selectedId = null; renderList(); updatePreview();
    });
    $('exportButton').addEventListener('click', exportPdf);
    $('resetSettings').addEventListener('click', resetEditingSettings);
    $('settingsOpen').addEventListener('click', () => $('settingsDialog').showModal());
    $('themeToggle').addEventListener('click', () => {
      settings.theme = resolveTheme() === 'dark' ? 'light' : 'dark';
      $('themeSelect').value = settings.theme; persistSettings(); applyTheme();
    });
    $('language').addEventListener('change', () => { settings.language = $('language').value; persistSettings(); applyLanguage(); });
    $('themeSelect').addEventListener('change', () => { settings.theme = $('themeSelect').value; persistSettings(); applyTheme(); });
    Object.keys(defaultSettings).forEach((key) => {
      const element = $(key);
      if (!element) return;
      element.addEventListener('input', refreshAfterSettingChange);
      element.addEventListener('change', refreshAfterSettingChange);
    });
    if (window.matchMedia) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener?.('change', () => { if (settings.theme === 'system') applyTheme(); });
    }
    document.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'o') {
        event.preventDefault(); $('fileInput').click();
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault(); if (images.length) exportPdf();
      }
    });
  }

  function installInstructions() {
    if (location.protocol === 'file:') return t('installHttps');
    const ua = navigator.userAgent || '';
    const isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIOS) return t('installIos');
    if (/Android/i.test(ua)) return t('installAndroid');
    if (/Macintosh|Mac OS X/i.test(ua)) return t('installMac');
    return t('installDesktop');
  }

  function setupInstallButton() {
    const button = $('installApp');
    if (!button) return;
    const isStandalone = window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true;
    if (isStandalone) {
      button.hidden = true;
      return;
    }

    button.addEventListener('click', async () => {
      if (!deferredInstallPrompt) {
        showToast(installInstructions(), 'info');
        return;
      }
      const promptEvent = deferredInstallPrompt;
      deferredInstallPrompt = null;
      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice?.outcome === 'accepted') showToast(t('installed'));
      } catch (error) {
        console.warn('I2P install prompt unavailable:', error);
        showToast(installInstructions(), 'info');
      }
      button.classList.remove('install-ready');
    });

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      deferredInstallPrompt = event;
      button.classList.add('install-ready');
    });

    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      button.hidden = true;
      showToast(t('installed'));
    });
  }

  function initPwa() {
    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
      navigator.serviceWorker.register('./service-worker.js').catch((error) => console.warn('I2P offline cache unavailable:', error));
    }
  }

  function init() {
    loadSettings();
    setupInstallButton();
    $('customSize').hidden = settings.paperSize !== 'Custom';
    applyTheme(); applyLanguage(); updateSliderOutputs(); attachEvents(); initPwa();
    updateSummary(); updatePreview();
    // Native Android WebView uses this bridge to save into Downloads/I2P.
    document.documentElement.classList.toggle('native-android', Boolean(window.I2PAndroid));
  }

  document.addEventListener('DOMContentLoaded', init, { once: true });
})();
