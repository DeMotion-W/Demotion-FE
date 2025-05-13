let isCapturing = false;

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) =>
    console.error("Panel behavior error:", error)
  );

// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Demotion Extension installed.");

//   chrome.notifications.create(
//     "demotion-welcome",
//     {
//       type: "basic",
//       iconUrl: chrome.runtime.getURL("icons/icons-48.png"),
//       title: "Demotion 시작!",
//       message:
//         "우측 확장 아이콘을 눌러 사이드 패널을 확인해보세요!",
//     },
//     () => {
//       if (chrome.runtime.lastError) {
//         console.error(
//           "알림 오류:",
//           chrome.runtime.lastError.message
//         );
//       }
//     }
//   );
// });

// chrome.action.onClicked.addListener(() => {
//   chrome.notifications.create(
//     "demotion-welcome",
//     {
//       type: "basic",
//       iconUrl: chrome.runtime.getURL("icons/icons-48.png"),
//       title: "Demotion 시작!",
//       message:
//         "우측 확장 아이콘을 눌러 사이드 패널을 확인해보세요!",
//     },
//     () => {
//       if (chrome.runtime.lastError) {
//         console.error(
//           "🔴 알림 오류:",
//           chrome.runtime.lastError.message
//         );
//       }
//     }
//   );
// });

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === "capture-click") {
    chrome.tabs
      .captureVisibleTab()
      .then((screenshot) => {
        chrome.runtime.sendMessage({
          type: "captured-image",
          data: {
            image: screenshot,
            x: msg.x,
            y: msg.y,
          },
        });
        sendResponse({ success: true });
      })
      .catch((err) => {
        sendResponse({
          success: false,
          error: err.message,
        });
      });

    return true;
  }

  if (msg.type === "start-capture") {
    isCapturing = true;
  }

  if (msg.type === "stop-capture") {
    isCapturing = false;
  }
});

// 캡처 진행 중 탭 생성했을 때 캡처 처리
chrome.tabs.onCreated.addListener((tab) => {
  if (
    isCapturing &&
    tab.id &&
    tab.url &&
    !tab.url.startsWith("chrome://")
  ) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["content.js"],
      },
      () => {
        chrome.tabs.sendMessage(tab.id, {
          type: "start-capture",
        });
      }
    );
  }
});

chrome.tabs.onUpdated.addListener(
  (tabId, changeInfo, tab) => {
    if (
      isCapturing &&
      changeInfo.status === "complete" &&
      tab.url &&
      !tab.url.startsWith("chrome://")
    ) {
      chrome.scripting.executeScript(
        {
          target: { tabId },
          files: ["content.js"],
        },
        () => {
          chrome.tabs.sendMessage(tabId, {
            type: "start-capture",
          });
        }
      );
    }
  }
);
