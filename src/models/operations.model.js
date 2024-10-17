const mongoose = require("mongoose");

const operationModel = new mongoose.Schema({
    operand1: {
        type: Number,
        required: true,
    },
    operand2: {
        type: Number,
        required: true,
    },
    operator: {
        type: String,
        required: true,
        enum: ["add", "subtract", "multiply", "divide"],
    },
    result: {
        type: Number,
    },
    email: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Operation", operationModel);
