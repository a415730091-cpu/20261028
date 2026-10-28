// ======================================================
// 台灣夜市美食小達人測驗
// ======================================================

// ------------------------------
// 題目資料
// ------------------------------
var questions = [
  {
    title: "哪一種食物是台灣夜市最具代表性的美食之一？",
    choices: ["義大利麵", "臭豆腐", "壽司", "披薩"],
    answer: 1
  },
  {
    title: "蚵仔煎的主要食材是什麼？",
    choices: ["蚵仔", "雞肉", "牛肉", "玉米"],
    answer: 0
  },
  {
    title: "大腸包小腸中的「大腸」通常是指什麼？",
    choices: ["糯米腸", "香腸", "熱狗", "米粉"],
    answer: 0
  },
  {
    title: "鹽酥雞通常會加入哪一種食材增加香氣？",
    choices: ["九層塔", "薄荷", "迷迭香", "檸檬"],
    answer: 0
  },
  {
    title: "珍珠奶茶中的珍珠主要是用什麼製作？",
    choices: ["糯米", "木薯粉", "麵粉", "玉米粉"],
    answer: 1
  },
  {
    title: "地瓜球主要是使用哪一種食材製作？",
    choices: ["地瓜粉", "麵包粉", "米粉", "豆粉"],
    answer: 0
  },
  {
    title: "哪一種夜市小吃通常會加入花生粉與香菜？",
    choices: ["刈包", "雞排", "糖葫蘆", "蚵仔麵線"],
    answer: 0
  },
  {
    title: "棺材板是哪一個地區的特色小吃？",
    choices: ["台北", "台南", "花蓮", "基隆"],
    answer: 1
  },
  {
    title: "雞排通常是使用雞的哪一個部位？",
    choices: ["雞胸肉", "雞翅", "雞腳", "雞脖子"],
    answer: 0
  },
  {
    title: "糖葫蘆外層通常是什麼？",
    choices: ["巧克力", "糖漿結晶", "奶油", "蜂蜜"],
    answer: 1
  }
];

// ------------------------------
// 測驗狀態
// ------------------------------
var currentQuestion = 0;
var selectedChoice = -1;
var score = 0;
var answered = false;
var finished = false;

// 儲存選項位置
var choiceAreas = [];

// 儲存下一題按鈕位置
var nextButton = {
  x: 0,
  y: 0,
  w: 190,
  h: 50
};

// 儲存重新開始按鈕位置
var restartButton = {
  x: 0,
  y: 0,
  w: 220,
  h: 55
};

// 彩帶資料
var ribbons = [];

// ------------------------------
// 初始化畫布
// ------------------------------
function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);

  // 設定文字水平與垂直置中
  textAlign(CENTER, CENTER);

  // 設定文字粗體
  textStyle(BOLD);

  // 建立彩帶
  createRibbons();
}

// ------------------------------
// 主程式迴圈
// ------------------------------
function draw() {
  // 設定背景顏色
  background("#fff7ed");

  // 判斷是否完成測驗
  if (finished === true) {
    // 顯示最後成績
    drawResultScreen();

    // 成績高於 60% 才顯示彩帶
    if (score / questions.length > 0.6) {
      drawRibbons();
    }
  } else {
    // 顯示題目畫面
    drawQuestionScreen();
  }
}

