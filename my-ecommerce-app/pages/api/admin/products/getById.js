import Product from "@/models/Product";
import request from "@/services/request";

export default function handle(req,res){
    request(res, async()=> {
        const {id} = req.body;
        console.log(id);
        const product = await Product.findOne({_id: id});
        res.json(product);
    })
}