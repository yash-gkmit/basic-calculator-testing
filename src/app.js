// app.js
const express = require('express');
const dotenv = require('dotenv');
const { dbConnection } = require('./config/database.js');
const calculatorRoutes = require('./routes/operation.route.js');

const PORT = 4700;
const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, './swagger/swagger.yaml'));

dotenv.config();


app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

dbConnection();

app.use('/api/calculators', calculatorRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});