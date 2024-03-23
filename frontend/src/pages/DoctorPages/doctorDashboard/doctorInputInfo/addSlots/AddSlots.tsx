import { useState } from "react";
import {
  Button,
  DashboardSection,
  Modal,
  TimePicker,
} from "../../../../../components";
import { twMerge } from "tailwind-merge";
import { IoMdAddCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaTrash } from "react-icons/fa";

const FormSchema = z.object({
  slot_time: z.string().min(1, { message: "Slot Time is required" }),
});

const days = [
  { title: "Monday", slots: [], selected: true },
  { title: "Tuesday", slots: [], selected: false },
  { title: "Wednesday", slots: [], selected: false },
  { title: "Thursday", slots: [], selected: false },
  { title: "Friday", slots: [], selected: false },
  { title: "Saturday", slots: [], selected: false },
  { title: "Sunday", slots: [], selected: false },
];

const dayStyles =
  "border-primary border-2 py-1.5 px-3 rounded cursor-pointer font-bold";
const selectedStyles = "bg-primary text-white";

export default function AddSlots() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(FormSchema) });
  const [weekdays, setWeekdays] = useState<Days[]>(days);
  const [showSlotsModal, setShowSlotsModal] = useState(false);
  const selectedDay = weekdays?.find((day) => day?.selected);
  const allEmpty = weekdays.every((day) => day.slots.length === 0);

  const setSelectedDay = (title: string) => {
    setWeekdays((prev) =>
      prev?.map((day) => {
        if (day?.title === title) {
          return { ...day, selected: true };
        } else {
          return { ...day, selected: false };
        }
      })
    );
  };

  const deleteSlots = () => {
    setWeekdays((prev) =>
      prev?.map((day) => {
        if (day?.title === selectedDay?.title) {
          return { ...day, slots: [] };
        } else {
          return { ...day };
        }
      })
    );
  };

  const onSubmit = (data: any) => {
    setWeekdays((prev) =>
      prev?.map((day) => {
        if (day?.title === selectedDay?.title) {
          return { ...day, slots: [...day?.slots, data?.slot_time] };
        } else {
          return { ...day };
        }
      })
    );
    setShowSlotsModal(false);
  };

  return (
    <>
      {!allEmpty && (
        <h4 className="text-red-500 font-bold mb-4">
          Please remember to save your changes after uploading the slot
          schedule.
        </h4>
      )}
      <DashboardSection title="Schedule Slots">
        {!allEmpty && (
          <div className="absolute top-2 right-2">
            <Button title="Save Changes" />
          </div>
        )}
        <div className="flex justify-between my-2">
          {weekdays?.map((weekday) => (
            <div
              className={twMerge(
                `${dayStyles} ${weekday?.selected && selectedStyles}`
              )}
              onClick={() => setSelectedDay(weekday?.title)}
            >
              {weekday?.title}
            </div>
          ))}
        </div>
        <div className="my-4">
          <div className="flex justify-between items-center my-2">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-semibold">Time Slots</h3>
              {selectedDay?.slots?.length! > 0 && (
                <span
                  className="flex gap-1 items-center font-bold text-sm text-red-500 cursor-pointer"
                  onClick={deleteSlots}
                >
                  <FaTrash size={20} fill="red" />
                  Delete all slots
                </span>
              )}
            </div>
            <div
              className="flex gap-2 font-medium cursor-pointer"
              onClick={() => setShowSlotsModal(true)}
            >
              <IoMdAddCircle size={25} />
              Add Slot
            </div>
          </div>
          <div className="my-4">
            {selectedDay?.slots?.length! > 0 ? (
              <div className="flex gap-2 items-center flex-wrap">
                {selectedDay?.slots?.map((slot) => (
                  <div className="py-1 px-4 font-bold text-white bg-gradient-to-b from-green-600 to-green-900">
                    {slot}
                  </div>
                ))}
              </div>
            ) : (
              <h4 className="text-center">No Slots Added Yet</h4>
            )}
          </div>
        </div>
      </DashboardSection>
      <Modal
        title="Add Time Slots"
        showModal={showSlotsModal}
        setModal={setShowSlotsModal}
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <TimePicker
            label="Slot Start Time"
            properties={{ ...register("slot_time") }}
            error={errors["slot_time"]}
          />
          <button type="submit" className="form-btn mt-2">
            Add
          </button>
        </form>
      </Modal>
    </>
  );
}

interface Days {
  title: string;
  slots: string[];
  selected: boolean;
}
