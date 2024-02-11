const mongoose = require('mongoose');

const mongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Databse is connected...');
    } catch (error) {
        console.log(error);
    }
}

module.exports = mongoDB;