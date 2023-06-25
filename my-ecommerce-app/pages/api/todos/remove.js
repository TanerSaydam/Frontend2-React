import dbConnect from "@/database/mongodb";
import Todo from "@/models/Todo";
import request from "@/services/request";

export default async function handle(req,res){
    request(res, async ()=> {
        dbConnect();

        await Todo.findOneAndRemove(req.body);

        res.json({message: "Kayıt başarıyla silindi!"});
    });}