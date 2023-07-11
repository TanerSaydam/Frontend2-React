import dbConnect from "@/database/mongodb";
import Product from "@/models/Product";
import request from "@/services/request";

export default function handle(req,res){
    request(res, async()=>{
        dbConnect();
        const {categoryId, filterType} =req.body;
        if(categoryId === "0"){
            if(filterType === ""){
                const products = await Product.aggregate([
                    {
                        $lookup: {
                            from: "sellers",
                            localField: "sellerId",
                            foreignField: "_id",
                            as: "sellers"
                          }
                    },
                    {
                        $match: {isActive: true}
                    }
                ]).sort({name: 1});                
                res.json(products);
            }else{
                if(filterType === "0"){
                    const products = await Product.aggregate([
                        {
                            $lookup: {
                                from: "sellers",
                                localField: "sellerId",
                                foreignField: "_id",
                                as: "sellers"
                              }
                        },
                        {
                            $match: {isActive: true}
                        }
                    ]).sort({price: 1});
                    res.json(products); 
                }else if(filterType === "1"){
                    const products = await Product.aggregate([
                        {
                            $lookup: {
                                from: "sellers",
                                localField: "sellerId",
                                foreignField: "_id",
                                as: "sellers"
                              }
                        },
                        {
                            $match: {isActive: true}
                        }
                    ]).sort({name: -1});
                    res.json(products); 
                }
            }            
        }
        else{
            if(filterType === ""){
                const products = await Product.aggregate([
                    {
                        $lookup: {
                            from: "sellers",
                            localField: "sellerId",
                            foreignField: "_id",
                            as: "sellers"
                          }
                    },
                    {
                        $match: {isActive: true, categoryId: categoryId}
                    }
                ]).sort({name: 1});               
                res.json(products);
            }else{
                if(filterType === "0"){
                    const products = await Product.aggregate([
                        {
                            $lookup: {
                                from: "sellers",
                                localField: "sellerId",
                                foreignField: "_id",
                                as: "sellers"
                              }
                        },
                        {
                            $match: {isActive: true, categoryId: categoryId}
                        }
                    ]).sort({price: 1}); 
                res.json(products);
                }else if(filterType === "1"){
                    const products = await Product.aggregate([
                        {
                            $lookup: {
                                from: "sellers",
                                localField: "sellerId",
                                foreignField: "_id",
                                as: "sellers"
                              }
                        },
                        {
                            $match: {isActive: true, categoryId: categoryId}
                        }
                    ]).sort({price: -1}); 
                res.json(products); 
                }
            }
            
        }
    })
}