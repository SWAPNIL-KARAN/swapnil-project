"use client";

import * as z from "zod";

import { startTransition, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CustomerRegisterSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "./card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { registerCustomer } from "@/actions/register";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const CustomerRegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useTransition();

  const form = useForm<z.infer<typeof CustomerRegisterSchema>>({
    resolver: zodResolver(CustomerRegisterSchema),
    defaultValues: {
      f_name: "",
      l_name: "",
      state: "",
      pincode: "",
      bank_id: "",
      account_no: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CustomerRegisterSchema>) => {
    // API Routes <>

    setError("");
    setSuccess("");

    startTransition(() => {
      registerCustomer(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Register a Customer"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="gap-x-4 flex">
            <FormField
              control={form.control}
              name="f_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="John" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="l_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="gap-x-4 flex">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Delhi"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="110091"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="gap-x-4 flex">
            <FormField
              control={form.control}
              name="bank_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank ID</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Bank ID" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SBI">
                      SBI
                      </SelectItem>
                      <SelectItem value="HDFC">HDFC</SelectItem>
                      <SelectItem value="ICICI">
                      ICICI
                      </SelectItem>
                      <SelectItem value="AXIS">
                      AXIS
                      </SelectItem>
                      <SelectItem value="KOTAK">
                      KOTAK
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="gap-x-4 flex">
            <FormField
              control={form.control}
              name="account_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account No</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="IN099381816457693932649285"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Register Customer
          </Button>
        </form>
      </Form>
      <div className="mt-2">
        <Link href="/auth/register/user">
          <Button variant="ghost" className="w-full" disabled={isPending}>
            Create a User <MoveRight className="h-4 w-4 ml-5"/>
          </Button>
        </Link>
      </div>
    </CardWrapper>
  );
};

export default CustomerRegisterForm;
