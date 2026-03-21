import { prisma } from "@/lib/prisma";
import { getAdminIdFromCookies } from "@/lib/auth";

export async function requireAdmin() {
  const id = await getAdminIdFromCookies();
  if (!id) throw new Error("Unauthorized");
  const admin = await prisma.adminUser.findUnique({ where: { id } });
  if (!admin) throw new Error("Unauthorized");
  return admin;
}
