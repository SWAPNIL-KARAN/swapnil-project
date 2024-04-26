import { db } from "@/lib/db";
import { getCustomerById } from "./customer";

export const getCustomerMobileNoById = async (id: any) => {
  try {
    const customer = await getCustomerById(id);
    const branch = await db.customer_mobile_no.findFirst({
      where: { cust_id: customer?.cust_id },
    });
    return branch;
  } catch (error) {
    console.log("Error: ", error);

    return null;
  }
};
