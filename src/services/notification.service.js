import { api, catchAsync, getAuthHeader, generateQueryString } from "./helper";

export const getList = catchAsync(async (query) => {
  const { data } = await api.get(
    `/notification?${generateQueryString(query)}`,
    getAuthHeader()
  );
  return data;
});

export const createNotification = catchAsync(async (body) => {
  const { data } = await api.post("/notification", body, getAuthHeader());
  return data;
});

export const deleteNotification = catchAsync(async (id) => {
  const { data } = await api.delete(`/notification/${id}`, getAuthHeader());
  return data;
});
