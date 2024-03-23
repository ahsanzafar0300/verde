import { useQuery } from "react-query";
import AddSlots from "./doctorInputInfo/addSlots/AddSlots";
import ConsultationForm from "./doctorInputInfo/consultationForm/ConsultationForm";
import { getDoctorById } from "../../../api/apiCalls/doctorsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const GET_DOCTOR_QUERY = `
query($id:String!) {
  findDoctorById(id: $id) {
    id
    first_name
    last_name
    email
    phone_number
    gender
    is_verified
    consultation_mode
  }
}
`;

export default function DoctorDashboard() {
  const id = useSelector((state: RootState) => state.user.currentUser?.id);

  const getDoctor = () => {
    return getDoctorById(GET_DOCTOR_QUERY, { id });
  };

  const doctorData = useQuery({
    queryKey: ["Doctors", id],
    queryFn: getDoctor,
  });
  return (
    <>
      {doctorData?.data?.isVerified ? (
        <div>1</div>
      ) : doctorData?.data?.consultation_mode ? (
        <AddSlots />
      ) : (
        <ConsultationForm />
      )}
    </>
  );
}
