"use server";

import { getAccountByAccountNo, getAccountByCustId } from "@/data/account";
import { getCustomerById } from "@/data/customer";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { FeedbackSchema } from "@/schemas";
import { randomUUID } from "crypto";
import * as z from "zod";

export const feedback = async (values: z.infer<typeof FeedbackSchema>) => {
  const user = await currentUser();

  const validatedFields = FeedbackSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { feedback } = validatedFields.data;

  const customer = await getCustomerById(user?.id)

  try {
    await db.feedback.create({
      data:{
        feedback_given: feedback,
        date_of_feedback: new Date(),
        cust_id: customer?.cust_id
      }
    });
  } catch (error) {
    console.log(error)
    throw error;
  }
};
