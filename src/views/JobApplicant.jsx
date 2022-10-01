import React, { useState } from "react";
import { jobApplicantService } from "@services";

function TableData({ student }) {
  return (
    <>
      <tr className=" border-1  border-gray-300 ">
        <td className="p-2 px-4 whitespace-nowrap capitalize">
          {student.candidateName}
        </td>
        <td className="p-2 px-4 whitespace-nowrap capitalize">
          {student.motherName}
        </td>
        <td className="p-2 px-4 whitespace-nowrap capitalize">
          {student.fatherName}
        </td>
        <td className="p-2 px-4 whitespace-nowrap capitalize">
          {student.gender}
        </td>
        <td className="p-2 px-4 whitespace-nowrap">{student.email}</td>
        <td className="p-2 px-4 whitespace-nowrap">{student.phone}</td>
        <td className="p-2 px-4 whitespace-nowrap">{student.qualification}</td>
        <td className="p-2 px-4 whitespace-nowrap">{student.designation}</td>
        <td className="p-2 px-4 whitespace-nowrap capitalize">
          {student.category}
        </td>
        <td className="p-2 px-4 whitespace-nowrap">{student.aadharNumber}</td>
        <td className="p-2 px-4 whitespace-nowrap">{student.panNumber}</td>
        <td className="p-2 px-4 whitespace-nowrap">{student.examCenter}</td>
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

function JobApplicants() {
  const [fetching, setFetching] = useState(true);
  const [list, setList] = useState([]);

  React.useEffect(() => {
    async function fetch() {
      setFetching(true);
      const res = await jobApplicantService.getList();
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
          Job Applicants
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
        <div className="overflow-x-scroll scrollbar-hide p-2">
          <table
            style={{ borderSpacing: "0 10px" }}
            className=" w-full  ring-1 ring-gray-500  table-auto overflow-x-auto"
          >
            <thead>
              <tr className="text-sm  !font-medium bg-primary text-white">
                <td className="p-2 px-4 whitespace-nowrap">Name</td>
                <td className="p-2 px-4 whitespace-nowrap">Mother Name</td>
                <td className="p-2 px-4 whitespace-nowrap">Father Name</td>
                <td className="p-2 px-4 whitespace-nowrap">Gender</td>
                <td className="p-2 px-4 whitespace-nowrap">Email</td>
                <td className="p-2 px-4 whitespace-nowrap">Phone</td>
                <td className="p-2 px-4 whitespace-nowrap">Qualification</td>
                <td className="p-2 px-4 whitespace-nowrap">Designation</td>
                <td className="p-2 px-4 whitespace-nowrap">Category</td>
                <td className="p-2 px-4 whitespace-nowrap">Aadhar</td>
                <td className="p-2 px-4 whitespace-nowrap">PAN</td>
                <td className="p-2 px-4 whitespace-nowrap">Exam center</td>
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

export default JobApplicants;
