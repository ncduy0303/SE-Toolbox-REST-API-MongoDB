const express = require('express');
const router = express.Router();
const { getAddresses, createAddress, updateAddress, deleteAddress } = require('../controllers/addressController');

// when a GET request is made to http://localhost:8080/api/addresses/
router.get('/', getAddresses); // call the getAddresses controller function

// when a POST request is made to http://localhost:8080/api/addresses/
router.post('/', createAddress); // call the createAddress controller function

// when a PUT request is made to http://localhost:8080/api/addresses/:id
router.put('/:id', updateAddress); // call the updateAddress controller function

// when a DELETE request is made to http://localhost:8080/api/addresses/:id
router.delete('/:id', deleteAddress); // call the deleteAddress controller function

module.exports = router; // export the router to be used in other parts of the application