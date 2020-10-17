import {
  JSendSuccessObject,
  JSendFailureObject,
  JSendErrorObject,
  JSendErrorObjectwithData,
} from "./jsend";

export const success = <T extends object | null>(
  data: T
): JSendSuccessObject<T> => {
  return {
    status: "success",
    data,
  };
};

export const fail = <T extends object | null>(
  data: T
): JSendFailureObject<T> => {
  return {
    status: "fail",
    data,
  };
};

export const error = <T extends object>(
  message: string | { message: string; code?: number; data?: T }
): JSendErrorObject | JSendErrorObjectwithData<T> => {
  return {
    status: "error",
    message: typeof message === "string" ? message : message.message,
    ...(typeof message !== "string" && { code: message.code }),
    ...(typeof message !== "string" && { data: message.data }),
  };
};
