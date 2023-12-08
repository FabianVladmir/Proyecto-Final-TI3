import mongoose from "mongoose";

const reportBookSchema = mongoose.Schema(
  {
    studentName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    equipmentName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReservationBook",
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

const ReportBook = mongoose.model("ReportBook", reportBookSchema);

export default ReportBook;
