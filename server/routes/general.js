import express  from "express";  
import { getUser , getDashboardStats} from '../controllers/general.js' 

const router = express.Router() ;           //get express router

router.get("/general/user/:id", getUser);                //get User Endpoint
router.get("/general/dashboard", getDashboardStats);     //get Dashboard Stats Endpoint

export default router ;