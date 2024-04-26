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
import { BorrowSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { startTransition } from "react";
import { withdraw } from "@/actions/withdrawal";
import { borrow } from "@/actions/borrow";

const BorrowForm = () => {
  const form = useForm<z.infer<typeof BorrowSchema>>({
    resolver: zodResolver(BorrowSchema),
    defaultValues: {
      borrow: "",
    },
  });

  const onSubmit = (values: z.infer<typeof BorrowSchema>) => {
    const withdrawalAmount = parseFloat(values.borrow);
    startTransition(() => {
      borrow(values)
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
              name="borrow"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Borrow</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="00.00" type="string" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" >
            Borrow
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BorrowForm;