// ------------------------------
// 取得目前畫面配置
// ------------------------------
function getLayout() {
  // 判斷是否為較矮的視窗
  var compact = height < 700;

  // 判斷是否為非常矮的視窗
  var veryCompact = height < 560;

  // 設定內容寬度
  var contentWidth = min(width - 30, 900);

  // 設定內容左側位置
  var contentX = (width - contentWidth) / 2;

  // 設定標題位置
  var titleY = veryCompact ? 28 : compact ? 38 : 50;

  // 設定進度文字位置
  var progressY = veryCompact ? 58 : compact ? 75 : 95;

  // 設定進度條位置
  var progressBarY = veryCompact ? 78 : compact ? 100 : 125;

  // 設定題目框位置
  var questionBoxY = veryCompact ? 105 : compact ? 135 : 165;

  // 設定題目框高度
  var questionBoxHeight = veryCompact ? 90 : compact ? 105 : 125;

  // 設定題目文字大小
  var questionFontSize = veryCompact ? 16 : compact ? 19 : 24;

  // 設定題目文字行高
  var questionLineHeight = veryCompact ? 23 : compact ? 28 : 34;

  // 設定選項寬度
  var useTwoColumns = width >= 700 && veryCompact === false;

  var choiceWidth = useTwoColumns
    ? (contentWidth - 20) / 2
    : min(contentWidth, 700);

  // 設定選項高度
  var choiceHeight = veryCompact ? 40 : compact ? 48 : 56;

  // 設定選項間距
  var choiceGap = veryCompact ? 7 : 12;

  // 設定選項開始位置
  var choiceStartY =
    questionBoxY +
    questionBoxHeight +
    (veryCompact ? 12 : compact ? 18 : 25);

  // 設定回饋文字位置
  var feedbackY = height - (veryCompact ? 82 : compact ? 90 : 105);

  // 設定下一題按鈕位置
  var buttonY = height - (veryCompact ? 52 : compact ? 60 : 72);

  // 回傳版面設定
  return {
    compact: compact,
    veryCompact: veryCompact,
    contentWidth: contentWidth,
    contentX: contentX,
    titleY: titleY,
    progressY: progressY,
    progressBarY: progressBarY,
    questionBoxY: questionBoxY,
    questionBoxHeight: questionBoxHeight,
    questionFontSize: questionFontSize,
    questionLineHeight: questionLineHeight,
    useTwoColumns: useTwoColumns,
    choiceWidth: choiceWidth,
    choiceHeight: choiceHeight,
    choiceGap: choiceGap,
    choiceStartY: choiceStartY,
    feedbackY: feedbackY,
    buttonY: buttonY
  };
}

// ------------------------------
// 將題目文字分行
// ------------------------------
function wrapText(textValue, maxWidth) {
  // 建立分行陣列
  var lines = [];

  // 建立目前正在組合的文字
  var currentLine = "";

  // 逐字處理中文題目
  for (var i = 0; i < textValue.length; i++) {
    // 取得目前字元
    var character = textValue.charAt(i);

    // 嘗試加入目前文字
    var testLine = currentLine + character;

    // 如果超過最大寬度，就換行
    if (textWidth(testLine) > maxWidth && currentLine !== "") {
      lines.push(currentLine);
      currentLine = character;
    } else {
      currentLine = testLine;
    }
  }

  // 將最後一行加入陣列
  if (currentLine !== "") {
    lines.push(currentLine);
  }

  // 回傳分行結果
  return lines;
}

// ------------------------------
// 在題目框內置中繪製題目
// ------------------------------
function drawCenteredQuestion(textValue, boxX, boxY, boxW, boxH, fontSize, lineHeight) {
  // 設定題目文字大小
  textSize(fontSize);

  // 設定文字粗體
  textStyle(BOLD);

  // 設定文字水平與垂直對齊方式
  textAlign(CENTER, CENTER);

  // 設定左右內距
  var textPadding = 30;

  // 依照題目框寬度自動分行
  var lines = wrapText(textValue, boxW - textPadding * 2);

  // 計算文字總高度
  var totalTextHeight = lines.length * lineHeight;

  // 計算第一行文字中心的 y 位置
  var firstLineY =
    boxY +
    (boxH - totalTextHeight) / 2 +
    lineHeight / 2;

  // 設定文字顏色
  fill("#431407");

  // 逐行繪製文字
  for (var i = 0; i < lines.length; i++) {
    // 計算目前這一行的 y 位置
    var lineY = firstLineY + i * lineHeight;

    // x 固定為畫布中心，確保水平置中
    text(lines[i], width / 2, lineY);
  }
}

