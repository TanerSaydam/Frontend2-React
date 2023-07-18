import dbConnect from "@/database/mongodb";
import Product from "@/models/Product";
import request from "@/services/request";

const getAggregateQuery = (categoryId = "", sort = { name: 1 }) => {
    const matchQuery = categoryId !== "0" ? { isActive: true, categoryId: categoryId } : { isActive: true };

    return [
        {
            $lookup: {
                from: "sellers",
                localField: "sellerId",
                foreignField: "_id",
                as: "sellers"
            }
        },       
        {
            $match: matchQuery
        }
    ];
};

const getSort = filterType => {
    switch (filterType) {
        case "0":
            return { price: 1 };
        case "1":
            return { name: -1 };
        default:
            return { name: 1 };
    }
};

export default function handle(req, res) {
    request(res, async () => {
        dbConnect();
        const { categoryId, filterType } = req.body;
        const sort = getSort(filterType);
        const products = await Product.aggregate(getAggregateQuery(categoryId, sort)).sort(sort);

        res.json(products);
    });
}
