const Url = require('../models/url');

exports.redirectUrl = async(req , res) => {
    try{
        const url = await Url.findOne({short_code: req.params.id});
        if(url){
            url.opened+=1;
            await url.save();
            return res.status(200).json({data: url , message: 'Url Found'});
        }
        return res.status(404).json({message: 'No Such Url Found'})
    }

    catch(error) {
        return res.status(500).json({message: error});
    }
}