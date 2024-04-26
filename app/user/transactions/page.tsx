import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  BadgeIndianRupeeIcon,
  IndianRupee,
  IndianRupeeIcon,
} from "lucide-react";
import React, { useState } from "react";
import { withdraw } from "@/actions/withdrawal";
import WithdrawalForm from "@/components/withdrawal-form";
import { getAccountByAccountNo } from "@/data/account";
import { getCustomerById } from "@/data/customer";
import { currentUser } from "@/lib/auth";
import { getTransactionsByAccountNo } from "@/data/transactions";
import BorrowForm from "@/components/borrow-form";
import DepositForm from "@/components/deposit-form";

const page = async() => {
  const user = await currentUser()
  const customer = await getCustomerById(user?.id)
  const account = await getAccountByAccountNo(customer?.account_no)
  const transactions = await getTransactionsByAccountNo(customer?.account_no)

  console.log(customer)

  return (
    <Card className="shadow-md w-full h-[600px] p-3">
      {/* <CardHeader>
        <p className="text-2xl font-semibold">Transactions</p>
      </CardHeader> */}
      <CardContent className="p-3 space-y-4">
        <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-5">
          <div className="text-white w-[300px] bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-stone-700 via-stone-500 to-stone-400 p-3 rounded-xl">
            <div className="flex justify-between items-center text-sm font-semibold">
              <h1>Total Balance</h1>
              <BadgeIndianRupeeIcon className="h-5 w-5" />
            </div>
            <div className="flex justify-start items-center text-4xl font-bold py-2">
              <IndianRupee />
              <h2 className="font-mono">
                {parseFloat(account?.balance).toFixed(2)}
              </h2>
            </div>
          </div>
          <div className="text-white w-[300px] bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-stone-700 via-stone-500 to-stone-400 p-3 rounded-xl">
            <div className="flex justify-between items-center text-sm font-semibold">
              <h1>Borrowed Amount</h1>
              <BadgeIndianRupeeIcon className="h-5 w-5" />
            </div>
            <div className="flex justify-start items-center text-4xl font-bold py-2">
              <IndianRupee />
              <h2 className="font-mono">
                {parseFloat(transactions?.borrow_amt).toFixed(2)}
              </h2>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold py-5">Make a Transaction: </h1>
          <div className="flex space-x-10 p-2">
            <WithdrawalForm />
            <DepositForm/>
            <BorrowForm/>

            {/* <div className="flex flex-col justify-center items-center gap-y-3">
              <div className="flex justify-center items-center gap-x-2">
                <h4 className="font-semibold">Borrow:</h4>
                <Input
                  type="number"
                  placeholder="0.0"
                  className="font-mono text-sm"
                />
              </div>
              <Button type="submit">Submit</Button>
            </div>
            <div className="flex flex-col justify-center items-center gap-y-3">
              <div className="flex justify-center items-center gap-x-2">
                <h4 className="font-semibold">Deposit:</h4>
                <Input
                  type="number"
                  placeholder="0.0"
                  className="font-mono text-sm"
                />
              </div>
              <Button type="submit">Submit</Button>
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default page;
