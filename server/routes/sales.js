import express  from "express";  
import { getSales } from '../controllers/sales.js' 

const router = express.Router() ;           //get express router

router.get("/sales/sales", getSales);        //get sales Endpoint

export default router ;