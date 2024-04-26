import { db } from "@/lib/db";
import { getUserById } from "./user";

export const getCustomerById = async (id: any) => {
  try {
    const customer = await db.customer.findUnique({
      where: { cust_id: parseInt(id) },
    });
    return customer;
  } catch (error) {
    console.log("Error: ", error);

    return null;
  }
};

export const getCustomerByAccountNo = async (account_no: any) => {
  try {
    const customer = await db.customer.findFirst({
      where: { account_no: account_no },
    });
    return customer;
  } catch (error) {
    console.log("Error: ", error);

    return null;
  }
};
