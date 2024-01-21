import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function createR2Object({
  client,
  file,
  key,
}: {
  client: S3Client;
  key: string;
  file: File;
}) {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || "",
      Key: key,
      Body: file,
    });
    const response = await client.send(command);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
