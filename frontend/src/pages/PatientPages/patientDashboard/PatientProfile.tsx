import { Button, DashboardSection, InputField } from "../../../components";
import { useState } from "react";

const inputs = [
  {
    label: "Patient Name",
    type: "text",
    placeholder: "Enter Name",
    name: "patient_name",
  },
  {
    label: "Patient Age",
    type: "number",
    placeholder: "Enter Age in Years",
    name: "patient_age",
  },
  {
    label: "Insurance Id",
    type: "text",
    placeholder: "Enter Insurance Id",
    name: "insurance_id",
  },
  {
    label: "Gender",
    type: "text",
    placeholder: "Enter Your Gender",
    name: "phone_number",
  },
  {
    label: "Weight",
    type: "number",
    placeholder: "Enter Your Weight in KG",
    name: "weight",
  },
  {
    label: "Mobile Number",
    type: "text",
    placeholder: "Enter Your Mobile Number",
    name: "mobile_number",
  },
  {
    label: "Blood Group",
    type: "text",
    placeholder: "Enter Your Blood Group",
    name: "blood_group",
  },
  {
    label: "Other History",
    type: "text",
    placeholder: "Other History",
    name: "other_history",
  },
];

export default function PatientProfile() {
  const [inputValues, setInputValues] = useState<any>({});
  const handleChange = (e: any) => {
    setInputValues((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(inputValues);
  };

  return (
    <>
      <DashboardSection>
        <div className="flex justify-between my-4 w-full">
          <h2 className="text-3xl font-semibold">Patient Profile</h2>
          <div className="flex gap-2">
            <Button title="Edit" className="w-20" />
            <Button title="Save" className="w-20" />
          </div>
        </div>
        <div className="">
          <form onSubmit={handleSubmit} className="pt-2 pb-6 ">
            <div className="grid grid-cols-12 gap-x-4 gap-y-0">
              {inputs?.map((input) => (
                <div className="col-span-6">
                  <InputField
                    label={input.label}
                    name={input.name}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </form>
        </div>
      </DashboardSection>
    </>
  );
}
