import { DashboardSection, InputField } from "../../components";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import TextareaField from "../../components/TextareaField";
import DropdownField from "../../components/DropdownField";

const inputs = [
  {
    label: "Complete Name",
    type: "text",
    placeholder: "Enter Your Complete Name",
    name: "complete_name",
  },
  {
    label: "Gender",
    type: "text",
    placeholder: "Select Your Gender",
    name: "gender",
  },
  {
    label: "Email",
    type: "email",
    placeholder: "Enter Your Email",
    name: "email",
  },
  {
    label: "Phone Number",
    type: "number",
    placeholder: "Enter Your Phone Number",
    name: "phone_number",
  },
  {
    label: "City",
    type: "text",
    placeholder: "Enter Your City",
    name: "city",
  },
  {
    label: "Country",
    type: "text",
    placeholder: "Enter Your Country",
    name: "country",
  },
  {
    label: "Department",
    type: "text",
    placeholder: "Enter Your Department",
    name: "department",
  },
  {
    label: "Experience",
    type: "text",
    placeholder: "Years In Medical Practice",
    name: "experience",
  },
  {
    label: "Registration No.",
    type: "text",
    placeholder: "Enter Your Registration No.",
    name: "registration_no",
  },
  {
    label: "Qualification",
    type: "text",
    placeholder: "Enter Your Medical Qualification",
    name: "qualification",
  },
];

const contactDetails = [
  {
    label: "Address Line 1",
    type: "text",
    placeholder: "Enter Your Address here",
    name: "complete_name",
  },
  {
    label: "Address Line 2",
    type: "text",
    placeholder: "Enter Your Address here",
    name: "gender",
  },
  {
    label: "Postal Code",
    type: "email",
    placeholder: "Enter Your Postal Code",
    name: "email",
  },
];

const services = [
  {
    label: "Services",
    type: "text",
    placeholder: "Enter Your Services",
    name: "complete_name",
  },
  {
    label: "Specialization",
    type: "text",
    placeholder: "Enter Your Specialization",
    name: "gender",
  },
];

const options = [
  { label: "Video Consultation", value: "male" },
  { label: "Clinic/ Hospital Visit", value: "female" },
  { label: "Both", value: "female" },
];

const consultationFee = [
  {
    label: "Regular Consultation Fee",
    type: "number",
    //   placeholder: "Enter your email",
    name: "complete_name",
  },
  {
    label: "Discounted Consultation Fee (Optional)",
    type: "number",
    //   placeholder: "Enter your email",
    name: "gender",
  },
];

const aboutMe = {
  label: "Bibliography",
  // type: "text",
  placeholder: "Write About Yourself",
  name: "bibliography",
};

