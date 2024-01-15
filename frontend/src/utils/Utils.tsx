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

export const isValidPassword = (password: string) => {
  // Check length: 8-12 characters
  if (password.length < 8 || password.length > 12) {
    const msg = "Password length should be between 8-12 characters!";
    return { status: false, msg };
  }

  // Check for at least 1 uppercase letter
  if (!/[A-Z]/.test(password)) {
    const msg = "There should be atleast 1 uppercase letter in your password!";
    return { status: false, msg };
  }

  // Check for at least 1 lowercase letter
  if (!/[a-z]/.test(password)) {
    const msg = "There should be atleast 1 lowercase letter in your password!";
    return { status: false, msg };
  }

  // Check for at least 1 numeric character
  if (!/\d/.test(password)) {
    const msg = "There should be atleast 1 numeric character in your password!";
    return { status: false, msg };
  }

  // Check for at least 1 special character
  if (!/[^A-Za-z0-9]/.test(password)) {
    const msg = "There should be atleast 1 special character in your password!";
    return { status: false, msg };
  }

  // Check for palindrome
  if (isPalindrome(password)) {
    const msg = "Password cannot be a palindrome!";
    return { status: false, msg };
  }

  return { status: true, msg: "Success" };
};

export const isPalindrome = (str: string) => {
  const cleanedStr = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
  return cleanedStr === cleanedStr.split("").reverse().join("");
};

export type PasswordCheckType = {
  status: boolean;
  msg: string;
};
