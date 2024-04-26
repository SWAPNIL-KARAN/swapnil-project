"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { WithdrawalSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { startTransition } from "react";
import { withdraw } from "@/actions/withdrawal";

const WithdrawalForm = () => {
  const form = useForm<z.infer<typeof WithdrawalSchema>>({
    resolver: zodResolver(WithdrawalSchema),
    defaultValues: {
      withdraw: "",
    },
  });

  const onSubmit = (values: z.infer<typeof WithdrawalSchema>) => {
    const withdrawalAmount = parseFloat(values.withdraw);
    startTransition(() => {
      withdraw(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
          }
        })
        .catch((error) => console.log("Something went wrong!", error));
    });
  };
  return (
    <>
      {/* <div className="flex flex-col justify-center items-center gap-y-3">
        <div className="flex justify-center items-center gap-x-2">
          <h4 className="font-semibold">Withdraw:</h4>
          <Input
            type="number"
            placeholder="0.0"
            className="font-mono text-sm"
            value={withdrawalAmount}
            onChange={handleOnChange}
          />
        </div>
        <Button type="submit" onClick={handleWithdraw}>
          Submit
        </Button>
      </div> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="withdraw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Withdraw</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="00.00" type="string" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" >
            Withdraw
          </Button>
        </form>
      </Form>
    </>
  );
};

export default WithdrawalForm;
