import { DashboardSection, InputField, RadioInput } from "../../../components";
import { IoMdAddCircle } from "react-icons/io";
import TextareaField from "../../../components/TextareaField";
import DropdownField from "../../../components/DropdownField";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isPhoneValid } from "../../../utils/Utils";
import { useState, KeyboardEvent } from "react";
// import AddSlots from "./AddSlots";
// import {
//   getStorage,
//   ref as storageRef,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import { app } from "../../../firebase/config";

const inputs = [
  {
    label: "Complete Name",
    type: "text",
    placeholder: "Enter Your Complete Name",
    name: "complete_name",
  },
  {
    label: "Gender",
    type: "dropdown",
    placeholder: "Select Your Gender",
    name: "gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
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
    type: "dropdown",
    placeholder: "Years In Medical Practice",
    name: "experience",
    options: [
      { label: "One Year", value: "1" },
      { label: "Two Years", value: "2" },
      { label: "Three Years", value: "3" },
      { label: "Four or More Years", value: "4+" },
    ],
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
    name: "address_line_1",
  },
  {
    label: "Address Line 2",
    type: "text",
    placeholder: "Enter Your Address here",
    name: "address_line_2",
  },
  {
    label: "Postal Code",
    type: "number",
    placeholder: "Enter Your Postal Code",
    name: "postal_code",
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
    name: "regular_consultation_fee",
  },
  {
    label: "Discounted Consultation Fee (Optional)",
    type: "number",
    //   placeholder: "Enter your email",
    name: "discounted_consultation_fee",
  },
];

const aboutMe = {
  label: "Bibliography",
  // type: "text",
  placeholder: "Write About Yourself",
  name: "bibliography",
};