export default function DoctorProfile() {
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
      <DashboardSection title="Basic Information">
        <div className="grid grid-cols-12 mt-6">
          <div className="col-span-4">
            <div className="bg-[#D9D9D9] w-40 h-40 rounded-full mx-auto"></div>
            <h5 className="text-base text-primary font-semibold text-center my-2">
              Upload Photo
            </h5>
            <small className="text-xs text-center block text-primary">
              Allowed JPG, PNG; Max size of 2 MB
            </small>
          </div>
          <div className="col-span-7">
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
            <div className="grid grid-cols-12">
              <h5 className="col-span-2 font-semibold">Note:</h5>
              <small className="col-span-9">
                Your Email Id will not be shared with anyone. Registration No.
                will be printed on Prescription. Please specify the complete
                Registration No. Medical Qualification will be displayed under
                your name in doctor listing. All fields are requred.
              </small>
            </div>
          </div>
        </div>
      </DashboardSection>
      <DashboardSection title={"Consultation Mode"}>
        <>
          <div className="flex gap-2">
            {options.map((option) => (
              <div className="flex items-center me-4">
                <input
                  type="radio"
                  value={option.value}
                  // name="inline-radio-group"
                  name={"consultation"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-2 text-sm font-medium text-primary">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <p className="mt-2 text-base">
            Both options will be given to the patients at the time of booking.
            You will see the consultation mode for each appointment on your
            appointment screen.
          </p>
          <p className="text-base">
            Video calling option will be disabled for in-person/visit
            appointments.
          </p>
        </>
      </DashboardSection>
      <DashboardSection title={"Consultation Fee"}>
        <>
          <div className="grid grid-cols-12 gap-x-4 gap-y-0">
            {consultationFee?.map((input) => (
              <div className="col-span-4">
                <InputField
                  label={input.label}
                  name={input.name}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <p>
            We charge 30% (plus GST) as transaction fee for digital branding and
            platform services.
          </p>
        </>
      </DashboardSection>
      <DashboardSection title={"Booking Lead Time"}>
        <>
          <div className="grid grid-cols-12 gap-x-4 gap-y-0">
            <div className="col-span-4">
              <DropdownField options={["Option 1", "Option 2"]} />
            </div>
          </div>
          <p>
            Minimum time in advance for patients to book your appointments. e.g.
            if you set it to 3 hours, a patient booking at 1 PM will only see
            slots for 4 pm or later.
          </p>
        </>
      </DashboardSection>
      <DashboardSection title={"Payouts"}>
        <>
          <div className="grid grid-cols-12 gap-x-4 gap-y-0">
            <div className="col-span-4">
              <InputField
                label={"UPI ID"}
                name={"upiId"}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="flex items-center me-4">
                <input
                  type="radio"
                  value="UPI"
                  // name="inline-radio-group"
                  name={"consultation"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-2 text-sm font-medium text-primary">
                  UPI
                </label>
              </div>
            </div>
            <div>
              <div className="flex items-center me-4">
                <input
                  type="radio"
                  value="A/C Transfer"
                  // name="inline-radio-group"
                  name={"consultation"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-2 text-sm font-medium text-primary">
                  A/C Transfer
                </label>
              </div>
            </div>
          </div>
          <p>
            Payouts will be discussed every Sunday for appointments completed up
            to seven days prior.
          </p>
        </>
      </DashboardSection>
      <DashboardSection title={"Contact Details"}>
        <div className="grid grid-cols-12 gap-x-4 gap-y-0">
          {contactDetails?.map((input) => (
            <div className="col-span-4">
              <InputField
                label={input.label}
                name={input.name}
                placeholder={input.placeholder}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      </DashboardSection>
      <DashboardSection title={"Services and Specialization"}>
        <>
          <div className="grid grid-cols-12 gap-x-4 gap-y-0">
            {services?.map((input) => (
              <div className="col-span-4">
                <InputField
                  label={input.label}
                  name={input.name}
                  placeholder={input.placeholder}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <p>Type and press to add new Services and Specialization.</p>
        </>
      </DashboardSection>
      <DashboardSection title={"Education (Optional)"}>
        <div className="flex items-center gap-2 text-base">
          <IoMdAddCircle size={20} />
          Add Row
        </div>
      </DashboardSection>
      <DashboardSection title={"Experience (Optional)"}>
        <div className="flex items-center gap-2 text-base">
          <IoMdAddCircle size={20} />
          Add Row
        </div>
      </DashboardSection>
      <DashboardSection title={"Membership (Optional)"}>
        <div className="flex items-center gap-2 text-base">
          <IoMdAddCircle size={20} />
          Add Row
        </div>
      </DashboardSection>
      <DashboardSection title={"Registration (Optional)"}>
        <div className="flex items-center gap-2 text-base">
          <IoMdAddCircle size={20} />
          Add Row
        </div>
      </DashboardSection>
      <DashboardSection title={"About Me (Optional)"}>
        <TextareaField input={aboutMe} onChange={handleChange} rows={4} />
      </DashboardSection>
      <div className="w-96 mx-auto">
        <button className="form-btn">Save Changes</button>
      </div>
    </>
  );
}
