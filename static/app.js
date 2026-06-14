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
  posterTemplates: [],
  posterCategoriesOrder: [],
  templateMaterial: null,
  selectedTemplateId: null,
  currentPrintCheckId: null,
  editingOrderId: null,
  editingShipToType: null,
  galleryCategoryLimits: {},
  proposalBandOpacity: null,
  activeProposalIndex: -1,
  layoutProposals: [],
};

const ORDER_HISTORY_KEY = "ai_hana_zukan_order_history";
const GALLERY_PAGE_SIZE = 6;

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
const textOffsetX = document.querySelector("#textOffsetX");
const textOffsetY = document.querySelector("#textOffsetY");
const textOffsetXValue = document.querySelector("#textOffsetXValue");
const textOffsetYValue = document.querySelector("#textOffsetYValue");
const titleFontScale = document.querySelector("#titleFontScale");
const subtitleFontScale = document.querySelector("#subtitleFontScale");
const metaFontScale = document.querySelector("#metaFontScale");
const titleFontScaleValue = document.querySelector("#titleFontScaleValue");
const subtitleFontScaleValue = document.querySelector("#subtitleFontScaleValue");
const metaFontScaleValue = document.querySelector("#metaFontScaleValue");
const layoutSuggestButton = document.querySelector("#layoutSuggestButton");
const layoutProposalsEl = document.querySelector("#layoutProposals");
const uploadTriggerButton = document.querySelector("#uploadTriggerButton");
const advancedSettingsDetails = document.querySelector("#advancedSettingsDetails");
const posterRotation = document.querySelector("#posterRotation");
const printSize = document.querySelector("#printSize");
const printPaper = document.querySelector("#printPaper");
const printDelivery = document.querySelector("#printDelivery");
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
const savePdfButton = document.querySelector("#savePdfButton");
const saveConfirmPdfButton = document.querySelector("#saveConfirmPdfButton");
const pngStatus = document.querySelector("#pngStatus");
const confirmPngStatus = document.querySelector("#confirmPngStatus");
const pdfStatus = document.querySelector("#pdfStatus");
const confirmPdfStatus = document.querySelector("#confirmPdfStatus");
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
const confirmPrintVendor = document.querySelector("#confirmPrintVendor");
const confirmPrintSize = document.querySelector("#confirmPrintSize");
const confirmPrintPaper = document.querySelector("#confirmPrintPaper");
const confirmPrintDelivery = document.querySelector("#confirmPrintDelivery");
const confirmShipTo = document.querySelector("#confirmShipTo");
const confirmSenderName = document.querySelector("#confirmSenderName");
const confirmMaterialWarning = document.querySelector("#confirmMaterialWarning");
const confirmationSection = document.querySelector("#confirmationSection");
const backToEditButton = document.querySelector("#backToEditButton");
const placeOrderButton = document.querySelector("#placeOrderButton");
const orderStatus = document.querySelector("#orderStatus");
const orderConfirmChecks = document.querySelector("#orderConfirmChecks");
const customerName = document.querySelector("#customerName");
const customerShopName = document.querySelector("#customerShopName");
const customerContactName = document.querySelector("#customerContactName");
const customerEmail = document.querySelector("#customerEmail");
const customerPhone = document.querySelector("#customerPhone");
const customerPostalCode = document.querySelector("#customerPostalCode");
const customerAddress = document.querySelector("#customerAddress");
const customerNote = document.querySelector("#customerNote");
const shippingSameAsCustomer = document.querySelector("#shippingSameAsCustomer");
const shippingDifferentFields = document.querySelector("#shippingDifferentFields");
const shippingRecipientName = document.querySelector("#shippingRecipientName");
const shippingAddressEl = document.querySelector("#shippingAddress");
const desiredDeliveryDate = document.querySelector("#desiredDeliveryDate");
const receiptName = document.querySelector("#receiptName");
const editSections = [
  document.querySelector("#heroSection"),
  document.querySelector("#gallerySection"),
  document.querySelector(".catalog-panel"),
  document.querySelector(".detail-panel"),
  document.querySelector(".ai-panel"),
  document.querySelector("#posterSection"),
].filter(Boolean);

shippingSameAsCustomer?.addEventListener("change", () => {
  if (shippingDifferentFields) shippingDifferentFields.hidden = shippingSameAsCustomer.checked;
});

