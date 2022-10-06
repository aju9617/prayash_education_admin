import React, { useState } from "react";
import { schoolService } from "@services";
import { RiFolderDownloadFill } from "react-icons/ri";

function TableData({ school }) {
  return (
    <>
      <tr className=" border-1  border-gray-300 ">
        <td className=" p-2 px-4">{school.id}</td>
        <td className=" p-2 px-4">{school.schoolName}</td>
        <td className=" p-2 px-4">{school.email}</td>
        <td className=" p-2 px-4">{school.phone}</td>
      </tr>
    </>
  );
}

function SchoolList() {
  const [fetching, setFetching] = useState(true);
  const [list, setList] = useState([]);

  React.useEffect(() => {
    async function fetch() {
      setFetching(true);
      const res = await schoolService.getList();
      if (res.status) {
        setList(res.data);
      }
      setFetching(false);
    }

    fetch();
  }, []);
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl flex items-center justify-between font-medium text-gray-700 mb-2">
          Registered School{" "}
          <button
            onClick={schoolService.downloadExcel}
            className="flex-center space-x-2 text-[16px]"
          >
            <span>Download</span> <RiFolderDownloadFill size={24} />
          </button>
        </h2>
      </div>
      {fetching ? (
        <div className="grid place-content-center min-h-[40vh]">
          <div className="">
            <div className="circle loader"></div>
          </div>
          <p className="text-center">Loading...</p>
        </div>
      ) : (
        <>
          <table
            style={{ borderSpacing: "0 10px" }}
            className=" w-full  ring-1 ring-gray-500  table-auto"
          >
            <thead>
              <tr className="text-sm  !font-medium bg-primary text-white">
                <td className="p-2 px-4">Id</td>
                <td className="p-2 px-4">School Name</td>
                <td className="p-2 px-4">Email</td>
                <td className="p-2 px-4">Phone</td>
              </tr>
            </thead>
            <tbody className=" text-sm ">
              {list.map((school) => (
                <TableData school={school} key={school.id} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default SchoolList;
