// 중복 실행 방지 (전역 변수로 플래그 설정)
if (!window.__demotionInitialized) {
  window.__demotionInitialized = true;

  // 클릭 핸들러 정의 (전역에 저장해서 제거할 수 있도록)
  const handleClick = (e) => {
    chrome.runtime.sendMessage({
      type: "capture-click",
      x: e.clientX,
      y: e.clientY,
    });
  };

  // 상태 저장
  window.__demotionCaptureState = {
    isCapturing: false,
  };

  // 메시지 수신 처리
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
