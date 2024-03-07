const mongoose = require('mongoose');
const { Schema } = mongoose;


const busSchema = new Schema({
    number: String,
    type: String,
    currentLocation: {
        lat: Number,
        long: Number
    },
    lastUpdateTime: Date,
    driver: { type: Schema.Types.ObjectId, ref: 'Driver' },
    route: { type: Schema.Types.ObjectId, ref: 'Route' },
    totalSeats: Number,
    availableSeats: Number,
    status: String
});

const driverSchema = new Schema({
    name: String,
    contactInfo: String,
    licenseNumber: String,
    currentBus: { type: Schema.Types.ObjectId, ref: 'Bus' }
});

const routeSchema = new Schema({
    name: String,
    stops: [{ type: Schema.Types.ObjectId, ref: 'Stop' }]
});

const stopSchema = new Schema({
    name: String,
    location: {
        lat: Number,
        long: Number
    },
});

const passengerSchema = new Schema({
    name: String,
    contactInfo: String
});

const oneDayPassSchema = new Schema({
    passenger: { type: Schema.Types.ObjectId, ref: 'Passenger' },
    dateOfIssue: Date,
    validity: {
        startTime: Date,
        endTime: Date
    }
});

const alertSchema = new Schema({
    bus: { type: Schema.Types.ObjectId, ref: 'Bus' },
    alertType: String,
    timestamp: Date,
    description: String
});

const seatAvailabilitySchema = new Schema({
    bus: { type: Schema.Types.ObjectId, ref: 'Bus' },
    date: Date,
    availableSeatsCount: Number
});

// Define the models
const Bus = mongoose.model('Bus', busSchema);
const Driver = mongoose.model('Driver', driverSchema);
const Route = mongoose.model('Route', routeSchema);
const Stop = mongoose.model('Stop', stopSchema);
const Passenger = mongoose.model('Passenger', passengerSchema);
const OneDayPass = mongoose.model('OneDayPass', oneDayPassSchema);
const Alert = mongoose.model('Alert', alertSchema);
const SeatAvailability = mongoose.model('SeatAvailability', seatAvailabilitySchema);

module.exports = { Bus, Driver, Route, Stop, Passenger, OneDayPass, Alert, SeatAvailability };
