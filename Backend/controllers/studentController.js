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

export {
    signIn,
    profile
};