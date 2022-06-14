import mongoose from "mongoose";

mongoose.connect('mongodb+srv://Lautaro:12345@codercluster18335.zy1j9.mongodb.net/ecommerce?retryWrites=true&w=majority', {
    useUnifiedTopology: true
}, error => {
    if(error) throw new Error('Cannot connect to MongoDB')
    console.log('Base conectada')
});
