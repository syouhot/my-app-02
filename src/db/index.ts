import { PrismaClient } from "@/generated/prisma";

export const db = new PrismaClient();
// db.snippet.create({
//     data: {
//         title: "react",
//         code:"const React = ()=><div>React</div>"
//     }
// }).then(console.log)