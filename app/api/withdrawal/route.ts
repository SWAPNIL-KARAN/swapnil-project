// Import necessary modules
import { auth } from "@/auth";
import { getAccountByAccountNo } from "@/data/account";
import { getCustomerById } from "@/data/customer";
import { db } from "@/lib/db";
import { authenticateUser } from "@/utils/auth"; // A function to authenticate the user
import { NextRequest, NextResponse } from "next/server";

// Define the POST request handler
export default async function POST({
  req,
  res,
}: {
  req: NextRequest;
  res: NextResponse;
}) {
  const session = await auth();
  const customer = await getCustomerById(session?.user?.id);
  const account = await getAccountByAccountNo(customer?.account_no);
  try {
    // Extract data from the request body
    const { withdrawalAmount } = req.body;

    // Find the customer's account by account number
    const customer = await db.customer.findFirst({
      where: {
        cust_id: session?.user?.cust_id, // Ensure the account belongs to the authenticated user
        account_no: account?.account_no,
      },
      include: {
        account: true, // Include account information
      },
    });

    const currentBalance : any = account?.balance
    const updatedBalance = (currentBalance - withdrawalAmount)

    // Update the account balance in the database
    await db.account.update({
      where: {
        account_no: account?.account_no, // Use cust_id as a unique identifier for the account
      },
      data: {
        balance: updatedBalance,
      },
    });

    // Return a successful response
    // return res.json({
    //   message: "Withdrawal successful",
    //   newBalance: customer.account.balance,
    // });
  } catch (error) {
    // Handle any errors
    console.error(error);
    // return res.status(500).json({ message: "Internal server error" });
  }
}