const posterDesignDescriptions = {
  "no-text": "文字なし：写真だけのポスターとして使えます",
  "minimal": "小さく入れる：写真の隅に小さくタイトルと店舗名を入れます（初期推奨）",
  "elegant": "上品文字：控えめな半透明カードに細いフォントで上品に入れます",
  "strong-pop": "強めPOP：太文字で読みやすさ優先。フェア名をしっかり見せます",
  "announce": "全面告知：タイトルを大きく出す、セール・イベント告知向け",
  "bottom-margin": "下余白：写真の下に余白を追加して文字を入れます",
  "direct": "写真上に直接入れる：背景なしで文字を重ねます",
  "pop-band": "POP文字帯：白い帯に文字を入れる店頭POP向けデザイン",
  "photo-full": "写真全面タイプ：写真を大きく見せる店頭向けデザイン",
  "simple": "上品シンプルタイプ：贈り物・高級感向けデザイン",
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

async function callGenerateApi(payload) {
  try {
    const response = await fetch("/api/generate-copy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return { data, usedFallback: data.fallback === true };
  } catch {
    return { data: null, usedFallback: true };
  }
}

function aiResponseToSuggestions(data) {
  const items = [];
  if (data.pop_text) items.push({ label: "店頭POP", text: data.pop_text });
  if (data.instagram_text) items.push({ label: "SNS向け", text: data.instagram_text });
  if (data.note) items.push({ label: "補足文", text: data.note });
  return items.length ? items : makeSuggestionItems();
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

async function requestSuggestions() {
  suggestButton.disabled = true;
  suggestButton.textContent = "AIが文章を作成中です...";
  suggestions.innerHTML = "";

  const flower = state.selectedFlower;
  const { data, usedFallback } = await callGenerateApi({
    flower_name: flower.name,
    flower_features: flower.feature,
    flower_language: flower.language,
    care_summary: flower.care,
    purpose: purposeInput.value,
    tone: toneInput.value,
  });

  if (data && !usedFallback) {
    const items = aiResponseToSuggestions(data);
    state.currentDraft = data.note || data.pop_text || items[0]?.text || "";
    renderSuggestions(items);
  } else {
    const items = makeSuggestionItems();
    state.currentDraft = items[0].text;
    renderSuggestions(items);
    if (usedFallback || data?.fallback) {
      const notice = document.createElement("p");
      notice.className = "ai-fallback-notice";
      notice.textContent = "AI APIに接続できなかったため、ローカル生成文を表示しています。";
      suggestions.prepend(notice);
    }
  }

  suggestButton.disabled = false;
  suggestButton.textContent = "AI案を作る";
}

function getPosterImageCss(photo) {
  if (photo?.url) return `url("${photo.url}")`;
  if (photo?.gradient) return photo.gradient;
  return state.selectedFlower.fallback;
}

function updatePoster() {
  const photo = getCurrentPosterPhoto();
  const image = getPosterImageCss(photo);
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
  updateWatermark();
  applyTextOffsetToPreview(posterCopy, posterPreviewFrame);
  applyBandOpacity(posterCopy);
  applyFontScalesToFrame(posterPreviewFrame);
  if (confirmationSection && !confirmationSection.hidden) renderFinishReview();
}

function applyBandOpacity(copyEl) {
  if (!copyEl) return;
  copyEl.style.background = state.proposalBandOpacity !== null
    ? `rgba(255,255,255,${state.proposalBandOpacity})`
    : "";
}

function getFontScales() {
  return {
    title: Math.max(0.70, Math.min(1.30, Number(titleFontScale?.value || 100) / 100)),
    subtitle: Math.max(0.70, Math.min(1.30, Number(subtitleFontScale?.value || 100) / 100)),
    meta: Math.max(0.70, Math.min(1.30, Number(metaFontScale?.value || 100) / 100)),
  };
}

function applyFontScalesToFrame(frameEl) {
  if (!frameEl) return;
  const s = getFontScales();
  frameEl.style.setProperty("--subtitle-scale", s.subtitle);
  frameEl.style.setProperty("--meta-scale", s.meta);
}

function applyTextOffsetToPreview(copyEl, frameEl) {
  if (!copyEl || !frameEl) return;
  const ox = parseInt(textOffsetX?.value) || 0;
  const oy = parseInt(textOffsetY?.value) || 0;
  const scale = (frameEl.offsetWidth || 380) / getPosterBaseSize().width;
  copyEl.style.transform = (ox || oy) ? `translate(${ox * scale}px, ${oy * scale}px)` : "";
}

function updateWatermark() {
  const photo = getCurrentPosterPhoto();
  // uploaded素材 or poster_allowed:true の正式テンプレートにはSAMPLEを出さない
  const needsWatermark = photo?.usage !== "uploaded" && photo?.poster_allowed !== true;
  posterPreviewFrame.classList.toggle("has-watermark", needsWatermark);
  confirmPosterPreviewFrame?.classList.toggle("has-watermark", needsWatermark);
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
  if (state.templateMaterial) return state.templateMaterial;
  return getPhoto(state.selectedFlower, state.detailPhotoIndex) || getPhoto(state.selectedFlower, 0);
}

function isPosterMaterialAllowed() {
  return getCurrentPosterPhoto()?.poster_allowed === true;
}

function getMaterialWarningText() {
  const photo = getCurrentPosterPhoto();
  const usage = photo?.usage;
  const allowed = photo?.poster_allowed === true;
  if (usage === "uploaded") return "アップロードされた正式素材を使用中です。";
  if (usage === "template" && allowed) return "正式テンプレート素材として使用可能です。";
  if (usage === "template" && !allowed) return "確認用テンプレートです。正式保存・注文には正式素材が必要です。";
  const note = photo?.license_note || "正式素材をアップロードしてください。";
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
  [savePngButton, saveConfirmPngButton, savePdfButton, saveConfirmPdfButton, placeOrderButton].forEach((button) => {
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
    text_offset_x: parseInt(textOffsetX?.value) || 0,
    text_offset_y: parseInt(textOffsetY?.value) || 0,
    band_opacity: state.proposalBandOpacity,
    title_font_scale: getFontScales().title,
    subtitle_font_scale: getFontScales().subtitle,
    meta_font_scale: getFontScales().meta,
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

function getCurrentPosterExportUrl() {
  const photo = getCurrentPosterPhoto();
  return photo?.source_url || photo?.url || "";
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
  context.font = `400 ${size}px 'Yu Gothic', 'Meiryo', sans-serif`;
}

function fitSingleLineTitle(context, title, maxWidth, baseSize = 50, minSize = 34) {
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

function fitTwoLineTitle(context, title, maxWidth, baseSize = 46, minSize = 30) {
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
  const baseSize = options.baseSize || 50;
  const minSize = options.minSize || 34;
  return fitSingleLineTitle(context, source, maxWidth, baseSize, minSize) || fitTwoLineTitle(context, source, maxWidth, Math.max(baseSize - 4, minSize), Math.max(minSize - 6, 26));
}

function getDomTitleLayout(title) {
  const context = createTitleMeasureContext();
  const size = getPosterBaseSize();
  const isLandscape = size.width > size.height && !getPosterRotationSetting().rotated;
  const box = getCopyBox(posterPosition.value, posterDesign.value, size.width, size.height);
  const maxTextWidth = isLandscape ? box.width - 40 : Math.min(420, box.width - 60);
  return layoutCanvasTitle(context, title, maxTextWidth, isLandscape ? { baseSize: 40, minSize: 28 } : { baseSize: 50, minSize: 34 });
}

function renderPosterTitle(element, title) {
  const layout = getDomTitleLayout(title);
  const size = getPosterBaseSize();
  const isLandscape = size.width > size.height && !getPosterRotationSetting().rotated;
  const titleScale = getFontScales().title;
  element.replaceChildren(
    ...layout.lines.map((line) => {
      const span = document.createElement("span");
      span.className = "poster-title-line";
      span.textContent = line;
      return span;
    }),
  );
  element.style.fontSize = `${Math.round((layout.fontSize / 50) * (isLandscape ? 22 : 30) * titleScale)}px`;
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
  const boxWidth = isLandscapeCanvas ? canvasWidth * 0.38 : design === "simple" ? 400 : 480;
  const boxHeight = isLandscapeCanvas
    ? (design === "strong-pop" ? 170 : 150)
    : (design === "bottom-margin" || design === "strong-pop" || design === "announce") ? 210 : 175;
  const margin = 56;
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

function isTextlessDesign(design) {
  return design === "no-text";
}

function isNoBoxDesign(design) {
  return design === "minimal" || design === "direct" || design === "announce";
}

function drawPosterOverlay(context, design, canvasWidth, canvasHeight) {
  if (design === "no-text") return;
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
  if (design === "announce") {
    // 全面告知：白文字の読みやすさのため濃いめグラデーション
    const gradient = context.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, "rgba(0,0,0,0.10)");
    gradient.addColorStop(1, "rgba(0,0,0,0.62)");
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
  const image = await loadPosterImage(getCurrentPosterExportUrl()).catch(() => null);

  drawFallbackBackground(context, canvas.width, canvas.height);
  if (image) {
    drawPosterImage(context, image, canvas.width, canvas.height);
  }

  if (isFinishedImageMode()) return canvas;

  const _design = posterDesign.value;
  drawPosterOverlay(context, _design, canvas.width, canvas.height);

  // 文字なしモード
  if (isTextlessDesign(_design)) return canvas;

  const box = getCopyBox(posterPosition.value, _design, canvas.width, canvas.height);
  box.x += parseInt(textOffsetX?.value) || 0;
  box.y += parseInt(textOffsetY?.value) || 0;

  const isLandscapeCanvas = canvas.width > canvas.height;
  const paddingX = isLandscapeCanvas ? 20 : 30;
  const textX = Math.round(box.align === "center" ? box.x + box.width / 2 : box.x + paddingX);
  const maxTextWidth = isLandscapeCanvas ? box.width - paddingX * 2 : Math.min(420, box.width - paddingX * 2);

  context.save();
  context.textAlign = box.align;
  context.textBaseline = "top";

  const scales = getFontScales();

  if (isNoBoxDesign(_design)) {
    if (_design === "announce") {
      // 全面告知：大きな太文字で訴求
      context.shadowColor = "rgba(0,0,0,0.80)";
      context.shadowBlur = 16;
      const subSize = Math.round((isLandscapeCanvas ? 20 : 26) * scales.subtitle);
      context.fillStyle = "rgba(255,255,255,0.88)";
      context.font = `600 ${subSize}px 'Yu Gothic','Meiryo',sans-serif`;
      context.fillText(snapshot.subtitle, textX, Math.round(box.y + 20), maxTextWidth);
      const annTitleBase = Math.round((isLandscapeCanvas ? 56 : 72) * scales.title);
      const annTitleMin = Math.round((isLandscapeCanvas ? 38 : 50) * scales.title);
      const annLayout = layoutCanvasTitle(context, snapshot.title, maxTextWidth, { baseSize: annTitleBase, minSize: annTitleMin });
      context.fillStyle = "rgba(255,255,255,0.98)";
      context.font = `700 ${annLayout.fontSize}px 'Yu Gothic','Meiryo',sans-serif`;
      const annTitleY = Math.round(box.y + subSize + 32);
      const annLineH = Math.round(annLayout.fontSize * 1.15);
      annLayout.lines.forEach((line, i) => {
        context.fillText(line, textX, annTitleY + i * annLineH, maxTextWidth);
      });
      const annMetaSize = Math.round((isLandscapeCanvas ? 14 : 18) * scales.meta);
      context.fillStyle = "rgba(255,255,255,0.78)";
      context.font = `400 ${annMetaSize}px 'Yu Gothic','Meiryo',sans-serif`;
      context.fillText(`${snapshot.shop} / ${snapshot.date}`, textX, annTitleY + annLayout.lines.length * annLineH + 10, maxTextWidth);
    } else {
      // minimal / direct：白いカードなし・テキスト影のみ
      const isMinimal = _design === "minimal";
      context.shadowColor = "rgba(0,0,0,0.65)";
      context.shadowBlur = isMinimal ? 4 : 7;

      if (!isMinimal) {
        const dSubFont = Math.round((isLandscapeCanvas ? 17 : 20) * scales.subtitle);
        context.fillStyle = "rgba(255,255,255,0.88)";
        context.font = `400 ${dSubFont}px 'Yu Gothic','Meiryo',sans-serif`;
        context.fillText(snapshot.subtitle, textX, Math.round(box.y + 20), maxTextWidth);
      }

      const titleSize = Math.round((isMinimal ? (isLandscapeCanvas ? 20 : 26) : (isLandscapeCanvas ? 34 : 42)) * scales.title);
      context.fillStyle = "rgba(255,255,255,0.95)";
      context.font = `300 ${titleSize}px 'Yu Gothic','Meiryo',sans-serif`;
      const titleY = isMinimal
        ? Math.round(box.y + box.height - titleSize - 22)
        : Math.round(box.y + 52);
      context.fillText(snapshot.title, textX, titleY, maxTextWidth);

      const metaSize = Math.round((isMinimal ? (isLandscapeCanvas ? 10 : 12) : (isLandscapeCanvas ? 13 : 15)) * scales.meta);
      context.fillStyle = "rgba(255,255,255,0.80)";
      context.font = `300 ${metaSize}px 'Yu Gothic','Meiryo',sans-serif`;
      context.fillText(`${snapshot.shop} / ${snapshot.date}`, textX, Math.round(titleY + titleSize + 5), maxTextWidth);
    }

  } else {
    // カードあり: elegant / strong-pop / pop-band / photo-full / simple / bottom-margin
    const _defaultOpacity = box.band ? 0.78
      : isLandscapeCanvas ? 0.75
      : _design === "bottom-margin" ? 0.88
      : _design === "strong-pop" ? 0.88
      : _design === "elegant" ? 0.72
      : 0.76;
    const _bandOpacity = state.proposalBandOpacity ?? _defaultOpacity;
    context.fillStyle = `rgba(255,255,255,${_bandOpacity})`;
    roundRect(context, Math.round(box.x), Math.round(box.y), Math.round(box.width), Math.round(box.height), 6);
    context.fill();

    if (posterPosition.value !== "bottom-center" && posterPosition.value !== "center" && posterPosition.value !== "bottom-band") {
      const stripeColor = posterType.value === "friendly"
        ? "rgba(216,154,168,0.7)"
        : (posterType.value === "bold" || _design === "strong-pop")
          ? "rgba(38,52,43,0.75)"
          : "rgba(100,160,120,0.5)";
      context.fillStyle = stripeColor;
      context.fillRect(Math.round(box.x), Math.round(box.y), 5, Math.round(box.height));
    }

    const subFont = Math.round((isLandscapeCanvas ? 17 : 20) * scales.subtitle);
    context.fillStyle = "#6e8a80";
    context.font = `400 ${subFont}px 'Yu Gothic','Meiryo',sans-serif`;
    context.fillText(snapshot.subtitle, textX, Math.round(box.y + 20), maxTextWidth);

    context.fillStyle = "#1f342d";
    const titleWeight = _design === "strong-pop" ? "700" : _design === "elegant" ? "300" : "400";
    const titleBaseSize = isLandscapeCanvas
      ? Math.round((_design === "strong-pop" ? 44 : _design === "elegant" ? 36 : 40) * scales.title)
      : Math.round((_design === "strong-pop" ? 56 : _design === "elegant" ? 44 : 50) * scales.title);
    const titleMinSize = isLandscapeCanvas
      ? Math.round((_design === "strong-pop" ? 30 : _design === "elegant" ? 26 : 28) * scales.title)
      : Math.round((_design === "strong-pop" ? 38 : _design === "elegant" ? 30 : 34) * scales.title);
    const titleLayout = layoutCanvasTitle(context, snapshot.title, maxTextWidth, { baseSize: titleBaseSize, minSize: titleMinSize });
    context.font = `${titleWeight} ${titleLayout.fontSize}px 'Yu Gothic','Meiryo',sans-serif`;
    const titleLines = titleLayout.lines;
    const titleLineHeight = Math.round(titleLayout.fontSize * 1.12);
    titleLines.forEach((line, index) => {
      context.fillText(line, textX, Math.round(box.y + 52 + index * titleLineHeight), maxTextWidth);
    });

    context.strokeStyle = "rgba(63,111,80,0.16)";
    context.lineWidth = 1;
    context.beginPath();
    const metaLineY = Math.round(isLandscapeCanvas ? box.y + box.height - 32 : box.y + box.height - 38);
    context.moveTo(Math.round(box.x + paddingX), metaLineY + 0.5);
    context.lineTo(Math.round(box.x + box.width - paddingX), metaLineY + 0.5);
    context.stroke();

    const metaFont = Math.round((isLandscapeCanvas ? 13 : 15) * scales.meta);
    context.fillStyle = "#7a9288";
    context.font = `300 ${metaFont}px 'Yu Gothic','Meiryo',sans-serif`;
    context.fillText(`${snapshot.shop} / ${snapshot.date}`, textX, Math.round(isLandscapeCanvas ? box.y + box.height - 22 : box.y + box.height - 26), maxTextWidth);
  }

  context.restore();
  return canvas;
}

async function renderPosterCanvas() {
  const baseCanvas = await renderBasePosterCanvas();
  let finalCanvas;
  if (!getPosterRotationSetting().rotated) {
    finalCanvas = baseCanvas;
  } else {
    const rotatedCanvas = document.createElement("canvas");
    rotatedCanvas.width = baseCanvas.height;
    rotatedCanvas.height = baseCanvas.width;
    const ctx = rotatedCanvas.getContext("2d");
    ctx.translate(rotatedCanvas.width, 0);
    ctx.rotate(Math.PI / 2);
    ctx.drawImage(baseCanvas, 0, 0);
    finalCanvas = rotatedCanvas;
  }
  // 印刷確認ID を右下に描画（PNG/PDF出力に必ず含まれる）
  drawPrintCheckId(finalCanvas.getContext("2d"), finalCanvas.width, finalCanvas.height, state.currentPrintCheckId);
  return finalCanvas;
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

function getTemplatePosterIdLabel() {
  const templateId = state.selectedTemplateId;
  if (!templateId) return "UP";
  const match = templateId.match(/(\d+)$/);
  return match ? `HP-${String(parseInt(match[1], 10)).padStart(4, "0")}` : `HP-${templateId}`;
}

function generatePrintCheckId() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const ts = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return `${getTemplatePosterIdLabel()} / ${ts}`;
}

function drawPrintCheckId(context, canvasWidth, canvasHeight, checkId) {
  if (!checkId) return;
  const fontSize = Math.max(11, Math.round(Math.min(canvasWidth, canvasHeight) * 0.009));
  const marginX = Math.round(fontSize * 2.2);
  const marginY = Math.round(fontSize * 1.8);
  const x = canvasWidth - marginX;
  const y = canvasHeight - marginY;

  // サンプリング: 右下コーナーの輝度で文字色を自動切替
  const sampleSize = Math.round(fontSize * 10);
  const sx = Math.max(0, canvasWidth - sampleSize);
  const sy = Math.max(0, canvasHeight - sampleSize);
  let isDark = true;
  try {
    const px = context.getImageData(sx, sy, Math.min(sampleSize, canvasWidth), Math.min(sampleSize, canvasHeight)).data;
    let total = 0;
    for (let i = 0; i < px.length; i += 4) {
      total += px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114;
    }
    isDark = total / (px.length / 4) < 140;
  } catch (_) {}

  const textColor = isDark ? "rgba(255,255,255,0.68)" : "rgba(40,40,40,0.58)";
  const bgColor   = isDark ? "rgba(0,0,0,0.30)"       : "rgba(255,255,255,0.42)";

  context.save();
  context.font = `400 ${fontSize}px 'Yu Gothic','Meiryo',monospace`;
  context.textAlign = "right";
  context.textBaseline = "bottom";

  const textW = context.measureText(checkId).width;
  const padX = Math.round(fontSize * 0.5);
  const padY = Math.round(fontSize * 0.35);
  const rx = x - textW - padX;
  const ry = y - fontSize - padY;
  const rw = textW + padX * 2;
  const rh = fontSize + padY * 2;
  const r  = Math.round(rh / 3);

  // 角丸背景
  context.fillStyle = bgColor;
  context.beginPath();
  context.moveTo(rx + r, ry);
  context.lineTo(rx + rw - r, ry);
  context.quadraticCurveTo(rx + rw, ry,      rx + rw, ry + r);
  context.lineTo(rx + rw, ry + rh - r);
  context.quadraticCurveTo(rx + rw, ry + rh, rx + rw - r, ry + rh);
  context.lineTo(rx + r, ry + rh);
  context.quadraticCurveTo(rx, ry + rh,      rx, ry + rh - r);
  context.lineTo(rx, ry + r);
  context.quadraticCurveTo(rx, ry,            rx + r, ry);
  context.closePath();
  context.fill();

  context.fillStyle = textColor;
  context.fillText(checkId, x, y);
  context.restore();
}

function buildOrderJson(orderId) {
  const now = new Date();
  const snapshot = getPosterSnapshot();
  const photo = getCurrentPosterPhoto();
  const cbs = Array.from(orderConfirmChecks?.querySelectorAll('input[type="checkbox"]') || []);
  return {
    order_id: orderId,
    poster_id: getTemplatePosterIdLabel(),
    print_check_id: state.currentPrintCheckId || generatePrintCheckId(),
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
    pdf_filename: `poster_${orderId}.pdf`,
    title_font_scale: snapshot.title_font_scale,
    subtitle_font_scale: snapshot.subtitle_font_scale,
    meta_font_scale: snapshot.meta_font_scale,
    checks: {
      typo_checked: cbs[0]?.checked ?? false,
      shop_date_checked: cbs[0]?.checked ?? false,
      position_adjustment_accepted: false,
      final_adjustment_accepted: false,
      color_difference_accepted: cbs[2]?.checked ?? false,
      print_id_visible_checked: cbs[3]?.checked ?? false,
      print_id_match_checked: cbs[3]?.checked ?? false,
    },
    print_vendor: "Prio",
    print_delivery_type: printDelivery?.value || "余裕便",
    print_size: printSize?.value || "A2",
    print_paper: printPaper?.value || "マット紙",
    ship_to_type: state.editingShipToType || "お客様直送",
    sender_name: "Hana Poster AI",
    print_order_status: "未発注",
    print_order_note: "",
    customer: {
      name: customerName?.value?.trim() || "",
      shop_name: customerShopName?.value?.trim() || "",
      contact_name: customerContactName?.value?.trim() || "",
      email: customerEmail?.value?.trim() || "",
      phone: customerPhone?.value?.trim() || "",
      postal_code: customerPostalCode?.value?.trim() || "",
      address: customerAddress?.value?.trim() || "",
      desired_delivery_date: desiredDeliveryDate?.value || "",
      note: customerNote?.value?.trim() || "",
    },
    shipping: {
      same_as_customer: shippingSameAsCustomer?.checked ?? true,
      recipient_name: shippingSameAsCustomer?.checked ? "" : (shippingRecipientName?.value?.trim() || ""),
      address: shippingSameAsCustomer?.checked ? "" : (shippingAddressEl?.value?.trim() || ""),
    },
    billing: {
      receipt_name: receiptName?.value?.trim() || "",
    },
    confirmation_checks: {
      text_checked: cbs[0]?.checked ?? false,
      print_options_checked: cbs[1]?.checked ?? false,
      color_difference_accepted: cbs[2]?.checked ?? false,
      print_check_id_accepted: cbs[3]?.checked ?? false,
      revision_fee_accepted: cbs[4]?.checked ?? false,
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

const PDF_DISCLAIMER = "PDF出力は簡易版です。印刷会社への正式入稿前には解像度・塗り足し・色味をご確認ください。";

function getPdfFileName(orderId) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const dateStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return orderId ? `poster_${orderId}.pdf` : `poster_preview_${dateStr}.pdf`;
}

function getPdfPageDimensions(canvasWidth, canvasHeight) {
  const sizeKey = posterSize.value;
  const isRotated = getPosterRotationSetting().rotated;
  if (sizeKey === "a4-portrait") {
    return isRotated ? { width: 297, height: 210 } : { width: 210, height: 297 };
  }
  if (sizeKey === "a4-landscape") {
    return isRotated ? { width: 210, height: 297 } : { width: 297, height: 210 };
  }
  const ratio = canvasWidth / canvasHeight;
  if (ratio >= 1) {
    const maxW = 297, maxH = 210;
    if (ratio > maxW / maxH) {
      return { width: maxW, height: Math.round((maxW / ratio) * 10) / 10 };
    }
    return { width: Math.round(maxH * ratio * 10) / 10, height: maxH };
  }
  const maxW = 210, maxH = 297;
  if (ratio < maxW / maxH) {
    return { width: Math.round(maxH * ratio * 10) / 10, height: maxH };
  }
  return { width: maxW, height: Math.round((maxW / ratio) * 10) / 10 };
}

async function savePosterPdf(statusElement, fileName) {
  if (!isPosterMaterialAllowed()) {
    setExportStatus(statusElement, "PDF保存には正式素材が必要です", true);
    return;
  }
  if (!window.jspdf) {
    setExportStatus(statusElement, "jsPDFの読み込み中です。しばらくお待ちください", true);
    return;
  }
  setExportStatus(statusElement, "PDFを作成しています...");
  try {
    const canvas = await renderPosterCanvas();
    const { width: pdfW, height: pdfH } = getPdfPageDimensions(canvas.width, canvas.height);
    const orientation = pdfW >= pdfH ? "landscape" : "portrait";
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation, unit: "mm", format: [pdfW, pdfH] });
    const imgData = canvas.toDataURL("image/jpeg", 0.92);
    doc.addImage(imgData, "JPEG", 0, 0, pdfW, pdfH);
    doc.setFontSize(6);
    doc.setTextColor(140, 140, 140);
    doc.text(PDF_DISCLAIMER, 2, pdfH - 1.5);
    doc.save(fileName || getPdfFileName());
    setExportStatus(statusElement, "PDFを保存しました");
  } catch {
    setExportStatus(statusElement, "PDF保存に失敗しました", true);
  }
}

async function saveServerOrderPdf(orderId, statusElement) {
  if (!window.jspdf) {
    if (statusElement) statusElement.textContent = "jsPDFの読み込み中です";
    return;
  }
  if (statusElement) statusElement.textContent = "PDFを作成中...";
  let imgUrl = "";
  try {
    const resp = await fetch(`/api/orders/${orderId}/poster`);
    if (!resp.ok) throw new Error("poster not found");
    const blob = await resp.blob();
    imgUrl = URL.createObjectURL(blob);
    const img = await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = imgUrl;
    });
    const ratio = img.naturalWidth / img.naturalHeight;
    let pdfW, pdfH;
    if (ratio >= 1) {
      const maxW = 297, maxH = 210;
      if (ratio > maxW / maxH) {
        pdfW = maxW; pdfH = Math.round((maxW / ratio) * 10) / 10;
      } else {
        pdfH = maxH; pdfW = Math.round(maxH * ratio * 10) / 10;
      }
    } else {
      const maxW = 210, maxH = 297;
      if (ratio < maxW / maxH) {
        pdfH = maxH; pdfW = Math.round(maxH * ratio * 10) / 10;
      } else {
        pdfW = maxW; pdfH = Math.round((maxW / ratio) * 10) / 10;
      }
    }
    const orientation = pdfW >= pdfH ? "landscape" : "portrait";
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation, unit: "mm", format: [pdfW, pdfH] });
    const reader = new FileReader();
    const base64 = await new Promise((resolve) => {
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    doc.addImage(base64, "PNG", 0, 0, pdfW, pdfH);
    doc.setFontSize(6);
    doc.setTextColor(140, 140, 140);
    doc.text(PDF_DISCLAIMER, 2, pdfH - 1.5);
    doc.save(`poster_${orderId}.pdf`);
    URL.revokeObjectURL(imgUrl);
    if (statusElement) statusElement.textContent = "PDFを保存しました";
  } catch {
    if (imgUrl) URL.revokeObjectURL(imgUrl);
    if (statusElement) statusElement.textContent = "PDF保存に失敗しました（ポスター画像がサーバーに保存されていない可能性があります）";
  }
}

async function renderZoomConfirmArea() {
  const zoomArea = document.querySelector("#zoomConfirmArea");
  const zoomCanvas = document.querySelector("#zoomConfirmCanvas");
  if (!zoomArea || !zoomCanvas) return;

  // デモ素材（poster_allowed:false）は高解像度キャンバスを出さない
  if (!isPosterMaterialAllowed()) {
    zoomArea.hidden = true;
    return;
  }

  // PNG保存と同じ完成canvas（同一関数・追加描画なし）
  const full = await renderPosterCanvas().catch(() => null);
  if (!full) return;

  const W = full.width;
  const H = full.height;

  // タイトル文字の実座標を計算（renderBasePosterCanvas と同じ）
  const box = getCopyBox(posterPosition.value, posterDesign.value, W, H);
  box.x += parseInt(textOffsetX?.value) || 0;
  box.y += parseInt(textOffsetY?.value) || 0;
  const isLandscape = W > H;
  const paddingX = isLandscape ? 20 : 30;
  const titleStartX = box.align === "center" ? box.x + box.width / 2 : box.x + paddingX;
  const titleStartY = box.y + 52; // renderBasePosterCanvas と同一

  // 文字の一部だけを切り出す（タイトル中央 ~3文字分）
  const charW = isLandscape ? 120 : 160;  // ~2〜3文字分の幅（canvas px）
  const charH = isLandscape ? 70 : 90;    // タイトル1行分
  const cropX = Math.round(Math.max(0, titleStartX - charW / 2));
  const cropY = Math.round(Math.max(0, titleStartY - 8));
  const cropW = Math.round(Math.min(W - cropX, charW));
  const cropH = Math.round(Math.min(H - cropY, charH));

  // 1:1 ピクセルコピーのみ（再描画・透かし追加なし）
  zoomCanvas.width = cropW;
  zoomCanvas.height = cropH;
  zoomCanvas.style.width = "";
  zoomCanvas.style.height = "";
  zoomCanvas.getContext("2d").drawImage(full, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

  zoomArea.hidden = false;
}

function renderFinishReview() {
  const snapshot = getPosterSnapshot();
  const photo = getCurrentPosterPhoto();
  const image = getPosterImageCss(photo);
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
  applyTextOffsetToPreview(confirmPosterCopy, confirmPosterPreviewFrame);
  applyBandOpacity(confirmPosterCopy);
  applyFontScalesToFrame(confirmPosterPreviewFrame);

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
  const printCheckEl = document.querySelector("#confirmPrintCheckId");
  if (printCheckEl) printCheckEl.textContent = state.currentPrintCheckId || "―";
  if (confirmPrintVendor) confirmPrintVendor.textContent = "Prio";
  if (confirmPrintSize) confirmPrintSize.textContent = printSize?.value || "A2";
  if (confirmPrintPaper) confirmPrintPaper.textContent = printPaper?.value || "マット紙";
  if (confirmPrintDelivery) confirmPrintDelivery.textContent = printDelivery?.value || "余裕便";
  if (confirmShipTo) confirmShipTo.textContent = state.editingShipToType || "お客様直送";
  if (confirmSenderName) confirmSenderName.textContent = "Hana Poster AI";
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
  // 確認画面に入った時点で印刷確認IDを確定（PNG/PDF保存・注文JSONと同一になる）
  if (!state.currentPrintCheckId) {
    state.currentPrintCheckId = generatePrintCheckId();
  }
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
  orderConfirmChecks?.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
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
  state.currentPrintCheckId = null; // 再編集時に新しいIDを発行する
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

async function createPosterText() {
  const button = document.querySelector("#posterAiButton");
  button.disabled = true;
  button.textContent = "AIが文章を作成中です...";

  const flower = state.selectedFlower;
  const tonePhrase = ["やさしい", "かわいい"].includes(toneInput.value) ? `${toneInput.value}雰囲気` : toneInput.value;

  const { data, usedFallback } = await callGenerateApi({
    flower_name: flower.name,
    flower_features: flower.feature,
    flower_language: flower.language,
    care_summary: flower.care,
    purpose: purposeInput.value,
    tone: toneInput.value,
    shop_name: posterShop.value,
    period: posterDate.value,
  });

  if (data && !usedFallback) {
    state.currentDraft = data.note || data.pop_text || "";
    posterMainTitle.value = data.main_title || `${flower.name} フェア`;
    posterSubtitle.value = data.subtitle || `${flower.language.split("・")[0]}を贈る、${tonePhrase}の花選び。`;
    posterNote.value = data.note || state.currentDraft;
  } else {
    const draft = makeSuggestionItems()[0].text;
    state.currentDraft = draft;
    posterMainTitle.value = `${flower.name} フェア`;
    posterSubtitle.value = `${flower.language.split("・")[0]}を贈る、${tonePhrase}の花選び。`;
    posterNote.value = draft;
  }

  updatePoster();
  button.disabled = false;
  button.textContent = "AIで文章を作る";
}

async function createRevision() {
  reviseButton.disabled = true;
  reviseButton.textContent = "AIが修正中です...";

  const request = revisionRequest.value.trim();
  const flower = state.selectedFlower;
  const tonePhrase = ["やさしい", "かわいい"].includes(toneInput.value) ? `${toneInput.value}雰囲気` : toneInput.value;

  const { data, usedFallback } = await callGenerateApi({
    flower_name: flower.name,
    flower_features: flower.feature,
    flower_language: flower.language,
    care_summary: flower.care,
    purpose: purposeInput.value,
    tone: toneInput.value,
    current_main_title: posterMainTitle.value,
    current_subtitle: posterSubtitle.value,
    current_note: posterNote.value,
    user_request: request || "少し短く、店頭で読みやすく",
  });

  if (data && !usedFallback) {
    state.revisionProposal = {
      title: data.main_title || posterMainTitle.value,
      subtitle: data.subtitle || posterSubtitle.value,
      note: data.note || posterNote.value,
    };
  } else {
    const base = state.currentDraft || posterNote.value || makeSuggestionItems()[0].text;
    const note = request || "少し短く、店頭で読みやすく";
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
  }

  const sourceLabel = data && !usedFallback ? "AI修正案" : "修正案（ローカル生成）";
  revisionResult.innerHTML = `
    <article class="revision-card revision-suggestion">
      <div class="suggestion-head">
        <strong>${sourceLabel}</strong>
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

  reviseButton.disabled = false;
  reviseButton.textContent = "AIで再修正する";
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

textOffsetX?.addEventListener("input", () => { if (textOffsetXValue) textOffsetXValue.textContent = textOffsetX.value; updatePoster(); });
textOffsetY?.addEventListener("input", () => { if (textOffsetYValue) textOffsetYValue.textContent = textOffsetY.value; updatePoster(); });
titleFontScale?.addEventListener("input", () => { if (titleFontScaleValue) titleFontScaleValue.textContent = `${titleFontScale.value}%`; updatePoster(); });
subtitleFontScale?.addEventListener("input", () => { if (subtitleFontScaleValue) subtitleFontScaleValue.textContent = `${subtitleFontScale.value}%`; updatePoster(); });
metaFontScale?.addEventListener("input", () => { if (metaFontScaleValue) metaFontScaleValue.textContent = `${metaFontScale.value}%`; updatePoster(); });

// フロント側ローカル候補（二重フォールバック用）
function getLocalLayoutProposals(isLandscape) {
  const titleLen = (posterMainTitle?.value || "").length;
  const xHint = titleLen > 7 ? -5 : 0;
  if (isLandscape) {
    return [
      { label: "写真を活かす案", position: "bottom-right", design: "minimal", type: "elegant", band_opacity: null, offset_x: 0, offset_y: 0, title_font_scale: 0.90, reason: "写真の隅に小さく入れます。" },
      { label: "上品文字案", position: "bottom-left", design: "elegant", type: "elegant", band_opacity: null, offset_x: 0, offset_y: 0, title_font_scale: 1.00, reason: "控えめなカードで上品に入れます。" },
      { label: "強めPOP案", position: "bottom-center", design: "strong-pop", type: "friendly", band_opacity: 0.88, offset_x: 0, offset_y: 0, title_font_scale: 1.15, reason: "太文字でフェア名をしっかり見せます。" },
    ];
  }
  return [
    { label: "写真を活かす案", position: "bottom-left", design: "minimal", type: "elegant", band_opacity: null, offset_x: xHint, offset_y: 0, title_font_scale: 0.90, reason: "写真の隅に小さく入れます。" },
    { label: "上品文字案", position: "bottom-left", design: "elegant", type: "elegant", band_opacity: null, offset_x: xHint, offset_y: 8, title_font_scale: 1.00, reason: "控えめなカードで上品に入れます。" },
    { label: "強めPOP案", position: "bottom-center", design: "strong-pop", type: "friendly", band_opacity: 0.88, offset_x: 0, offset_y: 0, title_font_scale: 1.15, reason: "太文字でフェア名をしっかり見せます。" },
  ];
}

function applyLayoutProposal(proposal, index) {
  const pos = proposal.position || proposal.text_position;
  const des = proposal.design || proposal.text_style;
  const typ = proposal.type;
  const opacity = proposal.band_opacity ?? proposal.overlay_opacity;
  if (posterPosition && pos) posterPosition.value = pos;
  if (posterDesign && des) posterDesign.value = des;
  if (posterType && typ) posterType.value = typ;
  if (textOffsetX) { textOffsetX.value = String(proposal.offset_x ?? 0); if (textOffsetXValue) textOffsetXValue.textContent = textOffsetX.value; }
  if (textOffsetY) { textOffsetY.value = String(proposal.offset_y ?? 0); if (textOffsetYValue) textOffsetYValue.textContent = textOffsetY.value; }
  state.proposalBandOpacity = typeof opacity === "number" ? opacity : null;
  state.activeProposalIndex = index;
  if (titleFontScale && proposal.title_font_scale != null) {
    const pct = Math.round(proposal.title_font_scale * 100);
    titleFontScale.value = String(pct);
    if (titleFontScaleValue) titleFontScaleValue.textContent = `${pct}%`;
  }
  if (subtitleFontScale && proposal.subtitle_font_scale != null) {
    const pct = Math.round(proposal.subtitle_font_scale * 100);
    subtitleFontScale.value = String(pct);
    if (subtitleFontScaleValue) subtitleFontScaleValue.textContent = `${pct}%`;
  }
  if (metaFontScale && proposal.meta_font_scale != null) {
    const pct = Math.round(proposal.meta_font_scale * 100);
    metaFontScale.value = String(pct);
    if (metaFontScaleValue) metaFontScaleValue.textContent = `${pct}%`;
  }
  document.querySelectorAll(".layout-proposal-card").forEach((el, i) => el.classList.toggle("is-active", i === index));
  updatePoster();
}

function renderLayoutProposals(proposals, source) {
  if (!layoutProposalsEl || !Array.isArray(proposals) || proposals.length === 0) return;
  state.layoutProposals = proposals;
  layoutProposalsEl.innerHTML = proposals.map((p, i) => `
    <div class="layout-proposal-card${state.activeProposalIndex === i ? " is-active" : ""}" data-index="${i}">
      <div class="layout-proposal-label">${p.label || ""}</div>
      <div class="layout-proposal-reason">${p.reason || ""}</div>
    </div>`).join("") + `<p class="layout-proposals-source">${source === "ai" ? "AI提案" : "ローカル提案"}</p>`;
  layoutProposalsEl.hidden = false;
}

// クリックリスナーは一度だけ設定
layoutProposalsEl?.addEventListener("click", (e) => {
  const card = e.target.closest(".layout-proposal-card");
  if (!card || !state.layoutProposals?.length) return;
  const idx = parseInt(card.dataset.index);
  if (!isNaN(idx) && state.layoutProposals[idx]) applyLayoutProposal(state.layoutProposals[idx], idx);
});

layoutSuggestButton?.addEventListener("click", async () => {
  const size = getPosterBaseSize();
  const isLandscape = size.width > size.height && !getPosterRotationSetting().rotated;
  layoutSuggestButton.disabled = true;
  layoutSuggestButton.textContent = "提案を取得中...";
  try {
    const res = await fetch("/api/suggest-layout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: posterMainTitle?.value || "",
        subtitle: posterSubtitle?.value || "",
        flower_name: state.selectedFlower?.name || "",
        is_landscape: isLandscape,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const proposals = Array.isArray(data?.proposals) && data.proposals.length >= 1 ? data.proposals : null;
    renderLayoutProposals(proposals ?? getLocalLayoutProposals(isLandscape), proposals ? data.source : "local");
  } catch {
    // フロント側フォールバック（サーバー到達不能・JSONエラー等）
    renderLayoutProposals(getLocalLayoutProposals(isLandscape), "local");
  } finally {
    layoutSuggestButton.disabled = false;
    layoutSuggestButton.textContent = "AIで文字配置を提案";
  }
});

resetImageAdjust.addEventListener("click", () => {
  imageZoom.value = "100";
  imageOffsetX.value = "0";
  imageOffsetY.value = "0";
  imageRotation.value = "normal";
  if (titleFontScale) { titleFontScale.value = "100"; if (titleFontScaleValue) titleFontScaleValue.textContent = "100%"; }
  if (subtitleFontScale) { subtitleFontScale.value = "100"; if (subtitleFontScaleValue) subtitleFontScaleValue.textContent = "100%"; }
  if (metaFontScale) { metaFontScale.value = "100"; if (metaFontScaleValue) metaFontScaleValue.textContent = "100%"; }
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

// ファイル選択トリガー（display:none の input を programmatic click で開く）
uploadTriggerButton?.addEventListener("click", () => {
  if (officialMaterialInput && !officialMaterialInput.disabled) officialMaterialInput.click();
});

// 詳細設定の開閉に合わせて file input の disabled を切り替え
advancedSettingsDetails?.addEventListener("toggle", () => {
  if (officialMaterialInput) officialMaterialInput.disabled = !advancedSettingsDetails.open;
});
document.querySelector("#finishButton").addEventListener("click", showFinishReview);
backToEditButton.addEventListener("click", backToEdit);
savePngButton.addEventListener("click", () => {
  const fn = state.editingOrderId ? `poster_${state.editingOrderId}.png` : undefined;
  savePosterPng(pngStatus, fn);
});
saveConfirmPngButton.addEventListener("click", () => {
  const fn = state.editingOrderId ? `poster_${state.editingOrderId}.png` : undefined;
  savePosterPng(confirmPngStatus, fn);
});
savePdfButton.addEventListener("click", () => {
  const fn = state.editingOrderId ? getPdfFileName(state.editingOrderId) : undefined;
  savePosterPdf(pdfStatus, fn);
});
saveConfirmPdfButton.addEventListener("click", () => {
  const fn = state.editingOrderId ? getPdfFileName(state.editingOrderId) : undefined;
  savePosterPdf(confirmPdfStatus, fn);
});

placeOrderButton.addEventListener("click", () => {
  if (!isPosterMaterialAllowed()) {
    orderStatus.textContent = "正式素材が必要です";
    orderStatus.hidden = false;
    orderStatus.classList.add("is-warning");
    orderStatus.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const checkedCount = orderConfirmChecks?.querySelectorAll('input[type="checkbox"]:checked').length || 0;
  const totalCount = orderConfirmChecks?.querySelectorAll('input[type="checkbox"]').length || 0;
  if (checkedCount !== totalCount) {
    orderStatus.textContent = "注文前確認の項目をすべてチェックしてください";
    orderStatus.hidden = false;
    orderStatus.classList.add("is-warning");
    orderConfirmChecks?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const nameVal = customerName?.value?.trim() || "";
  const emailVal = customerEmail?.value?.trim() || "";
  const phoneVal = customerPhone?.value?.trim() || "";
  if (!nameVal || !emailVal || !phoneVal) {
    orderStatus.textContent = "お名前・メールアドレス・電話番号は必須です";
    orderStatus.hidden = false;
    orderStatus.classList.add("is-warning");
    document.querySelector(".customer-info-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const orderId = state.editingOrderId || generateOrderId();
  const orderData = buildOrderJson(orderId);
  const jsonFileName = `order_${orderId}.json`;
  const pngFileName = `poster_${orderId}.png`;
  orderStatus.innerHTML = `
    <strong>仮注文を受け付けました</strong><br>
    正式な決済・印刷・発送処理はまだ行われません<br>
    <span class="order-status-note">注文ID：${orderId}</span><br>
    <button type="button" class="secondary-button order-json-button" id="saveOrderJsonButton">注文JSONを保存</button>
    <button type="button" class="secondary-button order-json-button" id="saveOrderPngButton">PNGを保存</button>
    <button type="button" class="secondary-button order-json-button" id="saveOrderPdfButton">PDFを保存</button>
    <button type="button" class="secondary-button order-json-button" id="saveToServerButton">サーバーに保存</button>
    <p id="orderPngStatus" class="export-status order-png-status"></p>
    <p id="orderPdfStatus" class="export-status order-png-status"></p>
    <p id="serverSaveStatus" class="export-status order-png-status"></p>
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
  document.querySelector("#saveOrderPdfButton").addEventListener("click", () => {
    savePosterPdf(document.querySelector("#orderPdfStatus"), getPdfFileName(orderId));
  });
  document.querySelector("#saveToServerButton").addEventListener("click", () => {
    saveToServer(orderData, document.querySelector("#serverSaveStatus"));
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

async function saveToServer(orderData, statusElement) {
  if (statusElement) {
    statusElement.textContent = "サーバーに保存中...";
    statusElement.classList.remove("is-error");
  }
  try {
    const canvas = await renderPosterCanvas();
    const pngDataUrl = canvas.toDataURL("image/png");
    const response = await fetch("/api/save-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: orderData.order_id,
        order_data: orderData,
        png_data_url: pngDataUrl,
      }),
    });
    const result = await response.json();
    if (result.ok) {
      if (statusElement) statusElement.textContent = "サーバーに保存しました";
      renderServerOrders();
    } else {
      if (statusElement) {
        statusElement.textContent = `サーバー保存に失敗しました: ${result.error || ""}`;
        statusElement.classList.add("is-error");
      }
    }
  } catch {
    if (statusElement) {
      statusElement.textContent = "サーバー保存に失敗しました";
      statusElement.classList.add("is-error");
    }
  }
}

const STATUS_LABELS = {
  new: "新規",
  checking: "確認中",
  ready: "準備完了",
  done: "完了",
  canceled: "キャンセル",
};
const STATUS_VALUES = Object.keys(STATUS_LABELS);

const PRINT_STATUS_LABELS = {
  未発注: "未発注",
  入稿済み: "入稿済み",
  発送待ち: "発送待ち",
  発送済み: "発送済み",
  完了: "完了",
  キャンセル: "キャンセル",
};
const PRINT_STATUS_VALUES = Object.keys(PRINT_STATUS_LABELS);

const PAYMENT_METHOD_VALUES = ["未選択", "銀行振込", "PayPay", "Square決済リンク", "Stripe決済リンク", "その他"];
const PAYMENT_STATUS_VALUES = ["未請求", "請求済み", "入金待ち", "入金済み", "返金", "キャンセル"];

async function renderServerOrders() {
  const list = document.querySelector("#serverOrdersList");
  if (!list) return;
  try {
    const response = await fetch("/api/orders");
    const { orders } = await response.json();
    if (!orders || orders.length === 0) {
      list.innerHTML = '<p class="history-empty">サーバーに保存された注文はありません</p>';
      return;
    }
    list.innerHTML = orders
      .map((order) => {
        const status = order.status || "new";
        const statusLabel = STATUS_LABELS[status] || status;
        const statusOptions = STATUS_VALUES.map(
          (v) => `<option value="${v}"${v === status ? " selected" : ""}>${STATUS_LABELS[v]}</option>`,
        ).join("");
        const payStatus = order.payment_status || "未請求";
        const estimateTotal = order.estimate_total || "";
        const amountTotal = order.amount_total || "";
        const estimateBadge = estimateTotal
          ? `<span class="estimate-total-badge">見積：¥${estimateTotal}</span>`
          : "";
        const payAmountBadge = (amountTotal && amountTotal !== estimateTotal)
          ? `<span class="payment-amount-badge">支払：¥${amountTotal}</span>`
          : (!estimateTotal && amountTotal ? `<span class="payment-amount-badge">¥${amountTotal}</span>` : "");
        return `
          <article class="order-history-item server-order-item" data-order-id="${order.order_id}">
            <div class="order-history-header">
              <strong class="order-history-id">注文ID：${order.order_id}</strong>
              <span class="order-history-date">${formatHistoryDate(order.created_at)}</span>
              <span class="order-status-badge status-${status}">${statusLabel}</span>
              <span class="payment-status-badge pay-${payStatus}">${payStatus}</span>
              ${estimateBadge}${payAmountBadge}
            </div>
            <dl class="order-history-detail">
              <div><dt>花名</dt><dd>${order.flower_name || "―"}</dd></div>
              <div><dt>店舗名</dt><dd>${order.shop_name || "―"}</dd></div>
              <div><dt>タイトル</dt><dd>${order.main_title || "―"}</dd></div>
              <div><dt>ポスターサイズ</dt><dd>${order.poster_size || "―"}</dd></div>
              <div><dt>画像の使い方</dt><dd>${order.image_usage || "―"}</dd></div>
              <div><dt>JSONファイル</dt><dd>${order.json_file || "―"}</dd></div>
              <div><dt>PNGファイル</dt><dd>${order.png_file || "（なし）"}</dd></div>
            </dl>
            <div class="order-history-actions server-order-actions">
              <button type="button" class="secondary-button server-detail-btn" data-order-id="${order.order_id}">詳細を見る</button>
              ${order.png_file ? `<button type="button" class="secondary-button server-pdf-btn" data-order-id="${order.order_id}">PDFで保存</button>` : ""}
              <label class="server-status-label">
                ステータス
                <select class="server-status-select" data-order-id="${order.order_id}">${statusOptions}</select>
              </label>
              <button type="button" class="discard-button server-delete-btn" data-order-id="${order.order_id}">削除</button>
            </div>
            ${order.png_file ? `<p class="server-pdf-status export-status" data-order-id="${order.order_id}"></p>` : ""}
          </article>
        `;
      })
      .join("");
  } catch {
    list.innerHTML = '<p class="history-empty">サーバー注文の取得に失敗しました</p>';
  }
}

async function showOrderDetail(orderId) {
  const modal = document.querySelector("#orderDetailModal");
  const content = document.querySelector("#orderDetailContent");
  content.innerHTML = '<p class="history-empty">読み込み中...</p>';
  modal.hidden = false;
  document.body.classList.add("modal-open");

  try {
    const resp = await fetch(`/api/orders/${orderId}/json`);
    const data = await resp.json();
    const status = data.status || "new";
    const statusLabel = STATUS_LABELS[status] || status;
    const checkLabels = {
      typo_checked: "文字内容・店舗名・日付確認",
      color_difference_accepted: "色味・余白差異を了承",
      print_id_visible_checked: "印刷確認ID照合を了承",
    };
    const checks = data.checks || {};
    const checkHtml = Object.entries(checkLabels)
      .map(([key, label]) => `<div><dt>${label}</dt><dd>${checks[key] ? "済" : "未"}</dd></div>`)
      .join("");
    const hasPoster = Boolean(data.png_filename);
    const pay = data.payment || {};
    const est = data.estimate || {};

    content.innerHTML = `
      <h3 class="order-detail-title">注文詳細</h3>
      <div class="order-detail-body">
        ${hasPoster ? `<div class="order-detail-poster"><img src="/api/orders/${orderId}/poster" alt="ポスタープレビュー" class="order-detail-poster-img" loading="lazy" /></div>` : ""}
        <dl class="order-detail-fields">
          <div><dt>注文ID</dt><dd>${data.order_id || orderId}</dd></div>
          <div><dt>ポスターID</dt><dd>${data.poster_id || "―"}</dd></div>
          <div><dt>印刷確認ID</dt><dd style="font-family:monospace;font-weight:bold">${data.print_check_id || "―"}</dd></div>
          <div><dt>作成日時</dt><dd>${formatHistoryDate(data.created_at)}</dd></div>
          <div><dt>ステータス</dt><dd><span class="order-status-badge status-${status}">${statusLabel}</span></dd></div>
          <div><dt>花名</dt><dd>${data.flower_name || "―"}</dd></div>
          <div><dt>店舗名</dt><dd>${data.shop_name || "―"}</dd></div>
          <div><dt>タイトル</dt><dd>${data.main_title || "―"}</dd></div>
          <div><dt>サブタイトル</dt><dd>${data.subtitle || "―"}</dd></div>
          <div><dt>補足文</dt><dd>${data.note || "―"}</dd></div>
          <div><dt>ポスターサイズ</dt><dd>${data.poster_size || "―"}</dd></div>
          <div><dt>画像の使い方</dt><dd>${data.image_usage || "―"}</dd></div>
          <div><dt>素材状態</dt><dd>${data.material_status || "―"}</dd></div>
          <div><dt>JSONファイル</dt><dd>${data.png_filename ? `order_${orderId}.json` : "―"}</dd></div>
          <div><dt>PNGファイル</dt><dd>${data.png_filename || "―"}</dd></div>
        </dl>
        <div class="order-detail-customer-info">
          <h4>お客様情報</h4>
          <dl class="order-detail-fields">
            ${data.customer?.name ? `<div><dt>お名前</dt><dd>${data.customer.name}</dd></div>` : ""}
            ${data.customer?.shop_name ? `<div><dt>店舗名</dt><dd>${data.customer.shop_name}</dd></div>` : ""}
            ${data.customer?.contact_name ? `<div><dt>担当者名</dt><dd>${data.customer.contact_name}</dd></div>` : ""}
            ${data.customer?.email ? `<div><dt>メール</dt><dd>${data.customer.email}</dd></div>` : ""}
            ${data.customer?.phone ? `<div><dt>電話番号</dt><dd>${data.customer.phone}</dd></div>` : ""}
            ${data.customer?.postal_code || data.customer?.address ? `<div><dt>住所</dt><dd>${[data.customer.postal_code, data.customer.address].filter(Boolean).join(" ")}</dd></div>` : ""}
            ${(() => {
              const ship = data.shipping || {};
              if (ship.same_as_customer === false && (ship.recipient_name || ship.address)) {
                return `<div><dt>配送先名</dt><dd>${ship.recipient_name || "―"}</dd></div><div><dt>配送先住所</dt><dd>${ship.address || "―"}</dd></div>`;
              }
              return `<div><dt>配送先</dt><dd>注文者住所と同じ</dd></div>`;
            })()}
            ${data.customer?.desired_delivery_date ? `<div><dt>希望納期</dt><dd>${data.customer.desired_delivery_date}</dd></div>` : ""}
            ${data.billing?.receipt_name ? `<div><dt>領収書宛名</dt><dd>${data.billing.receipt_name}</dd></div>` : ""}
            ${data.customer?.note ? `<div><dt>備考</dt><dd>${data.customer.note}</dd></div>` : ""}
          </dl>
        </div>
        <div class="order-detail-checks">
          <h4>確認チェック項目</h4>
          <dl class="order-history-detail">${checkHtml}</dl>
        </div>
        <div class="order-detail-print-info">
          <h4>印刷発注情報</h4>
          <p class="print-order-admin-notice">発注前に印刷条件を確認してください。画面上の色と実際の印刷色は異なる場合があります。初回はテスト印刷を推奨します。</p>
          <dl class="order-detail-fields">
            <div><dt>発注先</dt><dd>${data.print_vendor || "Prio"}</dd></div>
            <div><dt>配送種別</dt><dd>${data.print_delivery_type || "余裕便"}<span class="admin-field-note">（急ぎでなければ余裕便推奨）</span></dd></div>
            <div><dt>印刷サイズ</dt><dd>${data.print_size || "A2"}<span class="admin-field-note">（A2：標準 / A3：小 / A1：大）</span></dd></div>
            <div><dt>用紙</dt><dd>${data.print_paper || "マット紙"}<span class="admin-field-note">（マット紙：落ち着いた質感 / 光沢紙：発色重視 / パールフォト紙：高級感）</span></dd></div>
            <div><dt>発送先種別</dt><dd>${data.ship_to_type || "お客様直送"}</dd></div>
            <div><dt>発送元名</dt><dd>${data.sender_name || "Hana Poster AI"}</dd></div>
            <div>
              <dt>発注状態</dt>
              <dd>
                <select id="printStatusSelect" class="print-status-select">
                  ${PRINT_STATUS_VALUES.map((v) => `<option value="${v}"${v === (data.print_order_status || "未発注") ? " selected" : ""}>${v}</option>`).join("")}
                </select>
              </dd>
            </div>
            <div style="grid-column: 1 / -1">
              <dt>発注メモ</dt>
              <dd style="flex: 1"><textarea id="printNoteTextarea" class="print-note-textarea"></textarea></dd>
            </div>
          </dl>
          <div class="order-detail-print-actions">
            <button type="button" class="secondary-button" id="savePrintStatusButton">発注情報を保存</button>
            <button type="button" class="secondary-button" id="copyPrioMemoButton">Prio発注用メモをコピー</button>
            <button type="button" class="secondary-button load-to-editor-button" id="loadOrderToEditorButton">この注文を編集画面に読み込む</button>
          </div>
        </div>
        <div class="order-detail-estimate">
          <h4>見積もり・請求メモ</h4>
          <dl class="order-detail-fields">
            <div><dt>制作費</dt><dd><input id="estimateDesignFee" class="payment-amount-input" type="text" value="${est.design_fee || ""}" placeholder="例：5000" /></dd></div>
            <div><dt>印刷費</dt><dd><input id="estimatePrintFee" class="payment-amount-input" type="text" value="${est.print_fee || ""}" placeholder="" /></dd></div>
            <div><dt>送料</dt><dd><input id="estimateShippingFee" class="payment-amount-input" type="text" value="${est.shipping_fee || ""}" placeholder="" /></dd></div>
            <div><dt>消費税</dt><dd><input id="estimateTax" class="payment-amount-input" type="text" value="${est.tax || ""}" placeholder="" /></dd></div>
            <div><dt>値引き</dt><dd><input id="estimateDiscount" class="payment-amount-input" type="text" value="${est.discount || ""}" placeholder="" /></dd></div>
            <div><dt>合計 <span class="admin-field-note">（自動計算）</span></dt><dd><input id="estimateTotal" class="payment-amount-input estimate-total-input" type="text" value="${est.total || ""}" placeholder="" /></dd></div>
            <div style="grid-column: 1 / -1">
              <dt>見積もりメモ</dt>
              <dd style="flex: 1"><textarea id="estimateNoteTextarea" class="print-note-textarea"></textarea></dd>
            </div>
            <div style="grid-column: 1 / -1">
              <dt>管理メモ <span class="admin-field-note">（内部用・お客様案内文には含まれません）</span></dt>
              <dd style="flex: 1"><textarea id="adminNoteTextarea" class="print-note-textarea"></textarea></dd>
            </div>
          </dl>
          <div class="order-detail-print-actions">
            <button type="button" class="secondary-button" id="saveEstimateButton">見積もりを保存</button>
            <button type="button" class="secondary-button" id="applyEstimateToPaymentButton">見積もり合計を支払い合計に反映</button>
            <button type="button" class="secondary-button" id="copyCustomerMessageButton">お客様向け案内文をコピー</button>
          </div>
        </div>
        <div class="order-detail-payment-info">
          <h4>支払い情報</h4>
          <dl class="order-detail-fields">
            <div>
              <dt>支払い方法</dt>
              <dd>
                <select id="paymentMethodSelect" class="print-status-select">
                  ${PAYMENT_METHOD_VALUES.map((v) => `<option value="${v}"${v === (pay.method || "未選択") ? " selected" : ""}>${v}</option>`).join("")}
                </select>
              </dd>
            </div>
            <div>
              <dt>支払いステータス</dt>
              <dd>
                <select id="paymentStatusSelect" class="print-status-select">
                  ${PAYMENT_STATUS_VALUES.map((v) => `<option value="${v}"${v === (pay.status || "未請求") ? " selected" : ""}>${v}</option>`).join("")}
                </select>
              </dd>
            </div>
            <div><dt>合計金額</dt><dd><input id="paymentAmountTotal" class="payment-amount-input" type="text" value="${pay.amount_total || ""}" placeholder="例：15000" /></dd></div>
            <div><dt>デザイン費</dt><dd><input id="paymentAmountDesign" class="payment-amount-input" type="text" value="${pay.amount_design || ""}" placeholder="" /></dd></div>
            <div><dt>印刷費</dt><dd><input id="paymentAmountPrint" class="payment-amount-input" type="text" value="${pay.amount_print || ""}" placeholder="" /></dd></div>
            <div><dt>送料</dt><dd><input id="paymentAmountShipping" class="payment-amount-input" type="text" value="${pay.amount_shipping || ""}" placeholder="" /></dd></div>
            <div><dt>消費税</dt><dd><input id="paymentAmountTax" class="payment-amount-input" type="text" value="${pay.amount_tax || ""}" placeholder="" /></dd></div>
            <div><dt>支払期限</dt><dd><input id="paymentDueDate" class="payment-amount-input" type="date" value="${pay.payment_due_date || ""}" /></dd></div>
            <div><dt>入金日</dt><dd><input id="paymentPaidAt" class="payment-amount-input" type="date" value="${pay.paid_at || ""}" /></dd></div>
            <div style="grid-column: 1 / -1">
              <dt>決済リンク</dt>
              <dd style="flex: 1"><input id="paymentLink" class="payment-link-input" type="url" value="${pay.payment_link || ""}" placeholder="https://..." /></dd>
            </div>
            <div style="grid-column: 1 / -1">
              <dt>支払いメモ</dt>
              <dd style="flex: 1"><textarea id="paymentNoteTextarea" class="print-note-textarea"></textarea></dd>
            </div>
          </dl>
          <div class="order-detail-print-actions">
            <button type="button" class="secondary-button" id="savePaymentButton">支払い情報を保存</button>
          </div>
        </div>
      </div>
    `;
    content.querySelector("#printNoteTextarea").value = data.print_order_note || "";
    content.querySelector("#savePrintStatusButton").addEventListener("click", async () => {
      await updatePrintOrderStatus(
        orderId,
        content.querySelector("#printStatusSelect").value,
        content.querySelector("#printNoteTextarea").value,
      );
      const btn = content.querySelector("#savePrintStatusButton");
      if (btn) { btn.textContent = "保存しました"; setTimeout(() => { btn.textContent = "発注情報を保存"; }, 2000); }
    });
    content.querySelector("#copyPrioMemoButton").addEventListener("click", () => {
      copyPrioMemo(data, orderId, content);
    });
    content.querySelector("#loadOrderToEditorButton").addEventListener("click", () => {
      loadOrderIntoEditor(data);
    });

    content.querySelector("#estimateNoteTextarea").value = est.estimate_note || "";
    content.querySelector("#adminNoteTextarea").value = data.admin_note || "";

    function recalcEstimate() {
      const d = (id) => { const v = content.querySelector(id)?.value; return v ? (Number(v) || 0) : 0; };
      const total = d("#estimateDesignFee") + d("#estimatePrintFee") + d("#estimateShippingFee") + d("#estimateTax") - d("#estimateDiscount");
      const totalEl = content.querySelector("#estimateTotal");
      if (totalEl) totalEl.value = total > 0 ? String(total) : "";
    }
    ["#estimateDesignFee", "#estimatePrintFee", "#estimateShippingFee", "#estimateTax", "#estimateDiscount"].forEach((id) => {
      content.querySelector(id)?.addEventListener("input", recalcEstimate);
    });

    content.querySelector("#saveEstimateButton").addEventListener("click", async () => {
      await updateEstimate(orderId, {
        design_fee: content.querySelector("#estimateDesignFee").value,
        print_fee: content.querySelector("#estimatePrintFee").value,
        shipping_fee: content.querySelector("#estimateShippingFee").value,
        tax: content.querySelector("#estimateTax").value,
        discount: content.querySelector("#estimateDiscount").value,
        total: content.querySelector("#estimateTotal").value,
        estimate_note: content.querySelector("#estimateNoteTextarea").value,
        admin_note: content.querySelector("#adminNoteTextarea").value,
      });
      const btn = content.querySelector("#saveEstimateButton");
      if (btn) { btn.textContent = "保存しました"; setTimeout(() => { btn.textContent = "見積もりを保存"; }, 2000); }
      renderServerOrders();
    });

    content.querySelector("#applyEstimateToPaymentButton").addEventListener("click", () => {
      const estTotal = content.querySelector("#estimateTotal")?.value || "";
      const payTotalEl = content.querySelector("#paymentAmountTotal");
      if (payTotalEl) payTotalEl.value = estTotal;
      const btn = content.querySelector("#applyEstimateToPaymentButton");
      if (btn) { btn.textContent = "反映しました"; setTimeout(() => { btn.textContent = "見積もり合計を支払い合計に反映"; }, 1500); }
    });

    content.querySelector("#copyCustomerMessageButton").addEventListener("click", () => {
      copyCustomerMessage(data, orderId, content);
    });

    content.querySelector("#paymentNoteTextarea").value = pay.payment_note || "";
    content.querySelector("#savePaymentButton").addEventListener("click", async () => {
      await updatePayment(orderId, {
        method: content.querySelector("#paymentMethodSelect").value,
        status: content.querySelector("#paymentStatusSelect").value,
        amount_total: content.querySelector("#paymentAmountTotal").value,
        amount_design: content.querySelector("#paymentAmountDesign").value,
        amount_print: content.querySelector("#paymentAmountPrint").value,
        amount_shipping: content.querySelector("#paymentAmountShipping").value,
        amount_tax: content.querySelector("#paymentAmountTax").value,
        payment_due_date: content.querySelector("#paymentDueDate").value,
        paid_at: content.querySelector("#paymentPaidAt").value,
        payment_note: content.querySelector("#paymentNoteTextarea").value,
        payment_link: content.querySelector("#paymentLink").value,
      });
      const btn = content.querySelector("#savePaymentButton");
      if (btn) { btn.textContent = "保存しました"; setTimeout(() => { btn.textContent = "支払い情報を保存"; }, 2000); }
      renderServerOrders();
    });
  } catch {
    content.innerHTML = '<p class="history-empty">注文データの読み込みに失敗しました</p>';
  }
}

function closeOrderDetail() {
  document.querySelector("#orderDetailModal").hidden = true;
  document.body.classList.remove("modal-open");
}

function _setSelectByValueOrText(el, val) {
  if (!el || val == null) return;
  const s = String(val);
  const byValue = Array.from(el.options).find((o) => o.value === s);
  if (byValue) { el.value = s; return; }
  const byText = Array.from(el.options).find((o) => o.textContent.trim() === s);
  if (byText) el.value = byText.value;
}

function loadOrderIntoEditor(orderData) {
  state.editingOrderId = orderData.order_id;
  state.currentPrintCheckId = orderData.print_check_id || null;
  state.editingShipToType = orderData.ship_to_type || null;

  const template = state.posterTemplates.find((t) => t.poster_id === orderData.poster_id);
  if (template) applyPosterTemplate(template);

  if (posterMainTitle) posterMainTitle.value = orderData.main_title ?? "";
  if (posterSubtitle) posterSubtitle.value = orderData.subtitle ?? "";
  if (posterShop) posterShop.value = orderData.shop_name ?? "";
  if (posterDate) posterDate.value = orderData.period ?? "";
  if (posterNote) posterNote.value = orderData.note ?? "";

  _setSelectByValueOrText(posterType, orderData.text_style);
  _setSelectByValueOrText(posterPosition, orderData.text_position);
  _setSelectByValueOrText(imageFit, orderData.image_fit);
  _setSelectByValueOrText(imagePosition, orderData.image_position);
  if (printSize && orderData.print_size) _setSelectByValueOrText(printSize, orderData.print_size);
  if (printPaper && orderData.print_paper) _setSelectByValueOrText(printPaper, orderData.print_paper);
  if (printDelivery && orderData.print_delivery_type) _setSelectByValueOrText(printDelivery, orderData.print_delivery_type);

  const setScale = (sliderEl, labelEl, frac) => {
    if (!sliderEl || frac == null) return;
    const pct = Math.round(frac * 100);
    sliderEl.value = pct;
    if (labelEl) labelEl.textContent = `${pct}%`;
  };
  setScale(titleFontScale, titleFontScaleValue, orderData.title_font_scale);
  setScale(subtitleFontScale, subtitleFontScaleValue, orderData.subtitle_font_scale);
  setScale(metaFontScale, metaFontScaleValue, orderData.meta_font_scale);

  const zoom = parseInt(orderData.image_zoom) || 100;
  if (imageZoom) { imageZoom.value = zoom; if (imageZoomValue) imageZoomValue.textContent = `${zoom}%`; }
  if (imageOffsetX) { imageOffsetX.value = orderData.image_offset_x ?? 0; if (imageOffsetXValue) imageOffsetXValue.textContent = String(orderData.image_offset_x ?? 0); }
  if (imageOffsetY) { imageOffsetY.value = orderData.image_offset_y ?? 0; if (imageOffsetYValue) imageOffsetYValue.textContent = String(orderData.image_offset_y ?? 0); }

  const c = orderData.customer || {};
  if (customerName) customerName.value = c.name || "";
  if (customerShopName) customerShopName.value = c.shop_name || "";
  if (customerContactName) customerContactName.value = c.contact_name || "";
  if (customerEmail) customerEmail.value = c.email || "";
  if (customerPhone) customerPhone.value = c.phone || "";
  if (customerPostalCode) customerPostalCode.value = c.postal_code || "";
  if (customerAddress) customerAddress.value = c.address || "";
  if (desiredDeliveryDate) desiredDeliveryDate.value = c.desired_delivery_date || "";
  if (customerNote) customerNote.value = c.note || "";

  const s = orderData.shipping || {};
  const sameAs = s.same_as_customer !== false;
  if (shippingSameAsCustomer) shippingSameAsCustomer.checked = sameAs;
  if (shippingDifferentFields) shippingDifferentFields.hidden = sameAs;
  if (!sameAs) {
    if (shippingRecipientName) shippingRecipientName.value = s.recipient_name || "";
    if (shippingAddressEl) shippingAddressEl.value = s.address || "";
  }

  const b = orderData.billing || {};
  if (receiptName) receiptName.value = b.receipt_name || "";

  closeOrderDetail();

  const banner = document.querySelector("#editingOrderBanner");
  if (banner) {
    const title = banner.querySelector("#editingOrderBannerLabel");
    const sub = banner.querySelector("#editingOrderBannerSubLabel");
    if (title) title.textContent = `注文 ${orderData.order_id} を編集中`;
    if (sub) sub.textContent = `確認ID：${orderData.print_check_id || "―"}`;
    banner.hidden = false;
  }

  updatePoster();
  document.querySelector("#posterSection")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearEditingOrder() {
  state.editingOrderId = null;
  state.currentPrintCheckId = null;
  state.editingShipToType = null;
  const banner = document.querySelector("#editingOrderBanner");
  if (banner) banner.hidden = true;
  if (customerName) customerName.value = "";
  if (customerShopName) customerShopName.value = "";
  if (customerContactName) customerContactName.value = "";
  if (customerEmail) customerEmail.value = "";
  if (customerPhone) customerPhone.value = "";
  if (customerPostalCode) customerPostalCode.value = "";
  if (customerAddress) customerAddress.value = "";
  if (desiredDeliveryDate) desiredDeliveryDate.value = "";
  if (customerNote) customerNote.value = "";
  if (receiptName) receiptName.value = "";
  if (shippingSameAsCustomer) shippingSameAsCustomer.checked = true;
  if (shippingDifferentFields) shippingDifferentFields.hidden = true;
  if (shippingRecipientName) shippingRecipientName.value = "";
  if (shippingAddressEl) shippingAddressEl.value = "";
}

async function updatePrintOrderStatus(orderId, printOrderStatus, printOrderNote) {
  try {
    await fetch(`/api/orders/${orderId}/print-status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ print_order_status: printOrderStatus, print_order_note: printOrderNote }),
    });
  } catch {
    // silent fail
  }
}

async function updatePayment(orderId, paymentData) {
  try {
    await fetch(`/api/orders/${orderId}/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });
  } catch {
    // silent fail
  }
}

async function updateEstimate(orderId, estimateData) {
  try {
    await fetch(`/api/orders/${orderId}/estimate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(estimateData),
    });
  } catch {
    // silent fail
  }
}

function copyPrioMemo(data, orderId, content) {
  const ship = data.shipping || {};
  const cust = data.customer || {};
  const bill = data.billing || {};
  const sameAs = ship.same_as_customer !== false;
  const recipientName = sameAs ? (cust.name || "") : (ship.recipient_name || "");
  const recipientAddr = sameAs ? (cust.address || "") : (ship.address || "");
  const payMethod = content?.querySelector("#paymentMethodSelect")?.value || (data.payment?.method || "未選択");
  const payStatus = content?.querySelector("#paymentStatusSelect")?.value || (data.payment?.status || "未請求");
  const amountTotal = content?.querySelector("#paymentAmountTotal")?.value || (data.payment?.amount_total || "");
  const text = [
    `発注先：${data.print_vendor || "Prio"}`,
    `配送種別：${data.print_delivery_type || "余裕便"}`,
    `印刷サイズ：${data.print_size || "A2"}`,
    `用紙：${data.print_paper || "マット紙"}`,
    `発送先種別：${data.ship_to_type || "お客様直送"}`,
    `配送先名：${recipientName}`,
    `配送先住所：${recipientAddr}`,
    `電話番号：${cust.phone || ""}`,
    `発送元名：${data.sender_name || "Hana Poster AI"}`,
    `領収書宛名：${bill.receipt_name || ""}`,
    `希望納期：${cust.desired_delivery_date || ""}`,
    `備考：${cust.note || ""}`,
    `注文ID：${data.order_id || orderId}`,
    `印刷確認ID：${data.print_check_id || ""}`,
    `ポスターID：${data.poster_id || ""}`,
    `PNGファイル名：${data.png_filename || ""}`,
    `PDFファイル名：${data.pdf_filename || ""}`,
    `---管理用---`,
    `支払い状態：${payStatus}`,
    `支払い方法：${payMethod}`,
    `合計金額：${amountTotal}`,
  ].join("\n");
  navigator.clipboard.writeText(text).then(() => {
    const btn = content?.querySelector("#copyPrioMemoButton") || document.querySelector("#copyPrioMemoButton");
    if (btn) {
      btn.textContent = "コピーしました";
      setTimeout(() => { btn.textContent = "Prio発注用メモをコピー"; }, 2000);
    }
  });
}

function copyCustomerMessage(data, orderId, content) {
  const cust = data.customer || {};
  const customerName = cust.name || "お客様";
  const fmt = (v) => { if (!v) return "―"; const n = Number(v); return isNaN(n) ? v : `¥${n.toLocaleString()}`; };
  const g = (id, fallback) => content?.querySelector(id)?.value || fallback || "";
  const estDesign   = g("#estimateDesignFee",   data.estimate?.design_fee);
  const estPrint    = g("#estimatePrintFee",     data.estimate?.print_fee);
  const estShipping = g("#estimateShippingFee",  data.estimate?.shipping_fee);
  const estTax      = g("#estimateTax",          data.estimate?.tax);
  const estDiscount = g("#estimateDiscount",     data.estimate?.discount);
  const estTotal    = g("#estimateTotal",        data.estimate?.total);
  const payMethod   = g("#paymentMethodSelect",  data.payment?.method);
  const payStatus   = g("#paymentStatusSelect",  data.payment?.status);
  const payDueDate  = g("#paymentDueDate",       data.payment?.payment_due_date);
  const payLink     = g("#paymentLink",          data.payment?.payment_link);
  const lines = [
    `${customerName}様`,
    ``,
    `ポスター制作のご依頼ありがとうございます。`,
    `以下の内容で承ります。`,
    ``,
    `【ご注文内容】`,
    `ポスター：${data.main_title || "―"}`,
    `印刷サイズ：${data.print_size || "―"}`,
    `用紙：${data.print_paper || "―"}`,
    `配送方法：${data.print_delivery_type || "―"}`,
    `印刷確認ID：${data.print_check_id || "―"}`,
    ``,
    `【お見積り】`,
    `制作費：${fmt(estDesign)}`,
    `印刷費：${fmt(estPrint)}`,
    `送料：${fmt(estShipping)}`,
    `消費税：${fmt(estTax)}`,
    ...(estDiscount ? [`値引き：${fmt(estDiscount)}`] : []),
    `合計：${fmt(estTotal)}`,
    ``,
    `【お支払い】`,
    `支払い方法：${payMethod || "―"}`,
    `支払い状態：${payStatus || "―"}`,
    `支払期限：${payDueDate || "―"}`,
    ...(payLink ? [`決済リンク：${payLink}`] : []),
    ``,
    `画面上の色味と実際の印刷色は異なる場合があります。`,
    `内容をご確認のうえ、ご不明点がありましたらお知らせください。`,
    ``,
    `Hana Poster AI`,
  ];
  navigator.clipboard.writeText(lines.join("\n")).then(() => {
    const btn = content?.querySelector("#copyCustomerMessageButton");
    if (btn) {
      btn.textContent = "コピーしました";
      setTimeout(() => { btn.textContent = "お客様向け案内文をコピー"; }, 2000);
    }
  });
}

async function updateOrderStatus(orderId, status) {
  try {
    await fetch(`/api/orders/${orderId}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    // Update badge without full re-render
    const badge = document.querySelector(`.server-order-item[data-order-id="${orderId}"] .order-status-badge`);
    if (badge) {
      badge.textContent = STATUS_LABELS[status] || status;
      badge.className = `order-status-badge status-${status}`;
    }
  } catch {
    // silent fail — select already shows the new value
  }
}

async function deleteServerOrder(orderId) {
  if (!window.confirm(`注文 ${orderId} を削除しますか？\nJSONファイルとPNGファイルが削除されます。`)) return;
  try {
    const resp = await fetch(`/api/orders/${orderId}`, { method: "DELETE" });
    const result = await resp.json();
    if (result.ok) renderServerOrders();
  } catch {
    // ignore
  }
}

document.querySelector("#serverOrdersList").addEventListener("click", async (event) => {
  const detailBtn = event.target.closest(".server-detail-btn");
  if (detailBtn) {
    showOrderDetail(detailBtn.dataset.orderId);
    return;
  }
  const pdfBtn = event.target.closest(".server-pdf-btn");
  if (pdfBtn) {
    const orderId = pdfBtn.dataset.orderId;
    const statusEl = document.querySelector(`.server-pdf-status[data-order-id="${orderId}"]`);
    saveServerOrderPdf(orderId, statusEl);
    return;
  }
  const deleteBtn = event.target.closest(".server-delete-btn");
  if (deleteBtn) {
    deleteServerOrder(deleteBtn.dataset.orderId);
  }
});

document.querySelector("#serverOrdersList").addEventListener("change", (event) => {
  const select = event.target.closest(".server-status-select");
  if (select) updateOrderStatus(select.dataset.orderId, select.value);
});

document.querySelector("#closeOrderDetailButton").addEventListener("click", closeOrderDetail);
document.querySelector("#orderDetailBackdrop").addEventListener("click", closeOrderDetail);
document.querySelector("#clearEditingOrderButton").addEventListener("click", clearEditingOrder);

document.querySelector("#refreshServerOrdersButton").addEventListener("click", renderServerOrders);

function renderGalleryShelf() {
  const grid = document.querySelector("#galleryGrid");
  if (!grid) return;
  const templates = state.posterTemplates;
  const categoriesOrder = state.posterCategoriesOrder;
  if (!templates.length) {
    grid.innerHTML = '<p class="history-empty">テンプレートを読み込んでいます...</p>';
    return;
  }
  const shelves = categoriesOrder
    .map((category) => {
      const catTemplates = templates.filter((t) => t.categories.includes(category));
      if (!catTemplates.length) return "";
      const limit = state.galleryCategoryLimits[category] || GALLERY_PAGE_SIZE;
      const visible = catTemplates.slice(0, limit);
      const hasMore = catTemplates.length > limit;
      const thumbsHtml = visible
        .map((t) => {
          const isSelected = t.id === state.selectedTemplateId;
          return `
          <button class="gallery-thumb${isSelected ? " is-selected" : ""}" data-template-id="${t.id}" type="button" title="${t.title}">
            <div class="gallery-thumb-preview" style="${t.image ? `background-image:url('${t.image}');background-size:cover;background-position:center` : `--gallery-gradient:${t.gradient}`}">
              ${isSelected ? '<span class="gallery-selected-badge">選択中</span>' : ""}
              ${!t.image ? `<span class="gallery-thumb-title">${t.default_main_title || t.title}</span>` : ""}
              ${!t.poster_allowed ? '<span class="gallery-sample-badge">SAMPLE</span>' : ""}
            </div>
            <span class="gallery-thumb-label">${t.short_label}</span>
          </button>`;
        })
        .join("");
      const moreHtml = hasMore
        ? `<button class="gallery-more-btn" data-category="${category}" type="button">もっと見る（あと${catTemplates.length - limit}件）</button>`
        : "";
      return `
        <div class="gallery-shelf" data-category="${category}">
          <span class="gallery-shelf-label">${category}</span>
          <div class="gallery-shelf-track">${thumbsHtml}${moreHtml}</div>
        </div>`;
    })
    .join("");
  grid.innerHTML = shelves || '<p class="history-empty">テンプレートがありません</p>';
}

function applyPosterTemplate(template) {
  const isAllowed = template.poster_allowed === true;
  state.templateMaterial = {
    url: template.preview_image || template.image || null,        // 表示用（将来は低解像度）
    source_url: template.source_image || template.image || null,  // 保存用高解像度
    gradient: template.gradient,
    poster_allowed: isAllowed,
    source: "テンプレート素材",
    license: "テンプレート管理画像",
    usage: "template",
    license_note: isAllowed
      ? "テンプレート素材として使用可能"
      : "確認用サンプルです。正式素材をアップロードすればPNG/PDF保存できます。",
  };
  state.selectedTemplateId = template.id;
  if (template.flower_match) {
    const matchFlower = state.flowers.find((f) => f.name === template.flower_match);
    if (matchFlower) {
      state.selectedFlower = matchFlower;
      state.detailPhotoIndex = 0;
      renderFlowers();
      renderFlowerDetail();
    }
  }
  posterMainTitle.value = template.default_main_title || template.title;
  posterSubtitle.value = template.default_subtitle || "季節のおすすめ";
  posterNote.value = template.default_note || "";
  if (template.poster_type) posterType.value = template.poster_type;
  if (template.poster_design) {
    // 旧デザイン名を新モードにマップ
    const designMap = { "photo-full": "minimal", simple: "minimal", direct: "elegant", "pop-band": "strong-pop" };
    posterDesign.value = designMap[template.poster_design] ?? template.poster_design;
  }
  uploadedMaterialMode.value = "background";
  if (textOffsetX) { textOffsetX.value = "0"; if (textOffsetXValue) textOffsetXValue.textContent = "0"; }
  if (textOffsetY) { textOffsetY.value = "0"; if (textOffsetYValue) textOffsetYValue.textContent = "0"; }
  state.proposalBandOpacity = null;
  state.activeProposalIndex = -1;
  if (layoutProposalsEl) { layoutProposalsEl.hidden = true; layoutProposalsEl.innerHTML = ""; }
  if (template.poster_position) {
    const opts = Array.from(posterPosition.options);
    if (opts.some((o) => o.value === template.poster_position)) posterPosition.value = template.poster_position;
  }
  updatePoster();
  document.querySelectorAll(".gallery-thumb").forEach((el) => {
    el.classList.toggle("is-selected", el.dataset.templateId === template.id);
    const badge = el.querySelector(".gallery-selected-badge");
    const hasBadge = el.dataset.templateId === template.id;
    if (hasBadge && !badge) {
      const preview = el.querySelector(".gallery-thumb-preview");
      const b = document.createElement("span");
      b.className = "gallery-selected-badge";
      b.textContent = "選択中";
      preview.prepend(b);
    } else if (!hasBadge && badge) {
      badge.remove();
    }
  });
  scrollToSection("#posterSection");
}

document.querySelector("#galleryGrid").addEventListener("click", (event) => {
  const thumb = event.target.closest(".gallery-thumb");
  if (thumb?.dataset.templateId) {
    const template = state.posterTemplates.find((t) => t.id === thumb.dataset.templateId);
    if (template) applyPosterTemplate(template);
    return;
  }
  const moreBtn = event.target.closest(".gallery-more-btn");
  if (moreBtn?.dataset.category) {
    const cat = moreBtn.dataset.category;
    state.galleryCategoryLimits[cat] = (state.galleryCategoryLimits[cat] || GALLERY_PAGE_SIZE) + GALLERY_PAGE_SIZE;
    renderGalleryShelf();
  }
});

document.querySelector("#heroGalleryButton").addEventListener("click", () => scrollToSection("#gallerySection"));
document.querySelector("#heroStartButton").addEventListener("click", () => scrollToSection("#posterSection"));

function initStickyPreview() {
  const col = document.querySelector(".poster-preview-column");
  const card = document.querySelector(".poster-order-card");
  if (!col || !card) return;
  const STICKY_TOP = 80;

  function update() {
    if (window.innerWidth < 901) {
      col.style.transform = "";
      return;
    }
    col.style.transform = "";
    const colTop = col.getBoundingClientRect().top;
    if (colTop < STICKY_TOP) {
      const push = STICKY_TOP - colTop;
      const cardBottom = card.getBoundingClientRect().bottom;
      // maxPush: col が card 下端を超えないよう制限
      const maxPush = Math.max(0, cardBottom - colTop - col.offsetHeight);
      const finalPush = Math.min(push, maxPush);
      if (finalPush > 0) {
        col.style.transform = `translateY(${finalPush}px)`;
      }
    }
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  setTimeout(update, 300);
}

async function init() {
  try {
    const response = await fetch("/static/flowers.json?v=v1posterimage");
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
  try {
    const tplResp = await fetch("/api/poster-templates");
    const tplData = await tplResp.json();
    state.posterTemplates = tplData.templates || [];
    state.posterCategoriesOrder = tplData.categories_order || [];
  } catch {
    state.posterTemplates = [];
    state.posterCategoriesOrder = [];
  }
  renderGalleryShelf();
  renderOrderHistory();
  renderServerOrders();
  if (isConfirmModeFromUrl()) {
    showFinishReview({ updateUrl: false });
  }
  initStickyPreview();
}

init();

// ===== Showroom cards =====
document.querySelectorAll(".showroom-cta").forEach((btn) => {
  btn.addEventListener("click", () => scrollToSection("#gallerySection"));
});

// ===== Wish Form =====
(function initWishForm() {
  const wishState = {};
  const freeText = document.querySelector("#wishFreeText");

  document.querySelectorAll(".wish-chips").forEach((group) => {
    group.addEventListener("click", (e) => {
      const chip = e.target.closest(".wish-chip");
      if (!chip) return;
      const groupName = group.dataset.group;
      const wasActive = chip.classList.contains("is-active");
      group.querySelectorAll(".wish-chip").forEach((c) => c.classList.remove("is-active"));
      if (!wasActive) {
        chip.classList.add("is-active");
        wishState[groupName] = chip.dataset.value;
      } else {
        delete wishState[groupName];
      }
      renderWishSummary();
    });
  });

  if (freeText) freeText.addEventListener("input", renderWishSummary);

  function renderWishSummary() {
    const summary = document.querySelector("#wishSummary");
    const content = document.querySelector("#wishSummaryContent");
    if (!summary || !content) return;
    const tags = Object.values(wishState);
    const free = freeText ? freeText.value.trim() : "";
    if (free) tags.push(free);
    if (tags.length === 0) { summary.hidden = true; return; }
    summary.hidden = false;
    content.innerHTML = tags.map((t) => `<span class="wish-summary-tag">${t}</span>`).join("");
  }

  const galleryBtn = document.querySelector("#wishGalleryButton");
  if (galleryBtn) galleryBtn.addEventListener("click", () => scrollToSection("#gallerySection"));
})();

// ===== BGM =====
(function initBgm() {
  const btn = document.querySelector("#bgmButton");
  if (!btn) return;
  const audio = new Audio("/static/audio/gentle_flower_bgm.mp3");
  audio.loop = true;
  let playing = false;
  let broken = false;

  audio.addEventListener("error", () => {
    broken = true;
    btn.textContent = "BGMは準備中です";
    btn.disabled = true;
  });

  btn.addEventListener("click", () => {
    if (broken) return;
    if (playing) {
      audio.pause();
      playing = false;
      btn.textContent = "♪ BGM 再生";
      btn.classList.remove("is-playing");
    } else {
      audio.play().then(() => {
        playing = true;
        btn.textContent = "♪ BGM 停止";
        btn.classList.add("is-playing");
      }).catch(() => {
        broken = true;
        btn.textContent = "BGMは準備中です";
        btn.disabled = true;
      });
    }
  });
})();
