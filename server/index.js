import express  from "express"; 
import mongoose from "mongoose";
import cors from 'cors' ;
import helmet from "helmet";
import morgan from "morgan";
import 'dotenv/config'
import clientsRoutes from './routes/clients.js'
import generalRoutes from './routes/general.js'
import managementRoutes from './routes/management.js'
import salesRoutes from './routes/sales.js'
// Static Data imports - we will inject the data from (data.js) file to our mongoDB (only once)
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat,} from "./data.js";


const app = express();          //getting the express function

//important to allow passing data with the request body
app.use(express.json({ limit: '50mb' })) ; 
app.use(express.urlencoded({ extended: true }));  

app.use(cors());       //Cross-origin resource sharing (CORS) middleware which allows resources on your express app to be shared with external domains .. ex: our back-end on localhost:5000 ,front-end on localhost:3000
app.use(helmet());         //Helmet security middleware .. helps protect your server from some web vulnerabilities by setting HTTP res headers appropriately
app.use(morgan("common"));       //to console log any API request usefull during developing 

//the Routes
app.use(clientsRoutes);            
app.use(generalRoutes);            
app.use(managementRoutes);    
app.use(salesRoutes);         

const PORT = process.env.PORT || 5000 ;    //5000 for deployment only , during deployment we but it in .env as PORT=5000  
mongoose.set("strictQuery", false);        //fix for the new mongoose version warning

//connecting to the mongoDB & listening to the port using express , also adding some static data to our DB
mongoose.connect(process.env.CONNECTION_URL).then(()=> {
    app.listen(PORT,()=>console.log(`server running on port: ${PORT}`)) ;
    /* ONLY ADD THE DATA ONE TIME THEN COMMENT IT */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
  })
 .catch((error)=>{console.log(error)});