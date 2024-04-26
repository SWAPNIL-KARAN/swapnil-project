import { db } from "@/lib/db";
import { getCustomerById } from "./customer";
import { getBankById } from "./bank";

export const getBranchById = async (id: any) => {
  try {
    const bank = await getBankById(id);
    const branch = await db.branch.findFirst({
      where: { bank_id: bank?.bank_id },
    });
    return branch;
  } catch (error) {
    console.log("Error: ", error);

    return null;
  }
};
