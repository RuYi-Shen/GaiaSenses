import bcrypt from "bcrypt";
import { prisma } from "../src/database.js";

// create admin user
async function main() {
  const hashedPassword = bcrypt.hashSync("12345678", 10);

  await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@admin.com",
      password: hashedPassword,
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
