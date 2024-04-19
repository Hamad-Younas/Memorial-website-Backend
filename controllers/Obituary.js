const Obituary = require("../models/Obituary.js");

exports.Add = async (req, res) => {
    try {
        // Retrieve the user ID from the request parameters
        const userId = req.query.userId;

        // Data to be added or updated
        const Data = {
            details: req.body.details,
        };

        // Check if a document with the user ID already exists
        let existing = await Obituary.findOne({ user: userId });

        if (existing) {
            // Update the existing document with the new data
            existing.details = Data.details;
            const updated = await existing.save();
            res.status(200).json(updated);
        } else {
            // Create a new document with the provided data
            const newdata = new Obituary({
                user: userId,
                details: Data.details,
            });
            const saved = await newdata.save();
            res.status(200).json(saved);
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error adding or updating Obituary data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.Get = async (req, res) => {
    try {
        // Retrieve the user ID from the request parameters
        const userId = req.params.Id;
        console.log(userId);

        // Query the database for the document associated with the specific user ID
        const userDetails = await Obituary.findOne({ user: userId });

        if (userDetails) {
            // If the document is found, send the data back to the client
            res.status(200).json(userDetails);
        } else {
            // If the document is not found, send a 404 Not Found response
            res.status(404).json({ message: 'Obituary not found' });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error retrieving user details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
