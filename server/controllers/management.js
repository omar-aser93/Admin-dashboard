import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import mongoose from "mongoose"; 

// get Admins data function
export const getAdmins = async (req,res)=>{
    try {  
      //get all customers by finding all users who are admin , select("-password") => don't return the password
       const admins = await User.find({ role: "admin" }).select("-password");
       res.status(200).json(admins);           //response the admins
    } catch (err) {
        res.status(500).json(err);
    }   
 };               

 
// get User Performance data function
export const getUserPerformance = async (req,res)=>{
    try {  
        const { id } = req.params;                  //get the id from the request params (/:id)
        /* mongoose aggregation to combine multi collections ... get users data & their aaffiliate stats  : 
            1st: reformat the id from req params to mongoose ids format then match it with User collection Ids ,
            2nd : from affiliatestats model compare User model id to affiliatestats user id , 
                  then display them as array in property called affiliatestats    */
        const userWithStats = await User.aggregate([
          { $match: { _id: new mongoose.Types.ObjectId(id) } },
          { $lookup: { from: "affiliatestats", localField: "_id", foreignField: "userId", as: "affiliateStats" } },
          { $unwind: "$affiliateStats" },
        ]);
        //map through affiliateStats affiliateSales property then get each user Transactions
        const saleTransactions = await Promise.all(
          userWithStats[0].affiliateStats.affiliateSales.map((id) => {
            return Transaction.findById(id);  })
        );
        //filter users that has no Transactions
        const filteredSaleTransactions = saleTransactions.filter( (transaction) => transaction !== null  );    
        res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransactions });          
    } catch (err) {
        res.status(500).json(err);        
    }   
 }; 