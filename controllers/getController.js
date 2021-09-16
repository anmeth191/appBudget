module.exports = (app)=>{

app.get('/' , (request , response) =>{
    response.json({

       message:'Hello from the server side',
       body:{ 
           name:'Angel',
           lastName:'Rivera',
           age:29
       }

    });
})


}