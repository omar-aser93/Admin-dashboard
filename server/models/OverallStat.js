import mongoose from "mongoose";

//create the schema : the structure of our database
const overallStatSchema = mongoose.Schema( {
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [ {month: String, totalSales: Number, totalUnits: Number, }, ],
    dailyData: [ {date: String, totalSales: Number, totalUnits: Number, }, ],
    salesByCategory: { type: Map, of: Number, },
  },
  { timestamps: true }
);

export default mongoose.model("OverallStat", overallStatSchema);  //create the model, pass the schema & export it