import { redirect } from "next/navigation";
import getSession from "./session";
import db from "./db";

export async function getLoginSession(user: any) {
  const session = await getSession();
  session.id = user!.id;
  await session.save();
  return redirect("/profile");
}

export async function getSMSLoginSession(token:{userId?:number,id?:number}) {
  const session = await getSession();
  session.id = token!.userId;
  await session.save();
  await db.sMSToken.delete({
    where: {
      id: token.id,
    },
  });
  return redirect("/profile");
}
