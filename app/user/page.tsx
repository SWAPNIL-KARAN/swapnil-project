import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getBankById } from "@/data/bank";
import { getBranchById } from "@/data/branch";
import { getCustomerById } from "@/data/customer";
import { getCustomerMobileNoById } from "@/data/customer-mobile-no";
import { currentUser } from "@/lib/auth";
import React from "react";

const page = async () => {
  const user = await currentUser();
  console.log(user)
  const customerDetails = await getCustomerById(user?.id);
  const BankDetails = await getBankById(user?.id);
  const BranchDetails = await getBranchById(user?.id);
  const customerMobileNo = await getCustomerMobileNoById(user?.id);

  return (
    <div className="flex flex-col gap-y-5 lg:gap-y-0 lg:flex-row gap-x-5 justify-between items-center">
      <Card className="shadow-md w-full h-[600px]">
        <CardHeader>
          <p className="text-2xl font-semibold">Personal Details</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-row items-center justify-start gap-x-3 rounded-lg  p-3">
            <p className="text-sm font-medium">Account No:</p>
            <p className="text-sm  font-mono p-1 bg-slate-100 rounded-md">
              {customerDetails?.account_no}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-x-3 rounded-lg  p-3">
            <p className="text-sm font-medium">First Name:</p>
            <p className="text-sm  font-mono p-1 bg-slate-100 rounded-md">
              {customerDetails?.f_name}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-x-3 rounded-lg  p-3">
            <p className="text-sm font-medium">Last name:</p>
            <p className="text-sm  font-mono p-1 bg-slate-100 rounded-md">
              {customerDetails?.l_name}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-x-3 rounded-lg  p-3">
            <p className="text-sm font-medium">Email:</p>
            <p className="text-sm  font-mono p-1 bg-slate-100 rounded-md">
              {user?.email}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-x-3 rounded-lg  p-3">
            <p className="text-sm font-medium">State:</p>
            <p className="text-sm  font-mono p-1 bg-slate-100 rounded-md">
              {customerDetails?.state}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-x-3 rounded-lg  p-3">
            <p className="text-sm font-medium">Pincode:</p>
            <p className="text-sm  font-mono p-1 bg-slate-100 rounded-md">
              {customerDetails?.pincode}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-x-3 rounded-lg  p-3">
            <p className="text-sm font-medium">Mobile No:</p>
            <p className="text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
              {customerMobileNo?.mobile_no}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bank Details */}
      <Card className="shadow-md w-full h-[600px]">
        <CardHeader>
          <p className="text-2xl font-semibold">Bank Details</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-row items-center justify-start gap-x-3 rounded-lg  p-3">
            <p className="text-sm font-medium">Bank Name:</p>
            <p className="text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
              {BankDetails?.b_name}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-x-3 rounded-lg  p-3">
            <p className="text-sm font-medium">Branch:</p>
            <p className="text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
              {BranchDetails?.br_name}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-x-3 rounded-lg  p-3">
            <p className="text-sm font-medium">Branch Code:</p>
            <p className="text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
              {BranchDetails?.br_code}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-x-3 rounded-lg  p-3">
            <p className="text-sm font-medium">State:</p>
            <p className="text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
              {BranchDetails?.state}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-x-3 rounded-lg  p-3">
            <p className="text-sm font-medium">City:</p>
            <p className="text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
              {BranchDetails?.city}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
