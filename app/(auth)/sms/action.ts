"use server";

import twilio from "twilio";
import crypto from "crypto";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import validator from "validator";
import { boolean, z } from "zod";
import { getLoginSession, getSMSLoginSession } from "@/lib/login";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "Wrong phone format"
  );
async function tokenExists(token: number) {
  const exists = await db.sMSToken.findUnique({
    where: {
      token: token.toString(),
    },
    select: {
      id: true,
    },
  });
  return Boolean(exists);
}
const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999)
  .refine(tokenExists, "This token does not exist.");

interface ActionState {
  token: boolean;
}

async function getToken(phone: string) {
  const token = crypto.randomInt(100000, 999999).toString();
  const exists = await db.sMSToken.findUnique({
    where: {
      token,
      phone: phone,
    },
    select: {
      id: true,
    },
  });
  if (exists) {
    return getToken(phone);
  } else {
    return token;
  }
}

export async function smsLogin(prevState: ActionState, formData: FormData) {
  const phone = formData.get("phone");
  const token = formData.get("token");
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      console.log("result2", result); // => result2 { success: true, data: '01038602854' }
      //delete previous token
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: result.data,
          },
        },
      });
      //create token
      const token = await getToken(result.data);
      await db.sMSToken.create({
        data: {
          token,
          phone: result.data,
          user: {
            connectOrCreate: {
              where: {
                phone: result.data,
              },
              create: {
                phone: result.data,
                username: crypto.randomBytes(10).toString("hex"),
              },
            },
          },
        },
      });
      // const client = twilio(
      //   process.env.TWILIO_ACCOUNT_SID,
      //   process.env.TWILIO_AUTH_TOKEN
      // );
      // await client.messages.create({
      //   body: `Your Karrot verification code is : ${token}`,
      //   from: process.env.TWILIO_PHONE_NUMBER!,
      //   to: process.env.MY_PHONE_NUMBER!, // result.data
      //   // to: "8201038602854", // result.data
      // });
      //send the token using tillio
      return {
        token: true,
      };
    }
  } else {
    //get the userid of token
    //log the user in
    const result = await tokenSchema.spa(token);
    console.log(prevState, result);
    if (!result.success) {
      return {
        token: true,
        // return the errors
        error: result.error.flatten(),
      };
    } else {
      const token = await db.sMSToken.findUnique({
        where: {
          token: result.data.toString(),
        },
        select: {
          id: true,
          userId: true,
        },
      });
      if(token){
        return getSMSLoginSession(token);
      }
      return redirect("/"); 
    }
  }
}
