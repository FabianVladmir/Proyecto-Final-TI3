import mongoose from "mongoose";

const userHistorySchema = mongoose.Schema(
  { 
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    bookId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    equipmentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipment",
    },
    itemType: {
      type: String,
      default: null
    },
    reservationDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    returnDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },  
    state:{
      type: String,
      required: true 
    }
  }  
);

const userHistory= mongoose.model("userHistory", userHistorySchema);

export default userHistory;
