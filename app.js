const NG_WORDS_FALLBACK = ["絶対に稼げる", "今すぐ買って", "誰でも100%", "放置で月収100万", "知らないと損"];

const BANNED_IN_BODY = [
  "認知を広げる",
  "今日の狙い",
  "口調メモ",
  "カテゴリ",
  "設計",
  "内部設定",
  "次の1投稿を予約しておくと止まりにくい",
  "効果が大きかった",
  "を意識するなら",
  "テンプレート",
  "投稿案",
];

const PATTERN_TYPES = [
  "注意喚起型",
  "昔のわたし型",
  "勘違い指摘型",
  "あるある共感型",
  "失敗談型",
  "気づき共有型",
  "固定記事への自然導線型",
  "背中押し型",
];

const docsState = {
  ngWords: NG_WORDS_FALLBACK,
};

const dom = {
  themeInput: document.getElementById("themeInput"),
  generateBtn: document.getElementById("generateBtn"),
  copyAllBtn: document.getElementById("copyAllBtn"),
  results: document.getElementById("results"),
  status: document.getElementById("status"),
  postTemplate: document.getElementById("postTemplate"),
};

init();

async function init() {
  await loadDocs();

  dom.generateBtn.addEventListener("click", () => {
    const treeSets = generateTwentyTreeSets({ themesText: dom.themeInput.value });
    renderTreeSets(treeSets);
    dom.copyAllBtn.disabled = treeSets.length === 0;
    dom.status.textContent = `${treeSets.length}件のツリー投稿を生成しました。`;
  });

  dom.copyAllBtn.addEventListener("click", async () => {
    const allText = collectAllTreeSetsText();
    if (!allText) {
      showGlobalStatus("先に投稿を生成してください。", false);
      return;
    }

    await handleCopyAction({
      button: dom.copyAllBtn,
      text: allText,
      successMessage: "20セットをまとめてコピーしました。",
      failMessage: "コピーできませんでした。手動で選択してください。",
    });
  });
}

async function loadDocs() {
  const ngWords = await fetchText("docs/ng-words.md");
  const ngWordCandidates = parseMarkdownBullets(ngWords);

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

  return ["note初心者が挫折する理由"];
}

function generateTwentyTreeSets({ themesText }) {
  const themes = parseThemeLines(themesText);
  const treeSets = [];

  for (let i = 0; i < 20; i += 1) {
    const number = i + 1;
    const theme = themes[i % themes.length];
    const patternType = PATTERN_TYPES[i % PATTERN_TYPES.length];

    const tree = buildTreePosts({ number, theme, patternType });
    const sanitized = sanitizeTree(tree);

    treeSets.push({
      number,
      theme,
      patternType,
      post1: sanitized.post1,
      post2: sanitized.post2,
    });
  }

  return treeSets;
}

