export default function request(res, callback){
    try {
        callback();
    } catch (error) {
        res.status(500).json(error);        
    }
}