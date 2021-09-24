const axios = require('axios');

module.exports.compile = (req,res)=>{
    console.log("received  post request");
    console.log("data of the body",req.body);
    
      
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
            console.log("response.data",response.data);
           
            console.log("response.data.output",response.data.output);
            return res.status(200).json({
                data:{
                    data:response.data.output,
                },
                message:"Got output",
            })
            })
            .catch(function (error) {
            console.log(error);
            res.send("sorry bro");
            });
           
}