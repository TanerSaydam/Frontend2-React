import dbConnect from "@/database/mongodb";
import Todo from "@/models/Todo";
import request from "@/services/request";

export default function handle(req,res){

    request(res, async ()=> {
        dbConnect();

        const {work} = req.body;

        let date = new Date();
        date.setHours(new Date().getHours() + 3);

        const todo = new Todo({
            work: work,
            isCompleted: false,
            date: date
        });

        await todo.save();

        res.json({message: "Kayıt işlemi başarıyla tamamlandı!"});
    });
}