import { toast } from "sonner";

export function toastError(message: string, duration = 3000) {
  toast.error(message, {
    duration,
  });
}
