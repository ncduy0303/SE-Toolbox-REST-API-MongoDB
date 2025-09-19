import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/addresses';

// Get all addresses
export const getAddresses = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    throw error;
  }
};

// Create a new address
export const createAddress = async (addressData) => {
  try {
    const response = await axios.post(API_BASE_URL, addressData);
    return response.data;
  } catch (error) {
    console.error('Error creating address:', error);
    throw error;
  }
};

// Update an existing address
export const updateAddress = async (id, addressData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, addressData);
    return response.data;
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
};

// Delete an address
export const deleteAddress = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};