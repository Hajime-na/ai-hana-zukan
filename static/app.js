const fallbackFlowers = [
  {
    name: "バラ",
    season: "通年・春と秋が特におすすめ",
    feature: "花色が豊富で、ギフトから店頭フェアまで幅広く使える定番花材です。高級感と特別感を出しやすく、写真映えもします。",
    care: "水に浸かる葉を取り、切り戻して深めの水に活けます。直射日光とエアコンの風を避けると長持ちします。",
    language: "愛・美・感謝",
    tags: ["ギフト", "記念日", "店頭POP", "高級感"],
    fallback: "linear-gradient(135deg, #f9d9df, #c86b7d 55%, #fff7f4)",
  },
];

const state = {
  flowers: [],
  selectedFlower: null,
  detailPhotoIndex: 0,
  currentDraft: "",
  revisionDraft: "",
  revisionProposal: null,
  uploadedMaterial: null,
};

const ORDER_HISTORY_KEY = "ai_hana_zukan_order_history";

const flowerGrid = document.querySelector("#flowerGrid");
const searchInput = document.querySelector("#searchInput");
const flowerHero = document.querySelector("#flowerHero");
const detailPhotoCounter = document.querySelector("#detailPhotoCounter");
const detailThumbnails = document.querySelector("#detailThumbnails");
const photoCredit = document.querySelector("#photoCredit");
const detailTitle = document.querySelector("#detail-title");
const flowerFeature = document.querySelector("#flowerFeature");
const flowerCare = document.querySelector("#flowerCare");
const flowerLanguage = document.querySelector("#flowerLanguage");
const flowerSeason = document.querySelector("#flowerSeason");
const flowerTags = document.querySelector("#flowerTags");
const flowerInput = document.querySelector("#flowerInput");
const purposeInput = document.querySelector("#purposeInput");
const toneInput = document.querySelector("#toneInput");
const suggestButton = document.querySelector("#suggestButton");
const suggestions = document.querySelector("#suggestions");
const revisionRequest = document.querySelector("#revisionRequest");
const reviseButton = document.querySelector("#reviseButton");
const revisionResult = document.querySelector("#revisionResult");
const posterPreviewFrame = document.querySelector("#posterPreviewFrame");
const posterPreview = document.querySelector("#posterPreview");
const posterImageLayer = document.querySelector("#posterImageLayer");
const posterCopy = document.querySelector("#posterCopy");
const posterTitleText = document.querySelector("#posterTitleText");
const posterSub = document.querySelector("#posterSub");
const posterMeta = document.querySelector("#posterMeta");
const posterMainTitle = document.querySelector("#posterMainTitle");
const posterSubtitle = document.querySelector("#posterSubtitle");
const posterShop = document.querySelector("#posterShop");
const posterDate = document.querySelector("#posterDate");
const posterNote = document.querySelector("#posterNote");
const posterPosition = document.querySelector("#posterPosition");
const posterType = document.querySelector("#posterType");
const posterSize = document.querySelector("#posterSize");
const imageFit = document.querySelector("#imageFit");
const imagePosition = document.querySelector("#imagePosition");
const imageZoom = document.querySelector("#imageZoom");
const imageOffsetX = document.querySelector("#imageOffsetX");
const imageOffsetY = document.querySelector("#imageOffsetY");
const imageRotation = document.querySelector("#imageRotation");
const imageZoomValue = document.querySelector("#imageZoomValue");
const imageOffsetXValue = document.querySelector("#imageOffsetXValue");
const imageOffsetYValue = document.querySelector("#imageOffsetYValue");
const resetImageAdjust = document.querySelector("#resetImageAdjust");
const posterRotation = document.querySelector("#posterRotation");
const uploadedMaterialMode = document.querySelector("#uploadedMaterialMode");
const uploadedMaterialModeHelp = document.querySelector("#uploadedMaterialModeHelp");
const posterDesign = document.querySelector("#posterDesign");
const posterDesignHelp = document.querySelector("#posterDesignHelp");
const posterForm = document.querySelector(".poster-form");
const officialMaterialInput = document.querySelector("#officialMaterialInput");
const officialMaterialStatus = document.querySelector("#officialMaterialStatus");
const finishChecklist = document.querySelector("#finishChecklist");
const finishReview = document.querySelector("#finishReview");
const page = document.querySelector(".page");
const savePngButton = document.querySelector("#savePngButton");
const saveConfirmPngButton = document.querySelector("#saveConfirmPngButton");
const pngStatus = document.querySelector("#pngStatus");
const confirmPngStatus = document.querySelector("#confirmPngStatus");
const materialWarning = document.querySelector("#materialWarning");
const confirmPosterPreviewFrame = document.querySelector("#confirmPosterPreviewFrame");
const confirmPosterPreview = document.querySelector("#confirmPosterPreview");
const confirmPosterImageLayer = document.querySelector("#confirmPosterImageLayer");
const confirmPosterCopy = document.querySelector("#confirmPosterCopy");
const confirmPosterTitle = document.querySelector("#confirmPosterTitle");
const confirmPosterSub = document.querySelector("#confirmPosterSub");
const confirmPosterMeta = document.querySelector("#confirmPosterMeta");
const confirmTitle = document.querySelector("#confirmTitle");
const confirmSubtitle = document.querySelector("#confirmSubtitle");
const confirmShop = document.querySelector("#confirmShop");
const confirmDate = document.querySelector("#confirmDate");
const confirmNote = document.querySelector("#confirmNote");
const confirmType = document.querySelector("#confirmType");
const confirmPosition = document.querySelector("#confirmPosition");
const confirmPosterSize = document.querySelector("#confirmPosterSize");
const confirmImageFit = document.querySelector("#confirmImageFit");
const confirmMaterialMode = document.querySelector("#confirmMaterialMode");
const confirmPosterRotation = document.querySelector("#confirmPosterRotation");
const confirmMaterialWarning = document.querySelector("#confirmMaterialWarning");
const confirmationSection = document.querySelector("#confirmationSection");
const backToEditButton = document.querySelector("#backToEditButton");
const placeOrderButton = document.querySelector("#placeOrderButton");
const orderStatus = document.querySelector("#orderStatus");
const finishCheckItems = document.querySelector("#finishCheckItems");
const editSections = [
  document.querySelector(".catalog-panel"),
  document.querySelector(".detail-panel"),
  document.querySelector(".ai-panel"),
  document.querySelector("#posterSection"),
].filter(Boolean);

const posterDesignDescriptions = {
  "photo-full": "写真全面タイプ：写真を大きく見せる店頭向けデザイン",
  "bottom-margin": "下部余白タイプ：文字を読みやすく入れる告知向けデザイン",
  simple: "上品シンプルタイプ：贈り物・高級感向けデザイン",
};

const posterSizeSettings = {
  original: { label: "元画像比率", aspect: "1 / 1", width: 1200, height: 1200 },
  "a4-portrait": { label: "A4縦", aspect: "210 / 297", width: 1200, height: 1697 },
  "a4-landscape": { label: "A4横", aspect: "297 / 210", width: 1697, height: 1200 },
  square: { label: "正方形", aspect: "1 / 1", width: 1200, height: 1200 },
  wide: { label: "16:9", aspect: "16 / 9", width: 1600, height: 900 },
  story: { label: "9:16", aspect: "9 / 16", width: 900, height: 1600 },
};

const verticalPosterPositionOptions = [
  { value: "bottom-left", label: "左下" },
  { value: "bottom-center", label: "中央下" },
  { value: "center", label: "中央" },
  { value: "top-left", label: "左上" },
];

