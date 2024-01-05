import { DashboardSection, InputField, RadioInput } from "../../../components";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  areAllValuesTruthy,
  notifyFailure,
  notifySuccess,
} from "../../../utils/Utils";
import { publicRequest } from "../../../api/requestMethods";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import CheckboxInput from "../../../components/CheckboxInput";

const inputs = [
  {
    label: "First Name",
    type: "text",
    placeholder: "Enter Your Complete Name",
    name: "first_name",
  },
  {
    label: "Last Name",
    type: "text",
    placeholder: "Select Your Gender",
    name: "last_name",
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
    label: "Gender",
    type: "radio",
    placeholder: "Enter Your Gender",
    name: "gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Enter Your Password",
    name: "password",
  },
];

export default function AdminNewDoctor() {
  const [inputValues, setInputValues] = useState({});
  const navigate = useNavigate();
  const HOSPITAL_QUERY = `
  query {
    hospitals {
      id,
      name,
    }
  }
`;

  const getHospitals = async () => {
    try {
      const response = await publicRequest.post("/graphql", {
        query: HOSPITAL_QUERY,
      });
      return response.data.data.hospitals;
    } catch (error) {
      console.error("Error fetching hospitals:");
      throw error;
    }
  };

  const { data } = useQuery({
    queryFn: getHospitals,
  });

  const hospitals = data?.map((hospital: Hospital) => {
    return { label: hospital?.name, value: hospital?.name };
  });
  const DOCTORS_QUERY = `
  mutation($data: DoctorInput!) {
    createDoctor(data: $data) {
      email
    }
  }
`;

  const createDoctor = async (data: any) => {
    try {
      const response = await publicRequest.post("/graphql", {
        query: DOCTORS_QUERY,
        variables: { data },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error creating doctor:");
      throw error;
    }
  };

  const { mutate } = useMutation(createDoctor);

  const handleChange = (e: any) => {
    setInputValues((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      Object.keys(inputValues)?.length === inputs?.length &&
      areAllValuesTruthy(inputValues)
    ) {
      mutate(inputValues, {
        onSuccess: mutateSuccess,
        onError: mutateFail,
      });
    } else {
      notifyFailure("Please fill all the fields!");
    }
  };

  function mutateSuccess() {
    notifySuccess("New Doctor Created! Redirecting...");
    setTimeout(() => {
      navigate("/admin-dashboard/doctors");
    }, 1000);
  }

  function mutateFail() {
    notifyFailure("Doctor creation failed!");
  }

  return (
    <DashboardSection title="Add New Doctor">
      <form onSubmit={handleSubmit} className="pt-2">
        <div className="grid grid-cols-12 gap-x-4 gap-y-0">
          {inputs?.map((input) => (
            <div className="col-span-6">
              {input.type === "radio" ? (
                <RadioInput
                  label={input?.label}
                  options={input?.options}
                  name={input?.name}
                  onChange={handleChange}
                />
              ) : (
                <InputField
                  label={input?.label}
                  name={input?.name}
                  placeholder={input?.placeholder}
                  type={input?.type}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
          <div className="col-span-6">
            <CheckboxInput
              label="Hospital Assignment"
              options={hospitals}
              name="hospital_assignment"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mx-auto w-64">
          <button className="form-btn">Submit</button>
        </div>
        <Toaster />
      </form>
    </DashboardSection>
  );
}

type Hospital = {
  id: number;
  name: string;
};

type DoctorInput = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  gender: string;
};
