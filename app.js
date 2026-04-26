const NG_WORDS_FALLBACK = ["絶対に稼げる", "今すぐ買って", "誰でも100%", "放置で月収100万", "知らないと損"];
const PAID_ARTICLE_LINK = "https://note.com/ru_nurse/n/n48303b5f6ddb";
const FIXED_ARTICLE_LINK = "https://note.com/runa_ai_vlog/n/nd39117f18cc0";

const DEFAULT_THEMES = [
  "note初心者が挫折する理由",
  "有料記事を出すのが怖い理由",
  "ビューが伸びない人の共通点",
  "売れる記事と読まれる記事の違い",
  "固定記事を整えるべき理由",
  "無料記事で全部出しすぎる人が売れない理由",
  "noteのプロフィールを整えるべき理由",
  "毎日投稿しても売れない人の共通点",
  "文章力より導線が大事な理由",
  "有料記事の価格を下げても売れない理由",
  "AIで文章を書いても売れない理由",
  "自分の経験に価値がないと思ってしまう理由",
  "0→1達成に必要な考え方",
  "副業で遠回りする人の共通点",
  "noteで売れる無料部分の作り方",
  "読者が続きを読みたくなる文章の作り方",
  "note初心者がまず直すべき場所",
  "セールスなしで売れる導線の考え方",
  "るナースが副業で遠回りして気づいたこと",
  "看護師でもnote副業を続けられる理由",
];

const POST_SLOTS = [
  { time: "6:27", type: "朝の感情・共感型" },
  { time: "7:02", type: "注意喚起型" },
  { time: "7:37", type: "誰こいつ型" },
  { time: "8:08", type: "勘違い指摘型" },
  { time: "11:28", type: "問いかけ型" },
  { time: "12:13", type: "共感型" },
  { time: "12:32", type: "小さな行動提案型" },
  { time: "13:05", type: "失敗談型" },
  { time: "16:28", type: "気づき共有型" },
  { time: "17:01", type: "価値観共有型" },
  { time: "17:33", type: "勘違い指摘型" },
  { time: "18:36", type: "黄金の型" },
  { time: "19:12", type: "実績×気づき型" },
  { time: "19:34", type: "固定記事への自然導線型" },
  { time: "20:07", type: "直誘導寄り" },
  { time: "20:39", type: "間接誘導型" },
  { time: "21:02", type: "何者か開示型" },
  { time: "21:42", type: "共感＋背中押し型" },
  { time: "22:05", type: "本音型" },
  { time: "22:47", type: "締め投稿型" },
];

const docsState = { ngWords: NG_WORDS_FALLBACK };
const uiState = { treeSets: [] };

const dom = {
  themeInput: document.getElementById("themeInput"),
  fillRecommendedBtn: document.getElementById("fillRecommendedBtn"),
  clearThemesBtn: document.getElementById("clearThemesBtn"),
  generateBtn: document.getElementById("generateBtn"),
  copyAllBtn: document.getElementById("copyAllBtn"),
  results: document.getElementById("results"),
  status: document.getElementById("status"),
  postTemplate: document.getElementById("postTemplate"),
};

init();

async function init() {
  await loadDocs();

  dom.fillRecommendedBtn.addEventListener("click", () => {
    dom.themeInput.value = DEFAULT_THEMES.join("\n");
    showGlobalStatus("おすすめテーマを入力しました。", true);
  });

  dom.clearThemesBtn.addEventListener("click", () => {
    dom.themeInput.value = "";
    showGlobalStatus("テーマ一覧をクリアしました。", true);
  });

  dom.generateBtn.addEventListener("click", () => {
    uiState.treeSets = generateTwentyTreeSets(dom.themeInput.value);
    renderTreeSets(uiState.treeSets);
    dom.copyAllBtn.disabled = uiState.treeSets.length === 0;
    showGlobalStatus(`${uiState.treeSets.length}件のツリー投稿を生成しました。`, true);
  });

  dom.copyAllBtn.addEventListener("click", async () => {
    if (!uiState.treeSets.length) {
      showGlobalStatus("先に投稿を生成してください。", false);
      return;
    }

    await handleCopyAction({
      button: dom.copyAllBtn,
      text: collectAllTreeSetsText(uiState.treeSets),
      successMessage: "20セットをまとめてコピーしました。",
      failMessage: "コピーできませんでした。手動で選択してください。",
    });
  });
}

async function loadDocs() {
  const ngWords = await fetchText("docs/ng-words.md");
  const ngWordCandidates = parseMarkdownBullets(ngWords);
  if (ngWordCandidates.length) docsState.ngWords = ngWordCandidates;
}

async function fetchText(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) return "";
    return await res.text();
  } catch {
    return "";
  }
}

function parseMarkdownBullets(text) {
  return text
    .split("\n")
    .filter((line) => /^[-*]\s+/.test(line.trim()))
    .map((line) => line.replace(/^[-*]\s+/, "").trim())
    .filter(Boolean);
}

