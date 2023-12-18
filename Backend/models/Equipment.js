const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true
    },    
    amount:{
        type: Number,
        require: true
    },
    components:{
        type: String,
        require: true
    },
    state:{
        type: String,
        require: true
    },

});

const Book = mongoose.model('Book', equipmentSchema);



export default Book;