import express  from "express";  
import { getProducts, getCustomers, getTransactions, getGeography,} from '../controllers/clients.js' 

const router = express.Router() ;           //get express router

router.get("/clients/products", getProducts);               //get Products Endpoint
router.get("/clients/customers", getCustomers);             //get customers Endpoint
router.get("/clients/transactions", getTransactions);       //get transactions Endpoint
router.get("/clients/geography", getGeography);             //get geography Endpoint

export default router ;