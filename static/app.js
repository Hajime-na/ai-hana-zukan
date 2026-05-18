const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const quickList = document.querySelector("#quickList");
const flowerCard = document.querySelector("#flowerCard");
const aiButton = document.querySelector("#aiButton");
const aiQuestion = document.querySelector("#aiQuestion");
const aiAnswer = document.querySelector("#aiAnswer");
const consultChips = document.querySelector(".consult-chips");

let flowers = [];
let selectedFlower = null;
let currentPhotoIndex = 0;

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));

function makePopText(flower, purpose, tone) {
  const toneMap = {
    "上品": "落ち着いた華やかさで",
    "やさしい": "やわらかな色合いで",
    "華やか": "ぱっと目を引く華やかさで",
    "親しみやすい": "気取らず明るい雰囲気で"
  };
  const purposeMap = {
    "ギフト": `大切な方へ、${flower.name}を使った心に残る贈り物を。`,
    "自宅用": `日々の空間に、${flower.name}の季節感をひとさじ。`,
    "季節提案": `今の季節を楽しむなら、表情豊かな${flower.name}を。`,
    "お祝い": `お誕生日・ご結婚・ご開店など、晴れの日を${flower.name}で美しく彩ります。`
  };
  const languageLine = flower.language
    ? `「${flower.language}」の花言葉に、祝福の気持ちを添えて。`
    : "祝福の気持ちを花に託して。";

  return `${purposeMap[purpose] || purposeMap["ギフト"]}\n${toneMap[tone] || toneMap["上品"]}、相手を思う気持ちがまっすぐ伝わります。\n${languageLine}`;
}

function makeOccasionMessage(flower, occasion) {
  const messages = {
    "お誕生日": `${occasion}おめでとうございます。\n${flower.name}のやさしい華やぎに、笑顔あふれる一年への願いを込めて。`,
    "ご結婚": `${occasion}おめでとうございます。\nおふたりの毎日が、${flower.name}のように穏やかで美しく彩られますように。`,
    "開店": `${occasion}おめでとうございます。\n新しいお店が、${flower.name}の彩りのように多くの方に愛されますように。`,
    "ご出産": `${occasion}おめでとうございます。\n新しい命の誕生に、${flower.name}のやさしい祝福を添えて。`,
    "ご入学": `${occasion}おめでとうございます。\n新しい一歩が、${flower.name}のように明るく実りある日々になりますように。`
  };

  return messages[occasion] || "";
}

