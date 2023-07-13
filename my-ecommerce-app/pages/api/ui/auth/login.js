import dbConnect from "@/database/mongodb";
import User from "@/models/User";
import request from "@/services/request";

export default function handle(req,res){
    request(res, async()=> {
        dbConnect();
        const {emailOrPhoneNumber, password} = req.body;

        let user = await User.findOne({
            $or: [{ email: emailOrPhoneNumber }, { phoneNumber: emailOrPhoneNumber }],
            password: password,
        });

        if(user !== null){
            res.json(user);
        }else{
            res.status(500).json({message: "Kullanıcı bulunamadı!"});
        }
    })
}