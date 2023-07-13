import dbConnect from "@/database/mongodb";
import User from "@/models/User";
import request from "@/services/request";
import {v4 as uuidv4} from 'uuid';

export default function handle(req,res){
    request(res, async()=> {
        dbConnect();

        const user = new User(req.body);
        
        const checkPhoneNumber = await User.findOne({phoneNumber: user.phoneNumber});
        if(checkPhoneNumber){
            res.status(500).json({message: "Bu telefon numarası daha önce kullanılmış!"});
        }

        const checkEmail = await User.findOne({email: user.email});
        if(checkEmail){
            res.status(500).json({message: "Bu mail adresi daha önce kullanılmış!"});
        }

        if(!checkPhoneNumber && !checkEmail){
            user._id = uuidv4();
            await user.save();
            res.json(user);
        }        
    });
}