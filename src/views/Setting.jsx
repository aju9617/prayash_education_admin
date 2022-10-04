import React, { useEffect, useId, useState } from "react";
import { Formik, Form, Field } from "formik";
import { chargesService } from "@services";
import toast from "react-hot-toast";

function InputField({ label, name, ...props }) {
  const id = useId();
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm mb-2">
        {label} (INR)
      </label>
      <Field
        name={name}
        id={id}
        className="p-2  px-4 rounded ring-1 !ring-primary  border-0 outline-none text-sm "
        {...props}
      />
    </div>
  );
}

function Setting() {
  const [charges, setCharges] = useState({
    admissionCharge: 0,
    studentPremierCharge: 0,
    scholarshipCharge: 0,
    jobApplicationCharge: 0,
  });

  const handleChargeUpdate = async (e) => {
    let res = await chargesService.updateCharges(e);
    if (res.status) {
      toast.success(res.message);
    }
  };

  useEffect(() => {
    const fetchCharges = async () => {
      let res = await chargesService.getCharges();
      if (res.status && res.data) {
        setCharges(res.data);
      }
    };

    fetchCharges();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-700 mb-2">
          Manage Charges
        </h2>
        <Formik
          enableReinitialize
          onSubmit={handleChargeUpdate}
          initialValues={charges}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-2 gap-6">
              <InputField name="admissionCharge" label="Admission Charge" />
              <InputField
                name="scholarshipCharge"
                label="  Scholarship Application Charge"
              />
              <InputField
                name="studentPremierCharge"
                label=" Student Primere Charge"
              />
              <InputField
                name="jobApplicationCharge"
                label="Job Application Charge"
              />
              <div className="col-span-full ">
                <button
                  disabled={isSubmitting}
                  type="Submit"
                  className="p-2 px-4 bg-primary text-white text-sm rounded-md block ml-auto"
                >
                  {isSubmitting ? "Please wait..." : "Update"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Setting;
