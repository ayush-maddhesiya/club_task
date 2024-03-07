require('dotenv').config({path: './.env'});
const mongoose = require('mongoose');
const { Bus, Driver, Route, Stop, Passenger, OneDayPass, Alert, SeatAvailability } = require('./model/bus.model.js'); // Importing the models


mongoose.connect("mongodb+srv://ayush:ayush123@cluster0.9h4qgcg.mongodb.net/piyush", { useNewUrlParser: true, useUnifiedTopology: true });


async function uploadData() {
    try {
        // Create a new driver
        const driver = await Driver.create({
            name: 'Alice Smith',
            contactInfo: 'alice.smith@example.com',
            licenseNumber: 'DL654321'
        });

        // Create a new bus
        const bus = await Bus.create({
            number: 'B002',
            type: 'Double-decker',
            currentLocation: { lat: 34.0522, long: -118.2437 }, // Example coordinates for Los Angeles
            lastUpdateTime: new Date(),
            driver: driver._id,
            totalSeats: 60,
            availableSeats: 60,
            status: 'Active'
        });

        // Create a new route
        const route = await Route.create({
            name: 'Route 2',
            stops: []
        });

        // Create stops for the route
        const stop1 = await Stop.create({
            name: 'Stop X',
            location: { lat: 37.7749, long: -122.4194 }, // Example coordinates for San Francisco
            nextStop: null
        });

        const stop2 = await Stop.create({
            name: 'Stop Y',
            location: { lat: 41.8781, long: -87.6298 }, // Example coordinates for Chicago
            nextStop: null
        });

        // Update route with stops
        route.stops.push(stop1._id, stop2._id);
        await route.save();

        console.log('Data uploaded successfully!');
    } catch (error) {
        console.error('Error uploading data:', error);
    } finally {
        // Close the MongoDB connection
        mongoose.connection.close();
    }
}

// Call the function to upload data
uploadData();