// ------------------------------
// 顯示題目畫面
// ------------------------------
function drawQuestionScreen() {
  // 取得目前題目
  var question = questions[currentQuestion];

  // 取得畫面配置
  var layout = getLayout();

  // 顯示主標題
  fill("#f97316");
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(layout.veryCompact ? 24 : layout.compact ? 30 : 38);
  text("台灣夜市美食小達人", width / 2, layout.titleY);

  // 顯示題數
  fill("#431407");
  textSize(layout.veryCompact ? 14 : 18);
  text(
    "第 " + (currentQuestion + 1) + " 題／共 " + questions.length + " 題",
    width / 2,
    layout.progressY
  );

  // 繪製進度條背景
  fill("#fed7aa");
  noStroke();
  rect(
    layout.contentX,
    layout.progressBarY,
    layout.contentWidth,
    12,
    8
  );

  // 繪製目前進度
  fill("#f97316");
  rect(
    layout.contentX,
    layout.progressBarY,
    layout.contentWidth * ((currentQuestion + 1) / questions.length),
    12,
    8
  );

  // ------------------------------
  // 繪製題目框
  // ------------------------------
  fill("#ffffff");
  stroke("#fdba74");
  strokeWeight(2);
  rect(
    layout.contentX,
    layout.questionBoxY,
    layout.contentWidth,
    layout.questionBoxHeight,
    16
  );

  // ------------------------------
  // 繪製置中的題目文字
  // ------------------------------
  noStroke();
  drawCenteredQuestion(
    question.title,
    layout.contentX,
    layout.questionBoxY,
    layout.contentWidth,
    layout.questionBoxHeight,
    layout.questionFontSize,
    layout.questionLineHeight
  );

  // 清空選項位置
  choiceAreas = [];

  // 顯示四個選項
  for (var i = 0; i < question.choices.length; i++) {
    // 設定欄位與列數
    var column = 0;
    var row = i;

    // 寬畫面使用兩欄
    if (layout.useTwoColumns === true) {
      column = i % 2;
      row = floor(i / 2);
    }

    // 計算選項 x 位置
    var optionX = layout.useTwoColumns
      ? layout.contentX + column * (layout.choiceWidth + 20)
      : (width - layout.choiceWidth) / 2;

    // 計算選項 y 位置
    var optionY =
      layout.choiceStartY +
      row * (layout.choiceHeight + layout.choiceGap);

    // 答錯時讓正確答案上下跳動
    if (
      answered === true &&
      selectedChoice !== question.answer &&
      i === question.answer
    ) {
      optionY += sin(frameCount * 0.18) * 7;
    }

    // 儲存選項位置
    choiceAreas.push({
      x: optionX,
      y: optionY,
      w: layout.choiceWidth,
      h: layout.choiceHeight
    });

    // 設定選項背景顏色
    if (answered === true && i === question.answer) {
      // 正確選項使用 #caf0f8
      fill("#caf0f8");
    } else if (
      answered === true &&
      i === selectedChoice &&
      i !== question.answer
    ) {
      // 答錯選項使用淡紅色
      fill("#fecaca");
    } else if (
      answered === true &&
      i === selectedChoice &&
      i === question.answer
    ) {
      // 答對選項使用淡綠色
      fill("#bbf7d0");
    } else {
      // 尚未作答使用白色
      fill("#ffffff");
    }

    // 繪製選項框
    stroke("#fdba74");
    strokeWeight(2);
    rect(
      optionX,
      optionY,
      layout.choiceWidth,
      layout.choiceHeight,
      12
    );

    // 顯示選項文字
    fill("#431407");
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(layout.veryCompact ? 14 : layout.compact ? 17 : 20);
    text(
      String.fromCharCode(65 + i) + ". " + question.choices[i],
      optionX + layout.choiceWidth / 2,
      optionY + layout.choiceHeight / 2
    );
  }

  // 尚未作答時不顯示下一題按鈕
  if (answered === false) {
    return;
  }

  // 顯示答題結果
  if (selectedChoice === question.answer) {
    fill("#15803d");
    textSize(layout.veryCompact ? 15 : 19);
    text("答對了！太棒了！", width / 2, layout.feedbackY);
  } else {
    fill("#dc2626");
    textSize(layout.veryCompact ? 13 : 17);
    text(
      "答錯了！淡藍色並跳動的選項是正確答案。",
      width / 2,
      layout.feedbackY
    );
  }

  // 設定下一題按鈕位置
  nextButton.x = width / 2 - 95;
  nextButton.y = layout.buttonY;
  nextButton.w = 190;
  nextButton.h = 50;

  // 繪製下一題按鈕
  fill("#f97316");
  noStroke();
  rect(
    nextButton.x,
    nextButton.y,
    nextButton.w,
    nextButton.h,
    12
  );

  // 顯示按鈕文字
  fill("#ffffff");
  textSize(layout.veryCompact ? 16 : 20);

  if (currentQuestion === questions.length - 1) {
    text(
      "查看總成績",
      width / 2,
      nextButton.y + nextButton.h / 2
    );
  } else {
    text(
      "下一題",
      width / 2,
      nextButton.y + nextButton.h / 2
    );
  }
}

