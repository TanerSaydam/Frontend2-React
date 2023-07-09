import dbConnect from "@/database/mongodb";
import Category from "@/models/Category";
import request from "@/services/request";

export default function handle(req,res){
    request(res, async ()=> {
        dbConnect();

        const categories = await Category.find().sort({name: 1});
        res.json(categories);
    })
}