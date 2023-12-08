import mongoose from "mongoose";

const reportEquipmentSchema = mongoose.Schema(
  {
    studentName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    equipmentName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReservationEquipment",
    },
    state: {
      type: String,
      required: true,
    },
    adminName: {
      type: String,
      required: true      
    }    
  }
);

const ReportEquipment = mongoose.model("ReportEquipment", reportEquipmentSchema);

export default ReportEquipment;