const landscapePosterPositionOptions = [
  { value: "bottom-left", label: "左下" },
  { value: "bottom-right", label: "右下" },
  { value: "bottom-center", label: "下中央" },
  { value: "bottom-band", label: "下帯" },
];

const imageFitSettings = {
  cover: { label: "全面に敷く", backgroundSize: "cover" },
  contain: { label: "全体を収める", backgroundSize: "contain" },
  width: { label: "幅に合わせる", backgroundSize: "100% auto" },
  height: { label: "高さに合わせる", backgroundSize: "auto 100%" },
};

const imagePositionSettings = {
  top: { label: "上", backgroundPosition: "center top" },
  center: { label: "中央", backgroundPosition: "center center" },
  bottom: { label: "下", backgroundPosition: "center bottom" },
  left: { label: "左", backgroundPosition: "left center" },
  right: { label: "右", backgroundPosition: "right center" },
};

const posterRotationSettings = {
  normal: { label: "通常", rotated: false },
  right: { label: "右90度回転", rotated: true },
};

const imageRotationSettings = {
  normal: { label: "通常", degrees: 0 },
  right: { label: "右90度", degrees: 90 },
};

const uploadedMaterialModeSettings = {
  background: {
    label: "写真に文字を入れる",
    help: "写真に文字を入れる：アプリ側で文字帯・タイトル・店舗名・日付を重ねます。",
  },
  finished: {
    label: "画像をそのまま使う",
    help: "画像をそのまま使う：すでに完成したポスター画像・ジャケット画像を、そのまま保存・確認します。アプリ側の文字は追加されません。",
  },
};

function normalizeFlower(flower) {
  const photos = Array.isArray(flower.photos) ? flower.photos.filter((photo) => photo.url) : [];
  if (photos.length === 0 && flower.photo_url) {
    photos.push({
      url: flower.photo_url,
      source: flower.photo_source || "写真データ",
      license: flower.photo_license || "出典不明",
      usage: "reference_only",
      poster_allowed: false,
      credit_required: true,
      license_note: "図鑑参考用。ポスター発注・PNG出力には使用不可。正式素材をアップロードしてください。",
    });
  }
  return {
    ...flower,
    photos: photos.map((photo) => ({
      usage: "reference_only",
      poster_allowed: false,
      credit_required: true,
      license_note: "図鑑参考用。ポスター発注・PNG出力には使用不可。正式素材をアップロードしてください。",
      ...photo,
      poster_allowed: photo.poster_allowed === true,
    })),
    fallback: flower.fallback || flower.photo || "linear-gradient(135deg, #eef6ee, #d4e7d5)",
    tags: Array.isArray(flower.tags) ? flower.tags : [],
  };
}

function getPhoto(flower, index = 0) {
  const photos = flower?.photos || [];
  return photos[index] || null;
}

function renderImage(url, alt, className = "") {
  if (!url) return `<div class="image-fallback">${alt}</div>`;
  return `<img class="${className}" src="${url}" alt="${alt}" loading="lazy" onerror="this.closest('.image-wrap').classList.add('image-failed')" />`;
}

function renderFlowers() {
  const keyword = searchInput.value.trim().toLowerCase();
  const visibleFlowers = state.flowers.filter((flower) => {
    return `${flower.name} ${flower.season} ${flower.tags.join(" ")}`.toLowerCase().includes(keyword);
  });

  flowerGrid.innerHTML = visibleFlowers
    .map((flower) => {
      const photo = getPhoto(flower, 0);
      return `
        <button class="flower-card ${
          flower.name === state.selectedFlower.name ? "is-active" : ""
        }" data-flower="${flower.name}">
          <div class="flower-photo image-wrap" style="--fallback: ${flower.fallback}">
            ${renderImage(photo?.url, flower.name, "card-image")}
            <div class="image-fallback">${flower.name}</div>
            ${flower.name === state.selectedFlower.name ? '<span class="selected-badge">選択中</span>' : ""}
          </div>
          <div class="flower-card-body">
            <strong>${flower.name}</strong>
            <span>${flower.season}</span>
          </div>
        </button>
      `;
    })
    .join("");
}

function renderDetailPhoto() {
  const flower = state.selectedFlower;
  const photos = flower.photos || [];
  const photo = getPhoto(flower, state.detailPhotoIndex);

  flowerHero.style.setProperty("--fallback", flower.fallback);
  flowerHero.classList.remove("image-failed");
  flowerHero.innerHTML = `
    ${renderImage(photo?.url, `${flower.name}の写真`, "detail-image")}
    <div class="image-fallback">${flower.name}</div>
  `;

  detailPhotoCounter.textContent = `${photos.length ? state.detailPhotoIndex + 1 : 1} / ${Math.max(photos.length, 1)}`;
  photoCredit.textContent = photo ? `写真出典：${photo.source || "不明"} / ライセンス：${photo.license || "不明"}` : "写真出典：フォールバック表示";
  detailThumbnails.innerHTML = photos
    .map(
      (item, index) => `
        <button class="thumbnail ${index === state.detailPhotoIndex ? "is-active" : ""}" data-photo-index="${index}" aria-label="写真${index + 1}">
          <span class="image-wrap" style="--fallback: ${flower.fallback}">
            ${renderImage(item.url, `${flower.name} サムネイル${index + 1}`, "thumbnail-image")}
            <span class="image-fallback">${index + 1}</span>
          </span>
        </button>
      `,
    )
    .join("");
}

function renderFlowerDetail() {
  const flower = state.selectedFlower;
  detailTitle.textContent = flower.name;
  flowerFeature.textContent = flower.feature;
  flowerCare.textContent = flower.care;
  flowerLanguage.textContent = flower.language;
  flowerSeason.textContent = flower.season;
  flowerTags.innerHTML = flower.tags.map((tag) => `<span>${tag}</span>`).join("");
  flowerInput.value = flower.name;
  renderDetailPhoto();
}

function makeSuggestionItems() {
  const flower = state.selectedFlower;
  const purpose = purposeInput.value;
  const tone = toneInput.value;
  const firstLanguage = flower.language.split("・")[0];
  const tonePhrase = ["やさしい", "かわいい"].includes(tone) ? `${tone}雰囲気` : tone;

  return [
    {
      label: "上品",
      text: `${flower.name}の${firstLanguage}という花言葉に寄り添う、${tonePhrase}の${purpose}案です。\n大切な方への贈りものに、上質な彩りを添えます。`,
    },
    {
      label: "親しみやすい",
      text: `${flower.name}入荷しました。\n${flower.feature}\nご自宅用にも贈りものにもおすすめです。`,
    },
    {
      label: "SNS向け",
      text: `${flower.name}の季節感を店頭で。\n${flower.care}\n#${flower.name} #花のある暮らし #フラワーギフト`,
    },
  ];
}

function renderSuggestions(items) {
  suggestions.innerHTML = items
    .map(
      (item) => `
        <article class="suggestion">
          <div class="suggestion-head">
            <strong>${item.label}</strong>
            <button class="adopt-button" data-text="${encodeURIComponent(item.text)}">ポスターに反映</button>
          </div>
          <div>${item.text.replace(/\n/g, "<br>")}</div>
        </article>
      `,
    )
    .join("");
}

function requestSuggestions() {
  suggestButton.disabled = true;
  suggestButton.textContent = "作成中...";
  const items = makeSuggestionItems();
  renderSuggestions(items);
  state.currentDraft = items[0].text;
  suggestButton.disabled = false;
  suggestButton.textContent = "AI案を作る";
}

