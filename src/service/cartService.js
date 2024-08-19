const Cart=require('../models/cart.model');
const CartItem=require('../models/cartItem.model');
const Food=require('../models/food.model');

module.exports={
    async createCart(user){
        try{
            const cart=new Cart({customer:user});
            const createdCart=await cart.save();
            return createdCart;

        }catch(error){
            throw new Error(error.message);
        }
    },

    async findCartByUserId(userId) {
        try{
            let cart=await Cart.findOne({customer:userId}).populate([
                {path:'items',populate:{path:'food',populate:{path:'restaurant',select:'_id'}}}
            ]);

            if(!cart){
                throw new Error(`cart not found with user ID: ${userId}`);
            }

            let cartItem=await CartItem.find({cart:cart._id}).populate('food');
            
            let totalPrice=0;
            let totalDiscountPrice=0;
            let totalItem=0;

            for(const item of cart.items){
                totalPrice+=item.price;
                totalDiscountPrice+=item.discountPrice;
                totalItem=item.quantity;
            }

            cart.totalPrice=totalPrice;
            cart.totalItem=totalItem;
            cart.totalDiscountPrice=totalDiscountPrice;
            cart.totalDiscounte=totalPrice-totalDiscountPrice;

            return cart;
        }catch(error){
            throw new Error(error.message);
        }   
    },

    async addItemToCart(req,userId){
        try{
            const cart=await Cart.findOne({customer:userId});
            const food=await Food.findById(req.menuItemId);

            const isPressent=await FoodItem.findOne({cart:cart._id,food:food._id,userId:userId});
            
           
            if(!isPressent){
                let cartItem=new CartItem({
                    food:food._id,
                    cart:cart._id,
                    quantity:1,
                    userId,
                    totalPrice:food.price,
                })

                const createdCartItem=await cartItem.save();
                cart.items.push(createdCartItem);
                await cart.save();

                return createdCartItem;
            }
            return isPressent;

        }catch(error){
            throw new Error(error.message);
        }
    },

    async updateCartItemQuantity(cartItemId,quantity){
        try{
            const cartItem=await FoodItem.findById(cartItemId).populate([
                {path:'food',populate:{path:'restaurant',select:'_id'}}
            ]);

            if(!cartItem){
                throw new Error(`cart item not found with Id: ${cartItemId}`);
            }

            cartItem.quantity = quantity;
            cartItem.totalPrice = quantity*cartItem.food.price;
            await cartItem.save();
            return cartItem;
        }catch(error){
            throw new Error(error.message);
        }
    },

    async removeItemFromCart(cartItemId,user){
        try{
            const cart=await Cart.findOne({customer:user._id});
            if(!Cart){
                throw new Error(`Cart not found with ID: ${cartItemId}`);
            }

            //remove cart item from cart
            cart.items=cart.items.filter((item)=>!item.equals(cartItemId));

            await cart.save();
            return cart;
        }catch(error){
            throw new Error(error.message);
        }
    },
    
    async clearCart(user){
        try{
            const cart=await Cart.findOne({customer:user._id});
            if(!Cart){
                throw new Error(`Cart not found with ID: ${cartItemId}`);
            }
            cart.items=[];
            await cart.save();
            return cart;
        }catch(error){
            throw new Error(error.message);
        }
    },

    async calculateCartTotals(cart){
        try{
            let total=0;
            for(const cartItem of cart.items){
                total+=cartItem.food.price*cartItem.quantity;
            }

            return total;
        }catch(error){
            throw new Error(error.message);
        }
    },

    

}