import mongoose from "mongoose";

//create the schema : the structure of our database
const productStatSchema = mongoose.Schema( {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [ { month: String, totalSales: Number, totalUnits: Number, }, ],
    dailyData: [ { date: String, totalSales: Number, totalUnits: Number, }, ],
  },
  { timestamps: true }
);

export default mongoose.model("ProductStat", productStatSchema);  //create the model, pass the schema & export it