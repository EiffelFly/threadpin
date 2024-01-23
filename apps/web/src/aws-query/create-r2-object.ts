import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function createR2Object({
  client,
  file,
  key,
  type,
}: {
  client: S3Client;
  key: string;
  file: Buffer | File;
  type: string;
}) {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || "",
      Key: key,
      Body: file,
      ContentType: type,
    });
    const response = await client.send(command);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
