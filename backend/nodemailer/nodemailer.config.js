import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config({path:"../.env"})


export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "cropcareai@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

export const sender='"care plant" <cropcareai@gmail.com>'


