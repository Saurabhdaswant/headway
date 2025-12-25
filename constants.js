const API_ENDPOINTS = {
  BASE_URL:
    process.env.NEXT_PUBLIC_ISLOCAL === "true"
      ? "http://localhost:6000/api"
      : process.env.NEXT_PUBLIC_API,
};

export { API_ENDPOINTS };
