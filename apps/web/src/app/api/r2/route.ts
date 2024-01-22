import { createR2Object } from "@/aws-query/create-r2-object";
import { S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT || "",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: NextRequest) {
  let file: File;
  let key: string;

  try {
    const formData = await request.formData();
    file = formData.get("file") as File;
    key = formData.get("key") as string;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }

  if (!file) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  if (!key) {
    return NextResponse.json({ error: "Key is required." }, { status: 400 });
  }

  const buffer = Buffer.from(await (file as File).arrayBuffer());

  try {
    await createR2Object({
      client: r2Client,
      file: buffer,
      key: key as string,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
