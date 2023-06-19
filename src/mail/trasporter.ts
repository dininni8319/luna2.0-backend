import nodemailer from "nodemailer";
import dotenv from 'dotenv'

dotenv.config();

const {
  MAIL_TRAP_HOST,
  MAIL_TRAP_PORT,
  MAIL_TRAP_USER,
  MAIL_TRAP_PASSWORD,
} = process.env;

let Options = {
  host: MAIL_TRAP_HOST,
  port: MAIL_TRAP_PORT,
  auth: {
    user: MAIL_TRAP_USER,
    pass: MAIL_TRAP_PASSWORD 
  }
}

interface MailtrapTransporter {
    host: string;
}

const Transporter = nodemailer.createTransport(Options as MailtrapTransporter);


export default Transporter;