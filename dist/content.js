let isCapturing = false;

const onClick = (e) => {
  if (!isCapturing) return;

  chrome.runtime.sendMessage({
    type: "capture-click",
    x: e.clientX,
    y: e.clientY,
  });
};

chrome.runtime.onMessage.addListener(
  (msg, sender, sendResponse) => {
    if (msg.type === "start-capture") {
      if (!isCapturing) {
        isCapturing = true;
        document.body.style.cursor = "crosshair";
        document.addEventListener("click", onClick);
      }

      sendResponse({ success: true });
      return true;
    }

    if (msg.type === "stop-capture") {
      isCapturing = false;
      document.body.style.cursor = "default";
      document.removeEventListener("click", onClick);

      sendResponse({ success: true });
      return true;
    }
    return false;
  }
);
