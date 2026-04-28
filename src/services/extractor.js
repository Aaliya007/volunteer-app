const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadFile = async (file, type) => {
  const formData = new FormData();
  formData.append("file", file);

  const endpointMap = {
    form: "/extract/form",
    voice: "/extract/voice",
    situational: "/extract/situational",
  };

  const response = await fetch(`${BASE_URL}${endpointMap[type]}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data;
};