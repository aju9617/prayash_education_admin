import { api, catchAsync, getAuthHeader } from "./helper";

export const getList = catchAsync(async () => {
  const { data } = await api.get("/admission", getAuthHeader());
  return data;
});

export const downloadExcel = catchAsync(async () => {
  api
    .get("/admission/download", { responseType: "blob", ...getAuthHeader() })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Admissions.xlsx");
      document.body.appendChild(link);
      link.click();
    });
});
