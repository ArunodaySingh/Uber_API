
const mongoose=require('mongoose');

const connectDB = async () => {
    try {
        //database Name
        const databaseName='ccDb';
        const con = await mongoose.connect("", { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB;