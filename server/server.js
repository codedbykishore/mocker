require('dotenv').config();
const app = require('./app');
const { db } = require('./firebase.admin');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/software-mocker';

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (Firebase Mode)`);
});
