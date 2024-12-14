const figlet = require('figlet');
const express = require('express');
const app = express();

const PORT = 3000;

app.set('view engine' , 'ejs');

app.use(express.static('./public'))

app.listen(PORT, () => {
    figlet(`Server Started At Port ${PORT}`, function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        console.log(data);
    });
})

app.use((req, res, next) => {
    console.log('Middleware Executed');
    next();
})

app.get('/', (req, res) => {
    res.render('homepage')
})

app.get('/Our-Shop' , (req, res) => {
    res.render('ourshop')
})

app.get('/Product-Details' , (req, res) => {
    res.render('productdetails')
})

app.get('/Contact-Us' , (req, res) => {
    res.render('contactus')
})

app.get('/Log-In' , (req, res) => {
    res.render('login')
})