function updatePoster() {
  const photo = getCurrentPosterPhoto();
  const image = photo?.url ? `url("${photo.url}")` : state.selectedFlower.fallback;
  const finished = isFinishedImageMode();
  const nativeLandscape = getPosterBaseSize().width > getPosterBaseSize().height && !getPosterRotationSetting().rotated;
  syncPosterPositionOptions(nativeLandscape);
  posterPreview.className = `poster-preview design-${posterDesign.value}${finished ? " is-finished-image" : ""}${nativeLandscape ? " is-landscape-native" : ""}`;
  posterCopy.className = `poster-copy position-${posterPosition.value} type-${posterType.value}`;
  applyPosterImageSettings(posterPreview);
  applyPosterImageSettings(posterImageLayer);
  applyPosterFrameSettings(posterPreviewFrame, posterPreview);
  posterImageLayer.style.setProperty("--poster-image", image);
  posterPreview.style.setProperty("--poster-fallback", state.selectedFlower.fallback);
  posterPreviewFrame.style.setProperty("--poster-fallback", state.selectedFlower.fallback);
  renderPosterTitle(posterTitleText, posterMainTitle.value || `${state.selectedFlower.name} フェア`);
  posterSub.textContent = posterSubtitle.value || "季節のおすすめ";
  posterMeta.textContent = `${posterShop.value || "店舗名"} / ${posterDate.value || "期間"}`;
  posterDesignHelp.textContent = posterDesignDescriptions[posterDesign.value];
  uploadedMaterialModeHelp.textContent = getUploadedMaterialModeSetting().help;
  posterForm.classList.toggle("is-finished-mode", isFinishedModeSelected());
  updateMaterialRightsUI();
  if (confirmationSection && !confirmationSection.hidden) renderFinishReview();
}

function syncPosterPositionOptions(isLandscape) {
  const options = isLandscape ? landscapePosterPositionOptions : verticalPosterPositionOptions;
  const currentValue = posterPosition.value;
  if (posterPosition.dataset.mode === (isLandscape ? "landscape" : "vertical")) return;
  posterPosition.innerHTML = options.map((option) => `<option value="${option.value}">${option.label}</option>`).join("");
  posterPosition.value = options.some((option) => option.value === currentValue) ? currentValue : options[0].value;
  posterPosition.dataset.mode = isLandscape ? "landscape" : "vertical";
}

function getPosterSizeSetting() {
  if (posterSize.value === "original") return getOriginalImageSize();
  return posterSizeSettings[posterSize.value] || posterSizeSettings["a4-portrait"];
}

function getOriginalImageSize() {
  const width = state.uploadedMaterial?.width || 1200;
  const height = state.uploadedMaterial?.height || 1200;
  return {
    label: "元画像比率",
    aspect: `${width} / ${height}`,
    width,
    height,
  };
}

function getImageFitSetting() {
  return imageFitSettings[imageFit.value] || imageFitSettings.cover;
}

function getImagePositionSetting() {
  return imagePositionSettings[imagePosition.value] || imagePositionSettings.center;
}

function getPosterRotationSetting() {
  return posterRotationSettings[posterRotation.value] || posterRotationSettings.normal;
}

function getUploadedMaterialModeSetting() {
  return uploadedMaterialModeSettings[uploadedMaterialMode.value] || uploadedMaterialModeSettings.background;
}

function isFinishedImageMode() {
  return uploadedMaterialMode.value === "finished" && Boolean(state.uploadedMaterial);
}

function isFinishedModeSelected() {
  return uploadedMaterialMode.value === "finished";
}

function getPosterBaseSize() {
  return getPosterSizeSetting();
}

function getImageRotationSetting() {
  return imageRotationSettings[imageRotation.value] || imageRotationSettings.normal;
}

function getImageAdjustment() {
  return {
    zoom: Math.max(50, Math.min(200, Number(imageZoom.value) || 100)),
    offsetX: Math.max(-100, Math.min(100, Number(imageOffsetX.value) || 0)),
    offsetY: Math.max(-100, Math.min(100, Number(imageOffsetY.value) || 0)),
    rotation: getImageRotationSetting(),
  };
}

function applyPosterImageSettings(element) {
  const size = getPosterBaseSize();
  const fit = isFinishedImageMode() ? imageFitSettings.contain : getImageFitSetting();
  const position = isFinishedImageMode() ? imagePositionSettings.center : getImagePositionSetting();
  const adjustment = getImageAdjustment();
  element.style.setProperty("--poster-aspect", size.aspect);
  element.style.setProperty("--poster-bg-size", fit.backgroundSize);
  element.style.setProperty("--poster-bg-position", position.backgroundPosition);
  element.style.setProperty("--poster-image-zoom", isFinishedImageMode() ? 1 : adjustment.zoom / 100);
  element.style.setProperty("--poster-image-x", isFinishedImageMode() ? "0%" : `${adjustment.offsetX * 0.5}%`);
  element.style.setProperty("--poster-image-y", isFinishedImageMode() ? "0%" : `${adjustment.offsetY * 0.5}%`);
  element.style.setProperty("--poster-image-rotate", isFinishedImageMode() ? "0deg" : `${adjustment.rotation.degrees}deg`);
  if (imageZoomValue) imageZoomValue.textContent = `${adjustment.zoom}%`;
  if (imageOffsetXValue) imageOffsetXValue.textContent = String(adjustment.offsetX);
  if (imageOffsetYValue) imageOffsetYValue.textContent = String(adjustment.offsetY);
}

function applyPosterFrameSettings(frame, surface) {
  if (!frame || !surface) return;
  const size = getPosterBaseSize();
  const rotation = getPosterRotationSetting();
  const displayAspect = rotation.rotated ? `${size.height} / ${size.width}` : size.aspect;
  const nativeLandscape = size.width > size.height && !rotation.rotated;
  frame.style.setProperty("--poster-aspect", size.aspect);
  frame.style.setProperty("--poster-display-aspect", displayAspect);
  frame.style.setProperty("--poster-fallback", state.selectedFlower.fallback);
  frame.classList.toggle("is-rotated", rotation.rotated);
  frame.classList.toggle("is-landscape-native", nativeLandscape);
  frame.classList.toggle("is-finished-image", isFinishedImageMode());
  surface.classList.toggle("is-landscape-native", nativeLandscape);
  surface.classList.toggle("is-finished-image", isFinishedImageMode());
  window.requestAnimationFrame(() => syncPosterSurface(frame, surface, rotation.rotated));
}

function syncPosterSurface(frame, surface, rotated = getPosterRotationSetting().rotated) {
  if (!frame || !surface) return;
  if (!rotated) {
    surface.style.width = "100%";
    surface.style.height = "100%";
    surface.style.transform = "translate(-50%, -50%)";
    return;
  }
  const rect = frame.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  surface.style.width = `${rect.height}px`;
  surface.style.height = `${rect.width}px`;
  surface.style.transform = "translate(-50%, -50%) rotate(90deg)";
}

function getCurrentPosterPhoto() {
  if (state.uploadedMaterial) return state.uploadedMaterial;
  return getPhoto(state.selectedFlower, state.detailPhotoIndex) || getPhoto(state.selectedFlower, 0);
}

function isPosterMaterialAllowed() {
  return getCurrentPosterPhoto()?.poster_allowed === true;
}

function getMaterialWarningText() {
  const photo = getCurrentPosterPhoto();
  if (photo?.poster_allowed === true) {
    return photo.license_note || "アップロードされた正式素材を使用中です";
  }
  const note = photo?.license_note || "この写真は図鑑参考用です。ポスター発注・PNG出力には使用できません。正式素材をアップロードしてください。";
  return `正式素材が必要です。${note}`;
}

