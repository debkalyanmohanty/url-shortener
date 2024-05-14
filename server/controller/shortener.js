const Url = require('../models/url');
const requestIp = require('request-ip');
exports.shortenUrl = async(req , res ) => {
    try{
        const ipAddress = requestIp.getClientIp(req);
        const data = await Url.findOne({long_url:req.body.long_url});
        if(data){
            return res.status(403).json({data: data , message: 'Url Already Shortened'});
        }
        const url = new Url({long_url: req.body.long_url , ipAddress: ipAddress});
        await url.save();
        return res.status(201).json({message: 'Url Shortened Successfully' , data: url});
    }
    catch(error) {
        return res.status(500).json({message: error.message});
    }
}