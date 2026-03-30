import { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";

export const getParamHref = (
  urlPath: string,
  searchParams: any,
  key: string,
  value: string,
) => {
  const params = new URLSearchParams(searchParams);

  params.set(key, value);

  return `${urlPath}?${params.toString()}`;
};

export const convertBoolean = (value?: string) => {
  if (value === "true") return 1;
  if (value === "false") return 0;

  return undefined;
};

export const removeNullFields = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj
      .map(removeNullFields)
      .filter((item) => item !== null && item !== undefined);
  }

  if (typeof obj === "object" && obj !== null) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const cleaned = removeNullFields(value);
      if (cleaned !== null && cleaned !== undefined) {
        acc[key] = cleaned;
      }
      return acc;
    }, {} as any);
  }

  return obj;
};

export const formatMoney = (value: number) => {
  return new Intl.NumberFormat("vi-VN", { maximumSignificantDigits: 3 }).format(
    +value,
  );
};

export const setErrorResponse = <T extends FieldValues = FieldValues>(
  e: any,
  setError: UseFormSetError<T>,
) => {
  const { data = {} } = e?.response || {};
  const { errors } = data;
  if (errors) {
    Object.keys(errors).forEach((key) => {
      setError(key as FieldPath<T>, {
        type: "manual",
        message: errors[key][0],
      });
    });
  }
};
export const downloadBlobFile = (
  blobData: Blob,
  filename = "download.xlsx",
) => {
  const url = window.URL.createObjectURL(new Blob([blobData]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const extractThumbnail = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")

    video.preload = "metadata"
    video.src = URL.createObjectURL(file)
    video.muted = true
    video.playsInline = true

    // Khi metadata load xong → mới seek
    video.onloadedmetadata = () => {
      video.currentTime = 1
    }

    video.onseeked = () => {
      const canvas = document.createElement("canvas")
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext("2d")
      if (!ctx) return reject("No canvas context")

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob)
          else reject("Failed to create thumbnail blob")
        },
        "image/jpeg",
        0.8
      )
    }

    video.onerror = (e) =>{
      reject("Failed to load video for thumbnail")
    }
  })
}
