import db from "@/lib/db";
import { redirect } from "next/navigation";

export default async function ProductDelete(userId: number) {
  await db.product.delete({
    where: {
      id: userId,
    },
  });
  redirect("/products");
}
