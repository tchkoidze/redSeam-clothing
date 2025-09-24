import { useState } from "react";
import { fileToBase64, dataURLtoFile } from "../utils/imageUtils";

export const useFileUpload = (maxSizeKB = 600) => {
  const [error, setError] = useState("");
  const [image, setImage] = useState<string>("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    //const validationError = validateFile(file, maxSizeKB);
    // if (validationError) {
    //   setError(validationError);
    //   return;
    // }

    try {
      const base64 = await fileToBase64(file);
      setImage(base64);
      setError("");
    } catch {
      setError("Failed to upload image");
    }
  };

  return {
    image,
    error,
    setImage,
    setError,
    handleFileChange,
    dataURLtoFile,
  };
};