function buildTreePosts({ number, theme, patternType }) {
  const hookLines = {
    注意喚起型: [
      `${theme}で止まる人、ここ見落としがち。`,
      `${theme}、努力量より先に見直す場所がある。`,
    ],
    昔のわたし型: [`これ、昔のわたしです。`, `正直、わたしは${theme}で何度も止まった。`],
    勘違い指摘型: [`${theme}で一番多い勘違い、先に言うね。`, `${theme}、がんばる場所を間違えると苦しくなる。`],
    あるある共感型: [`${theme}、これで悩むのわたしだけじゃなかった。`, `${theme}で手が止まる夜、ほんと多い。`],
    失敗談型: [`${theme}で、わたしは遠回りした。`, `正直、${theme}で失敗をくり返してた。`],
    気づき共有型: [`${theme}、ある日やっと原因が見えた。`, `${theme}で詰まってた理由、あとで気づいた。`],
    固定記事への自然導線型: [`${theme}で迷う人へ。入口の整え方が大事だった。`, `${theme}、本文より先に整える場所がある。`],
    背中押し型: [`${theme}で止まってるなら、まず深呼吸して。`, `${theme}、完璧じゃなくていいから読んでほしい。`],
  };

  const empathies = [
    "毎日書こうとしても、途中で消してしまう。",
    "投稿しても反応がなくて、自信がなくなる。",
    "何が正解か分からなくて、手が止まる。",
    "時間をかけたのに届かない感じがつらい。",
  ];

  const pastFails = [
    "わたしもそうだった。",
    "わたしも最初は同じだった。",
    "正直、わたしには向いてないと思ってた。",
    "ここでずっと遠回りしてた。",
  ];

  const cliffEndings = [
    "でも、本当に直すべき場所はそこじゃなかった。 1/2",
    "わたしはずっと、ここを勘違いしてた。 1/2",
    "売れない理由は、思ってたよりシンプルだった。 1/2",
    "ここに気づくまで、かなり遠回りした。 1/2",
    "正直、もっと早く知りたかった。 1/2",
    "でも、ある日やっと原因が見えた。 1/2",
    "これ、昔のわたしに一番言いたいこと。 1/2",
    "実は、頑張る場所を間違えてただけだった。 1/2",
  ];

  const answers = [
    `答えは、${theme}の前に「誰の悩みか」を決めること。`,
    `答えは、上手さより先に伝える順番を整えること。`,
    `答えは、完璧な1本を狙わず小さく出すこと。`,
    `答えは、読み手の不安を1つに絞って書くこと。`,
  ];

  const reasons = [
    "理由は、相手が見えない文章はやさしさが届きにくいから。",
    "理由は、情報が多いほど初心者は読む前に離れてしまうから。",
    "理由は、最初の一文で自分ごと化できないと続きが読まれないから。",
    "理由は、読む人が求めるのは完璧さより安心感だから。",
  ];

  const insights = [
    "わたしもそうだった。いいことを書こうとして、誰にも刺さらなかった。",
    "でも気づいた。小さな本音のほうが、ちゃんと届く。",
    "正直、遠回りしたけど、その分やさしく書けるようになった。",
    "これ、昔のわたしです。知識を増やすほど言葉が固くなってた。",
  ];

  const actions = [
    "今日できることは、本文の前に「誰のどんな悩みか」を1行だけ書くこと。",
    "まずは、1投稿目の1行目を悩みの言葉だけにしてみて。",
    "今日は、2投稿目の1行目に答えをはっきり書くだけでいい。",
    "最初は、10分で下書きを作ってから整えれば十分。",
  ];

  const gentleCloses = [
    "まずは1つだけ直せば大丈夫。 2/2",
    "小さく直すだけでも、ちゃんと前に進める。 2/2",
    "完璧じゃなくていい。まずは気づくところからでいい。 2/2",
    "昔のわたしみたいに遠回りしてる人に届いてほしい。 2/2",
    "同じように迷ってる人は、まずここからで大丈夫。 2/2",
  ];

  const hook = pick(hookLines[patternType], number);
  const post1 = [
    hook,
    empathies[number % empathies.length],
    "うまくやろうとするほど、余計に動けなくなる。",
    pick(pastFails, number),
    "でも気づいた。止まる理由は才能じゃなかった。",
    pick(cliffEndings, number),
  ].join("\n\n");

  const post2 = [
    pick(answers, number),
    pick(reasons, number),
    pick(insights, number),
    pick(actions, number),
    patternType === "固定記事への自然導線型"
      ? "プロフィールの固定記事に、最初の一歩の流れを置いておくと迷いにくくなる。"
      : "大丈夫。最初はここからでいい。",
    pick(gentleCloses, number),
  ].join("\n\n");

  return { post1, post2 };
}

function pick(list, seed) {
  return list[seed % list.length];
}

function sanitizeTree(tree) {
  const post1 = cleanText(sanitizeNgWords(tree.post1, docsState.ngWords));
  const post2 = cleanText(sanitizeNgWords(tree.post2, docsState.ngWords));
  return qualityAdjust({ post1, post2 });
}

