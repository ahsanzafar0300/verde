import toast from "react-hot-toast";

export const notifySuccess = (msg: string) => toast.success(msg);
export const notifyFailure = (msg: string) => toast.error(msg);

export const areAllValuesTruthy = (obj: any) => {
  return Object.values(obj).every((value) => Boolean(value));
};

export const convertToDisplayName = (input: string) => {
  const words = input.split("_");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const result = capitalizedWords.join(" ");
  return result;
};