function renderFlower(flower, photoIndex = 0) {
  selectedFlower = flower;
  const photos = flower.photos?.length
    ? flower.photos
    : [{
      url: flower.photo_url,
      source: flower.photo_source || "Free image source",
      license: flower.photo_license || "Free license",
      label: "メイン",
      focal: "center"
    }];
  currentPhotoIndex = (photoIndex + photos.length) % photos.length;
  const photo = photos[currentPhotoIndex];
  const colorTags = flower.colors.map((color) => `<span class="tag">${escapeHtml(color)}</span>`).join("");
  const thumbnailButtons = photos.map((item, index) => `
    <button class="photo-thumb ${index === currentPhotoIndex ? "is-active" : ""}" type="button" data-photo-index="${index}" aria-label="${escapeHtml(item.label || `${index + 1}枚目`)}の写真を表示">
      <img src="${escapeHtml(item.url)}" alt="" loading="lazy">
      <span>${escapeHtml(item.label || `${index + 1}`)}</span>
    </button>
  `).join("");

  flowerCard.innerHTML = `
    <div class="flower-photo-wrap">
      <img class="flower-photo" src="${escapeHtml(photo.url)}" alt="${escapeHtml(flower.name)}の写真" loading="lazy" style="object-position: ${escapeHtml(photo.focal || "center")};" onerror="this.closest('.flower-photo-wrap').classList.add('is-broken'); this.remove();">
      <div class="photo-fallback">写真を読み込めませんでした</div>
      <button class="photo-nav photo-prev" type="button" data-photo-action="prev" aria-label="前の写真">‹</button>
      <button class="photo-nav photo-next" type="button" data-photo-action="next" aria-label="次の写真">›</button>
      <div class="photo-count">${currentPhotoIndex + 1} / ${photos.length}</div>
    </div>
    <header class="flower-header">
      <div>
        <p class="eyebrow">${escapeHtml(flower.english_name)}</p>
        <h2>${escapeHtml(flower.name)}</h2>
        <p class="flower-romaji">${escapeHtml(flower.romaji || flower.english_name)}</p>
        <div class="flower-meta">
          <span class="tag">季節：${escapeHtml(flower.season)}</span>
          ${colorTags}
        </div>
      </div>
      <div class="initial" aria-hidden="true">${escapeHtml(flower.name.slice(0, 1))}</div>
    </header>
    <div class="photo-strip" aria-label="写真切り替え">
      ${thumbnailButtons}
    </div>
    <p class="photo-credit">Photo: ${escapeHtml(photo.source || "Free image source")} / ${escapeHtml(photo.license || "Free license")}</p>
    <div class="detail-grid">
      <section class="detail-block">
        <h3>花の特徴</h3>
        <p>${escapeHtml(flower.feature)}</p>
      </section>
      <section class="detail-block">
        <h3>育て方・管理</h3>
        <p>${escapeHtml(flower.care)}</p>
      </section>
      <section class="detail-block">
        <h3>花言葉</h3>
        <p>${escapeHtml(flower.language)}</p>
      </section>
      <section class="detail-block promo-block">
        <h3>店頭POP文</h3>
        <p id="popText">${escapeHtml(flower.pop)}</p>
      </section>
      <section class="detail-block wide pop-maker">
        <div class="pop-maker-heading">
          <div>
            <p class="panel-label">POP作成</p>
            <h3>店頭用の一言を作る</h3>
          </div>
          <button type="button" data-copy-pop>文をコピー</button>
        </div>
        <div class="pop-controls">
          <label>
            用途
            <select id="popPurpose">
              <option value="ギフト">ギフト</option>
              <option value="自宅用">自宅用</option>
              <option value="季節提案">季節提案</option>
              <option value="お祝い">お祝い</option>
            </select>
          </label>
          <label>
            雰囲気
            <select id="popTone">
              <option value="上品">上品</option>
              <option value="やさしい">やさしい</option>
              <option value="華やか">華やか</option>
              <option value="親しみやすい">親しみやすい</option>
            </select>
          </label>
          <button type="button" data-make-pop>作成する</button>
        </div>
        <div class="occasion-panel">
          <p>お祝いメッセージ例</p>
          <div class="occasion-buttons">
            <button type="button" data-occasion="お誕生日">お誕生日</button>
            <button type="button" data-occasion="ご結婚">ご結婚</button>
            <button type="button" data-occasion="開店">開店</button>
            <button type="button" data-occasion="ご出産">ご出産</button>
            <button type="button" data-occasion="ご入学">ご入学</button>
          </div>
        </div>
        <div class="occasion-message" id="occasionMessage">ボタンを選ぶと、贈る相手に合わせたメッセージ例を表示します。</div>
        <textarea id="popDraft" readonly>${escapeHtml(flower.pop)}</textarea>
        <p class="copy-status" id="copyStatus" aria-live="polite"></p>
      </section>
      <section class="detail-block wide promo-block instagram-block">
        <h3>Instagram投稿文</h3>
        <p>${escapeHtml(flower.instagram)}</p>
      </section>
    </div>
  `;
}

function renderNotice(message) {
  flowerCard.innerHTML = `<div class="notice">${escapeHtml(message)}</div>`;
}

function findFlowers(keyword) {
  const normalized = keyword.trim().toLowerCase();
  if (!normalized) {
    return [];
  }

  return flowers.filter((flower) =>
    flower.name.toLowerCase().includes(normalized) ||
    flower.reading.toLowerCase().includes(normalized) ||
    flower.english_name.toLowerCase().includes(normalized)
  );
}

