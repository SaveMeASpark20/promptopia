import mongoose from 'mongoose';

let isConnected = false;


export const connectToDB = async() => {
    mongoose.set('strictQuery', true);

    if(isConnected) { 
        console.log("Connected to Database")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        isConnected= true;

    } catch (error) {
        console.log(error)
    }

}

