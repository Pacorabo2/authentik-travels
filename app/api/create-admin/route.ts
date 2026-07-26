import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (token !== process.env.ADMIN_SETUP_TOKEN) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    // 🔑 IDENTIFIANTS À PERSONNALISER
    const email = process.env.AUTHENTIK_ADMIN_EMAIL;
    const password = process.env.AUTHENTIK_ADMIN_PASSWORD;

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.upsert({
      where: { email: email },
      update: {
        role: "ADMIN", // Au cas où l'utilisateur existe déjà
      },
      create: {
        email: email,
        name: "Admin Authentik",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    return NextResponse.json({
      message: "✅ Compte Admin créé ou mis à jour !",
      email: admin.email,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
