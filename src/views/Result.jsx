import React, { useEffect, useState } from "react";
import { RiFileExcel2Fill } from "react-icons/ri";
import { meritListService } from "@services";
import toast from "react-hot-toast";

function Result() {
  let currentYear = new Date().getFullYear();
  const [academicYear, setAcademicYear] = useState(currentYear);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const uploader = async () => {
      if (file) {
        console.log(file);
        const formData = new FormData();
        formData.append("meritList", file);
        const res = await meritListService.uploadList(formData);
        setFile(null);

        if (res.status) {
          toast.success(res.message);
        }
      }
    };
    uploader();
  }, [file]);

  return (
    <div>
      <h2 className="text-xl flex items-center justify-between  font-medium text-gray-700 mb-2">
        Upload Result
      </h2>
      <div className="">
        <label className="text-sm mb-2 block" htmlFor="roll_number">
          Choose Academic Year
        </label>
        <select
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          className={`p-2 px-4 w-56  rounded ring-1 !ring-primary border-0 focus:ring-2 text-sm outline-none focus:outline-none `}
        >
          {[0, 1, 2].map((dd, ind) => (
            <option key={ind} value={currentYear - dd}>
              {currentYear - dd}
            </option>
          ))}
        </select>
      </div>

      <div className="my-6">
        <div className="flex items-center space-x-2">
          <label htmlFor="merit_uploader">
            <div className="cursor-pointer flex items-center space-x-2 bg-secondary text-sm rounded-md shadow-md text-white p-2 px-6 w-max">
              <RiFileExcel2Fill size={18} />
              <span>Upload List</span>
            </div>
          </label>
          <p className="blink">{file?.name}</p>
        </div>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
          type="file"
          id="merit_uploader"
        />
        <p className="text-xs mt-1">
          * Please upload result list file in .xlsx format only
        </p>
      </div>
    </div>
  );
}

export default Result;
