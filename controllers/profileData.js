const Profile = require("../models/profileData.js");

const Add = async (req, res) => {
    try {
        // Retrieve the user ID from the request parameters
        const userId = req.query.userId;

        // Retrieve data from the request body
        const { fullname, startDate, endDate, location } = req.body;

        // Check if a profile already exists for the given user ID
        let profile = await Profile.findOne({ user: userId });

        if (profile) {
            // Profile already exists, update the existing profile data
            profile.fullname = fullname;
            profile.startDate = startDate;
            profile.endDate = endDate;
            profile.location = location;

            // Save the updated profile data
            const updatedProfile = await profile.save();

            // Send the updated profile data back to the client
            res.status(200).json(updatedProfile);
        } else {
            // No existing profile, create a new Profile document
            const newProfile = new Profile({
                user: userId,
                fullname,
                startDate,
                endDate,
                location,
            });

            // Save the new document to the database
            const savedProfile = await newProfile.save();

            // Send the saved profile data back to the client
            res.status(200).json(savedProfile);
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error adding or updating profile data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const Get = async (req, res) => {
    try {
        // Retrieve the user ID from the request parameters
        const userId = req.params.Id;
        console.log(userId)

        // Query the database for the profile associated with the specific user ID
        const userProfile = await Profile.find({ user: userId });

        if (userProfile) {
            // If the profile is found, send the data back to the client
            res.status(200).json(userProfile);
        } else {
            // If the profile is not found, send a 404 Not Found response
            res.status(404).json({ message: 'User profile not found' });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error retrieving user profile data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const Update = async (req, res) => {
    try {
        // Retrieve the user ID from the request parameters
        const userId = req.params.Id;

        // Retrieve the update data from the request body
        const updateData = {
            fullname: req.body.fullname,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            location: req.body.location,
        };

        // Perform the update operation
        const updatedProfile = await Profile.findOneAndUpdate(
            { user: userId }, // Filter by user ID
            updateData, // Update data
            { new: true } // Return the updated document
        );

        if (updatedProfile) {
            // If the profile is updated, send the updated data back to the client
            res.status(200).json(updatedProfile);
        } else {
            // If the profile is not found, send a 404 Not Found response
            res.status(404).json({ message: 'User profile not found' });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error updating profile data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const Delete = async (req, res) => {
    try {
        // Retrieve the user ID from the request parameters
        const userId = req.params.Id;

        // Perform the delete operation
        const deletedProfile = await Profile.findOneAndDelete({ user: userId });

        if (deletedProfile) {
            // If the profile is deleted, send a success message back to the client
            res.status(200).json({ message: 'Profile deleted successfully' });
        } else {
            // If the profile is not found, send a 404 Not Found response
            res.status(404).json({ message: 'User profile not found' });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error deleting profile data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    Add,
    Get,
    Update,
    Delete,
};
