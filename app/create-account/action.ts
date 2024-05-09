"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { boolean, z } from "zod";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

// const passwordRegex = PASSWORD_REGEX;
const checkUsername = (username: string) => !username.includes("potato");
const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

// const checkUniqueUsername = async (username: string) => {
//   const user = await db.user.findUnique({
//     where: {
//       username: username,
//     },
//     select: {
//       id: true,
//     },
//   });
//   return !Boolean(user);
// };
// const checkUniqueEmail = async (email: string) => {
//   const user = await db.user.findUnique({
//     where: {
//       email: email,
//     },
//     select: {
//       id: true,
//     },
//   });
//   console.log(user, !Boolean(user));
//   return !Boolean(user);
// };
const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "username은 문자열이다",
        required_error: "뭐라도 보내라",
      })
      //   .min(3, "애미야 국이 짜다")
      //   .max(10, "애미야 국이 달다")
      .toLowerCase()
      .trim()
      // .transform((username) => `asd`)
      .refine(checkUsername, "potato no!"),
    // .refine(checkUniqueUsername, "This username is already taken"),
    email: z.string().email().trim().toLowerCase(),
    // .refine(checkUniqueEmail, "이미 있느 이메일"),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z
      .string({
        required_error: "Password is required",
      })
      .min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: "두 비밀번호가 동일해야함",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  console.log(cookies());
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  //   usernameSchema.parse(data.username);
  //   console.log(usernameSchema.parse(data.username));
  //   try {
  //     formSchema.parse(data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  const result = await formSchema.spa(data);
  //   console.log(result);
  if (!result.success) {
    console.log(result.error.flatten());
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    // console.log("asdasd", result.data);

    //hash password
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    console.log(hashedPassword);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    console.log(user);
    //save the user to db
    // log the user in
    const cookie = await getSession();
    cookie.id = user.id;
    await cookie.save();
    //redirect "/home"
    redirect("/profile");
  }
}
