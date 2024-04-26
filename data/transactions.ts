import { db } from "@/lib/db";

export const getTransactionsByAccountNo = async (account_no: any) => {
  try {
    const account = await db.transaction_s.findFirst({
      where: { account_no },
    });
    return account;
  } catch {
    return null;
  }
};
