import * as z from "zod";

export const ListsOrderRecordSchema = z.array(
  z.object({
    list_uid: z.string(),
    order: z.number(),
  })
);

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 5000000;

export const ZodSingleImageValidator = z
  .any()
  .refine((file) => !!file, "Image is required.")
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    ".jpg, .jpeg, .png and .webp files are accepted."
  );
