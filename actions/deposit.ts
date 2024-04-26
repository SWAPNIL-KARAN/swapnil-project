"use server";

import { getAccountByAccountNo, getAccountByCustId } from "@/data/account";
import { getCustomerById } from "@/data/customer";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { DepositSchema } from "@/schemas";
import * as z from "zod";

export const deposit = async (values: z.infer<typeof DepositSchema>) => {
  const user = await currentUser();

  const validatedFields = DepositSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { deposit } = validatedFields.data;

  const customer = await getCustomerById(user?.id)
  const account = await getAccountByAccountNo(customer?.account_no);
  const currentBalance = account?.balance;
  const newBalance: number = (parseFloat(currentBalance) + parseFloat(deposit));

  try {
    await db.account.update({
      where: {
        account_no: account?.account_no, // Use cust_id as a unique identifier for the account
      },
      data: {
        balance: newBalance,
      },
    });
  } catch (error) {
    throw error;
  }
};
