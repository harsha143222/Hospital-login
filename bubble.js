window.onload = function() {

  const bubbleArea = document.querySelector(".bubble-area");

  function createBubble() {

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const size = Math.random() * 100 + 40;
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";

    bubble.style.left = Math.random() * 100 + "%";

    const duration = Math.random() * 10 + 8;
    bubble.style.animationDuration = duration + "s";

    bubbleArea.appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
    }, duration * 1000);
  }

  setInterval(createBubble, 700);
};