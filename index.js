const express = require("express")
const path = require("path")
const app = express()
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

  const Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug', params)
})
app.get('/contact',(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug', params)
})
app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body)
    myData.save().then(()=>{
        res.status(200).send("Item was saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    res.status(200).render('contact.pug');
    
})
app.get('/about',(req,res)=>{
    const params = {}
    res.status(200).render('about.pug', params)
})

app.listen(port, ()=>{
    console.log(`The application has been started on port ${port}`)
});

