const express = require('express');
const moment = require('moment');
const path = require('path');
const logger = require('./Middleware/logger');
const exphbs = require('express-handlebars');
const req = require('express/lib/request');
const users = require('./users');
const app = express();

//app.get('/', (req, res)=>{
   // res.sendFile(path.join(__dirname, 'public', 'index.html'));
//})


// init Middleware
//app.use(logger);

// handles middleware
app.engine('handlebars', exphbs.engine({ defaultLayout: "main"}));
app.set('view engine', 'handlebars');

//Homepage Route
app.get('/', (req, res) => {
   res.render('index', {
      title : 'User App',
      users
   });
})


//body parse middleware
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use('/api/users', require('./routes/api/users'));


// set static foloder
app.use(express.static(path.join(__dirname,'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is runing on port ${PORT}`));

