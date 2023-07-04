import dbConnect from "@/database/mongodb";
import Seller from "@/models/Seller";
import request from "@/services/request";

export default function handle(req,res){
    request(res,async()=> {
        dbConnect();
        const seller = new Seller(req.body);

        seller._id = "asdasd";
        await seller.save();

        res.json({message: "Başarılı!"});
    }); 
}