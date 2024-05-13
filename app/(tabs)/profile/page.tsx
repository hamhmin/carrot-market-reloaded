import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { DEFAULT_MIN_VERSION } from "tls";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}
export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  console.log("user:", user);
  return (
    <div>
      <h1>welcome to your profile , {user?.username}!</h1>
      <form action={logOut}>
        <button>Log out</button>
      </form>
      <button></button>
    </div>
  );
}