function updateMaterialRightsUI() {
  const allowed = isPosterMaterialAllowed();
  const warningText = getMaterialWarningText();
  [materialWarning, confirmMaterialWarning].forEach((element) => {
    if (!element) return;
    element.textContent = warningText;
    element.hidden = false;
    element.classList.toggle("is-success", allowed);
  });
  [savePngButton, saveConfirmPngButton, placeOrderButton].forEach((button) => {
    if (!button) return;
    button.disabled = !allowed;
    button.title = allowed ? "" : "正式素材が必要です";
  });
}

function getSelectedText(selectElement) {
  return selectElement.options[selectElement.selectedIndex]?.textContent || selectElement.value;
}

function getPosterSnapshot() {
  return {
    title: posterMainTitle.value || `${state.selectedFlower.name} フェア`,
    subtitle: posterSubtitle.value || "季節のおすすめ",
    shop: posterShop.value || "店舗名",
    date: posterDate.value || "期間",
    note: posterNote.value || "",
    type: getSelectedText(posterType),
    position: getSelectedText(posterPosition),
    design: getSelectedText(posterDesign),
    posterSize: getPosterBaseSize().label,
    imageFit: getImageFitSetting().label,
    imagePosition: getImagePositionSetting().label,
    imageZoom: `${getImageAdjustment().zoom}%`,
    imageOffsetX: getImageAdjustment().offsetX,
    imageOffsetY: getImageAdjustment().offsetY,
    imageRotation: getImageAdjustment().rotation.label,
    materialMode: getUploadedMaterialModeSetting().label,
    posterRotation: getPosterRotationSetting().label,
  };
}

function setExportStatus(element, message, isError = false) {
  if (!element) return;
  element.textContent = message;
  element.classList.toggle("is-error", isError);
}

function getCurrentPosterPhotoUrl() {
  return getCurrentPosterPhoto()?.url || "";
}

function handleOfficialMaterialUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    officialMaterialStatus.textContent = "jpg / jpeg / png / webp の画像を選択してください。";
    officialMaterialStatus.classList.add("is-error");
    event.target.value = "";
    return;
  }

  if (state.uploadedMaterial?.url) {
    URL.revokeObjectURL(state.uploadedMaterial.url);
  }

  const objectUrl = URL.createObjectURL(file);
  const materialImage = new Image();
  materialImage.onload = () => {
    state.uploadedMaterial = {
      url: objectUrl,
      source: "ユーザーアップロード",
      license: "ユーザー提供素材",
      usage: "uploaded",
      poster_allowed: true,
      credit_required: false,
      license_note: "アップロードされた正式素材を使用中です",
      file_name: file.name,
      width: materialImage.naturalWidth || materialImage.width,
      height: materialImage.naturalHeight || materialImage.height,
    };
    if (uploadedMaterialMode.value === "finished") {
      posterSize.value = "original";
    }
    officialMaterialStatus.textContent = `${file.name} を正式素材として使用中です。`;
    officialMaterialStatus.classList.remove("is-error");
    setExportStatus(pngStatus, "");
    setExportStatus(confirmPngStatus, "");
    updatePoster();
  };
  materialImage.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    officialMaterialStatus.textContent = "画像を読み込めませんでした。別の画像を選択してください。";
    officialMaterialStatus.classList.add("is-error");
    event.target.value = "";
  };
  materialImage.src = objectUrl;
}

function getUploadedMaterialSnapshot(file, objectUrl) {
  return {
    url: objectUrl,
    source: "ユーザーアップロード",
    license: "ユーザー提供素材",
    usage: "uploaded",
    poster_allowed: true,
    credit_required: false,
    license_note: "アップロードされた正式素材を使用中です",
    file_name: file.name,
  };
}

function loadPosterImage(url) {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve(null);
      return;
    }
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("image load failed"));
    image.src = url;
  });
}

function getFittedImageSize(image, canvasWidth, canvasHeight, fitMode, rotated) {
  const sourceWidth = rotated ? image.height : image.width;
  const sourceHeight = rotated ? image.width : image.height;
  const imageRatio = sourceWidth / sourceHeight;
  const canvasRatio = canvasWidth / canvasHeight;
  let drawWidth = canvasWidth;
  let drawHeight = canvasHeight;

  if (fitMode === "contain") {
    if (imageRatio > canvasRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imageRatio;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imageRatio;
    }
  } else if (fitMode === "width") {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imageRatio;
  } else if (fitMode === "height") {
    drawHeight = canvasHeight;
    drawWidth = canvasHeight * imageRatio;
  } else if (imageRatio > canvasRatio) {
    drawHeight = canvasHeight;
    drawWidth = canvasHeight * imageRatio;
  } else {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imageRatio;
  }

  return { drawWidth, drawHeight };
}

function getPositionOffset(canvasWidth, canvasHeight, drawWidth, drawHeight, positionMode) {
  let offsetX = 0;
  let offsetY = 0;
  if (positionMode === "top") offsetY = (drawHeight - canvasHeight) / 2;
  if (positionMode === "bottom") offsetY = (canvasHeight - drawHeight) / 2;
  if (positionMode === "left") offsetX = (drawWidth - canvasWidth) / 2;
  if (positionMode === "right") offsetX = (canvasWidth - drawWidth) / 2;
  return { offsetX, offsetY };
}

function drawImageCoveringRect(context, image, drawWidth, drawHeight, rotated) {
  if (rotated) {
    context.rotate(Math.PI / 2);
    context.drawImage(image, -drawHeight / 2, -drawWidth / 2, drawHeight, drawWidth);
    return;
  }
  context.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
}

function drawPosterImage(context, image, canvasWidth, canvasHeight) {
  const finished = isFinishedImageMode();
  const adjustment = finished
    ? { zoom: 100, offsetX: 0, offsetY: 0, rotation: imageRotationSettings.normal }
    : getImageAdjustment();
  const rotated = adjustment.rotation.degrees === 90;
  const fitMode = finished ? "contain" : imageFit.value;
  const positionMode = finished ? "center" : imagePosition.value;
  const fitted = getFittedImageSize(image, canvasWidth, canvasHeight, fitMode, rotated);
  const zoom = finished ? 1 : adjustment.zoom / 100;
  const drawWidth = fitted.drawWidth * zoom;
  const drawHeight = fitted.drawHeight * zoom;
  const positionOffset = getPositionOffset(canvasWidth, canvasHeight, drawWidth, drawHeight, positionMode);
  const offsetX = positionOffset.offsetX + canvasWidth * (adjustment.offsetX / 100) * 0.5;
  const offsetY = positionOffset.offsetY + canvasHeight * (adjustment.offsetY / 100) * 0.5;

  context.save();
  context.beginPath();
  context.rect(0, 0, canvasWidth, canvasHeight);
  context.clip();
  context.translate(canvasWidth / 2 + offsetX, canvasHeight / 2 + offsetY);
  drawImageCoveringRect(context, image, drawWidth, drawHeight, rotated);
  context.restore();
}

function drawFallbackBackground(context, canvasWidth, canvasHeight) {
  const gradient = context.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  gradient.addColorStop(0, "#f7faf6");
  gradient.addColorStop(0.55, "#d4e7d5");
  gradient.addColorStop(1, "#fffaf1");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvasWidth, canvasHeight);
}

