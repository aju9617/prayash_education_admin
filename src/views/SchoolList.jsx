import React, { useState } from "react";
import { schoolService } from "@services";

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
  const [fetching, setFetching] = useState(false);
  const [list, setList] = useState([]);

  React.useEffect(() => {
    async function fetch() {
      setFetching(true);
      const res = await schoolService.getList();
      if (res.status) {
        console.log(res.data);
        setList(res.data);
      }
      setFetching(false);
    }

    fetch();
  }, []);
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-700 mb-2">
          Registered School
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
