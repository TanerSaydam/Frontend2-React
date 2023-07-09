import dbConnect from "@/database/mongodb";
import Seller from "@/models/Seller";
import request from "@/services/request";
import jwt from 'jsonwebtoken';

export default function handle(req,res){
    request(res, async ()=> {
        dbConnect();
        const {email,password} = req.body; //destruction

        const checkEmail = await Seller.findOne({email: email});
        if(checkEmail == null){
            res.status(401).json({message: "Yazdığınız mail sistemde kayıtlı değil!"})
        }else{
            const checkPassword = await Seller.findOne({email: email,password: password});
            if(checkPassword == null){
                res.status(401).json({message: "Şifreniz yanlış!"})
            }else{
                const token = jwt.sign({email: email},"taner saydam asdasdaasda",{expiresIn: "1h"});                
                const seller = {
                    _id: checkPassword._id,
                    name: checkPassword.name,
                    email: email,
                    identityNumber: checkPassword.identityNumber,
                    phoneNumber: checkPassword.phoneNumber,
                    address: checkPassword.address,
                    city: checkPassword.city,
                    imageUrl: checkPassword.imageUrl
                };

                res.json({accessToken: token, seller: seller});
            }            
        }
    });
}