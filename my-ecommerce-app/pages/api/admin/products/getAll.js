import dbConnect from "@/database/mongodb";
import Product from "@/models/Product";
import request from "@/services/request";
import {v4 as uuidv4} from 'uuid';

export default function handle(req,res){
    request(res, async ()=> {
        dbConnect();

        // const p1 = new Product({
        //     _id: uuidv4(),
        //     name: "Monster Tulpar T5 V23.1.9 Intel Core I5 13500HX 64 GB Ram 1 Tb SSD 8 GB Rtx 4060 Windows 11 15,6",
        //     price: 46199,
        //     stock: 500,
        //     mainImageUrl: "https://productimages.hepsiburada.net/s/420/550/110000449930797.jpg/format:webp",
        //     imageUrls: ["https://productimages.hepsiburada.net/s/420/550/110000449930798.jpg/format:webp","https://productimages.hepsiburada.net/s/420/550/110000449930799.jpg/format:webp","https://productimages.hepsiburada.net/s/420/550/110000449932650.jpg/format:webp","https://productimages.hepsiburada.net/s/420/550/110000449932651.jpg/format:webp"],
        //     sellerId: "a6b55dda-0857-4886-834c-358589cee915"
        // });

        // await p1.save();

        // const p2 = new Product({
        //     _id: uuidv4(),
        //     name: "Huma H5 V4.2.10 15.6 - Gümüş",
        //     price: 23599,
        //     stock: 500,
        //     mainImageUrl: "https://img-monsternotebook.mncdn.com/UPLOAD/urun-gorselleri-yeni/HUMA/H5_V4/thumb/h5_v4_i7_medium.png",
        //     imageUrls: ["https://img-monsternotebook.mncdn.com/UPLOAD/urun-gorselleri-yeni/HUMA/haziran_2023_kampanya/thumb/H5-V4-Silver_medium.png","https://img-monsternotebook.mncdn.com/UPLOAD/urun-gorselleri-yeni/HUMA/H5_V4/thumb/h5_v4_4_medium.png","https://img-monsternotebook.mncdn.com/UPLOAD/urun-gorselleri-yeni/HUMA/H5_V4/thumb/h5_v4_5_20_medium.png","https://img-monsternotebook.mncdn.com/UPLOAD/urun-gorselleri-yeni/HUMA/H5_V4/thumb/h5_v4_7_medium.png"],
        //     sellerId: "a6b55dda-0857-4886-834c-358589cee915"
        // });

        // await p2.save();

        const {sellerId} = req.body;
        console.log(sellerId);
        const products = await Product.find({sellerId: sellerId}).sort({name: 1});
        res.json(products);
    });
}