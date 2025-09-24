// export const validateFile = (file: File, maxSizeKB = 600): string | null => {
//   const validTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/jpg",
//     "image/svg",
//     "image/webp",
//     "image/jpeg",
//   ];

//   if (!validTypes.includes(file.type)) {
//     return "Only JPG,JPEG, PNG , SVG or WEBP format";
//   }

//   // if (file.size > maxSizeKB * 1024) {
//   //   return `Image size must not exceed ${maxSizeKB}kb`;
//   // }

//   return null;
// };

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
