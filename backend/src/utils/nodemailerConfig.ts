import nodemailer from "nodemailer";

export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mehdizaffar0@gmail.com",
    pass: "pxgi ooxm luyc jogk",
  },
});
