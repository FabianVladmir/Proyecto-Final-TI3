import mongoose from "mongoose";

const reservationEquipmentSchema = mongoose.Schema(
  { 
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    equipmentId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
    },
    verificationCode:{
      type: String,
      default: generateRandomAlphaNumeric(8)
    },
    type: {
      type: String,
      enum: ["equipment"],
      default: "equipment",
    },
    reservationDate: {
      type: Date,      
      default: Date.now(),
    },
    returnDate: {
      type: Date,      
      default: Date.now(),
    },    
    duration: {
      type: Date,
      default: Date.now()
    },
    state:{
      type: String,
      required: true 
    }
  },
  { timestamps: true }
);

const ReservationEquipment= mongoose.model("ReservationEquipment", reservationEquipmentSchema);

export default ReservationEquipment;
