import axios from "axios";

const getToken = () => localStorage.getItem("token");

export const getUserRequests = async () => {
  const response = await axios.get("/requests", {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data.requests;
};

export const getUserProfile = async () => {
  const response = await axios.get("/auth/me", {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

export const createRequest = async (listingId, message) => {
  const response = await axios.post(
    "/requests",
    { listingId, message },
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    },
  );
  return response.data.request;
};
