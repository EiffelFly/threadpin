import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function deleteR2Object({
  client,
  key,
}: {
  client: S3Client;
  key: string;
}) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || "",
      Key: key,
    });
    const response = await client.send(command);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
