"use client";

import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import Toast from "./Toast";
import { useState, useEffect } from "react";
import { getAddresses, createAddress, updateAddress, deleteAddress } from "@/services/addressService";

// render list of AddressCard components
const AddressCardList = ({ showForm, onFormClose }) => {
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success', isVisible: false });

  // Toast helper functions
  const showToast = (message, type = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  // Fetch addresses from the API
  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const data = await getAddresses();
      setAddresses(data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Handle creating a new address
  const handleCreateAddress = async (addressData) => {
    try {
      await createAddress(addressData);
      await fetchAddresses(); // Refresh the list
      onFormClose(); // Close the form
      showToast('Address created successfully!');
    } catch (error) {
      console.error("Error creating address:", error);
      showToast(error.response?.data?.message || 'Failed to create address', 'error');
      throw error;
    }
  };

  // Handle updating an existing address
  const handleUpdateAddress = async (addressData) => {
    try {
      await updateAddress(editingAddress._id, addressData);
      await fetchAddresses(); // Refresh the list
      setEditingAddress(null); // Close edit mode
      showToast('Address updated successfully!');
    } catch (error) {
      console.error("Error updating address:", error);
      showToast(error.response?.data?.message || 'Failed to update address', 'error');
      throw error;
    }
  };

  // Handle deleting an address
  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await deleteAddress(addressId);
        await fetchAddresses(); // Refresh the list
        showToast('Address deleted successfully!');
      } catch (error) {
        console.error("Error deleting address:", error);
        showToast(error.response?.data?.message || 'Failed to delete address', 'error');
      }
    }
  };

  // Handle edit button click
  const handleEditAddress = (address) => {
    setEditingAddress(address);
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-8">
        <div className="text-gray-500">Loading addresses...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {addresses.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No addresses found. Click "Add address" to create your first address.
        </div>
      ) : (
        addresses.map((address) => (
          <AddressCard 
            key={address._id} 
            address={address} 
            onEdit={() => handleEditAddress(address)}
            onDelete={() => handleDeleteAddress(address._id)}
          />
        ))
      )}
      
      {/* Form for creating new addresses */}
      <AddressForm
        isOpen={showForm}
        onClose={onFormClose}
        onSave={handleCreateAddress}
      />
      
      {/* Form for editing existing addresses */}
      <AddressForm
        isOpen={!!editingAddress}
        onClose={() => setEditingAddress(null)}
        onSave={handleUpdateAddress}
        editingAddress={editingAddress}
      />
      
      {/* Toast notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};

export default AddressCardList;
