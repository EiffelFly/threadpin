import * as React from "react";
import { TypedSupabaseClient } from "@/types";
import { Database } from "@/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { S3Client } from "@aws-sdk/client-s3";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getURL() {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
}

let supabaseBrowerClient: TypedSupabaseClient | undefined;

function getSupabaseBrowserClient() {
  if (supabaseBrowerClient) {
    return supabaseBrowerClient;
  }

  supabaseBrowerClient = createClientComponentClient<Database>();

  return supabaseBrowerClient;
}

export function useSupabaseBrowser() {
  return React.useMemo(getSupabaseBrowserClient, []);
}

let r2Client: S3Client | undefined;

function getR2Client() {
  if (r2Client) {
    return r2Client;
  }

  r2Client = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT || "",
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    },
  });

  return r2Client;
}

export function useR2Client() {
  return React.useMemo(getR2Client, []);
}
