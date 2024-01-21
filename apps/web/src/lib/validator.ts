import * as z from "zod";

export const ListsOrderRecordSchema = z.array(
  z.object({
    list_uid: z.string(),
    order: z.number(),
  })
);
