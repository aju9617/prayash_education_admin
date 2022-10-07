import toast from "react-hot-toast";
import { api, catchAsync, getAuthHeader, generateQueryString } from "./helper";

export const getList = catchAsync(async (query) => {
  const { data } = await api.get(
    `/gallery?${generateQueryString(query)}`,
    getAuthHeader()
  );
  return data;
});

export const addPicture = catchAsync(async (body) => {
  const { data } = await api.post("/gallery", body, getAuthHeader());
  return data;
});

export const deletePicture = catchAsync(async (id) => {
  toast.promise(api.delete(`/gallery/${id}`, getAuthHeader()), {
    loading: "Deleting picture...",
    success: "Deleted",
    error: "Something went wrong",
  });
});
