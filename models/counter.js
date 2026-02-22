const mongoose=require("mongoose")
const DailyCounterSchema = new mongoose.Schema({
  date: {
    type: String, // YYYY-MM-DD
    unique: true
  },
  seq: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("DailyCounter", DailyCounterSchema);
    
