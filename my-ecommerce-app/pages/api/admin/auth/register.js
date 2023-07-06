import dbConnect from "@/database/mongodb";
import Seller from "@/models/Seller";
import request from "@/services/request";
import { v4 as uuidv4} from 'uuid';

export default function handle(req,res){
    request(res,async()=> {
        dbConnect();
        const seller = new Seller(req.body);

        //kontroller
        const checkIdentityNumber = await Seller.findOne({identityNumber: seller.identityNumber});
        if(checkIdentityNumber != null) res.status(500).json({message: "Bu firma daha önce kaydedilmiş!"});
        else{
            seller._id = uuidv4();
            await seller.save();
    
            res.json({message: "Başarılı!"});
        }
    }); 
}