function wrapCanvasText(context, text, maxWidth) {
  const source = String(text || "").replace(/\s+/g, " ").trim();
  if (!source) return [""];
  const chars = Array.from(source);
  const lines = [];
  let line = "";
  chars.forEach((char) => {
    const nextLine = line + char;
    if (context.measureText(nextLine).width > maxWidth && line) {
      lines.push(line);
      line = char;
    } else {
      line = nextLine;
    }
  });
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function createTitleMeasureContext() {
  const canvas = document.createElement("canvas");
  return canvas.getContext("2d");
}

function setCanvasTitleFont(context, size) {
  context.font = `800 ${size}px 'Yu Gothic', 'Meiryo', sans-serif`;
}

function fitSingleLineTitle(context, title, maxWidth, baseSize = 64, minSize = 48) {
  for (let size = baseSize; size >= minSize; size -= 2) {
    setCanvasTitleFont(context, size);
    if (context.measureText(title).width <= maxWidth) {
      return { lines: [title], fontSize: size };
    }
  }
  return null;
}

function splitTitleNaturally(title) {
  const source = String(title || "").replace(/\s+/g, " ").trim();
  const words = source.split(" ").filter(Boolean);
  if (words.length > 1) {
    let bestIndex = 1;
    let bestDiff = Infinity;
    for (let index = 1; index < words.length; index += 1) {
      const left = words.slice(0, index).join(" ");
      const right = words.slice(index).join(" ");
      if (Array.from(left).length < 2 || Array.from(right).length < 2) continue;
      const diff = Math.abs(Array.from(left).length - Array.from(right).length);
      if (diff < bestDiff) {
        bestIndex = index;
        bestDiff = diff;
      }
    }
    return [words.slice(0, bestIndex).join(" "), words.slice(bestIndex).join(" ")];
  }

  const suffixes = ["フラワーギフト", "チューリップ", "フェア", "ギフト", "ブーケ", "花束", "セール"];
  const chars = Array.from(source);
  for (const suffix of suffixes) {
    if (!source.endsWith(suffix) || source === suffix) continue;
    const prefix = source.slice(0, -suffix.length).trim();
    if (Array.from(prefix).length >= 2 && Array.from(suffix).length >= 2) return [prefix, suffix];
  }

  const splitAt = Math.max(2, Math.min(chars.length - 2, Math.ceil(chars.length / 2)));
  return [chars.slice(0, splitAt).join(""), chars.slice(splitAt).join("")];
}

function fitTwoLineTitle(context, title, maxWidth, baseSize = 60, minSize = 40) {
  const lines = splitTitleNaturally(title);
  for (let size = baseSize; size >= minSize; size -= 2) {
    setCanvasTitleFont(context, size);
    if (lines.every((line) => context.measureText(line).width <= maxWidth)) {
      return { lines, fontSize: size };
    }
  }
  return { lines, fontSize: minSize };
}

function layoutCanvasTitle(context, title, maxWidth, options = {}) {
  const source = String(title || "").replace(/\s+/g, " ").trim();
  const baseSize = options.baseSize || 64;
  const minSize = options.minSize || 48;
  return fitSingleLineTitle(context, source, maxWidth, baseSize, minSize) || fitTwoLineTitle(context, source, maxWidth, Math.max(baseSize - 4, minSize), Math.max(minSize - 8, 34));
}

function getDomTitleLayout(title) {
  const context = createTitleMeasureContext();
  const size = getPosterBaseSize();
  const isLandscape = size.width > size.height && !getPosterRotationSetting().rotated;
  const box = getCopyBox(posterPosition.value, posterDesign.value, size.width, size.height);
  const maxTextWidth = isLandscape ? box.width - 56 : Math.min(560, box.width - 88);
  return layoutCanvasTitle(context, title, maxTextWidth, isLandscape ? { baseSize: 52, minSize: 38 } : {});
}

function renderPosterTitle(element, title) {
  const layout = getDomTitleLayout(title);
  const size = getPosterBaseSize();
  const isLandscape = size.width > size.height && !getPosterRotationSetting().rotated;
  element.replaceChildren(
    ...layout.lines.map((line) => {
      const span = document.createElement("span");
      span.className = "poster-title-line";
      span.textContent = line;
      return span;
    }),
  );
  element.style.fontSize = `${Math.round((layout.fontSize / 64) * (isLandscape ? 36 : 46))}px`;
}

function roundRect(context, x, y, width, height, radius) {
  const corner = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + corner, y);
  context.arcTo(x + width, y, x + width, y + height, corner);
  context.arcTo(x + width, y + height, x, y + height, corner);
  context.arcTo(x, y + height, x, y, corner);
  context.arcTo(x, y, x + width, y, corner);
  context.closePath();
}

function getCopyBox(position, design, canvasWidth, canvasHeight) {
  const isLandscapeCanvas = canvasWidth > canvasHeight;
  const boxWidth = isLandscapeCanvas ? canvasWidth * 0.48 : design === "simple" ? 520 : 680;
  const boxHeight = isLandscapeCanvas ? 190 : design === "bottom-margin" ? 250 : 270;
  const margin = 70;
  if (isLandscapeCanvas && position === "bottom-band") {
    return {
      x: margin,
      y: canvasHeight - 170 - margin * 0.5,
      width: canvasWidth - margin * 2,
      height: 170,
      align: "center",
      band: true,
    };
  }
  if (position === "center") {
    return {
      x: (canvasWidth - boxWidth) / 2,
      y: (canvasHeight - boxHeight) / 2,
      width: boxWidth,
      height: boxHeight,
      align: "center",
    };
  }
  if (position === "bottom-center") {
    return {
      x: (canvasWidth - boxWidth) / 2,
      y: canvasHeight - boxHeight - margin,
      width: boxWidth,
      height: boxHeight,
      align: "center",
    };
  }
  if (position === "bottom-right") {
    return {
      x: canvasWidth - boxWidth - margin,
      y: canvasHeight - boxHeight - margin,
      width: boxWidth,
      height: boxHeight,
      align: "left",
    };
  }
  if (position === "top-left") {
    return { x: margin, y: margin, width: boxWidth, height: boxHeight, align: "left" };
  }
  return { x: margin, y: canvasHeight - boxHeight - margin, width: boxWidth, height: boxHeight, align: "left" };
}

