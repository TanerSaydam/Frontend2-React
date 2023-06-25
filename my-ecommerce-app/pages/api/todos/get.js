import dbConnect from "@/database/mongodb";
import Todo from "@/models/Todo";
import request from "@/services/request";

export default function handle(req,res){
    request(res, async()=> {
        dbConnect();
        const todos = await Todo.find({});
    
        res.json(todos);
    }); 
}