const GOAL_OPTIONS = [
  "認知を広げる（新規フォロワー向け）",
  "共感を増やす（反応を集める）",
  "信頼を高める（専門性を伝える）",
  "行動を促す（コメント・固定記事誘導）",
];

const TONE_OPTIONS = ["やさしい", "フラット", "熱量高め", "先輩っぽく端的"];

const CATEGORY_FALLBACK = ["自己開示", "成功体験", "失敗談", "共感", "勘違い指摘", "行動促進", "固定記事導線"];

const NG_WORDS_FALLBACK = ["絶対に稼げる", "今すぐ買って", "誰でも100%", "放置で月収100万", "知らないと損"];

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
    const treeSets = generateTwentyTreeSets({
      theme: dom.themeInput.value.trim(),
      goal: dom.goalSelect.value,
      tone: dom.toneSelect.value,
      categories: docsState.categories,
    });

    renderTreeSets(treeSets);
    dom.copyAllBtn.disabled = treeSets.length === 0;
    dom.status.textContent = `${treeSets.length}件のツリー投稿案を生成しました。`;
  });

  dom.copyAllBtn.addEventListener("click", async () => {
    const allText = collectAllTreeSetsText();
    if (!allText) {
      dom.status.textContent = "先に投稿を生成してください。";
      return;
    }

    const ok = await safeCopy(allText);
    dom.status.textContent = ok ? "20セットをまとめてコピーしました。" : "コピーに失敗しました。";
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
  const [samplePosts, ngWords] = await Promise.all([fetchText("docs/sample-posts.md"), fetchText("docs/ng-words.md")]);

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

function generateTwentyTreeSets({ theme, goal, tone, categories }) {
  const safeTheme = theme || "看護師の働き方を少し良くする工夫";
  const normalizedCategories = categories.length ? categories : CATEGORY_FALLBACK;
  const treeSets = [];

  for (let i = 0; i < 20; i += 1) {
    const tree = buildTreePosts({
      number: i + 1,
      category: normalizedCategories[i % normalizedCategories.length],
      theme: safeTheme,
      goal,
      tone,
    });

    treeSets.push({
      number: i + 1,
      post1: sanitizeNgWords(tree.post1, docsState.ngWords),
      post2: sanitizeNgWords(tree.post2, docsState.ngWords),
    });
  }

  return treeSets;
}

function buildTreePosts({ number, category, theme, goal, tone }) {
  const toneGuide = {
    やさしい: ["焦らなくていい", "いっしょに少しずつ", "できるところからで大丈夫"],
    フラット: ["思っていたよりシンプル", "まずは小さく試す", "事実ベースで整理する"],
    熱量高め: ["ここが変わると一気に前進", "勢いより継続が効く", "今の一歩が未来を変える"],
    先輩っぽく端的: ["結論、最初は1つで十分", "迷ったら負担が低い順", "まず実行、あとで改善"],
  };

  const hookPatterns = [
    `${theme}のこと、\nやろうと思うほど\n手が止まる日があった。`,
    `${theme}って\n「ちゃんとしなきゃ」で\n苦しくなりやすい。`,
    `${theme}を始めたころ、\nわたしは\n何から手をつけるか迷ってた。`,
    `${theme}でつまずく原因、\n才能じゃなくて\n順番の問題だった。`,
  ];

  const empathyPatterns = [
    "がんばってるのに進まないと、\n自分だけ遅れてる気がするよね。",
    "情報が多すぎると、\n選ぶだけで疲れてしまうよね。",
    "正解探しを続けるほど、\n行動が後ろにずれる感覚、あった。",
    "時間がない日は特に、\n完璧主義がいちばんの壁になる。",
  ];

  const insightPatterns = [
    "気づいたのは、\n完璧より\n続けられる形が強いってこと。",
    "学びになったのは、\n「小さく決める」と\n迷いが減ることだった。",
    "変わったのは、\n最初のハードルを\n5分まで下げてから。",
    "遠回りしてわかったのは、\n準備より\n1回目の実行が先ってこと。",
  ];

  const actionPatterns = [
    "今日は\n「今から10分でやること」を\n1つだけ決めてみて。",
    "まずは\nいちばん負担が軽い一歩を\n1つだけやってみよう。",
    "メモに\n「次の行動」を1行だけ書いて、\nそのまま手を動かしてみて。",
    "迷ったら\n「これなら今日できる」を選んで、\n小さく始めてみよう。",
  ];

  const bridgePatterns = [
    "同じところで迷ってる人の\nヒントになればうれしい。👇",
    "わたしの失敗ごと、\n役立つ形でこれからもシェアするね。👇",
    "このテーマで気づいたこと、\nまた具体例つきで書いていくね。👇",
    "似た悩みがある人に届くように、\n続きも投稿していくね。👇",
  ];

  const toneLine = toneGuide[tone] || toneGuide["フラット"];
  const hook = hookPatterns[number % hookPatterns.length];
  const empathy = empathyPatterns[number % empathyPatterns.length];
  const insight = insightPatterns[number % insightPatterns.length];
  const action = actionPatterns[number % actionPatterns.length];
  const bridge = bridgePatterns[number % bridgePatterns.length];
  const toneNote = toneLine[number % toneLine.length];

  const post1 = `${hook}\n\n${empathy}\n\n${category}でも、\n${goal}でも、\n最初は同じところで止まりやすい。\n\n${toneNote}。 1/2`;

  const post2 = `${insight}\n\n${action}\n\n${bridge} 2/2`;

  return { post1, post2 };
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

function renderTreeSets(treeSets) {
  dom.results.innerHTML = "";

  treeSets.forEach((treeSet) => {
    const node = dom.postTemplate.content.firstElementChild.cloneNode(true);
    const numberNode = node.querySelector(".post-number");
    const post1Node = node.querySelector(".post1-text");
    const post2Node = node.querySelector(".post2-text");
    const copyPost1Btn = node.querySelector(".copy-post1-btn");
    const copyPost2Btn = node.querySelector(".copy-post2-btn");
    const copyTreeBtn = node.querySelector(".copy-tree-btn");

    numberNode.textContent = `No.${treeSet.number}`;
    post1Node.value = treeSet.post1;
    post2Node.value = treeSet.post2;

    copyPost1Btn.addEventListener("click", async () => {
      const ok = await safeCopy(treeSet.post1);
      dom.status.textContent = ok
        ? `No.${treeSet.number} の投稿1をコピーしました。`
        : `No.${treeSet.number} の投稿1のコピーに失敗しました。`;
    });

    copyPost2Btn.addEventListener("click", async () => {
      const ok = await safeCopy(treeSet.post2);
      dom.status.textContent = ok
        ? `No.${treeSet.number} の投稿2をコピーしました。`
        : `No.${treeSet.number} の投稿2のコピーに失敗しました。`;
    });

    copyTreeBtn.addEventListener("click", async () => {
      const ok = await safeCopy(formatTreeSetText(treeSet));
      dom.status.textContent = ok
        ? `No.${treeSet.number} のツリーをコピーしました。`
        : `No.${treeSet.number} のツリーのコピーに失敗しました。`;
    });

    dom.results.append(node);
  });
}

function formatTreeSetText(treeSet) {
  return `No.${treeSet.number}\n投稿1（1/2）\n${treeSet.post1}\n\n投稿2（2/2）\n${treeSet.post2}`;
}

function collectAllTreeSetsText() {
  const cards = [...document.querySelectorAll(".post-card")];
  if (!cards.length) {
    return "";
  }

  return cards
    .map((card) => {
      const no = card.querySelector(".post-number")?.textContent || "";
      const post1 = card.querySelector(".post1-text")?.value || "";
      const post2 = card.querySelector(".post2-text")?.value || "";
      return `${no}\n投稿1（1/2）\n${post1}\n\n投稿2（2/2）\n${post2}`;
    })
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
