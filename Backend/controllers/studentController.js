import Student from "../models/Student.js";

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
    res.json({msg: "Profiles"})
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

export {
    signIn,
    profile,
    confirmAccount
};