import Student from "../models/Student.js";

const signIn = async (req,res) => {
    // const {email, nombre} = req.body;
    // filtrar usuarios duplicados
    // const existeUsuario = await Veterinario.findOne({email});

    // if(existeUsuario){
    //     const error = new Error("Usuario existente");
    //     return res.status(400).json({msg: error.message});
    // }

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
        console.log(error.message);
    }
    
}


const profile = (req, res) => {
    res.json({msg: "Profiles"})
}

export {
    signIn,
    profile
};