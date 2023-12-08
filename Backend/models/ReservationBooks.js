import mongoose from "mongoose";

const reservationBookSchema = mongoose.Schema(
  {
    titleBook: {
      type: String,
      require:true
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
    startTimeDay: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    endTimeDay: {
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

const ReservationBook= mongoose.model("ReservationBookSchema", reservationBookSchema);

export default ReservationBook;
