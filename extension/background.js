chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) =>
    console.error("Panel behavior error:", error)
  );

chrome.runtime.onInstalled.addListener(() => {
  console.log("Demotion Extension installed.");

  chrome.notifications.create(
    "demotion-welcome",
    {
      type: "basic",
      iconUrl: chrome.runtime.getURL("icons/icons-48.png"),
      title: "Demotion 시작!",
      message:
        "우측 확장 아이콘을 눌러 사이드 패널을 확인해보세요!",
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error(
          "알림 오류:",
          chrome.runtime.lastError.message
        );
      }
    }
  );
});

chrome.action.onClicked.addListener(() => {
  chrome.notifications.create(
    "demotion-welcome",
    {
      type: "basic",
      iconUrl: chrome.runtime.getURL("icons/icons-48.png"),
      title: "Demotion 시작!",
      message:
        "우측 확장 아이콘을 눌러 사이드 패널을 확인해보세요!",
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error(
          "🔴 알림 오류:",
          chrome.runtime.lastError.message
        );
      }
    }
  );
});

chrome.runtime.onMessage.addListener(
  async (msg, sender) => {
    if (msg.type === "capture-click") {
      const screenshot =
        await chrome.tabs.captureVisibleTab();

      chrome.runtime.sendMessage({
        type: "captured-image",
        data: {
          image: screenshot,
          x: msg.x,
          y: msg.y,
        },
      });
    }
  }
);
