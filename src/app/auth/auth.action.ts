"use server";

import { signUpSchema } from "@/components/SignUpForm";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import { z } from "zod";

export const signUp = async (values: z.infer<typeof signUpSchema>) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: values.email
      }
    })
    if (existingUser) {
      return {
        error: 'User already exists',
        success: false
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(values.password, salt);

    const user = await prisma.user.create({
      data: {
        email: values.email,
        name: values.name,
        hashedPassword
      }
    })

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return { success: true }
  } catch (error) {
    return { error: "Something went wrong", success: false }
  }
}
