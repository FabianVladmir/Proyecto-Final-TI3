import mongoose from "mongoose";
import generateID from "../helpers/generateID.js";

const studentSchema = mongoose.Schema({
    firstname:{
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
    telefono:{
        type: Number,
        default: null,
        trim: true,
    },
    CUI:{
        type: Number,
        require: true,
        default: null,
        unique: true,
        trim: true,
    },
    token:{
        type: String,
        default: generateID()
    },
    confirmado:{
        type: Boolean,
        default: false,
    }
});

//register the schema in DB

const Student = mongoose.model("Student",studentSchema);



export default Student;