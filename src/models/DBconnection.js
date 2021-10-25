const mongoose=require('mongoose');

const connectDB = async () => {
    try {
        //database Name
        const databaseName='ccDb';
        const con = await mongoose.connect("mongodb+srv://Arunoday:Arunoday@123@cluster0-u01rr.mongodb.net/uberapi", { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports=connectDB;