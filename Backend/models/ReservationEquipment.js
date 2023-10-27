import mongoose from "mongoose";

const reservationEquipmentSchema = mongoose.Schema(
  {
    equipmentName: {
      type: String,
      require:true
    },
    model: {
      type: String,
      require: false,
    },
    studentName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    codVerification: {
      type: String,
      default: null
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    startTimeHour: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    endTimeHour: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    return: {
      type: Boolean,
      default: false
    }
  }
);

const ReservationEquipment = mongoose.model("ReservationEquipmentSchema", reservationEquipmentSchema);

export default ReservationEquipment;
