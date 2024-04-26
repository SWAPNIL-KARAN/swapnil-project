import { db } from "@/lib/db";
import { getCustomerById } from "./customer";
import { getBankById } from "./bank";

export const getCreditCardById = async (account_no: any) => {
  try {
    const creditCard = await db.credit_card.findFirst({
      where: { account_no: account_no },
    });
    return creditCard;
  } catch (error) {
    console.log("Error: ", error);

    return null;
  }
};
