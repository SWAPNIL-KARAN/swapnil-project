import { db } from "@/lib/db";
import { getCustomerById } from "./customer";

export const getBankById = async (id: any) => {
  try {
    const customer = await getCustomerById(id);
    const bank = await db.bank.findUnique({
      where: { bank_id: customer?.bank_id },
    });
    return bank;
  } catch (error) {
    console.log("Error: ", error);

    return null;
  }
};
