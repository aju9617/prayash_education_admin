import { api, catchAsync, getAuthHeader } from "./helper";

export const add = catchAsync(async (body) => {
  const { data } = await api.post("/exam-center", body, getAuthHeader());
  return data;
});

export const list = catchAsync(async () => {
  const { data } = await api.get("/exam-center");
  return data;
});

export const remove = catchAsync(async (id) => {
  const { data } = await api.delete(`/exam-center/${id}`, getAuthHeader());
  return data;
});
