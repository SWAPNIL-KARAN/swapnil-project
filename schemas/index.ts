// import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
  })
  

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});


export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  account_no: z.string().min(1, {
    message: "Account number is required",
  }),
});

export const CustomerRegisterSchema = z.object({
  f_name: z.string().min(1, {
    message: "First name is required",
  }),
  l_name: z.string().min(1, {
    message: "Last name is required",
  }),
  state: z.string().min(1, {
    message: "State is required",
  }),
  pincode: z.number().int().positive().or(z.string().regex(/^\d+$/, "Invalid pincode")),
  bank_id: z.string().min(1, {
    message: "Bank ID is required",
  }),
  account_no: z.string().min(1, {
    message: "Account number is required",
  }),
});

export const AccountSchema = z.object({
  account_no: z.string().min(1, {
    message: "Account number is required",
  }),
  balance: z.string(),
});



export const WithdrawalSchema = z
  .object({
    withdraw: z.string(),
  })
export const DepositSchema = z
  .object({
    deposit: z.string(),
  })
export const BorrowSchema = z
  .object({
    borrow: z.string(),
  })
export const FeedbackSchema = z
  .object({
    feedback: z.string(),
  })