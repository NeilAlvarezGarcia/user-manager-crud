if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const connectDB = require('./server/database/connection');
const app = require('./app');


const startApp = async () => {
    const port = process.env.PORT || 3000;
    try {
        const response = await connectDB();
        if(response) app.listen(port);
        else {
            throw new Error();
        }
    } catch(err) {
        console.log('Error connecting to the DB'),
        process.exit()
    }
}

startApp();