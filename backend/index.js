const connectTOMongo = require("./db");
const express = require('express');
const cors = require('cors')

connectTOMongo();

const app = express();

const port =3001;


// current valid routes 
app.use(cors())
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));





app.get('/', (request, response)=> {
  response.send(" Valid URls:  /api/auth , /api/notes");
});


app.listen(port, function() {
    console.log('Your app is listening on port ' + port);
});