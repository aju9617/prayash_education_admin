import { api, catchAsync, getAuthHeader } from "./helper";

export const login = catchAsync(async (body) => {
  const { data } = await api.post("/auth/login", body);
  return data;
});

export const forgetPassword = catchAsync(async (body) => {
  const { data } = await api.post("/auth/forget-password", body);
  return data;
});

export const resetPassword = catchAsync(async (body) => {
  const { data } = await api.post("/auth/reset-password", body);
  return data;
});

export const verifyOTP = catchAsync(async (body) => {
  const { data } = await api.post("/auth/verify-otp", body);
  return data;
});

export const updatePassword = catchAsync(async (body) => {
  const { data } = await api.patch(
    "/auth/update-password",
    body,
    getAuthHeader()
  );
  return data;
});

export const getProfile = catchAsync(async () => {
  const { data } = await api.get("/auth/profile", getAuthHeader());
  return data;
});
