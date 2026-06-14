import axios from "axios";

export const loginUser = async (email, password) => {
  const response = await axios.post("/auth/login", { email, password });
  return response.data;
};

export const loginAdmin = async (email, password) => loginUser(email, password);

export const registerUser = async (email, password) => {
  const response = await axios.post("/auth/register", { email, password });
  return response.data;
};