function cleanText(text) {
  let next = text.replace(/\b私\b/g, "わたし").replace(/\n{3,}/g, "\n\n").trim();

  BANNED_IN_BODY.forEach((word) => {
    if (word) {
      next = next.replaceAll(word, "");
    }
  });

  return next.replace(/\n{3,}/g, "\n\n").trim();
}

function qualityAdjust({ post1, post2 }) {
  let nextPost1 = post1;
  let nextPost2 = post2;

  if (!/1\/2\s*$/.test(nextPost1)) {
    nextPost1 = `${nextPost1}\n\nでも、ある日やっと原因が見えた。 1/2`;
  }

  if (/答えは/.test(nextPost1)) {
    nextPost1 = nextPost1.replace(/答えは[^\n]+/g, "");
  }

  const post2Lines = nextPost2.split("\n").filter((line) => line.trim().length > 0);
  if (post2Lines.length > 0 && !/^答えは/.test(post2Lines[0])) {
    post2Lines[0] = `答えは、${post2Lines[0].replace(/^結論は、?/, "")}`;
    nextPost2 = post2Lines.join("\n\n");
  }

  if (!/2\/2\s*$/.test(nextPost2)) {
    nextPost2 = `${nextPost2}\n\n同じように迷ってる人は、まずここからで大丈夫。 2/2`;
  }

  if (countLines(nextPost1) < 7) {
    nextPost1 = `${nextPost1}\n\nわたしも最初は同じだった。`;
  }

  return {
    post1: nextPost1.trim(),
    post2: nextPost2.trim(),
  };
}

function countLines(text) {
  return text.split("\n").filter((line) => line.trim().length > 0).length;
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
    const typeNode = node.querySelector(".post-type");
    const post1Node = node.querySelector(".post1-text");
    const post2Node = node.querySelector(".post2-text");
    const copyPost1Btn = node.querySelector(".copy-post1-btn");
    const copyPost2Btn = node.querySelector(".copy-post2-btn");
    const copyTreeBtn = node.querySelector(".copy-tree-btn");
    const feedbackNode = node.querySelector(".copy-feedback");

    numberNode.textContent = `No.${treeSet.number}`;
    themeNode.textContent = `テーマ：${treeSet.theme}`;
    typeNode.textContent = `型：${treeSet.patternType}`;
    post1Node.value = treeSet.post1;
    post2Node.value = treeSet.post2;

    copyPost1Btn.addEventListener("click", async () => {
      await handleCopyAction({
        button: copyPost1Btn,
        text: treeSet.post1,
        successMessage: `No.${treeSet.number} の投稿1をコピーしました。`,
        failMessage: "コピーできませんでした。手動で選択してください。",
        feedbackNode,
      });
    });

    copyPost2Btn.addEventListener("click", async () => {
      await handleCopyAction({
        button: copyPost2Btn,
        text: treeSet.post2,
        successMessage: `No.${treeSet.number} の投稿2をコピーしました。`,
        failMessage: "コピーできませんでした。手動で選択してください。",
        feedbackNode,
      });
    });

    copyTreeBtn.addEventListener("click", async () => {
      await handleCopyAction({
        button: copyTreeBtn,
        text: formatTreeSetText(treeSet),
        successMessage: `No.${treeSet.number} のツリーをコピーしました。`,
        failMessage: "コピーできませんでした。手動で選択してください。",
        feedbackNode,
      });
    });

    dom.results.append(node);
  });
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
      if (feedbackNode) {
        feedbackNode.textContent = "";
      }
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

function formatTreeSetText(treeSet) {
  return `No.${treeSet.number}\nテーマ：${treeSet.theme}\n型：${treeSet.patternType}\n\n投稿1（1/2）\n${treeSet.post1}\n\n投稿2（2/2）\n${treeSet.post2}`;
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
      const type = card.querySelector(".post-type")?.textContent || "";
      const post1 = card.querySelector(".post1-text")?.value || "";
      const post2 = card.querySelector(".post2-text")?.value || "";
      return `${no}\n${theme}\n${type}\n\n投稿1（1/2）\n${post1}\n\n投稿2（2/2）\n${post2}`;
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
