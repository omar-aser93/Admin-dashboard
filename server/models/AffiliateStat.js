import mongoose from "mongoose";

//create the schema : the structure of our database
const affiliateStatSchema = mongoose.Schema( {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    affiliateSales: { type: [mongoose.Types.ObjectId], ref: "Transaction", },
  },
  { timestamps: true }
);

export default mongoose.model("AffiliateStat", affiliateStatSchema);  //create the model, pass the schema & export it