import express  from "express";  
import { getAdmins, getUserPerformance } from '../controllers/management.js' 

const router = express.Router() ;           //get express router

router.get("/management/admins", getAdmins);                       //get Admins data Endpoint
router.get("/management/performance/:id", getUserPerformance);     //get User Performance data Endpoint

export default router ;