function drawPosterOverlay(context, design, canvasWidth, canvasHeight) {
  if (design === "bottom-margin") {
    const gradient = context.createLinearGradient(0, canvasHeight * 0.45, 0, canvasHeight);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(1, "rgba(255,255,255,0.94)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    return;
  }
  if (design === "simple") {
    const gradient = context.createLinearGradient(0, 0, canvasWidth, 0);
    gradient.addColorStop(0, "rgba(255,255,255,0.95)");
    gradient.addColorStop(0.44, "rgba(255,255,255,0.86)");
    gradient.addColorStop(1, "rgba(255,255,255,0.08)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    return;
  }
  const gradient = context.createLinearGradient(0, 0, 0, canvasHeight);
  gradient.addColorStop(0, "rgba(0,0,0,0.06)");
  gradient.addColorStop(1, "rgba(0,0,0,0.34)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvasWidth, canvasHeight);
}

async function renderBasePosterCanvas() {
  const canvas = document.createElement("canvas");
  const size = getPosterBaseSize();
  canvas.width = size.width;
  canvas.height = size.height;
  const context = canvas.getContext("2d");
  const snapshot = getPosterSnapshot();
  const image = await loadPosterImage(getCurrentPosterPhotoUrl()).catch(() => null);

  drawFallbackBackground(context, canvas.width, canvas.height);
  if (image) {
    drawPosterImage(context, image, canvas.width, canvas.height);
  }

  if (isFinishedImageMode()) return canvas;

  drawPosterOverlay(context, posterDesign.value, canvas.width, canvas.height);
  const box = getCopyBox(posterPosition.value, posterDesign.value, canvas.width, canvas.height);

  context.save();
  context.fillStyle = box.band ? "rgba(255,255,255,0.82)" : canvas.width > canvas.height ? "rgba(255,255,255,0.78)" : posterDesign.value === "bottom-margin" ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.9)";
  roundRect(context, box.x, box.y, box.width, box.height, 8);
  context.fill();

  if (posterPosition.value !== "bottom-center" && posterPosition.value !== "center" && posterPosition.value !== "bottom-band") {
    context.fillStyle = posterType.value === "friendly" ? "#d89aa8" : posterType.value === "bold" ? "#26342b" : "#7fa98a";
    context.fillRect(box.x, box.y, 10, box.height);
  }

  const paddingX = canvas.width > canvas.height ? 28 : 44;
  const textX = box.align === "center" ? box.x + box.width / 2 : box.x + paddingX;
  const maxTextWidth = canvas.width > canvas.height ? box.width - paddingX * 2 : Math.min(560, box.width - paddingX * 2);
  context.textAlign = box.align;
  context.textBaseline = "top";

  context.fillStyle = "#6e7d72";
  context.font = canvas.width > canvas.height ? "700 24px 'Yu Gothic', 'Meiryo', sans-serif" : "700 30px 'Yu Gothic', 'Meiryo', sans-serif";
  context.fillText(snapshot.subtitle, textX, box.y + 34, maxTextWidth);

  context.fillStyle = "#26342b";
  const titleLayout = layoutCanvasTitle(context, snapshot.title, maxTextWidth, canvas.width > canvas.height ? { baseSize: 52, minSize: 38 } : {});
  setCanvasTitleFont(context, titleLayout.fontSize);
  const titleLines = titleLayout.lines;
  const titleLineHeight = Math.round(titleLayout.fontSize * 1.16);
  titleLines.forEach((line, index) => {
    context.fillText(line, textX, box.y + 86 + index * titleLineHeight, maxTextWidth);
  });

  context.strokeStyle = "rgba(63,111,80,0.24)";
  context.beginPath();
  const metaLineY = canvas.width > canvas.height ? box.y + box.height - 42 : box.y + box.height - 58;
  context.moveTo(box.x + paddingX, metaLineY);
  context.lineTo(box.x + box.width - paddingX, metaLineY);
  context.stroke();

  context.fillStyle = "#6e7d72";
  context.font = canvas.width > canvas.height ? "500 20px 'Yu Gothic', 'Meiryo', sans-serif" : "500 24px 'Yu Gothic', 'Meiryo', sans-serif";
  context.fillText(`${snapshot.shop} / ${snapshot.date}`, textX, canvas.width > canvas.height ? box.y + box.height - 30 : box.y + box.height - 42, maxTextWidth);
  context.restore();

  return canvas;
}

async function renderPosterCanvas() {
  const baseCanvas = await renderBasePosterCanvas();
  if (!getPosterRotationSetting().rotated) return baseCanvas;

  const rotatedCanvas = document.createElement("canvas");
  rotatedCanvas.width = baseCanvas.height;
  rotatedCanvas.height = baseCanvas.width;
  const context = rotatedCanvas.getContext("2d");
  context.translate(rotatedCanvas.width, 0);
  context.rotate(Math.PI / 2);
  context.drawImage(baseCanvas, 0, 0);
  return rotatedCanvas;
}

function getExportFileName() {
  const date = new Date();
  const dateText = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const flowerName = state.selectedFlower?.name || "flower";
  const safeName = /^[a-z0-9_-]+$/i.test(flowerName) ? flowerName : "flower";
  return `poster_${safeName}_${dateText}.png`;
}

function generateOrderId() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return `${date}_${time}`;
}

function buildOrderJson(orderId) {
  const now = new Date();
  const snapshot = getPosterSnapshot();
  const photo = getCurrentPosterPhoto();
  const checkboxes = Array.from(finishCheckItems.querySelectorAll('input[type="checkbox"]'));
  return {
    order_id: orderId,
    created_at: now.toISOString(),
    flower_name: state.selectedFlower?.name || "",
    image_usage: getUploadedMaterialModeSetting().label,
    poster_size: snapshot.posterSize,
    poster_rotation: snapshot.posterRotation,
    image_fit: snapshot.imageFit,
    image_position: snapshot.imagePosition,
    image_zoom: snapshot.imageZoom,
    image_offset_x: snapshot.imageOffsetX,
    image_offset_y: snapshot.imageOffsetY,
    main_title: snapshot.title,
    subtitle: snapshot.subtitle,
    shop_name: snapshot.shop,
    period: snapshot.date,
    note: snapshot.note,
    text_style: snapshot.type,
    text_position: snapshot.position,
    material_status: photo?.license_note || "",
    poster_allowed: isPosterMaterialAllowed(),
    png_filename: `poster_${orderId}.png`,
    checks: {
      typo_checked: checkboxes[0]?.checked ?? false,
      shop_date_checked: checkboxes[1]?.checked ?? false,
      position_adjustment_accepted: checkboxes[2]?.checked ?? false,
      final_adjustment_accepted: checkboxes[3]?.checked ?? false,
      color_difference_accepted: checkboxes[4]?.checked ?? false,
    },
  };
}

function saveOrderJson(orderData, fileName) {
  const blob = new Blob([JSON.stringify(orderData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

async function savePosterPng(statusElement, fileName) {
  if (!isPosterMaterialAllowed()) {
    setExportStatus(statusElement, "PNG保存には正式素材が必要です", true);
    return;
  }
  setExportStatus(statusElement, "PNGを作成しています...");
  try {
    const canvas = await renderPosterCanvas();
    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob((result) => {
        if (result) resolve(result);
        else reject(new Error("blob creation failed"));
      }, "image/png");
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName || getExportFileName();
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setExportStatus(statusElement, "PNGを保存しました");
  } catch (error) {
    setExportStatus(statusElement, "PNG保存に失敗しました", true);
  }
}

function renderFinishReview() {
  const snapshot = getPosterSnapshot();
  const photo = getCurrentPosterPhoto();
  const image = photo?.url ? `url("${photo.url}")` : state.selectedFlower.fallback;
  const finished = isFinishedImageMode();
  const nativeLandscape = getPosterBaseSize().width > getPosterBaseSize().height && !getPosterRotationSetting().rotated;

  confirmPosterPreview.className = `poster-preview confirm-poster-preview design-${posterDesign.value}${finished ? " is-finished-image" : ""}${nativeLandscape ? " is-landscape-native" : ""}`;
  confirmPosterCopy.className = `poster-copy confirm-poster-copy position-${posterPosition.value} type-${posterType.value}`;
  applyPosterImageSettings(confirmPosterPreview);
  applyPosterImageSettings(confirmPosterImageLayer);
  applyPosterFrameSettings(confirmPosterPreviewFrame, confirmPosterPreview);
  confirmPosterImageLayer.style.setProperty("--poster-image", image);
  confirmPosterPreview.style.setProperty("--poster-fallback", state.selectedFlower.fallback);
  confirmPosterPreviewFrame.style.setProperty("--poster-fallback", state.selectedFlower.fallback);
  renderPosterTitle(confirmPosterTitle, snapshot.title);
  confirmPosterSub.textContent = snapshot.subtitle;
  confirmPosterMeta.textContent = `${snapshot.shop} / ${snapshot.date}`;

  confirmTitle.textContent = snapshot.title;
  confirmSubtitle.textContent = snapshot.subtitle;
  confirmShop.textContent = snapshot.shop;
  confirmDate.textContent = snapshot.date;
  confirmNote.textContent = snapshot.note || "未入力";
  confirmType.textContent = snapshot.type;
  confirmPosition.textContent = snapshot.position;
  confirmPosterSize.textContent = snapshot.posterSize;
  confirmImageFit.textContent = isFinishedImageMode()
    ? "元画像比率 / 画像全体を表示"
    : `${snapshot.imageFit} / ${snapshot.imagePosition} / ズーム ${snapshot.imageZoom} / 横 ${snapshot.imageOffsetX} / 縦 ${snapshot.imageOffsetY} / 画像回転 ${snapshot.imageRotation}`;
  confirmMaterialMode.textContent = snapshot.materialMode;
  confirmPosterRotation.textContent = snapshot.posterRotation;
  updateMaterialRightsUI();
}

function setConfirmModeUrl(isConfirm) {
  const url = new URL(window.location.href);
  if (isConfirm) {
    url.searchParams.set("v", "confirmmode1");
    url.searchParams.delete("mode");
  } else {
    url.searchParams.delete("v");
    url.searchParams.delete("mode");
  }
  window.history.replaceState({}, "", url);
}

function isConfirmModeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("v") === "confirmmode1" || params.get("mode") === "confirm";
}

function showFinishReview({ updateUrl = true } = {}) {
  renderFinishReview();
  confirmationSection.hidden = false;
  document.body.classList.add("confirm-mode");
  page.classList.add("is-confirming");
  editSections.forEach((section) => {
    section.hidden = true;
  });
  if (finishChecklist) finishChecklist.hidden = true;
  orderStatus.hidden = true;
  orderStatus.textContent = "";
  finishCheckItems.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
  });
  if (updateUrl) setConfirmModeUrl(true);
  confirmationSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function backToEdit() {
  document.body.classList.remove("confirm-mode");
  page.classList.remove("is-confirming");
  confirmationSection.hidden = true;
  editSections.forEach((section) => {
    section.hidden = false;
  });
  orderStatus.hidden = true;
  orderStatus.textContent = "";
  setConfirmModeUrl(false);
  document.querySelector("#posterSection").scrollIntoView({ behavior: "smooth", block: "start" });
}

function applyFlowerToPoster() {
  const flower = state.selectedFlower;
  posterMainTitle.value = `${flower.name} フェア`;
  posterSubtitle.value = `${flower.language.split("・")[0]}を贈る、季節の花束。`;
  posterNote.value = `${flower.care} ${flower.tags.join("・")}におすすめです。`;
  updatePoster();
}

function createPosterText() {
  const flower = state.selectedFlower;
  const draft = makeSuggestionItems()[0].text;
  const tonePhrase = ["やさしい", "かわいい"].includes(toneInput.value) ? `${toneInput.value}雰囲気` : toneInput.value;
  state.currentDraft = draft;
  posterMainTitle.value = `${flower.name} フェア`;
  posterSubtitle.value = `${flower.language.split("・")[0]}を贈る、${tonePhrase}の花選び。`;
  posterNote.value = draft;
  updatePoster();
}

function createRevision() {
  const request = revisionRequest.value.trim();
  const base = state.currentDraft || posterNote.value || makeSuggestionItems()[0].text;
  const flower = state.selectedFlower;
  const note = request || "少し短く、店頭で読みやすく";
  const tonePhrase = ["やさしい", "かわいい"].includes(toneInput.value) ? `${toneInput.value}雰囲気` : toneInput.value;
  const wantsLuxury = note.includes("高級感") || note.includes("上品");
  const wantsShort = note.includes("短く") || note.includes("短い");
  const title = wantsLuxury ? `上質な${flower.name}フェア` : posterMainTitle.value || `${flower.name} フェア`;
  const subtitle = wantsLuxury
    ? `${flower.language.split("・")[0]}の彩りを、大切な方へ。`
    : `${flower.language.split("・")[0]}を贈る、${tonePhrase}の花選び。`;
  const shortNote = wantsLuxury ? "贈りものにおすすめです。" : `${flower.name}を気軽に楽しめる季節のおすすめです。`;
  const longNote = `${base.split("\n")[0]}\n修正方針：${note}\n${flower.language}の印象を残しながら、ひと目で伝わる表現に整えました。`;
  state.revisionProposal = {
    title,
    subtitle,
    note: wantsShort ? shortNote : longNote,
  };

  revisionResult.innerHTML = `
    <article class="revision-card revision-suggestion">
      <div class="suggestion-head">
        <strong>修正案</strong>
        <div class="revision-actions">
          <button class="adopt-button" id="applyRevision">この修正案を反映する</button>
          <button class="discard-button" id="discardRevision">破棄する</button>
        </div>
      </div>
      <dl class="revision-preview">
        <div>
          <dt>修正後メインタイトル</dt>
          <dd>${state.revisionProposal.title}</dd>
        </div>
        <div>
          <dt>修正後サブタイトル</dt>
          <dd>${state.revisionProposal.subtitle}</dd>
        </div>
        <div>
          <dt>修正後補足文</dt>
          <dd>${state.revisionProposal.note.replace(/\n/g, "<br>")}</dd>
        </div>
      </dl>
    </article>
  `;
}

function selectFlower(name) {
  const nextFlower = state.flowers.find((flower) => flower.name === name);
  if (!nextFlower) return;
  state.selectedFlower = nextFlower;
  state.detailPhotoIndex = 0;
  renderFlowers();
  renderFlowerDetail();
  applyFlowerToPoster();
  requestSuggestions();
}

function moveDetailPhoto(direction) {
  const photos = state.selectedFlower.photos || [];
  if (photos.length <= 1) return;
  state.detailPhotoIndex = (state.detailPhotoIndex + direction + photos.length) % photos.length;
  renderDetailPhoto();
}

function scrollToSection(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

flowerGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".flower-card");
  if (!card) return;
  selectFlower(card.dataset.flower);
});

detailThumbnails.addEventListener("click", (event) => {
  const thumbnail = event.target.closest(".thumbnail");
  if (!thumbnail) return;
  state.detailPhotoIndex = Number(thumbnail.dataset.photoIndex);
  renderDetailPhoto();
});

searchInput.addEventListener("input", renderFlowers);
suggestButton.addEventListener("click", requestSuggestions);
purposeInput.addEventListener("change", requestSuggestions);
toneInput.addEventListener("change", requestSuggestions);
reviseButton.addEventListener("click", createRevision);
document.querySelector("#posterAiButton").addEventListener("click", createPosterText);
document.querySelector("#detailPrevPhoto").addEventListener("click", () => moveDetailPhoto(-1));
document.querySelector("#detailNextPhoto").addEventListener("click", () => moveDetailPhoto(1));
document.querySelector("#goPromotion").addEventListener("click", () => scrollToSection("#promotionSection"));
document.querySelector("#goPoster").addEventListener("click", () => scrollToSection("#posterSection"));

document.querySelectorAll(".request-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const current = revisionRequest.value.trim();
    revisionRequest.value = current ? `${current}、${chip.textContent}` : chip.textContent;
    revisionRequest.focus();
  });
});

