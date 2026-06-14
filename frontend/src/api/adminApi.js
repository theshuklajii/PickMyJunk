import axios from "axios";

const getToken = () => localStorage.getItem("token");

export const getAllUsers = async () => {
  const response = await axios.get("/admin/users", {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data.users;
};

export const getAllRequests = async () => {
  const response = await axios.get("/admin/requests", {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data.requests;
};

export const getRequestDetails = async (id) => {
  const response = await axios.get(`/admin/requests/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

export const updateRequestStatus = async (id, status) => {
  const response = await axios.put(
    `/requests/${id}`,
    { status },
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    },
  );
  return response.data.request;
};
