import { Formik, Form } from "formik";
import React, { useState } from "react";
import { TextInput, Button } from "@ui";
import * as Yup from "yup";
import { MdDelete } from "react-icons/md";
import { examCenterService } from "@services";

import toast from "react-hot-toast";

const examCenterSchema = Yup.object({
  name: Yup.string().required(),
  addressLine1: Yup.string().required(),
  addressLine2: Yup.string().required(),
});

function AddExamCenter({ setRefreshKey }) {
  const handleExamCenter = async (body, { resetForm }) => {
    const res = await examCenterService.add(body);
    if (res.status) {
      toast.success(res.message);
      resetForm();
    }
    setRefreshKey((e) => e + 1);
  };
  return (
    <Formik
      validationSchema={examCenterSchema}
      initialValues={{
        name: "",
        addressLine1: "",
        addressLine2: "",
      }}
      onSubmit={handleExamCenter}
    >
      {({ isSubmitting }) => (
        <Form>
          <TextInput className="mb-2" name="name" label="Center Name" />
          <TextInput
            className="mb-2"
            name="addressLine1"
            label="Address Line 1"
          />
          <TextInput
            className="mb-2"
            name="addressLine2"
            label="Address Line 2"
            type="text"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="block ml-auto"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

function TableData({ examCenter, setRefreshKey }) {
  const handleDelete = async (id) => {
    toast.promise(examCenterService.remove(id), {
      loading: "Loading",
      success: "Deleted",
      error: "Error while deleting...",
    });

    setRefreshKey((e) => e + 1);
  };
  return (
    <>
      <tr className=" border-1  border-gray-300 ">
        <td className="p-2 px-4 whitespace-nowrap capitalize">
          {examCenter.name}
        </td>
        <td className="p-2 px-4 whitespace-nowrap">
          {examCenter.addressLine1}
        </td>
        <td className="p-2 px-4 whitespace-nowrap">
          {examCenter.addressLine2}
        </td>
        <td className=" whitespace-nowrap">
          <span
            onClick={() => handleDelete(examCenter.id)}
            className="flex-center p-2 px-4 cursor-pointer "
          >
            <MdDelete size={28} />
          </span>
        </td>
      </tr>
    </>
  );
}

function List({ refreshKey, setRefreshKey }) {
  const [list, setList] = useState([]);

  const [fetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    const fetch = async () => {
      setFetching((e) => !e);
      const res = await examCenterService.list();
      setFetching((e) => !e);
      if (res.status) {
        setList(res.data);
      }
    };

    fetch();
  }, [refreshKey]);
  return (
    <div className="mb-6">
      <h2 className="text-xl font-medium text-gray-700 mb-2">
        Exam Center List
      </h2>
      <div className="w-full overflow-scroll p-1 scrollbar-hide">
        <table
          style={{ borderSpacing: "0 10px" }}
          className=" w-full  ring-1 ring-gray-500  table-auto"
        >
          <thead>
            <tr className="text-sm  !font-medium bg-primary text-white">
              <td className="p-2 px-4 whitespace-nowrap">Center Name</td>
              <td className="p-2 px-4 whitespace-nowrap">Address Line 1</td>
              <td className="p-2 px-4 whitespace-nowrap">Address Line 2</td>
              <td className="p-2 px-4 whitespace-nowrap text-center">Action</td>
            </tr>
          </thead>
          <tbody className=" text-sm ">
            {list.map((examCenter) => (
              <TableData
                setRefreshKey={setRefreshKey}
                examCenter={examCenter}
                key={examCenter.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExamCenter() {
  const [refreshKey, setRefreshKey] = useState(0);
  return (
    <div className=" ">
      <div className="mb-6">
        <h2 className="text-xl flex items-center justify-between  font-medium text-gray-700 mb-2">
          Exam Center
        </h2>
      </div>
      <AddExamCenter refreshKey={refreshKey} setRefreshKey={setRefreshKey} />
      <List refreshKey={refreshKey} setRefreshKey={setRefreshKey} />
    </div>
  );
}

export default ExamCenter;
