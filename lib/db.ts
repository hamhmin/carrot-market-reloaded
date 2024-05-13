import { PrismaClient } from "../node_modules/.prisma/client";

const db = new PrismaClient();
//
async function test() {
  const token = await db.sMSToken.findUnique({
    // data: {
    //   token: "121212",
    //   user: {
    //     connect: {
    //       id: 1,
    //     },
    //   },
    // },
    where: {
      id: 1,
    },
    include: {
      user: true,
    },
  });
  console.log("token: ", token);
}
test();
// async function test() {
//   //   const user = await db.user.findMany({
//   const user = await db.user.create({
//     data: {
//       username: "test",
//     },
//     // where: {
//     //   username: {
//     //     contains: "est",
//     //   },
//     // },
//   });
//   console.log(user);
// }

// test();
export default db;