suggestions.addEventListener("click", (event) => {
  const button = event.target.closest(".adopt-button");
  if (!button) return;
  const text = decodeURIComponent(button.dataset.text);
  state.currentDraft = text;
  posterSubtitle.value = text.split("\n")[0];
  posterNote.value = text;
  updatePoster();
  scrollToSection("#posterSection");
});

revisionResult.addEventListener("click", (event) => {
  if (event.target.closest("#discardRevision")) {
    revisionResult.innerHTML = "";
    state.revisionDraft = "";
    state.revisionProposal = null;
    return;
  }
  if (!event.target.closest("#applyRevision")) return;
  if (!state.revisionProposal) return;
  posterMainTitle.value = state.revisionProposal.title;
  posterSubtitle.value = state.revisionProposal.subtitle;
  posterNote.value = state.revisionProposal.note;
  state.currentDraft = state.revisionProposal.note;
  updatePoster();
});

document.querySelector("#prevPhoto").addEventListener("click", () => moveDetailPhoto(-1));
document.querySelector("#nextPhoto").addEventListener("click", () => moveDetailPhoto(1));

[posterMainTitle, posterSubtitle, posterShop, posterDate, posterNote, posterPosition, posterType, posterDesign, posterSize, imageFit, imagePosition, imageZoom, imageOffsetX, imageOffsetY, imageRotation, posterRotation].forEach(
  (element) => {
    element.addEventListener("input", updatePoster);
    element.addEventListener("change", updatePoster);
  },
);

