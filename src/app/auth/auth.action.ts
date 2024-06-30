"use server";

import { signUpSchema } from "@/components/SignUpForm";
import { z } from "zod";

export const signUp = async (values: z.infer<typeof signUpSchema>) => {
  
}
