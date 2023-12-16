import { IUsers } from "./users.interface";
import { user } from "./users.model";


// Create users
const createUser = async(data: IUsers)=>{
    const result = await user.create(data);
    return result;
}

// Find all users

const getAllUsers =  async()=>{
    const result = user.find().select("userId username fullName age email isActive address hobbies orders");
    return result
}

// Single user

const getSingleUser = async(userId: number | string)=>{
    const existsUser = await user.isUserExist(userId);
    if(!existsUser){
        throw new Error("User not found!")
    }
    const result = user.findOne({userId});
    return result
}

// Update user

const updateUser = async(userId: number | string, userData: IUsers)=>{
    const existUser = await user.isUserExist(userId);
    if(!existUser){
        throw new Error("User not found!")
    }
    const result = user.findOneAndUpdate(
        {userId},
        {
            $set: userData
        },
        {
            new: true, runValidators: true
        }
    );
    return result;
}

//Delete user
const DeleteUser = async (userId: number | string) => {
    const existUser = await user.isUserExist(userId);
    if (!existUser) {
      throw new Error("User not found");
    }
    const result = user.findOneAndDelete({ userId });
    return result;
  };


  //Create user order

  const createOrderToUser = async(
    userId: number | string,
    orderData:{
        productName: string,
        price: number,
        quantity: number
    }
)=>{
    const existUser = await user.isUserExist(userId);
    if (!existUser) {
      throw new Error("User not found");
    }
    const { productName, price, quantity } = orderData;
    const result = user.findOneAndUpdate(
      { userId, orders: { $exists: true } },
      { 
        $push: { 
            orders: {
                 productName,
                  price,
                   quantity 
                } 
            } 
        },
      { 
        upsert: true, 
        new: true 
      }
    );
    return result;
}

// User orders
const getAllOrders = async(userId: number | string)=>{
    const existUser = await user.isUserExist(userId);
    if (!existUser) {
      throw new Error("User not found ");
    }    
    const result = user.findOne({ userId }).select("orders");
    return result;
}


//orders total price
const calculateAllOrderPrice = async (userId: number | string) => {
    const existUser = await user.isUserExist(userId);
    if (!existUser) {
      throw new Error("User not found ");
    }
    const result = await user.findOne({ userId }).select("orders");
  
    const totalPrice = (result?.orders || []).reduce(
      (total: number, order: { price?: number }) => {
        return total + (order.price || 0);
      },
      0
    );
    return totalPrice;
  };

  export const userServicesData = {
createUser,
getAllUsers,
getSingleUser,
updateUser,
DeleteUser,
createOrderToUser,
getAllOrders,
calculateAllOrderPrice
  };