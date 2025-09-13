"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  role: z.string().min(1, "Role is required"),
  level: z.string().min(1, "Level is required"),
  techstack: z.string().min(1, "Tech stack is required"),
  type: z.string().min(1, "Type is required"),
  amount: z
    .number()
    .min(1, "Amount must be at least 1")
    .max(20, "Amount must be att us most 20"),
  questions: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface InterviewFormProps {
  userId: string;
}

const InterviewForm = ({ userId }: InterviewFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
      level: "Junior",
      techstack: "",
      type: "Technical",
      amount: 5,
      questions: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const questions = data.questions
        ? data.questions
            .split("\n")
            .map((q) => q.trim())
            .filter((q) => q.length > 0)
        : [];

      const response = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: data.type,
          role: data.role,
          level: data.level,
          techstack: data.techstack,
          amount: data.amount,
          userid: userId,
          questions,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to create interview");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="call-view">
      <div className="card-border">
        <div className="card-content">
          <h3>Create New Interview</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Role</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Frontend Developer"
                        {...field}
                        className="text-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Junior, Mid, Senior"
                        {...field}
                        className="text-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="techstack"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tech Stack</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. React, TypeScript, Next.js"
                        {...field}
                        className="text-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Type</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Technical, Behavioral, Mixed"
                        {...field}
                        className="text-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        className="text-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="questions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Questions (optional)</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Enter your interview questions"
                        rows={3}
                        {...field}
                        className="w-full p-2 border rounded resize-none text-white bg-black"
                        style={{
                          minHeight: "3rem",
                          maxHeight: "10rem",
                          overflowY: "auto",
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-call"
              >
                {isSubmitting ? "Creating..." : "Create Interview"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default InterviewForm;
