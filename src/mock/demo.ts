import { DemoData } from "@/types";

export const demoMock: DemoData = {
  demoId: 1,
  title: "회원가입 튜토리얼",
  description: "가입 버튼부터 완료까지 안내",
  screenshots: [
    {
      screenshotId: 101,
      fileUrl: "/images/screenshot_1.png",
      order: 1,
      buttonText: "가입 클릭",
      buttonBgColor: "#FF5733",
      buttonStyle: "Point",
      buttonTextColor: "#FFFFFF",
      positionX: 150,
      positionY: 300,
    },
    {
      screenshotId: 102,
      fileUrl: "/images/screenshot_2.png",
      order: 2,
      buttonText: "정보 입력",
      buttonBgColor: "#33C3FF",
      buttonStyle: "Box",
      buttonTextColor: "#FFFFFF",
      positionX: 200,
      positionY: 250,
    },
  ],
};
