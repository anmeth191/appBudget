const express = require('express');
const app = express();
const getController = require('./controllers/getController');
const postController = require('./controllers/postController');
const cors = require('cors');


app.use(express.json());
app.use(cors({}));
getController(app);
postController(app);

app.listen(8000 , ()=>{
    console.log('listenning to port 8000')
});