resetImageAdjust.addEventListener("click", () => {
  imageZoom.value = "100";
  imageOffsetX.value = "0";
  imageOffsetY.value = "0";
  imageRotation.value = "normal";
  updatePoster();
});

uploadedMaterialMode.addEventListener("change", () => {
  if (uploadedMaterialMode.value === "finished" && state.uploadedMaterial) {
    posterSize.value = "original";
  }
  updatePoster();
});

window.addEventListener("resize", () => {
  syncPosterSurface(posterPreviewFrame, posterPreview);
  if (confirmationSection && !confirmationSection.hidden) {
    syncPosterSurface(confirmPosterPreviewFrame, confirmPosterPreview);
  }
});

officialMaterialInput.addEventListener("change", handleOfficialMaterialUpload);
document.querySelector("#finishButton").addEventListener("click", showFinishReview);
backToEditButton.addEventListener("click", backToEdit);
savePngButton.addEventListener("click", () => savePosterPng(pngStatus));
saveConfirmPngButton.addEventListener("click", () => savePosterPng(confirmPngStatus));

placeOrderButton.addEventListener("click", () => {
  if (!isPosterMaterialAllowed()) {
    orderStatus.textContent = "正式素材が必要です";
    orderStatus.hidden = false;
    orderStatus.classList.add("is-warning");
    orderStatus.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const checkedCount = finishCheckItems.querySelectorAll('input[type="checkbox"]:checked').length;
  const totalCount = finishCheckItems.querySelectorAll('input[type="checkbox"]').length;
  if (checkedCount !== totalCount) {
    orderStatus.textContent = "確認項目をすべてチェックしてください";
    orderStatus.hidden = false;
    orderStatus.classList.add("is-warning");
    orderStatus.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const orderId = generateOrderId();
  const orderData = buildOrderJson(orderId);
  const jsonFileName = `order_${orderId}.json`;
  const pngFileName = `poster_${orderId}.png`;
  orderStatus.innerHTML = `
    <strong>仮注文を受け付けました</strong><br>
    正式な決済・印刷・発送処理はまだ行われません<br>
    <span class="order-status-note">注文ID：${orderId}</span><br>
    <button type="button" class="secondary-button order-json-button" id="saveOrderJsonButton">注文JSONを保存</button>
    <button type="button" class="secondary-button order-json-button" id="saveOrderPngButton">PNGを保存</button>
    <p id="orderPngStatus" class="export-status order-png-status"></p>
  `;
  orderStatus.hidden = false;
  orderStatus.classList.remove("is-warning");
  orderStatus.scrollIntoView({ behavior: "smooth", block: "center" });
  document.querySelector("#saveOrderJsonButton").addEventListener("click", () => {
    saveOrderJson(orderData, jsonFileName);
  });
  document.querySelector("#saveOrderPngButton").addEventListener("click", () => {
    savePosterPng(document.querySelector("#orderPngStatus"), pngFileName);
  });
  saveOrderToHistory(orderData, jsonFileName);
});

function loadOrderHistory() {
  try {
    return JSON.parse(localStorage.getItem(ORDER_HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveOrderToHistory(orderData, jsonFileName) {
  const history = loadOrderHistory();
  const entry = {
    order_id: orderData.order_id,
    created_at: orderData.created_at,
    flower_name: orderData.flower_name,
    image_usage: orderData.image_usage,
    poster_size: orderData.poster_size,
    shop_name: orderData.shop_name,
    main_title: orderData.main_title,
    period: orderData.period,
    png_filename: orderData.png_filename,
    json_filename: jsonFileName,
    material_status: orderData.material_status,
  };
  history.unshift(entry);
  localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(history));
  renderOrderHistory();
}

function deleteOrderFromHistory(orderId) {
  const history = loadOrderHistory().filter((e) => e.order_id !== orderId);
  localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(history));
  renderOrderHistory();
}

function clearOrderHistory() {
  localStorage.removeItem(ORDER_HISTORY_KEY);
  renderOrderHistory();
}

function redownloadOrderJson(entry) {
  const blob = new Blob([JSON.stringify(entry, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = entry.json_filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function formatHistoryDate(isoString) {
  try {
    const d = new Date(isoString);
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return isoString;
  }
}

function renderOrderHistory() {
  const list = document.querySelector("#orderHistoryList");
  if (!list) return;

  const history = loadOrderHistory();
  if (history.length === 0) {
    list.innerHTML = '<p class="history-empty">まだ仮注文はありません</p>';
    return;
  }

  list.innerHTML = history
    .map(
      (entry) => `
        <article class="order-history-item" data-order-id="${entry.order_id}">
          <div class="order-history-header">
            <strong class="order-history-id">注文ID：${entry.order_id}</strong>
            <span class="order-history-date">${formatHistoryDate(entry.created_at)}</span>
          </div>
          <dl class="order-history-detail">
            <div><dt>花名</dt><dd>${entry.flower_name || "―"}</dd></div>
            <div><dt>画像の使い方</dt><dd>${entry.image_usage || "―"}</dd></div>
            <div><dt>ポスターサイズ</dt><dd>${entry.poster_size || "―"}</dd></div>
            <div><dt>店舗名</dt><dd>${entry.shop_name || "―"}</dd></div>
            <div><dt>タイトル</dt><dd>${entry.main_title || "―"}</dd></div>
            <div><dt>期間</dt><dd>${entry.period || "―"}</dd></div>
            <div><dt>PNGファイル名</dt><dd>${entry.png_filename || "―"}</dd></div>
            <div><dt>JSONファイル名</dt><dd>${entry.json_filename || "―"}</dd></div>
          </dl>
          <div class="order-history-actions">
            <button type="button" class="secondary-button history-redownload-btn" data-order-id="${entry.order_id}">JSONを再保存</button>
            <button type="button" class="discard-button history-delete-btn" data-order-id="${entry.order_id}">履歴から削除</button>
          </div>
        </article>
      `,
    )
    .join("");
}

document.querySelector("#clearHistoryButton").addEventListener("click", clearOrderHistory);

document.querySelector("#orderHistoryList").addEventListener("click", (event) => {
  const redownloadBtn = event.target.closest(".history-redownload-btn");
  if (redownloadBtn) {
    const orderId = redownloadBtn.dataset.orderId;
    const entry = loadOrderHistory().find((e) => e.order_id === orderId);
    if (entry) redownloadOrderJson(entry);
    return;
  }
  const deleteBtn = event.target.closest(".history-delete-btn");
  if (deleteBtn) {
    deleteOrderFromHistory(deleteBtn.dataset.orderId);
  }
});

async function init() {
  try {
    const response = await fetch("/static/flowers.json?v=v03landscapetype2");
    const data = await response.json();
    state.flowers = data.map(normalizeFlower);
  } catch (error) {
    state.flowers = fallbackFlowers.map(normalizeFlower);
  }

  state.selectedFlower = state.flowers[0];
  renderFlowers();
  renderFlowerDetail();
  applyFlowerToPoster();
  requestSuggestions();
  renderOrderHistory();
  if (isConfirmModeFromUrl()) {
    showFinishReview({ updateUrl: false });
  }
}

init();
