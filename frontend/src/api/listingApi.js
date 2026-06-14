import axios from 'axios';

const getToken = () => localStorage.getItem('token');

export const getAllListings = async () => {
  const response = await axios.get('/listings');
  return response.data.listings;
};

export const getUserListings = async () => {
  const response = await axios.get('/listings/my', {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data.listings;
};

export const createListing = async (listingData) => {
  const response = await axios.post('/listings', listingData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data.listing;
};

export const updateListing = async (id, listingData) => {
  const response = await axios.put(`/listings/${id}`, listingData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data.listing;
};

export const deleteListing = async (id) => {
  await axios.delete(`/listings/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};