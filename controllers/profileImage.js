const bgImage = require("../models/profileImage.js");

const Add = async (req, res) => {
    try {
        // Retrieve the user ID from the request parameters
        const userId = req.query.userId;
        console.log("dsd", userId);

        // Data to be added or updated
        const imageData = {
            img: req.body.img,
        };

        // Check if a document with the user ID already exists
        let existingBgImage = await bgImage.findOne({ user: userId });

        if (existingBgImage) {
            // Update the existing document with the new data
            existingBgImage.img = imageData.img;
            const updatedBgImage = await existingBgImage.save();
            res.status(200).json(updatedBgImage);
        } else {
            // Create a new document with the provided data
            const newBgImage = new bgImage({
                user: userId,
                img: imageData.img,
            });
            const savedBgImage = await newBgImage.save();
            res.status(200).json(savedBgImage);
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error adding or updating bgImage data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const Get = async (req, res) => {
    try {
        // Retrieve the user ID from the request parameters
        const userId = req.params.Id;
        console.log(userId);

        // Query the database for the document associated with the specific user ID
        const userBgImage = await bgImage.findOne({ user: userId });

        if (userBgImage) {
            // If the document is found, send the data back to the client
            res.status(200).json(userBgImage);
        } else {
            // If the document is not found, send a 404 Not Found response
            res.status(404).json({ message: 'User background image not found' });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error retrieving user background image data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    Add,
    Get,
};
