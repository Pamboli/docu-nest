import { verifyToken } from "@/lib/services/auth.service";
import { ACCESS_TOKEN, getMimeType } from "@/utils/utils";
import { createReadStream, existsSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const FILE_STORAGE_PATH = process.env.FILE_STORAGE_PATH!;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string; filename: string }> }
) {
  const cookies = req.cookies.get(ACCESS_TOKEN);
  const verifiedToken = await verifyToken(cookies?.value ?? "");

  if (!verifiedToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { userId, filename } = await params;
  const filePath = path.join(FILE_STORAGE_PATH, userId, filename);

  if (!existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  const stream = createReadStream(filePath);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new NextResponse(stream as any, {
    status: 200,
    headers: {
      "Content-Type": getMimeType(filename),
      "Content-Disposition": `inline; filename="${filename}"`,
    },
  });
}
