const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    title: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Data = mongoose.model("Data", dataSchema); 
module.exports = Data;