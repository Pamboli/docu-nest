import { jwtVerify, SignJWT } from "jose";
import prisma from "../prisma";
import { z } from "zod";
import { SigninFormSchema } from "../schemas/auth.schemas";
import { User } from "../generated/prisma";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

const JWT_SECRET = process.env.JWT_SECRET ?? "";
const JWT_EXPIRATION = Number(process.env.JWT_EXPIRATION) ?? 3600;

const encoder = new TextEncoder();
const secretKey = encoder.encode(JWT_SECRET);

type UserCreateType = z.infer<typeof SigninFormSchema>;
type VerifyLogin = {
  email: string;
  password: string;
};

export async function createUser({ email, name, password }: UserCreateType) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = await prisma.user.create({
    data: { email, name, password: hashedPassword },
  });

  const jwt = await createToken(newUser);
  return jwt;
}

export async function verifyLogin({ password, email }: VerifyLogin) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Incorrect password");
  }

  const jwt = await createToken(user);

  return jwt;
}

export async function verifyToken(token: string) {
  try {
    await jwtVerify(token, secretKey);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function createToken(user: User) {
  const jwt = await new SignJWT({ name: user.name })
    .setSubject(user.id)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${JWT_EXPIRATION}s`)
    .sign(secretKey);

  return jwt;
}
