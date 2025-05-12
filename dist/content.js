if (!window.__demotionInitialized) {
  window.__demotionInitialized = true;

  const handleClick = (e) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    chrome.runtime.sendMessage({
      type: "capture-click",
      x: e.clientX / viewportWidth,
      y: e.clientY / viewportHeight,
    });
    // const dpr = window.devicePixelRatio || 1;
    // chrome.runtime.sendMessage({
    //   type: "capture-click",
    //   x: e.clientX * dpr,
    //   y: e.clientY * dpr,
    // });
  };

  window.__demotionCaptureState = {
    isCapturing: false,
  };

  chrome.runtime.onMessage.addListener(
    (msg, sender, sendResponse) => {
      if (msg.type === "start-capture") {
        if (!window.__demotionCaptureState.isCapturing) {
          window.__demotionCaptureState.isCapturing = true;
          document.body.style.cursor = "crosshair";
          document.addEventListener("click", handleClick);
          console.log("✅ 캡처 시작됨");
        }
        sendResponse?.({ success: true });
        return true;
      }

      if (msg.type === "stop-capture") {
        if (window.__demotionCaptureState.isCapturing) {
          window.__demotionCaptureState.isCapturing = false;
          document.body.style.cursor = "default";
          document.removeEventListener(
            "click",
            handleClick
          );
          console.log("🛑 캡처 중단됨");
        }
        sendResponse?.({ success: true });
        return true;
      }

      return false;
    }
  );
}