function parseThemeLines(themesText) {
  const themes = themesText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return themes.length ? themes : DEFAULT_THEMES;
}

function generateTwentyTreeSets(themesText) {
  const themes = parseThemeLines(themesText);

  return POST_SLOTS.map((slot, index) => {
    const number = index + 1;
    const theme = themes[index % themes.length];
    const mode = getAutoMode(slot.time);
    const tree = buildTreePosts({ slot, theme, mode, seed: Date.now() + index * 113 });

    return {
      number,
      time: slot.time,
      patternType: slot.type,
      theme,
      post1: sanitizeText(tree.post1),
      post2: sanitizeText(tree.post2),
    };
  });
}

function getAutoMode(time) {
  if (["7:37", "20:07"].includes(time)) return "direct";
  if (["12:13", "20:39"].includes(time)) return "indirect";
  return "normal";
}

function buildTreePosts({ slot, theme, mode, seed }) {
  const p = buildPerspective(theme, mode, seed);

  const hook = slot.time === "6:27" ? "おはるナース☀️" : pickRandom(["ちょっと聞いてほしい。", "正直、これでかなり遠回りした。", "これ、昔のわたしに一番伝えたい。"], seed + 1);

  const post1Lines = [
    hook,
    p.readerPain,
    p.readerMisunderstanding,
    `わたしもそうだった。${p.pastFailure}`,
    "でも気づいた。",
    p.cliff,
  ];

  const post2Lines = [
    p.awareness,
    `昔のわたしは、${p.pastFailure}`,
    p.concreteAction,
    "完璧じゃなくていい。",
    "同じように迷ってる読者は、まずここからで大丈夫。",
  ];

  const cta = getCtaByMode(mode, seed);
  if (cta) post2Lines.push(cta, getLinkByMode(mode));

  return {
    post1: post1Lines.join("\n\n"),
    post2: post2Lines.join("\n\n"),
  };
}

function buildPerspective(theme, mode, seed) {
  const normalPains = [
    "毎日投稿してるのに、反応が増えなくて心が折れそうになる。",
    "時間を使って書いてるのに、売上につながらなくて不安になる。",
    "頑張ってるのに変化が見えなくて、手が止まりそうになる。",
  ];
  const normalMisunderstandings = [
    "記事数を増やせば、いつか自然に売れると思ってた。",
    "文章を長くすれば価値が伝わると信じてた。",
    "知識を全部書けば、読者に喜ばれると思ってた。",
  ];

  const directPains = [
    "300円の記事は売れるのに、高単価にすると怖くて出せない。",
    "無料記事に全部書いてしまって、有料に残す内容がなくなる。",
    "セールス感が怖くて、案内文を書く手が止まる。",
  ];
  const directMisunderstandings = [
    "文章力が足りないから売れないと思ってた。",
    "価格を下げれば読者は増えると思ってた。",
    "有料にすること自体が悪いことだと思ってた。",
  ];

  const indirectPains = [
    "努力してるのに売れなくて、何を変えればいいか分からなくなる。",
    "無料記事を丁寧に書いてるのに、次の行動につながらない。",
    "毎日続けてるのに反応が薄くて、方向が合ってるか不安になる。",
  ];
  const indirectMisunderstandings = [
    "頑張る量を増やせば突破できると思ってた。",
    "有益なら読者は自然に進んでくれると思ってた。",
    "全部親切に書くほど売れると信じてた。",
  ];

  const selectedPains = mode === "direct" ? directPains : mode === "indirect" ? indirectPains : normalPains;
  const selectedMis = mode === "direct" ? directMisunderstandings : mode === "indirect" ? indirectMisunderstandings : normalMisunderstandings;

  return {
    readerPain: pickRandom(selectedPains, seed + 2),
    readerMisunderstanding: pickRandom(selectedMis, seed + 3),
    pastFailure: `テーマを見たまま書き始めて、話が散らかってしまってた。`,
    cliff: pickRandom([
      "努力不足じゃなかった。見直す場所が違った。",
      "止まる原因は根性じゃなくて、書く前の設計だった。",
      "答えはすぐ近くにあったのに、わたしはずっと外してた。",
    ], seed + 4),
    awareness: pickRandom([
      "見直す場所は、記事数じゃなくて『何につなげる投稿なのか』だった。",
      "わたしが変えたのは、書く量じゃなくて投稿の順番だった。",
      "遠回りを止めたきっかけは、読者の次の一歩を先に決めたことだった。",
    ], seed + 5),
    concreteAction: `今日はテーマ名をそのまま書かずに、
「読者の悩み」「勘違い」「わたしの失敗」「気づき」の4行メモを先に作ってから投稿する。`,
  };
}

