import { handleAPIError } from "@/lib/handleAPIError";
import { NextRequest } from "next/server";
import * as cheerio from "cheerio";
import * as z from "zod";

export const GetURLDataResponseSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  site_name: z.string().nullable(),
  ogImage: z.string().nullable(),
  keywords: z.string().nullable(),
});

export type GetURLDataResponse = z.infer<typeof GetURLDataResponseSchema>;

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get("url");

    if (!url) {
      return handleAPIError(null, "URL is required");
    }

    const res = await fetch(url);

    const html = await res.text();

    const $ = cheerio.load(html);

    const title =
      $('meta[property="og:title"]').attr("content") ||
      $("title").text() ||
      $('meta[name="title"]').attr("content");

    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content");

    const site_name =
      $('meta[property="og:site_name"]').attr("content") ||
      $('meta[name="site_name"]').attr("content");

    const ogImage =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="image"]').attr("content");

    const keywords =
      $('meta[property="og:keywords"]').attr("content") ||
      $('meta[name="keywords"]').attr("content");

    const response: z.infer<typeof GetURLDataResponseSchema> = {
      title: title || null,
      description: description || null,
      site_name: site_name || null,
      ogImage: ogImage || null,
      keywords: keywords || null,
    };

    return new Response(JSON.stringify(response));
  } catch (error) {
    console.log(error);
    return handleAPIError(error, "Failed to get URL data");
  }
}
