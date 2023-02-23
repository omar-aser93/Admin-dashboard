import OverallStat from '../models/OverallStat.js'  

// Get sales function
export const getSales = async (req,res)=>{
    try {  
      const overallStats = await OverallStat.find();          //get all sales stats from the DB
      res.status(200).json(overallStats[0]);                  //respond by 1st array item (year 2021) as example
    } catch (err) {
         res.status(500).json(err);
    }   
 };               