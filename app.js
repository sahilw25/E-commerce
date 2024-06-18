const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./util/path.js');

const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');

const { error } = require('console');
const sequelize = require('./util/database.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');




//static files
app.use(express.static(path.join(rootDir, 'public')));

app.use('/css', express.static(path.join(rootDir, 'node_modules', 'bootstrap', 'dist', 'css')));

app.use(bodyParser.urlencoded({extended:false}));

//routes
app.use(homeRoutes);
app.use('/products', adminRoutes);
app.use('/users', adminRoutes);


app.use((req, res ) =>{
    const viewdata = {
        pageTitle: 'Page not Found'
    };
    res.status(404).render('404', viewdata);
})

sequelize.authenticate()
.then(() => {
    console.log("Connection estabilshed successfully");
})
.catch((error) => {
    console.log(error);
    console.log("error in establishing connection");
});

app.listen(3030, ()=> {
    console.log("server started at port 3030");
});