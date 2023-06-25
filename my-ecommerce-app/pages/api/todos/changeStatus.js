import dbConnect from "@/database/mongodb";
import Todo from "@/models/Todo";
import request from "@/services/request";

export default function handle(req,res){
    request(res,async()=> {
        dbConnect();

        req.body.isCompleted = !req.body.isCompleted;

        await Todo.findOneAndUpdate(req.body);
        res.json({message: "Durumu başarıyla güncellendi!"});   
    })    
}