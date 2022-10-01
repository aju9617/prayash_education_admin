import { api, catchAsync, getAuthHeader } from "./helper";

export const getList = catchAsync(async () => {
  const { data } = await api.get("/scholarship-application", getAuthHeader());
  return data;
});
