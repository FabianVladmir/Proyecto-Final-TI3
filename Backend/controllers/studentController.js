import mongoose from "mongoose";
import generateID from "../helpers/generateID.js";
import genereateJWT from "../helpers/generateJWT.js";
import Student from "../models/Student.js";
import ReservationBook from "../models/ReservationBooks.js";
import ReservationEquipment from "../models/ReservationEquipment.js";

const signIn = async (req,res) => {
    const {email} = req.body;

    // check if a student already exists
    const existsStudent = await Student.findOne({email});

    if(existsStudent){
        const error = new Error("Estudiante existente");
        return res.status(400).json({msg: error.message});
    }

    try {
        //Save mew student
        const student = new Student(req.body);
        const studentSave = await student.save();
        
        //Envia el email
        // emailRegistro({
        //     email,
        //     nombre,
        //     token: studentSave.token
        // })
        
        res.json(studentSave)
    } catch (error) {
        console.log(error);
    }
    
}
const profile = (req, res) => {
    const {student} = req;
    res.json({student});
}

const confirmAccount = async (req, res) => {
    //read url values
    const {token} = req.params;
    const studentConfirm = await Student.findOne({token});

    if(!studentConfirm){
        const error = new Error('token no valido'); 
        return res.status(404).json({msg: error.message});
    }

    try {
        studentConfirm.token = null;
        studentConfirm.confirmado = true;
        await studentConfirm.save();

        res.json({msg:"Usuario confirmado correctamente"});
    } catch (error) {
        console.log(error)
    }    
}

const authenticateStudent = async (req, res) => {

    const {email, password} = req.body;

    //Search a student by email
    const student = await Student.findOne({email});
    console.log(student);
    if(!student){
        const error = new Error('El estudiante no existe');
        return res.status(404).json({msg: error.message});
    }

    //check if the student is not authenticated
    if(!student.confirmado){
        const error = new Error('Tu cuenta no ha sido confirnada');
        return res.status(403).json({msg: error.message})
    }

    //check the password
    if(await student.checkPasswordStudent(password)){
        //authenticated student   
        
        res.json({token: genereateJWT(student.id)})     
        // res.json({
        //     _id: student._id,
        //     nombre: student.nombre,
        //     email: student.email,
        //     token: genereateJWT(student.id)
            
        // })
        console.log("password correcto")
    }else{
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg: error.message})
    }
}

const forgetPassword = async (req, res) => {
    const {email} = req.body;
    
    // check if a student already exists
    const existStudent = await Student.findOne({ email });
    if (!existStudent) {
        const error = new Error("El Usuario no existe");
        return res.status(400).json({ msg: error.message });
    }

    try {

        existStudent.token = generateID();
        await existStudent.save();
        //NODEMAILER
        // Send Email with instructions
        // emailOlvidePassword({
        //     email,
        //     nombre: existStudent.nombre,
        //     token: existStudent.token,
        // });

        res.json({ msg: "Hemos enviado un email con las instrucciones" });
    } catch (error) {
        console.log(error);
    }


}

const checkToken = async (req, res) => {
    const { token } = req.params;

    const tokenValid = await Student.findOne({ token });

    if (tokenValid) {
        // The Token is valid the user exists
        res.json({ msg: "Token válido y el usuario existe" });
    } else {
        const error = new Error("Token no válido");
        return res.status(400).json({ msg: error.message });
    }
}


const newPassword = async (req, res) => {
    // console.log("some");
    // res.json({msg:"desde newpassword"});
    const { token } = req.params;
    const { password } = req.body;

    const existStudentToken = await Student.findOne({ token });
    if (!existStudentToken) {
        const error = new Error("Hubo un error");
        return res.status(400).json({ msg: error.message });
    }

    try {
        //change student model attributes
        existStudentToken.token = null;
        existStudentToken.password = password;
        await existStudentToken.save();
        res.json({ msg: "Password modificado correctamente" });
    } catch (error) {
        console.log(error);
    }
}

const viewSchedules = async (req, res) => {
    
}

const viewEquipment = async (req, res) => {
    const {type} = req.params;
    const VALID_TYPES = ["books", "equipments"];

    if(!VALID_TYPES.includes(type)){
        const error = new Error("No existe tal categoria, debe elegir entre libros o equipos");
        return res.status(404).json({ msg: error.message });
    }

    try {
        let collection = mongoose.connection.db.collection(type);

        let data = await collection.find({}).toArray();

        res.json(data)
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ error: 'Se ha producido un error al acceder a los datos' });
    }        
}

const reserverEquipment = async (req, res) => {
    const {type, idEquip} = req.params;
    const VALID_TYPES = ["books", "equipments"];

    if(type === VALID_TYPES[0]){
            
        const reservationBook = new ReservationBook(req.body);
        console.log(reservationBook);
        // try {
        //     // save the reservation in ReservationBook
        //     const  reservationBookStored =   await reservationBook.save();
        //     res.json(reservationBookStored);
        // } catch (error) {
        //     console.log(error);
        // }
    }


    else if (type === VALID_TYPES[1]) {
        
        const ReservationEquipment = new ReservationEquipment(req.body);

        try {
            // save the reservation in ReservationEquipment
            const  ReservationEquipmentStored =   await ReservationEquipment.save();
            res.json(ReservationEquipmentStored)
        } catch (error) {
            console.log(error);
        }
    }   

    else{
        const error = new Error("No existe tal categoria, debe elegir entre libros o equipos");
        return res.status(404).json({ msg: error.message });
    }
    
}



export {
    signIn,
    profile,
    confirmAccount,
    authenticateStudent,
    forgetPassword,
    checkToken,
    newPassword,
    viewSchedules,
    viewEquipment,
    reserverEquipment
};