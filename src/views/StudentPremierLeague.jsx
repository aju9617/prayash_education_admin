import React, { useState } from "react";
import { studentPremierLeague } from "@services";
import { RiFolderDownloadFill } from "react-icons/ri";

function TableData({ student }) {
  return (
    <>
      <tr className=" border-1  border-gray-300 ">
        <td className="p-2 px-4 whitespace-nowrap capitalize">
          {student.studentName}
        </td>
        <td className="p-2 px-4 whitespace-nowrap capitalize">
          {student.fatherName}
        </td>
        <td className="p-2 px-4 whitespace-nowrap">{student.email}</td>
        <td className="p-2 px-4 whitespace-nowrap">{student.phone}</td>
        <td className="p-2 px-4 whitespace-nowrap capitalize">
          {student.category}
        </td>
        <td className="p-2 px-4 whitespace-nowrap">{student.class}</td>
        <td className="p-2 px-4 whitespace-nowrap">
          {student.paymentStatus ? (
            <span className="p-2 text-xs block text-center rounded-full bg-green-400 text-green-800">
              Complete
            </span>
          ) : (
            <span className="p-2 text-xs block text-center rounded-full bg-red-400 text-red-800">
              Incomplete
            </span>
          )}
        </td>
      </tr>
    </>
  );
}

function StudentPremierLeague() {
  const [fetching, setFetching] = useState(true);
  const [list, setList] = useState([]);

  React.useEffect(() => {
    async function fetch() {
      setFetching(true);
      const res = await studentPremierLeague.getList();
      if (res.status) {
        setList(res.data);
        console.log(res.data);
      }
      setFetching(false);
    }

    fetch();
  }, []);
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl flex items-center justify-between  font-medium text-gray-700 mb-2">
          Student Premier League
          <button
            onClick={studentPremierLeague.downloadExcel}
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
        <div className="overflow-x-scroll scrollbar-hide p-2 ">
          <table
            style={{ borderSpacing: "0 10px" }}
            className=" w-full  ring-1 ring-gray-500  table-auto"
          >
            <thead>
              <tr className="text-sm  !font-medium bg-primary text-white">
                <td className="p-2 px-4 whitespace-nowrap">Name</td>
                <td className="p-2 px-4 whitespace-nowrap">Father Name</td>
                <td className="p-2 px-4 whitespace-nowrap">Email</td>
                <td className="p-2 px-4 whitespace-nowrap">Phone</td>
                <td className="p-2 px-4 whitespace-nowrap">Category</td>
                <td className="p-2 px-4 whitespace-nowrap">Class</td>
                <td className="p-2 px-4 whitespace-nowrap">Payment Status</td>
              </tr>
            </thead>
            <tbody className=" text-sm ">
              {list.map((student) => (
                <TableData student={student} key={student.id} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentPremierLeague;
