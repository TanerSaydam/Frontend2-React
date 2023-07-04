import dbConnect from "@/database/mongodb";
import Todo from "@/models/Todo";
import request from "@/services/request";

export default function handle(req,res){
    request(res,async()=> {
        const model = req.body;        
        dbConnect();        
        model.isCompleted = !model.isCompleted;

        await Todo.findByIdAndUpdate(model._id,model);
        res.json({message: "Durumu başarıyla güncellendi!"});   
    })    
}