// ------------------------------
// 顯示成績畫面
// ------------------------------
function drawResultScreen() {
  // 計算成績百分比
  var percentage = (score / questions.length) * 100;

  // 判斷是否為小畫面
  var compact = height < 600;

  // 顯示測驗完成
  fill("#f97316");
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(compact ? 34 : 50);
  text("測驗完成！", width / 2, compact ? 70 : 110);

  // 顯示答對題數
  fill("#431407");
  textSize(compact ? 21 : 30);
  text(
    "你答對了 " + score + "／" + questions.length + " 題",
    width / 2,
    compact ? 135 : 190
  );

  // 顯示百分比
  fill("#f97316");
  textSize(compact ? 52 : 70);
  text(
    percentage + "%",
    width / 2,
    compact ? 220 : 285
  );

  // 顯示成績評語
  if (percentage > 60) {
    fill("#15803d");
    textSize(compact ? 19 : 26);
    text(
      "恭喜你！你是夜市美食小達人！",
      width / 2,
      compact ? 285 : 365
    );
  } else {
    fill("#b45309");
    textSize(compact ? 17 : 23);
    text(
      "再接再厲！繼續探索台灣夜市美食吧！",
      width / 2,
      compact ? 285 : 365
    );
  }

  // 設定重新開始按鈕
  restartButton.w = compact ? 190 : 220;
  restartButton.h = compact ? 46 : 55;
  restartButton.x = width / 2 - restartButton.w / 2;
  restartButton.y = height - (compact ? 75 : 115);

  // 繪製重新開始按鈕
  fill("#f97316");
  noStroke();
  rect(
    restartButton.x,
    restartButton.y,
    restartButton.w,
    restartButton.h,
    14
  );

  // 顯示重新開始文字
  fill("#ffffff");
  textSize(compact ? 18 : 22);
  text(
    "重新開始",
    width / 2,
    restartButton.y + restartButton.h / 2
  );
}

// ------------------------------
// 滑鼠點擊事件
// ------------------------------
function mousePressed() {
  // 處理滑鼠點擊
  handlePointer(mouseX, mouseY);

  // 防止瀏覽器預設行為
  return false;
}

// ------------------------------
// 觸控事件
// ------------------------------
function touchStarted() {
  // 確認是否有觸控點
  if (touches.length > 0) {
    handlePointer(touches[0].x, touches[0].y);
  }

  // 防止手機頁面滑動
  return false;
}

