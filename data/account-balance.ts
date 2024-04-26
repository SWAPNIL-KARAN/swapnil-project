import { currentUser } from "@/lib/auth";
import { getCustomerById } from "./customer";
import { getAccountByAccountNo } from "./account";

const accountBalance = async () => {
  const user = await currentUser();
  const customer = await getCustomerById(user?.id);
  const account = await getAccountByAccountNo(customer?.account_no);
  const balance = await account?.balance;

  return balance;
};

export default accountBalance;
