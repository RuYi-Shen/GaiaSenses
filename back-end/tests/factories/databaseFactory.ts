import { prisma } from "../../src/database.js";

export async function resetDatabase() {
    await prisma.like.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.user.deleteMany({});
}
