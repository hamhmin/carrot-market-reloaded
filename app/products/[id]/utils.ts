import db from "@/lib/db";
import { redirect } from "next/navigation";

export default async function ProductDelete(product: any) {
  await db.product.delete({
    where: {
      id: product.userId,
    },
  });
  redirect("/products");
}
