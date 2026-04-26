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
      themesText: dom.themeInput.value,
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

function parseThemeLines(themesText) {
  const themes = themesText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (themes.length > 0) {
    return themes;
  }

  return ["note初心者が続けやすくなる書き方"];
}

function generateTwentyTreeSets({ themesText, goal, tone, categories }) {
  const themes = parseThemeLines(themesText);
  const normalizedCategories = categories.length ? categories : CATEGORY_FALLBACK;
  const treeSets = [];

  for (let i = 0; i < 20; i += 1) {
    const baseTheme = themes[i % themes.length];
    const categoryHint = normalizedCategories[i % normalizedCategories.length];
    const variantTheme = buildVariantTheme(baseTheme, i, themes.length > 1 ? "multi" : "single", categoryHint);

    const tree = buildTreePosts({
      number: i + 1,
      theme: variantTheme,
      goal,
      tone,
    });

    treeSets.push({
      number: i + 1,
      theme: variantTheme,
      post1: sanitizeNgWords(tree.post1, docsState.ngWords),
      post2: sanitizeNgWords(tree.post2, docsState.ngWords),
    });
  }

  return treeSets;
}

function buildVariantTheme(theme, index, mode, categoryHint) {
  if (mode === "multi") {
    return theme;
  }

  const angles = [
    "最初のつまずき",
    "行動が止まる理由",
    "遠回りしがちな勘違い",
    "続けるための設計",
    "読まれる導入の作り方",
    "売れない原因の見直し",
    "不安との向き合い方",
    "反応が伸びる改善ポイント",
    "時間がない人向けの工夫",
    "固定記事につなげる考え方",
  ];

  const angle = angles[index % angles.length];
  return `${theme}（${angle}・${categoryHint}）`;
}

function buildTreePosts({ number, theme, goal, tone }) {
  const toneGuide = {
    やさしい: ["焦らなくて大丈夫", "わたしもそうだった", "いっしょに整えていこう"],
    フラット: ["正直、仕組みで変わる", "でも気づいたらシンプルだった", "順番でかなり楽になる"],
    熱量高め: ["ここを変えると一気に進む", "今日の一歩が未来を変える", "止まるより小さく動こう"],
    先輩っぽく端的: ["結論、最初は1つでいい", "難しくしない方が続く", "まず実行、あとで改善でOK"],
  };

  const hookPatterns = [
    `${theme}、\nがんばってるのに\nなぜか進まない。`,
    `${theme}って\n「ちゃんとやらなきゃ」で\n苦しくなるんだよね。`,
    `${theme}をやろうとすると、\n投稿前に\n不安で手が止まってた。`,
    `${theme}で悩む人、\n実はすごく多いって\n最近あらためて思った。`,
  ];

  const painPatterns = [
    "何を書けばいいか迷って、\n下書きだけ増える。",
    "時間をかけたのに反応がなくて、\n自信が削れていく。",
    "正解を探しすぎて、\n結局なにも出せない日が続く。",
    "がんばってるのに空回りしてる感じ、\n正直つらいよね。",
  ];

  const empathyPatterns = [
    "わたしもそうだった。\nだから、そのしんどさわかる。",
    "わたしも最初、\n同じところで何度も止まってた。",
    "「向いてないのかも」って\nわたしも何回も思ってた。",
    "でも気づいた。\n止まる理由は才能じゃなかった。",
  ];

  const cliffEndings = [
    "でも、原因はそこじゃなかった。 1/2",
    "わたしはずっと、ここを勘違いしてた。 1/2",
    "売れない理由は、意外とシンプルだった。 1/2",
    "続けられない人ほど、最初にここでつまずく。 1/2",
    "ここに気づくまで、かなり遠回りした。 1/2",
  ];

  const answerPatterns = [
    "答えは、\n最初から完璧を目指していたこと。",
    "答えは、\n読まれる前提じゃなく「伝わる1人」を決めてなかったこと。",
    "答えは、\n投稿の質より先に投稿回数を怖がっていたこと。",
    "答えは、\nやることを増やしすぎて、1歩目が重くなっていたこと。",
  ];

  const insightPatterns = [
    "わたしは、\n10点でも出すって決めてから\nやっと流れが変わった。",
    "正直、知識より\n「毎日ちょっと出す設計」の方が\n効果が大きかった。",
    "わたしも最初は怖かった。\nでも1本出すたびに\n怖さはちゃんと小さくなる。",
    "でも気づいた。\n読まれない時期はムダじゃなくて、\n届け方を学ぶ期間だった。",
  ];

  const actionPatterns = [
    "今日は、\n30分で1投稿の下書きだけ作ろう。\n完成は明日でいい。",
    "まずは、\n「誰のどんな悩みか」を1行で書いてから\n本文を書いてみて。",
    "次の投稿は、\n結論を1行目に置いて\n3行だけで出してみよう。",
    "迷ったら、\n昨日の自分に向けて書く。\nこれだけで言葉がやさしくなる。",
  ];

  const bridgePatterns = [
    "同じように迷ってるなら、\nまず1本だけ一緒に出してみよう。 2/2",
    "note初心者さんほど、\n小さく出すだけでちゃんと前に進める。 2/2",
    "固定記事の整え方も、\n必要なら次の投稿で具体的に書くね。 2/2",
    "わたしの失敗ベースでよければ、\nこれからもリアルにシェアしていく。 2/2",
  ];

  const toneLine = (toneGuide[tone] || toneGuide.フラット)[number % 3];
  const hook = hookPatterns[number % hookPatterns.length];
  const pain = painPatterns[number % painPatterns.length];
  const empathy = empathyPatterns[number % empathyPatterns.length];
  const cliff = cliffEndings[number % cliffEndings.length];
  const answer = answerPatterns[number % answerPatterns.length];
  const insight = insightPatterns[number % insightPatterns.length];
  const action = actionPatterns[number % actionPatterns.length];
  const bridge = bridgePatterns[number % bridgePatterns.length];

  const post1 = `${hook}\n\n${pain}\n\n${empathy}\n\n${toneLine}。\n${cliff}`;
  const post2 = `${answer}\n\n${insight}\n\n${action}\n\n${goal}を意識するなら、\n次の1投稿を先に予約しておくと止まりにくい。\n\n${bridge}`;

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
    const themeNode = node.querySelector(".post-theme");
    const post1Node = node.querySelector(".post1-text");
    const post2Node = node.querySelector(".post2-text");
    const copyPost1Btn = node.querySelector(".copy-post1-btn");
    const copyPost2Btn = node.querySelector(".copy-post2-btn");
    const copyTreeBtn = node.querySelector(".copy-tree-btn");

    numberNode.textContent = `No.${treeSet.number}`;
    themeNode.textContent = `テーマ：${treeSet.theme}`;
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
  return `No.${treeSet.number}\nテーマ：${treeSet.theme}\n\n投稿1（1/2）\n${treeSet.post1}\n\n投稿2（2/2）\n${treeSet.post2}`;
}

function collectAllTreeSetsText() {
  const cards = [...document.querySelectorAll(".post-card")];
  if (!cards.length) {
    return "";
  }

  return cards
    .map((card) => {
      const no = card.querySelector(".post-number")?.textContent || "";
      const theme = card.querySelector(".post-theme")?.textContent || "";
      const post1 = card.querySelector(".post1-text")?.value || "";
      const post2 = card.querySelector(".post2-text")?.value || "";
      return `${no}\n${theme}\n\n投稿1（1/2）\n${post1}\n\n投稿2（2/2）\n${post2}`;
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
