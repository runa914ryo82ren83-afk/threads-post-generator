const GOAL_OPTIONS = [
  "認知を広げる（新規フォロワー向け）",
  "共感を増やす（反応を集める）",
  "信頼を高める（専門性を伝える）",
  "行動を促す（コメント・固定記事誘導）",
];

const TONE_OPTIONS = ["やさしい", "フラット", "熱量高め", "先輩っぽく端的"];

const CATEGORY_FALLBACK = [
  "自己開示",
  "成功体験",
  "失敗談",
  "共感",
  "勘違い指摘",
  "行動促進",
  "固定記事導線",
];

const NG_WORDS_FALLBACK = [
  "絶対に稼げる",
  "今すぐ買って",
  "誰でも100%",
  "放置で月収100万",
  "知らないと損",
];

const docsState = {
  categories: CATEGORY_FALLBACK,
  ngWords: NG_WORDS_FALLBACK,
};

const dom = {
  themeInput: document.getElementById("themeInput"),
  goalSelect: document.getElementById("goalSelect"),
  toneSelect: document.getElementById("toneSelect"),
  generateBtn: document.getElementById("generateBtn"),
  copyAllBtn: document.getElementById("copyAllBtn"),
  results: document.getElementById("results"),
  status: document.getElementById("status"),
  postTemplate: document.getElementById("postTemplate"),
};

init();

async function init() {
  fillOptions();
  await loadDocs();

  dom.generateBtn.addEventListener("click", () => {
    const posts = generateTwentyPosts({
      theme: dom.themeInput.value.trim(),
      goal: dom.goalSelect.value,
      tone: dom.toneSelect.value,
      categories: docsState.categories,
    });

    renderPosts(posts);
    dom.copyAllBtn.disabled = posts.length === 0;
    dom.status.textContent = `${posts.length}件の投稿案を生成しました。`;
  });

  dom.copyAllBtn.addEventListener("click", async () => {
    const allText = collectAllPostsText();
    if (!allText) {
      dom.status.textContent = "先に投稿を生成してください。";
      return;
    }

    const ok = await safeCopy(allText);
    dom.status.textContent = ok ? "20投稿をまとめてコピーしました。" : "コピーに失敗しました。";
  });
}

function fillOptions() {
  GOAL_OPTIONS.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    dom.goalSelect.append(option);
  });

  TONE_OPTIONS.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    dom.toneSelect.append(option);
  });

  dom.goalSelect.selectedIndex = 0;
  dom.toneSelect.selectedIndex = 0;
}

async function loadDocs() {
  const [samplePosts, ngWords] = await Promise.all([
    fetchText("docs/sample-posts.md"),
    fetchText("docs/ng-words.md"),
  ]);

  const categories = parseMarkdownHeadings(samplePosts);
  const ngWordCandidates = parseMarkdownBullets(ngWords);

  if (categories.length) {
    docsState.categories = categories;
  }
  if (ngWordCandidates.length) {
    docsState.ngWords = ngWordCandidates;
  }
}

async function fetchText(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) {
      return "";
    }
    return await res.text();
  } catch {
    return "";
  }
}

function parseMarkdownHeadings(text) {
  return text
    .split("\n")
    .filter((line) => line.trim().startsWith("## "))
    .map((line) => line.replace(/^##\s*/, "").trim())
    .filter((line) => line.length > 0 && line !== "サンプル投稿");
}

function parseMarkdownBullets(text) {
  return text
    .split("\n")
    .filter((line) => /^[-*]\s+/.test(line.trim()))
    .map((line) => line.replace(/^[-*]\s+/, "").trim())
    .filter(Boolean);
}

function generateTwentyPosts({ theme, goal, tone, categories }) {
  const safeTheme = theme || "看護師の働き方を少し良くする工夫";
  const normalizedCategories = categories.length ? categories : CATEGORY_FALLBACK;
  const posts = [];

  for (let i = 0; i < 20; i += 1) {
    const category = normalizedCategories[i % normalizedCategories.length];
    const body = buildPostBody({
      number: i + 1,
      category,
      theme: safeTheme,
      goal,
      tone,
    });

    posts.push({
      number: i + 1,
      category,
      text: sanitizeNgWords(body, docsState.ngWords),
    });
  }

  return posts;
}

function buildPostBody({ number, category, theme, goal, tone }) {
  const toneGuide = {
    やさしい: "読み手が安心できる言葉を選び、難しい言葉はかみ砕く",
    フラット: "主観と事実のバランスを取り、短くわかりやすく",
    熱量高め: "体験と感情を強めに出し、背中を押す言い回し",
    先輩っぽく端的: "結論→理由→一言アドバイスの順で簡潔に",
  };

  const openingPatterns = [
    `【${theme}】今日の気づき${number}`,
    `${theme}で遠回りしないコツ`,
    `最初に知っておきたかった${theme}の話`,
    `${theme}で不安が減った小さな習慣`,
  ];

  const promptPatterns = [
    "同じ悩みがある人は、今つまずいているポイントをコメントで教えてください。",
    "あなたならどこから始めますか？一言でOKです。",
    "試してみたいと思ったら『やる』とコメントしてください。",
    "似た経験があれば、ひとこと共有してもらえると嬉しいです。",
  ];

  const opening = openingPatterns[number % openingPatterns.length];
  const prompt = promptPatterns[number % promptPatterns.length];

  return `${opening}

カテゴリ：${category}
今日の狙い：${goal}
口調メモ：${tone}（${toneGuide[tone] || toneGuide["フラット"]}）

伝えたいこと：
${theme}は「完璧にやる」より「続けられる形にする」ほうが結果につながりやすいです。
まずは5分でできる行動を1つ決めるだけで、次の一歩がかなり軽くなります。

しめ：
${prompt}`;
}

function sanitizeNgWords(text, ngWords) {
  return ngWords.reduce((acc, word) => {
    if (!word) {
      return acc;
    }
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(escaped, "gi");
    return acc.replace(re, "[表現をやわらげる]");
  }, text);
}

function renderPosts(posts) {
  dom.results.innerHTML = "";

  posts.forEach((post) => {
    const node = dom.postTemplate.content.firstElementChild.cloneNode(true);
    const numberNode = node.querySelector(".post-number");
    const categoryNode = node.querySelector(".post-category");
    const textNode = node.querySelector(".post-text");
    const copyBtn = node.querySelector(".copy-btn");

    numberNode.textContent = `No.${post.number}`;
    categoryNode.textContent = post.category;
    textNode.value = post.text;

    copyBtn.addEventListener("click", async () => {
      const ok = await safeCopy(post.text);
      dom.status.textContent = ok
        ? `No.${post.number} をコピーしました。`
        : `No.${post.number} のコピーに失敗しました。`;
    });

    dom.results.append(node);
  });
}

function collectAllPostsText() {
  const areas = [...document.querySelectorAll(".post-text")];
  if (!areas.length) {
    return "";
  }

  return areas
    .map((area, index) => `---- 投稿${index + 1} ----\n${area.value}`)
    .join("\n\n");
}

async function safeCopy(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.append(temp);
    temp.select();
    const success = document.execCommand("copy");
    temp.remove();
    return success;
  }
}
