export const handleImg = (url) => {
  if (url.includes('http')) {
    return url;
  } else {
    return `${process.env.VITE_BACK_URL}${url}`;
  }
};
