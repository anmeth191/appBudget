const bodyParser = require('body-parser');

module.exports = (app)=>{
app.post('/' , (request , response) =>{
     console.log(request)
    
     response.send('you have posted in the server');
})
}