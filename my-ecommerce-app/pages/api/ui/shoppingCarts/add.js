import dbConnect from "@/database/mongodb";
import Product from "@/models/Product";
import ShoppingCart from "@/models/ShoppingCart";
import request from "@/services/request";
import {v4 as uuidv4} from 'uuid';

export default function handle(req,res){
    request(res, async()=> {
        dbConnect();
        const shoppingCart = new ShoppingCart(req.body);

        const product = await Product.findOne({_id: shoppingCart.productId});
        if(product.stock < shoppingCart.quantity){
            res.status(500).json({message: "Stok adedinden fazla sepete ürün ekleyemezsiniz!"});
        }

        if(shoppingCart.quantity > 0){
            const checkProductIsAdded = await ShoppingCart.findOne({productId: shoppingCart.productId, userId: shoppingCart.userId});
            if(checkProductIsAdded){
                checkProductIsAdded.quantity += shoppingCart.quantity;
                await ShoppingCart.findByIdAndUpdate(checkProductIsAdded._id, checkProductIsAdded);
                res.json({message: "Sepete ürün eklendi!"});
            }else{
                shoppingCart._id = uuidv4();

                await shoppingCart.save();
                res.json({message: "Sepete ürün eklendi!"});
            }
        }else{
            const checkProductIsAdded = await ShoppingCart.findOne({productId: shoppingCart.productId, userId: shoppingCart.userId});
            if(checkProductIsAdded){
                checkProductIsAdded.quantity += shoppingCart.quantity;
                if(checkProductIsAdded.quantity > 0){
                    await ShoppingCart.findByIdAndUpdate(checkProductIsAdded._id, checkProductIsAdded);
                    res.json({message: "Sepete ürün eklendi!"});
                }else{
                    await ShoppingCart.findByIdAndRemove(checkProductIsAdded._id);
                    res.json({message: "Sepetteki ürün adedi 0'a düştüğünden ürün sepetten kaldırılmıştır!"});
                }
            }else{
                res.status(500).json({message: "Sepete eksi adette ürün ekleyemezsiniz!"});
            }
        }
    });
}