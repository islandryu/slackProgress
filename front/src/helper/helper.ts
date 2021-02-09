import Cookies from "js-cookie";
import { store as notificationStore } from "react-notifications-component";

export const getXsrfToken = (): string | undefined => {
  const cookie = Cookies.get("XSRF-TOKEN");
  if (cookie === undefined) {
    return;
  }
  return decodeURIComponent(cookie);
};

export const getHeaders = ():
  | {
      "Content-Type": string;
      Accept: string;
    }
  | {
      "Content-Type": string;
      Accept: string;
      "X-XSRF-TOKEN": string;
    } => {
  const xsrf = getXsrfToken();
  if (xsrf === undefined) {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-XSRF-TOKEN": xsrf,
  };
};

export const cloneArray = <T>(arr: T[]): T[] => {
  var cloned = arr.map(function (member) {
    return member;
  });
  return cloned;
};

export const asyncErrorNotification = (errorState: number) => {
  let message = "";
  switch (errorState) {
    case 400:
      message = "バリデーションエラー";
      break;
    case 401:
      message = "ログインされていません";
      break;
    case 500:
      message = "サーバーエラー";
      break;
    default:
      message = "不明なエラー";
      break;
  }
  notificationStore.addNotification({
    title: "エラー",
    message,
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated animate__fadeIn"],
    animationOut: ["animate__animated animate__fadeOut"],
  });
};
