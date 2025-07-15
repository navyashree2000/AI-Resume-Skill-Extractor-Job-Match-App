const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const resumeRoutes = require('./routes/resume');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/api/resume', resumeRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
