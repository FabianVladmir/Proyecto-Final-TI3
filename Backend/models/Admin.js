import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    firstname: {
        type: String,
        require: true,
        trim: true,
    },
    lastname:{
        type: String,
        require: true,
        trim: true,
    },
    password:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    telephone:{
        type: Number,
        default: null,
        trim: true,    
    }
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
