import CardLimitForm from "@/components/feedback-form";
import { getCreditCardById } from "@/data/credit-card";
import { getCustomerById } from "@/data/customer";
import { currentUser } from "@/lib/auth";
import Image from "next/image";
import React from "react";

const page = async () => {
  const user = await currentUser();
  const customer = await getCustomerById(user?.id);
  const creditCard = await getCreditCardById(customer?.account_no);
  return (
    <div>
      <div className="relative">
        <Image
          src="/credit-card-bg.jpg"
          width={6000}
          height={4000}
          alt="credit-card"
          className="w-[500px] h-[300px] rounded-2xl "
        />
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur-xl bg-opacity-20 backdrop-saturate-100 backdrop-contrast-100 rounded-2xl text-white text-2xl"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[300px] flex flex-col justify-end items-start p-10">
          <div className="w-full flex justify-end items-center mb-5">
            <Image
              src="/sim.png"
              width={450}
              height={360}
              alt="sim"
              className="w-[70px] "
            />
          </div>
          <div className="flex justify-between w-full items-end">
            <div>
              <p className="text-white text-2xl font-mono font-semibold">
                XXXX XXXX XXXX XXXX
              </p>
              <div className="flex text-white font-mono text-sm justify-between">
                <p className="">{user?.name}</p>
                <p>{JSON.stringify(creditCard?.exp_date).slice(1, 8)}</p>
              </div>
            </div>
            <div className="h-[40px] w-[100px]">
              {creditCard?.type === "Visa" && (
                <Image
                  src={`/Visa.png`}
                  width={800}
                  height={259}
                  className="object-contain h-[40px]"
                />
              )}
              {creditCard?.type === "Amex" && (
                <Image
                  src={`/Amex.png`}
                  width={2058}
                  height={2048}
                  className="object-contain h-[40px]"
                />
              )}
              {creditCard?.type === "Mastercard" && (
                <Image
                  src={`/Mastercard.png`}
                  width={3000}
                  height={2000}
                  className="object-contain h-[40px]"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex gap-x-5">
        <h3 className="font-semibold">Card Limit: </h3>
        <p className="font-mono">{parseFloat(creditCard?.cr_limit)}</p>
      </div>
    </div>
  );
};

export default page;
