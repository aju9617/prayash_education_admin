import { Formik, Form } from "formik";
import React, { useState } from "react";
import { TextInput, Button } from "@ui";
import * as Yup from "yup";
import { MdDelete } from "react-icons/md";
import { notificationService } from "@services";
import toast from "react-hot-toast";
import Paginate from "@components/Paginate";
import moment from "moment";

const notificationSchema = Yup.object({
  message: Yup.string().required(),
  redirectUrl: Yup.string().required(),
  validDate: Yup.string().required(),
});

function AddNotification({ setRefreshKey }) {
  const handleNotification = async (body, { resetForm }) => {
    const res = await notificationService.createNotification(body);
    if (res.status) {
      toast.success(res.message);
      resetForm();
    }
    setRefreshKey((e) => e + 1);
  };
  return (
    <Formik
      validationSchema={notificationSchema}
      initialValues={{
        message: "",
        redirectUrl: "",
        validDate: "",
      }}
      onSubmit={handleNotification}
    >
      {({ isSubmitting }) => (
        <Form>
          <TextInput className="mb-2" name="message" label="Message" />
          <TextInput className="mb-2" name="redirectUrl" label="Redirect URL" />
          <TextInput
            className="mb-2"
            name="validDate"
            label="Valid Upto"
            type="date"
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

function TableData({ notification, setRefreshKey }) {
  const handleDelete = async (id) => {
    toast.promise(notificationService.deleteNotification(id), {
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
          {notification.message}
        </td>
        <td className="p-2 px-4 whitespace-nowrap">
          {notification.redirectUrl}
        </td>
        <td className="p-2 px-4 whitespace-nowrap">
          {moment(notification.validDate).format("MMMM DD, YYYY")}
        </td>
        <td className=" whitespace-nowrap">
          <span
            onClick={() => handleDelete(notification.id)}
            className="flex-center p-2 px-4 cursor-pointer "
          >
            <MdDelete size={28} />
          </span>
        </td>
      </tr>
    </>
  );
}

function Notification() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalPage] = useState(0);
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    const fetch = async () => {
      setFetching((e) => !e);
      const res = await notificationService.getList({
        page,
      });
      setFetching((e) => !e);
      if (res.status) {
        setList(res.data.results);
        setTotalPage(res.data.totalPages);
      }
    };

    fetch();
  }, [page, refreshKey]);
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-700 mb-2">
          Create Notification
        </h2>
        <AddNotification setRefreshKey={setRefreshKey} />
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-700 mb-2">
          Notification List
        </h2>
        <div>
          <table
            style={{ borderSpacing: "0 10px" }}
            className=" w-full  ring-1 ring-gray-500  table-auto"
          >
            <thead>
              <tr className="text-sm  !font-medium bg-primary text-white">
                <td className="p-2 px-4 whitespace-nowrap">Message</td>
                <td className="p-2 px-4 whitespace-nowrap">Redirect URL</td>
                <td className="p-2 px-4 whitespace-nowrap">Valid up to</td>
                <td className="p-2 px-4 whitespace-nowrap text-center">
                  Action
                </td>
              </tr>
            </thead>
            <tbody className=" text-sm ">
              {list.map((notification) => (
                <TableData
                  setRefreshKey={setRefreshKey}
                  notification={notification}
                  key={notification.id}
                />
              ))}
            </tbody>
          </table>
          <Paginate
            onPageChange={(e) => setPage(e.selected + 1)}
            pageRangeDisplayed={8}
            pageCount={totalpage}
            forcePage={page - 1}
          />
        </div>
      </div>
    </div>
  );
}

export default Notification;
