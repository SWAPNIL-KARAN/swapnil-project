import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCustomerById } from "./customer";

export const getAccountByAccountNo = async (account_no: any) => {
  try {
    const account = await db.account.findUnique({
      where: { account_no },
    });
    return account;
  } catch {
    return null;
  }
};

export const getAccountByCustId = async (cust_id: any) => {
  const user = await currentUser()
  const customer = await getCustomerById(user?.cust_id)
  try {
    const account = await db.account.findUnique({
      where: { account_no: customer?.account_no },
    });
    return account;
  } catch {
    return null;
  }
};
