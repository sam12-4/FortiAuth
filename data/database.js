import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        }).then((e) => console.log("Connected to database",e.connection.host));
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
    };