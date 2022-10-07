import React, { useState } from "react";
import FilePondUploader from "../components/FilePondUploader";
import { Formik, Form } from "formik";
import { FaTrash } from "react-icons/fa";
import { TextInput, Button } from "@ui";
import * as Yup from "yup";
import { galleryService } from "../services";
import toast from "react-hot-toast";
import moment from "moment";
const validationSchema = Yup.object({
  about: Yup.string().required(),
  url: Yup.string().required("Picture is required"),
});

function GalleryList() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalPage] = useState(0);
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    const fetch = async () => {
      setFetching((e) => !e);
      const res = await galleryService.getList({
        page,
      });
      setFetching((e) => !e);
      if (res.status) {
        setList((e) => {
          let newList = [...e, ...res.data.results];
          newList = newList.filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.id === value.id)
          );
          return newList;
        });
        setTotalPage(res.data.totalPages);
      }
    };

    fetch();
  }, [page]);

  return (
    <>
      {fetching ? (
        <div className="grid place-content-center min-h-[40vh]">
          <div className="">
            <div className="circle loader"></div>
          </div>
          <p className="text-center">Loading...</p>
        </div>
      ) : (
        <div className="my-5 grid md:grid-cols-3 gap-4">
          {list.map((curr) => (
            <div
              key={curr.id}
              className="group relative  h-[345px]  rounded-md overflow-hidden"
            >
              <span
                className="absolute top-4 right-4 p-2 block bg-gray-800 cursor-pointer  bg-opacity-70 rounded-full text-white"
                onClick={() => galleryService.deletePicture(curr.id)}
              >
                <FaTrash size={18} />
              </span>
              <img
                className="w-full h-full object-cover rounded"
                src={curr.url}
              />

              <div className="pointer-events-none  cursor-pointer absolute top-0 left-0 right-0 bottom-0 text-white bg-gradient-to-t from-gray-800 to-transparent flex justify-end p-4 flex-col invisible group-hover:visible   ">
                <p className="font-medium ">{curr.about}</p>
                <p className="text-sm">{moment(curr.createdAt).fromNow()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {page < totalpage && (
        <Button onClick={() => setPage((e) => e + 1)} className="ml-auto block">
          Load more
        </Button>
      )}
    </>
  );
}

function Gallery() {
  const handleAddPicture = async (e, { resetForm }) => {
    console.log(e);
    const res = await galleryService.addPicture(e);
    if (res.status) {
      toast.success("Picture uploaded");
    }
    resetForm();
  };

  return (
    <div>
      <h2 className="text-xl flex items-center justify-between  font-medium text-gray-700 mb-2">
        Gallery
      </h2>
      <Formik
        onSubmit={handleAddPicture}
        validationSchema={validationSchema}
        initialValues={{ about: "", url: "" }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <>
            <Form>
              <TextInput className="mb-2" name="about" label="About Picture" />
              <FilePondUploader
                label="Choose Picture"
                setFieldValue={setFieldValue}
                name="url"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="block ml-auto"
              >
                Submit
              </Button>
            </Form>
          </>
        )}
      </Formik>
      <GalleryList />
    </div>
  );
}

export default Gallery;