function handleSearch(keyword) {
  const matches = findFlowers(keyword);
  if (matches.length === 0) {
    renderNotice("該当する花が見つかりませんでした。別の花名や読み方で検索してください。");
    return;
  }

  renderFlower(matches[0]);
}

flowerCard.addEventListener("click", (event) => {
  if (!selectedFlower) {
    return;
  }

  const actionButton = event.target.closest("[data-photo-action]");
  if (actionButton) {
    const direction = actionButton.dataset.photoAction === "next" ? 1 : -1;
    renderFlower(selectedFlower, currentPhotoIndex + direction);
    return;
  }

  const thumbButton = event.target.closest("[data-photo-index]");
  if (thumbButton) {
    renderFlower(selectedFlower, Number(thumbButton.dataset.photoIndex));
  }
});

flowerCard.addEventListener("click", async (event) => {
  if (!selectedFlower) {
    return;
  }

  if (event.target.closest("[data-make-pop]")) {
    const purpose = document.querySelector("#popPurpose")?.value || "ギフト";
    const tone = document.querySelector("#popTone")?.value || "上品";
    const draft = makePopText(selectedFlower, purpose, tone);
    document.querySelector("#popDraft").value = draft;
    document.querySelector("#popText").textContent = draft;
    document.querySelector("#copyStatus").textContent = "POP文を作成しました。";
    return;
  }

  const occasionButton = event.target.closest("[data-occasion]");
  if (occasionButton) {
    const occasion = occasionButton.dataset.occasion;
    const message = makeOccasionMessage(selectedFlower, occasion);
    document.querySelectorAll("[data-occasion]").forEach((button) => {
      button.classList.toggle("is-active", button === occasionButton);
    });
    document.querySelector("#occasionMessage").textContent = message;
    document.querySelector("#popDraft").value = message;
    document.querySelector("#popText").textContent = message;
    document.querySelector("#copyStatus").textContent = `${occasion}のメッセージ例を表示しました。`;
    return;
  }

  if (event.target.closest("[data-copy-pop]")) {
    const text = document.querySelector("#popDraft")?.value || document.querySelector("#popText")?.textContent || "";
    try {
      await navigator.clipboard.writeText(text);
      document.querySelector("#copyStatus").textContent = "コピーしました。";
    } catch (error) {
      document.querySelector("#copyStatus").textContent = "コピーできない場合は、下の文を選択して使ってください。";
      document.querySelector("#popDraft")?.select();
    }
  }
});

function renderQuickList() {
  quickList.innerHTML = flowers.map((flower) => (
    `<button type="button" data-name="${escapeHtml(flower.name)}">${escapeHtml(flower.name)}</button>`
  )).join("");
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch(searchInput.value);
});

quickList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-name]");
  if (!button) {
    return;
  }

  searchInput.value = button.dataset.name;
  handleSearch(button.dataset.name);
});

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.trim();
  if (keyword.length >= 1) {
    const matches = findFlowers(keyword);
    if (matches.length === 1) {
      renderFlower(matches[0]);
    }
  }
});

aiButton.addEventListener("click", () => {
  const question = aiQuestion.value.trim();
  aiAnswer.textContent = question
    ? "ありがとうございます。試作版では固定回答です。用途・色味・ご予算を確認し、季節感のある花を1種類主役にすると提案がまとまりやすくなります。"
    : "相談内容を入力すると、ここにAI回答の見本が表示されます。試作版では固定回答です。";
});

consultChips.addEventListener("click", (event) => {
  const button = event.target.closest("[data-consult]");
  if (!button) {
    return;
  }

  aiQuestion.value = button.textContent;
  aiAnswer.textContent = button.dataset.consult;
});

async function init() {
  try {
    const response = await fetch("/api/flowers");
    flowers = await response.json();
    renderQuickList();
  } catch (error) {
    renderNotice("花データを読み込めませんでした。FastAPIサーバーが起動しているか確認してください。");
  }
}

init();
