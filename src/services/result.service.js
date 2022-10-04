import { api, catchAsync, getAuthHeader } from "./helper";

export const uploadList = catchAsync(async (body) => {
  const { data } = await api.post("/result-list/upload", body, {
    "content-type": "multipart/form-data",
    ...getAuthHeader(),
  });
  return data;
});