// ------------------------------
// 判斷點擊位置
// ------------------------------
function handlePointer(x, y) {
  // 如果已完成測驗，檢查重新開始按鈕
  if (finished === true) {
    if (
      x >= restartButton.x &&
      x <= restartButton.x + restartButton.w &&
      y >= restartButton.y &&
      y <= restartButton.y + restartButton.h
    ) {
      resetQuiz();
    }

    return;
  }

  // 尚未作答時，檢查選項
  if (answered === false) {
    for (var i = 0; i < choiceAreas.length; i++) {
      var area = choiceAreas[i];

      if (
        x >= area.x &&
        x <= area.x + area.w &&
        y >= area.y &&
        y <= area.y + area.h
      ) {
        chooseAnswer(i);
        return;
      }
    }
  }

  // 已作答時，檢查下一題按鈕
  if (answered === true) {
    if (
      x >= nextButton.x &&
      x <= nextButton.x + nextButton.w &&
      y >= nextButton.y &&
      y <= nextButton.y + nextButton.h
    ) {
      goToNextQuestion();
    }
  }
}

// ------------------------------
// 選擇答案
// ------------------------------
function chooseAnswer(index) {
  // 取得目前題目
  var question = questions[currentQuestion];

  // 紀錄選項
  selectedChoice = index;

  // 設定已作答
  answered = true;

  // 答對時增加分數
  if (index === question.answer) {
    score = score + 1;
  }
}

// ------------------------------
// 前往下一題
// ------------------------------
function goToNextQuestion() {
  // 最後一題完成後顯示成績
  if (currentQuestion === questions.length - 1) {
    finished = true;
    return;
  }

  // 前往下一題
  currentQuestion = currentQuestion + 1;

  // 清除上一題狀態
  selectedChoice = -1;
  answered = false;
}

// ------------------------------
// 重新開始測驗
// ------------------------------
function resetQuiz() {
  // 回到第一題
  currentQuestion = 0;

  // 分數歸零
  score = 0;

  // 清除選項
  selectedChoice = -1;

  // 設定尚未作答
  answered = false;

  // 設定尚未完成
  finished = false;

  // 重新建立彩帶
  createRibbons();
}

// ------------------------------
// 建立彩帶
// ------------------------------
function createRibbons() {
  // 清空彩帶陣列
  ribbons = [];

  // 建立彩帶資料
  for (var i = 0; i < 120; i++) {
    ribbons.push({
      x: random(width),
      y: random(-height, 0),
      w: random(6, 13),
      h: random(10, 22),
      speed: random(2, 6),
      angle: random(TWO_PI),
      rotationSpeed: random(-0.1, 0.1),
      color: random([
        "#ef4444",
        "#f97316",
        "#eab308",
        "#22c55e",
        "#3b82f6",
        "#a855f7",
        "#ec4899"
      ])
    });
  }
}

// ------------------------------
// 繪製彩帶
// ------------------------------
function drawRibbons() {
  // 逐一繪製彩帶
  for (var i = 0; i < ribbons.length; i++) {
    var ribbon = ribbons[i];

    // 彩帶向下移動
    ribbon.y = ribbon.y + ribbon.speed;

    // 彩帶左右擺動
    ribbon.x =
      ribbon.x + sin(frameCount * 0.03 + ribbon.angle) * 0.8;

    // 彩帶旋轉
    ribbon.angle = ribbon.angle + ribbon.rotationSpeed;

    // 超出畫面後重新出現
    if (ribbon.y > height + 30) {
      ribbon.y = random(-100, -20);
      ribbon.x = random(width);
    }

    // 儲存畫布狀態
    push();

    // 移動到彩帶位置
    translate(ribbon.x, ribbon.y);

    // 旋轉彩帶
    rotate(ribbon.angle);

    // 設定彩帶顏色
    fill(ribbon.color);
    noStroke();

    // 以中心點繪製彩帶
    rectMode(CENTER);
    rect(0, 0, ribbon.w, ribbon.h);

    // 還原畫布狀態
    pop();

    // 恢復矩形繪製模式
    rectMode(CORNER);
  }
}

// ------------------------------
// 視窗大小改變事件
// ------------------------------
function windowResized() {
  // 重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);

  // 重新建立彩帶
  createRibbons();
}