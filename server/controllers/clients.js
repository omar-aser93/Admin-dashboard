import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";       //package for formatting countries for the world map

//get Products with it's stats function (product & productStats are separte models )
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();                 //find all products in the DB using Product model
    //map through all products then pass each productId to find() function of ProductStat model to get stats of each product
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({ productId: product._id });
        //return  { ..product._doc (default in mongo with Promise.all) , the product stats }
        return { ...product._doc, stat };    
      })
    );
    res.status(200).json(productsWithStats);          //respond with the product with it's stats
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


//get customers function
export const getCustomers = async (req, res) => {
  try {
    //get all customers by finding all users who are not admin , select("-password") => don't return the password
    const customers = await User.find({ role: "user" }).select("-password");   
    res.status(200).json(customers);                //response the customers
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



//get transactions function (more complicated) .. it will contain some pagination & filtering
export const getTransactions = async (req, res) => {
  try {

    //getting request queries - note: sort from frontEnd looks like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    //reformating sort .. formatted sort should look like { userId: -1 } for the mongoDB
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = { [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1), };
      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};       //call the function if sort exist (= true )
    
    /*get transactions from the DB with search filtering (by product cost or userId), then sort them by query sort,
     then get the pagination & limit returned data to page size instead of returning all the data at once */
    const transactions = await Transaction.find({
      $or: [ { cost: { $regex: new RegExp(search, "i") } }, { userId: { $regex: new RegExp(search, "i") } }  ],
    }).sort(sortFormatted).skip(page * pageSize).limit(pageSize);    
    
    const total = await Transaction.countDocuments();      //get total amount of transactions in the DB  
    res.status(200).json({ transactions, total });         //respond with the transactions & the total 
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


//get geography function
export const getGeography = async (req, res) => {
  try {
    const users = await User.find();              //get all users from the DB users collection
    //reformating countries data to fit the nivo chart at the front end
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) { acc[countryISO3] = 0; }
      acc[countryISO3]++;
      return acc;
    }, {});
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    res.status(200).json(formattedLocations);      //respond the reformated locations data
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

