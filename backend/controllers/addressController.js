const Address = require('../models/addressModel');

// @desc    Get all addresses
// @route   GET /addresses
// @access  Public
const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find().sort({ createdAt: -1 }); // get all addresses, sorted by creation date (newest first)
        res.status(200).json(addresses); // respond with the addresses in JSON format
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching addresses' });
    }
};

// @desc    Create a new address
// @route   POST /addresses
// @access  Public
const createAddress = async (req, res) => {
    const { title, description } = req.body; // get title and description from request body
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }
    try {
        const newAddress = new Address({ title, description }); // create a new Address instance
        const savedAddress = await newAddress.save(); // save the new address to the database
        res.status(201).json(savedAddress); // respond with the saved address in JSON format
    } catch (error) {
        res.status(500).json({ message: 'Server error while creating address' });
    }
};

// @desc    Update an address
// @route   PUT /addresses/:id
// @access  Public
const updateAddress = async (req, res) => {
    const { id } = req.params; // get address ID from request parameters
    const { title, description } = req.body; // get updated title and description from request body
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }
    try {
        const updatedAddress = await Address.findByIdAndUpdate(id, { title, description }, { new: true }); // find address by ID and update it
        if (!updatedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.status(200).json(updatedAddress); // respond with the updated address in JSON format
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating address' });
    }
};

// @desc    Delete an address
// @route   DELETE /addresses/:id
// @access  Public
const deleteAddress = async (req, res) => {
    const { id } = req.params; // get address ID from request parameters
    try {
        const deletedAddress = await Address.findByIdAndDelete(id); // find address by ID and delete it
        if (!deletedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.status(200).json({ message: 'Address deleted successfully' }); // respond with success message
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting address' });
    }
};

// export the controller functions to be used in routes
module.exports = {
    getAddresses, createAddress, updateAddress, deleteAddress
};