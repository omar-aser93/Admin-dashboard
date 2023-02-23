import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";

// get User function
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;                  //get the id from the request params (/:id)
    const user = await User.findById(id);       //find the user data by the id
    res.status(200).json(user);                 //respond the user
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// get Dashboard Stats function (same data can be called separately from other endpoints , but this one collection endpoint is faster)
export const getDashboardStats = async (req, res) => {
  try {
     // hardcoded values because the DB is limited (in real project we will get this data from the front-end)
     const currentMonth = "November";
     const currentYear = 2021;
     const currentDay = "2021-11-15";
 
     /* Recent Transactions from Transaction collection of the DB*/
     const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 });
 
     /* Overall Stats from OverallStat collection of the DB*/
     const overallStat = await OverallStat.find({ year: currentYear }); 
     const { totalCustomers, yearlyTotalSoldUnits, yearlySalesTotal, monthlyData, salesByCategory } = overallStat[0];
 
     const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
       return month === currentMonth;
     }); 
     const todayStats = overallStat[0].dailyData.find(({ date }) => {
       return date === currentDay;
     });
     //response with the data for the dashboard 
     res.status(200).json({totalCustomers, yearlyTotalSoldUnits, yearlySalesTotal, monthlyData, salesByCategory, thisMonthStats, todayStats, transactions });    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
