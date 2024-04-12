export const handleImg = (url: string) => {
  if (url.includes('http')) {
    return url;
  } else {
    return `${import.meta.env.VITE_BACK_URL}${url}`;
  }
};