const FormSchema = z
  .object({
    complete_name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email(),
    phone_number: z.string().min(1, { message: "Phone Number is required" }),
    // gender: z
    //   .string({
    //     invalid_type_error: "Gender is required",
    //   })
    //   .min(1, { message: "Gender is required" }),
    city: z.string().min(1, { message: "City is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    department: z.string().min(1, { message: "Department is required" }),
    // experience: z.string().min(1, { message: "Experience is required" }),
    registration_no: z
      .string()
      .min(1, { message: "Registration No is required" }),
    qualification: z.string().min(1, { message: "Qualification is required" }),
    consultation_mode: z
      .string({ invalid_type_error: "Consultation Mode is required" })
      .min(1, { message: "Consultation Mode is required" }),
    regular_consultation_fee: z.string().min(1, {
      message: "Regular Consultation Fee is required",
    }),
    discounted_consultation_fee: z.string().min(1, {
      message: "Discounted Consultation Fee is required",
    }),
    address_line_1: z.string().min(1, {
      message: "Address is required",
    }),
    postal_code: z.string().min(1, {
      message: "Postal Code is required",
    }),
    services: z.string().min(1, {
      message: "Services is required",
    }),
    specializations: z.string().min(1, {
      message: "Specialization is required",
    }),
    upi_id: z.string().min(1, {
      message: "UPI ID is required",
    }),
    ac_no: z.string().min(1, {
      message: "A/C No is required",
    }),
  })
  .refine((data) => isPhoneValid(data.phone_number), {
    message: "Invalid Phone Number",
    path: ["phone_number"],
  });

export default function DoctorProfile() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(FormSchema) });
  const [services, setServices] = useState<string[]>([]);
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [image, setImage] = useState();
  const [payout, setPayout] = useState("upi");
  const upi = watch("upi_id");

  const onSubmit = () => {
    console.log(getValues());
  };
  console.log(upi);

  const handleServices = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setServices((prev) => [...prev, getValues("services")]);
    }
  };

  const handleSpecializations = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSpecializations((prev) => [...prev, getValues("specializations")]);
    }
  };

  const handleFileChange = (e: any) => {
    const newImage = e.target.files[0];
    console.log(newImage);
    setImage(newImage);
  };

  // const imageUpload = async () => {
  //   const storage = getStorage(app);
  //   const storageReference = storageRef(storage, `images/${image.name}`);
  //   const uploadTask = await uploadBytesResumable(storageReference, image);
  //   const url = await getDownloadURL(uploadTask.ref);
  // };

  console.log(errors);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-2 pb-6 ">
        <DashboardSection title="Basic Information">
          <div className="grid grid-cols-12 mt-6">
            <div className="col-span-4">
              <input
                type="file"
                className="bg-[#D9D9D9] w-40 h-40 rounded-full mx-auto"
                hidden
                id="upload-file"
                onChange={handleFileChange}
              />
              <label
                htmlFor="upload-file"
                className="bg-[#D9D9D9] w-40 h-40 rounded-full mx-auto block relative overflow-clip"
              >
                {image ? (
                  <img
                    className="w-full h-full object-cover"
                    src={URL.createObjectURL(image)}
                    alt=""
                  />
                ) : (
                  ""
                )}
              </label>
              <h5 className="text-base text-primary font-semibold text-center my-2">
                Upload Photo
              </h5>
              <small className="text-xs text-center block text-primary">
                Allowed JPG, PNG; Max size of 2 MB
              </small>
            </div>
            <div className="col-span-7">
              <div className="grid grid-cols-12 gap-x-4 gap-y-0">
                {inputs?.map((input) => (
                  <div className="col-span-6">
                    {input?.type === "dropdown" ? (
                      <DropdownField
                        label={input?.label}
                        name={input?.name}
                        options={input?.options!}
                        placeholder={input?.placeholder}
                        properties={{ ...register(input?.name) }}
                        error={errors[input?.name]}
                        setValue={setValue}
                      />
                    ) : (
                      <InputField
                        label={input.label}
                        name={input.name}
                        placeholder={input.placeholder}
                        // onChange={handleChange}
                        properties={{ ...register(input?.name) }}
                        error={errors[input?.name]}
                      />
                    )}
                  </div>
                ))}
              </div>
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
              <RadioInput
                // label={input?.label}
                name="consultation_mode"
                options={options}
                properties={{ ...register("consultation_mode") }}
                error={errors["consultation_mode"]}
              />
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
                    label={input?.label}
                    name={input?.name}
                    type={input?.type}
                    properties={{ ...register(input?.name) }}
                    error={errors[input?.name]}
                  />
                </div>
              ))}
            </div>
            <p>
              We charge 30% (plus GST) as transaction fee for digital branding
              and platform services.
            </p>
          </>
        </DashboardSection>
        <DashboardSection title={"Booking Lead Time"}>
          <>
            <div className="grid grid-cols-12 gap-x-4 gap-y-0">
              <div className="col-span-4">
                <DropdownField
                  label="Lead Time"
                  name="lead_time"
                  placeholder="immediate"
                  options={[
                    { label: "Option 1", value: "Option 1" },
                    { label: "Option 2", value: "Option 2" },
                  ]}
                  setValue={setValue}
                />
              </div>
            </div>
            <p>
              Minimum time in advance for patients to book your appointments.
              e.g. if you set it to 3 hours, a patient booking at 1 PM will only
              see slots for 4 pm or later.
            </p>
          </>
        </DashboardSection>
        <DashboardSection title={"Payouts"}>
          <>
            <div className="grid grid-cols-12 gap-x-4 gap-y-0 items-center">
              <div className="col-span-4">
                {payout?.toLowerCase() === "upi" ? (
                  <InputField
                    label={"UPI ID"}
                    name={"upi_id"}
                    properties={{ ...register("upi_id") }}
                    error={errors["upi_id"]}
                  />
                ) : payout?.toLowerCase() === "ac" ? (
                  <InputField
                    label={"A/C No"}
                    name={"ac_no"}
                    properties={{ ...register("ac_no") }}
                    error={errors["ac_no"]}
                  />
                ) : null}
              </div>
              <div className="col-span-4">
                <div className="flex items-center justify-center me-4">
                  <input
                    type="radio"
                    value="upi"
                    // name="inline-radio-group"
                    defaultChecked
                    onClick={() => setPayout("upi")}
                    name={"consultation"}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ms-2 text-sm font-medium text-primary">
                    UPI
                  </label>
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex items-center justify-center me-4">
                  <input
                    type="radio"
                    value="ac"
                    onClick={() => setPayout("ac")}
                    // name="inline-radio-group"
                    name={"consultation"}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ms-2 text-sm font-medium text-primary">
                    A/C Transfer
                  </label>
                </div>
              </div>
            </div>
            <p>
              Payouts will be discussed every Sunday for appointments completed
              up to seven days prior.
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
                  properties={{ ...register(input?.name) }}
                  error={errors[input?.name]}
                />
              </div>
            ))}
          </div>
        </DashboardSection>
        <DashboardSection title={"Services and Specialization"}>
          <>
            <div className="grid grid-cols-12 gap-x-4 gap-y-0">
              <div className="col-span-4">
                <InputField
                  label="Services"
                  name="services"
                  placeholder="Enter Your Services"
                  properties={{ ...register("services") }}
                  error={errors["services"]}
                  onKeyDown={handleServices}
                />
                <div className="flex gap-2 flex-wrap mb-2">
                  {services?.map((service: string) => (
                    <span className="py-1 px-2 rounded-md bg-primary text-white text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-4">
                <InputField
                  label="Specialization"
                  name="specializations"
                  placeholder="Enter Your Specialization"
                  properties={{ ...register("specializations") }}
                  error={errors["specializations"]}
                  onKeyDown={handleSpecializations}
                />
                <div className="flex gap-2 flex-wrap mb-2">
                  {specializations?.map((specialization: string) => (
                    <span className="py-1 px-2 rounded-md bg-primary text-white text-sm">
                      {specialization}
                    </span>
                  ))}
                </div>
              </div>
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
          <TextareaField input={aboutMe} rows={4} />
        </DashboardSection>
        <div className="w-96 mx-auto">
          <button className="form-btn">Save Changes</button>
        </div>
      </form>
      {/* <AddSlots /> */}
    </>
  );
}
