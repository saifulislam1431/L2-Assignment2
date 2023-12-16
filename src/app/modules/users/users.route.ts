import express from "express";
import { userControllerData } from "./users.controller";
const router = express.Router();

//Create user
router.post("/", userControllerData.createUserData);

//Get users
router.get("/", userControllerData.getAllUserData);

//Get user
router.get("/:userId", userControllerData.getSingleUserData);

//Update user
router.put("/:userId", userControllerData.updateUserData);

//Delete user
router.delete("/:userId", userControllerData.deleteUserData);

//create order
router.put("/:userId/orders", userControllerData.insertOrderCollection);

//Get order Data
router.get("/:userId/orders", userControllerData.getUserOrderData);

//Price calculate
router.get(
  "/:userId/orders/total-price",
  userControllerData.CalculateAllUserOrder
);


export const userRoutes = router;