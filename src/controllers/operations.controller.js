const {
    computeOperation,
    getOperationHistory,
    deleteOperationById,
    clearOperationHistory,
} = require("../services/operation.service.js");

const performOperation = async(req, res) => {
    const email = req.headers["email"];
    const payload = req.body;

    try {
        const result = await computeOperation(payload, email);
        res.status(201).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getHistory = async(req, res) => {
    const email = req.headers["email"];

    try {
        const userHistory = await getOperationHistory(email);
        res.status(200).json(userHistory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const clearHistory = async(req, res) => {
    const { id } = req.params;

    try {
        await deleteOperationById(id);
        res.status(200).send(`History cleared for ${id}`);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const resetHistory = async(req, res) => {
    const email = req.headers["email"];

    try {
        await clearOperationHistory(email);
        res.status(200).send("History clear completely");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    performOperation,
    getHistory,
    clearHistory,
    resetHistory,
};
