import { api, catchAsync, getAuthHeader } from "./helper";

export const getCharges = catchAsync(async () => {
  const { data } = await api.get("/service-charge", getAuthHeader());
  return data;
});

export const updateCharges = catchAsync(async (body) => {
  const { data } = await api.post("/service-charge", body, getAuthHeader());
  return data;
});
