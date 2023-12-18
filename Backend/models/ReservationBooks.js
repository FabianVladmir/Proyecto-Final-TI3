import mongoose from "mongoose";

const reservationBookSchema = mongoose.Schema(
  { 
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    bookId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    codVerification: {
      type: String,
      default: null
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

const ReservationBook= mongoose.model("ReservationBook", reservationBookSchema);

export default ReservationBook;
