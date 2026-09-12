const photoFolder = "./박문 사진/";

const groups = {
  1: { start: 2,  end: 11, title: "1번 사진" },
  2: { start: 12, end: 20, title: "2번 사진" },
  3: { start: 21, end: 27, title: "3번 사진" },
  4: { start: 28, end: 33, title: "4번 사진" },
  5: { start: 34, end: 42, title: "5번 사진" },
  6: { start: 43, end: 51, title: "6번 사진" },
  7: { start: 52, end: 60, title: "7번 사진" },
  8: { start: 61, end: 70, title: "8번 사진" },
  9: { start: 71, end: 77, title: "9번 사진" }
};

const homeScreen = document.getElementById("homeScreen");
const viewerScreen = document.getElementById("viewerScreen");
const viewerImage = document.getElementById("viewerImage");
const viewerTitle = document.getElementById("viewerTitle");
const pageInfo = document.getElementById("pageInfo");
const nextButton = document.getElementById("nextButton");
const homeButton = document.getElementById("homeButton");
const imageError = document.getElementById("imageError");
const startButton = document.getElementById("startButton");
const clickText = document.getElementById("clickText");

let currentGroup = null;
let currentPhoto = 0;

function imagePath(number) {
  return `${photoFolder}슬라이스${number}.png`;
}

function showViewer(personNumber) {
  currentGroup = groups[personNumber];
  currentPhoto = 0;

  homeScreen.classList.add("hidden");
  viewerScreen.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });

  updateViewer();
}

function updateViewer() {
  const number = currentGroup.start + currentPhoto;

  viewerTitle.textContent = currentGroup.title;
  pageInfo.textContent = `${currentPhoto + 1} / ${currentGroup.end - currentGroup.start + 1}`;
  viewerImage.src = imagePath(number);
  viewerImage.alt = `슬라이스${number}`;
  imageError.classList.add("hidden");

  nextButton.disabled = currentPhoto >= (currentGroup.end - currentGroup.start);
}

viewerImage.addEventListener("error", () => {
  imageError.classList.remove("hidden");
});

nextButton.addEventListener("click", () => {
  if (!currentGroup) return;
  if (currentPhoto < currentGroup.end - currentGroup.start) {
    currentPhoto++;
    updateViewer();
  }
});

homeButton.addEventListener("click", () => {
  viewerScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

startButton.addEventListener("click", () => {
  showViewer(1);
});

clickText.addEventListener("click", () => {
  showViewer(1);
});

document.querySelectorAll(".person-card").forEach(button => {
  button.addEventListener("click", () => {
    showViewer(Number(button.dataset.person));
  });
});
