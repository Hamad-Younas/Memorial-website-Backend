const Wall = require("../models/memoryWall.js");

exports.Add = async (req, res) => {
    try {
        // Retrieve the user ID from the request parameters
        const userId = req.query.userId;
        console.log("User ID:", req.body);

        // Check if a document with the user ID already exists
        let existingWall = await Wall.findOne({ user: userId });

        if (existingWall) {
            // Update the existing document by appending new data
            const updatedWall = await Wall.findByIdAndUpdate(
                existingWall._id,
                {
                    $push: {
                        imgs: { $each: Array.isArray(req.body.imgs) ? req.body.imgs : [req.body.imgs] },
                        details: { $each: Array.isArray(req.body.details) ? req.body.details : [req.body.details] }
                    }
                },
                { new: true }
            );
            res.status(200).json(updatedWall);
        } else {
            // Create a new document with the provided data
            const newWall = new Wall({
                ...req.body,
                user: userId,
            });
            const savedWall = await newWall.save();
            res.status(200).json(savedWall);
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error adding or updating MemoryWall data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.Get = async (req, res) => {
    try {
        // Retrieve the user ID from the request parameters
        const userId = req.params.Id;
        console.log(userId);

        // Query the database for the document associated with the specific user ID
        const userBgImage = await Wall.findOne({ user: userId });

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
