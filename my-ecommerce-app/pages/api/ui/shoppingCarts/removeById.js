import dbConnect from "@/database/mongodb";
import ShoppingCart from "@/models/ShoppingCart";
import request from "@/services/request";

export default function handle(req,res){
    request(res,async()=> {
        dbConnect();        
        const {id} = req.body;

        await ShoppingCart.findByIdAndRemove(id);
        res.json({message: "Sepetteki ürün başarıyla silindi!"});
    });
}