import React, { useState } from "react";
import { admissionService } from "@services";

function TableData({ student }) {
  return (
    <>
      <tr className=" border-1  border-gray-300 ">
        <td className="p-2 px-4 capitalize">{student.studentName}</td>
        <td className="p-2 px-4 capitalize">{student.motherName}</td>
        <td className="p-2 px-4 capitalize">{student.fatherName}</td>
        <td className="p-2 px-4">{student.email}</td>
        <td className="p-2 px-4">{student.phone}</td>
        <td className="p-2 px-4 capitalize">{student.category}</td>
        <td className="p-2 px-4">{student.aadharNumber}</td>
        <td className="p-2 px-4">{student.class}</td>
        <td className="p-2 px-4">
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

function AdmissionList() {
  const [fetching, setFetching] = useState(true);
  const [list, setList] = useState([]);

  React.useEffect(() => {
    async function fetch() {
      setFetching(true);
      const res = await admissionService.getList();
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
        <h2 className="text-xl font-medium text-gray-700 mb-2">
          Admission Form
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
                <td className="p-2 px-4">Name</td>
                <td className="p-2 px-4">Mother Name</td>
                <td className="p-2 px-4">Father Name</td>
                <td className="p-2 px-4">Email</td>
                <td className="p-2 px-4">Phone</td>
                <td className="p-2 px-4">Category</td>
                <td className="p-2 px-4">Aadhar</td>
                <td className="p-2 px-4">Class</td>
                <td className="p-2 px-4">Payment Status</td>
              </tr>
            </thead>
            <tbody className=" text-sm ">
              {list.map((student) => (
                <TableData student={student} key={student.id} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default AdmissionList;
