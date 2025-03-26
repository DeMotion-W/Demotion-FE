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
          "🔴 알림 오류:",
          chrome.runtime.lastError.message
        );
      }
    }
  );
});
