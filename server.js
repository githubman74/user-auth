const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);

// Replace <username>, <password>, and <myFirstDatabase> with your actual credentials and database name
const mongoURI = 'mongodb+srv://thewasspard:thewasspard@userauth.cddgy9s.mongodb.net/?retryWrites=true&w=majority&appName=userauth';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
