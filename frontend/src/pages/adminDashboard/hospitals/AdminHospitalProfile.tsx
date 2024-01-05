import { Link, useParams } from "react-router-dom";
import { DashboardSection } from "../../../components";
import { publicRequest } from "../../../api/requestMethods";
import { useQuery } from "react-query";
import { useEffect } from "react";
// import { MdOutlinePhoneEnabled } from "react-icons/md";
// import { IoMailOutline } from "react-icons/io5";
// import { FaUserCircle } from "react-icons/fa";
// import { MdVerified } from "react-icons/md";

export default function AdminHospitalProfile() {
  const { id } = useParams();
  console.log(id);
  const HOSPITAL_QUERY = `
  query($id:String!) {
    findHospitalById(id: $id) {
      id,
      name,
      location,
      phone_number,
      doctorHospitals{
        doctor_id
      }
    }
  }
  `;

  const DOCTOR_QUERY = `
  query($ids: [Int]!) {
    findDoctorsByIds(ids: $ids) {
      id
      first_name
      last_name
    }
  }
`;

  const getHospital = async () => {
    return publicRequest
      .post("/graphql", {
        query: HOSPITAL_QUERY,
        variables: { id },
      })
      .then((response) => response.data.data.findHospitalById);
  };

  const hospitalData = useQuery({
    queryKey: ["adminHospitals", id],
    queryFn: getHospital,
  });

  const getDoctors = async () => {
    const ids = hospitalData?.data?.doctorHospitals?.map(
      (i: { doctor_id: string }) => {
        return parseInt(i.doctor_id);
      }
    );
    console.log(ids);
    return publicRequest
      .post("/graphql", {
        query: DOCTOR_QUERY,
        variables: {
          ids,
        },
      })
      .then((response) => response.data.data.findDoctorsByIds);
  };

  const doctorData = useQuery({
    queryKey: ["adminDoctors", "hospitals", id],
    queryFn: getDoctors,
  });

  // useEffect(() => {
  //   doctorData.refetch();
  // }, [hospitalData?.data]);

  console.log(hospitalData?.data, doctorData?.data);
  console.log(
    hospitalData?.data?.doctorHospitals?.map((i: { doctor_id: string }) =>
      parseInt(i.doctor_id)
    )
  );
  return (
    <DashboardSection title={hospitalData?.data?.name}>
      <div className="grid grid-cols-12 gap-6 my-2">
        <div className="col-span-6 flex items-center gap-2">
          <span>Name:</span>
          <span>{hospitalData?.data?.name}</span>
        </div>
        <div className="col-span-6 flex items-center gap-2">
          <span>Location:</span>
          <span>{hospitalData?.data?.location}</span>
        </div>
        <div className="col-span-6 flex items-center gap-2">
          <span>Phone Number:</span>
          <span>{hospitalData?.data?.phone_number}</span>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-base font-medium">Doctors Assigned:</h3>
        <div className="mt-2">
          <ul className="pl-6">
            {doctorData?.data?.length > 0 ? (
              doctorData?.data?.map((doctor: Doctor) => (
                <li className="list-disc">
                  <Link to={`/admin-dashboard/doctors/${doctor?.id}`}>
                    {"Dr. " + doctor?.first_name + " " + doctor?.last_name}
                  </Link>
                </li>
              ))
            ) : (
              <small>No Doctors to Show!</small>
            )}
          </ul>
        </div>
      </div>
    </DashboardSection>
  );
}

type Doctor = {
  id: string;
  first_name: string;
  last_name: string;
};
