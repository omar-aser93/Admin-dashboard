import mongoose from "mongoose";

//create the schema : the structure of our database
const transactionSchema = mongoose.Schema( {
    userId: String,
    cost: String,
    products: { type: [mongoose.Types.ObjectId], of: Number, },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);  //create the model, pass the schema & export it