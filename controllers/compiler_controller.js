const axios = require('axios');

module.exports.compile = (req,res)=>{
      
        var config = {
            method: 'post',
            url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode',
            headers: { 
            'Content-Type': 'application/json'
            },
            data :{
                "code": req.body.code,
                "language": req.body.language,
                "input": req.body.input,
            },
            };
            
            axios(config)
            .then(function (response) {
           
            return res.status(200).json({
                data:{
                    output:response.data,
                },
                message:"Got output",
            })
            })
            .catch(function (error) {
            console.log(error);
            res.send("sorry bro");
            });
           
}