function getCtaByMode(mode, seed) {
  if (mode === "direct") {
    return pickRandom([
      "低単価の記事から抜け出したくて、わたしが遠回りして見つけた「売れる文章の並べ方」はここにまとめました👇",
      "高単価に進むのが怖かったわたしが、少しずつ変えられた流れをここに残しました👇",
    ], seed + 6);
  }

  if (mode === "indirect") {
    return pickRandom([
      "わたしが遠回りして気づいた売れるnoteの「あるルール」は、固定記事にまとめています👇",
      "努力の方向を整えるために、最初に読んでほしい内容を固定記事に置いています👇",
    ], seed + 7);
  }

  return "";
}

function getLinkByMode(mode) {
  if (mode === "direct") return PAID_ARTICLE_LINK;
  if (mode === "indirect") return FIXED_ARTICLE_LINK;
  return "";
}

function pickRandom(list, seed) {
  return list[Math.abs(seed) % list.length];
}

function sanitizeText(text) {
  let next = text.replace(/\b私\b/g, "わたし").replace(/\n{3,}/g, "\n\n").trim();
  next = next.replace(/読み手/g, "読者");
  next = sanitizeNgWords(next, docsState.ngWords);
  return next;
}

function sanitizeNgWords(text, ngWords) {
  return ngWords.reduce((acc, word) => {
    if (!word) return acc;
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(escaped, "gi");
    return acc.replace(re, "[表現をやわらげる]");
  }, text);
}

function renderTreeSets(treeSets) {
  dom.results.innerHTML = "";

  treeSets.forEach((treeSet) => {
    const node = dom.postTemplate.content.firstElementChild.cloneNode(true);
    const numberNode = node.querySelector(".post-number");
    const timeNode = node.querySelector(".post-time");
    const themeNode = node.querySelector(".post-theme");
    const typeNode = node.querySelector(".post-type");
    const post1Node = node.querySelector(".post1-text");
    const post2Node = node.querySelector(".post2-text");
    const copyPost1Btn = node.querySelector(".copy-post1-btn");
    const copyPost2Btn = node.querySelector(".copy-post2-btn");
    const copyTreeBtn = node.querySelector(".copy-tree-btn");
    const feedbackNode = node.querySelector(".copy-feedback");

    numberNode.textContent = `No.${treeSet.number}`;
    timeNode.textContent = `投稿時間：${treeSet.time}`;
    themeNode.textContent = `テーマ：${treeSet.theme}`;
    typeNode.textContent = `型：${treeSet.patternType}`;
    post1Node.value = treeSet.post1;
    post2Node.value = treeSet.post2;

    copyPost1Btn.addEventListener("click", async () => {
      await handleCopyAction({ button: copyPost1Btn, text: treeSet.post1, successMessage: `No.${treeSet.number} の投稿1をコピーしました。`, failMessage: "コピーできませんでした。手動で選択してください。", feedbackNode });
    });

    copyPost2Btn.addEventListener("click", async () => {
      await handleCopyAction({ button: copyPost2Btn, text: treeSet.post2, successMessage: `No.${treeSet.number} の投稿2をコピーしました。`, failMessage: "コピーできませんでした。手動で選択してください。", feedbackNode });
    });

    copyTreeBtn.addEventListener("click", async () => {
      await handleCopyAction({ button: copyTreeBtn, text: formatTreeSetText(treeSet), successMessage: `No.${treeSet.number} のツリーをコピーしました。`, failMessage: "コピーできませんでした。手動で選択してください。", feedbackNode });
    });

    dom.results.append(node);
  });
}

function formatTreeSetText(treeSet) {
  return `【${treeSet.time}】\nNo.${treeSet.number}\nテーマ：${treeSet.theme}\n型：${treeSet.patternType}\n\n投稿1（1/2）\n${treeSet.post1}\n\n投稿2（2/2）\n${treeSet.post2}`;
}

function collectAllTreeSetsText(treeSets) {
  return treeSets.map((treeSet) => formatTreeSetText(treeSet)).join("\n\n--------------------\n\n");
}

async function handleCopyAction({ button, text, successMessage, failMessage, feedbackNode }) {
  const defaultLabel = button.dataset.defaultLabel || button.textContent;
  const ok = await safeCopy(text);

  if (ok) {
    button.textContent = "コピーしました";
    showGlobalStatus(successMessage, true);
    if (feedbackNode) {
      feedbackNode.textContent = "コピーしました";
      feedbackNode.classList.remove("error");
    }

    window.setTimeout(() => {
      button.textContent = defaultLabel;
      if (feedbackNode) feedbackNode.textContent = "";
    }, 2000);
    return;
  }

  showGlobalStatus(failMessage, false);
  if (feedbackNode) {
    feedbackNode.textContent = failMessage;
    feedbackNode.classList.add("error");
  }
}

function showGlobalStatus(message, isSuccess) {
  dom.status.textContent = message;
  dom.status.classList.toggle("error", !isSuccess);
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
