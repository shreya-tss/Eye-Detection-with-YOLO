export const encodeImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result;
      const base64 = result.split(",")[1]; 
      resolve(base64);
    };

    reader.onerror = () => {
      reject("Failed to convert image to base64");
    };

    reader.readAsDataURL(file);
  });
};
