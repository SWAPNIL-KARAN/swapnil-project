"use server";

import { getCustomerById } from "@/data/customer";
import { getTransactionsByAccountNo } from "@/data/transactions";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { BorrowSchema } from "@/schemas";
import * as z from "zod";

export const borrow = async (values: z.infer<typeof BorrowSchema>) => {
  const user = await currentUser();

  const validatedFields = BorrowSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { borrow } = validatedFields.data;

  const customer = await getCustomerById(user?.id);
  const transactions = await getTransactionsByAccountNo(customer?.account_no);
  const currentBorrowedAmt = transactions?.borrow_amt;
  const newBorrowAmt: number =
    parseFloat(currentBorrowedAmt) + parseFloat(borrow);

  try {
    await db.transaction_s.update({
      where: {
        account_no: customer?.account_no,
        t_id: customer?.cust_id,
      },
      data: {
        borrow_amt: newBorrowAmt,
      },
    });
  } catch (error) {
    throw error;
  }
};
