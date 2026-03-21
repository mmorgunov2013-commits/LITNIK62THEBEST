"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createAdminToken, setAdminCookie, clearAdminCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: "Введите email и пароль" };
  }
  const admin = await prisma.adminUser.findUnique({
    where: { email: parsed.data.email },
  });
  if (
    !admin ||
    !(await bcrypt.compare(parsed.data.password, admin.passwordHash))
  ) {
    return { error: "Неверный логин или пароль" };
  }
  const token = await createAdminToken(admin.id);
  await setAdminCookie(token);
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await clearAdminCookie();
  redirect("/admin/login");
}
