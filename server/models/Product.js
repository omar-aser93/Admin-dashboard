import mongoose from "mongoose";

//create the schema : the structure of our database
const productSchema = mongoose.Schema( {
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);  //create the model, pass the schema & export it