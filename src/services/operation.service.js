const Operation = require('../models/operation.model.js');

const calculateOperation = async (payload, email) => {
    let result;
    const { operand1, operand2, operator } = payload;

    try {
        switch (operator) {
            case 'ADD':
                result = operand1 + operand2;
                break;
            case 'SUB':
                result = operand1 - operand2;
                break;
            case 'MUL':
                result = operand1 * operand2;
                break;
            case 'DIV':
                if (operand2 === 0) throw new Error('Cannot divide by zero');
                result = operand1 / operand2;
                break;
            default:
                throw new Error('Invalid operator');
        }

        const newOperationRecord = new Operation({
            operand1,
            operand2,
            operator,
            result,
            email
        });

        await newOperationRecord.save();
        return result;

    } catch (error) {
        throw new Error(`Error performing operation: ${error.message}`);
    }
};

const fetchOperationHistory = async (email) => {
    try {
        const userHistory = await Operation.find({ email: email });
        return userHistory;
    } catch (error) {
        throw new Error(`Error fetching history: ${error.message}`);
    }
};

const deleteOperationById = async (id) => {
    try {
        const deletedHistory = await Operation.findByIdAndDelete(id);
        if (!deletedHistory) throw new Error('History record not found');
        return deletedHistory;
    } catch (error) {
        throw new Error(`Error clearing history: ${error.message}`);
    }
};

const clearOperationHistory = async (email) => {
    try {
        const result = await Operation.deleteMany({ email: email }); // Return the result here
        return result;
    } catch (error) {
        throw new Error(`Error resetting history: ${error.message}`);
    }
};

module.exports = {
    calculateOperation,
    fetchOperationHistory,
    deleteOperationById,
    clearOperationHistory
};
