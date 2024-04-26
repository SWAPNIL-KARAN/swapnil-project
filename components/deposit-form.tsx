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
import { DepositSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { startTransition } from "react";
import { withdraw } from "@/actions/withdrawal";
import { deposit } from "@/actions/deposit";

const DepositForm = () => {
  const form = useForm<z.infer<typeof DepositSchema>>({
    resolver: zodResolver(DepositSchema),
    defaultValues: {
      deposit: "",
    },
  });

  const onSubmit = (values: z.infer<typeof DepositSchema>) => {
    const depositAmount = parseFloat(values.deposit);
    startTransition(() => {
      deposit(values)
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="deposit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Deposit</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="00.00" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Deposit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default DepositForm;
