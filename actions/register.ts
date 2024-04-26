"use server";
import * as z from "zod";

import {
  AccountSchema,
  CustomerRegisterSchema,
  RegisterSchema,
} from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { randomUUID } from "crypto";
import { currentUser } from "@/lib/auth";
import { getCustomerByAccountNo, getCustomerById } from "@/data/customer";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password, name, account_no } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const existingCustomer = await getCustomerByAccountNo(account_no);

  await db.users.create({
    data: {
      cust_id: existingCustomer?.cust_id,
      name,
      email,
      password,
    },
  });

  return { success: "Done!" };
};

export const registerAccount = async (
  values: z.infer<typeof AccountSchema>
) => {
  const validatedFields = AccountSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { account_no, balance } = validatedFields.data;
  const newBalance = parseFloat(balance);

  await db.account.create({
    data: {
      account_no: account_no,
      balance: newBalance,
    },
  });

  return { success: "Account made!" };
};

export const registerCustomer = async (
  values: z.infer<typeof CustomerRegisterSchema>
) => {
  const validatedFields = CustomerRegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { f_name, l_name, state, pincode, bank_id, account_no } =
    validatedFields.data;

  const newPincode = parseInt(pincode);

  await db.customer.create({
    data: {
      f_name,
      l_name,
      state,
      pincode: newPincode,
      bank_id,
      account_no,
    },
  });

  return { success: "Customer made!" };
};
