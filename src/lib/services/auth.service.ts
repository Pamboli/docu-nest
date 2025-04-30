import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET ?? "";
const JWT_EXPIRATION = Number(process.env.JWT_EXPIRATION) ?? 3600;
const USER_PASSWORD = process.env.USER_PASSWORD ?? "";

const encoder = new TextEncoder();
const secretKey = encoder.encode(JWT_SECRET);

export async function verifyToken(token: string) {
  try {
    await jwtVerify(token, secretKey);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function verifyLogin(password: string) {
  if (password !== USER_PASSWORD) {
    throw new Error("Incorrect password");
  }

  const jwt = await new SignJWT()
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${JWT_EXPIRATION}s`)
    .sign(secretKey);

  return jwt;
}
