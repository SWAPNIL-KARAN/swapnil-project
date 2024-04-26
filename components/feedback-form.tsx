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
import { FeedbackSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { startTransition } from "react";
import { withdraw } from "@/actions/withdrawal";
import { feedback } from "@/actions/feedback";

const FeedbackForm = () => {
  const form = useForm<z.infer<typeof FeedbackSchema>>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      feedback: "",
    },
  });

  const onSubmit = (values: z.infer<typeof FeedbackSchema>) => {
    const withdrawalAmount = parseFloat(values.feedback);
    startTransition(() => {
      feedback(values)
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
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Feedback:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Write your feedback here....."
                      type="string"
                      className="w-[500px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default FeedbackForm;
