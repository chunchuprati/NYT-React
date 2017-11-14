import express from "express";
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
 
import Article from './models/Article.js';

var PORT = Process.enc.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));
//mongoose local host connection
mongoose.connect('mongodb://localhost/nytreact');
//Mongoose heroku connection
mongoose.connect('mongodb://heroku_x5s0skk3:9b3nsgi5qjtunmt6pfe0d0ahlg@ds241875.mlab.com:41875/heroku_x5s0skk3');

var db = mongoose.connection;
db.on('error',function(err){
    console.log('Mongoose Error: ',err);
});

db.once('open',function(){
    console.log('Mongoose connection successful.');

});
app.get('/',function(req,res){
    res.sendFile('./public/index.html');
})

app.get('/api/saved',function(req,res){
    Article.find({})
    .exec(function(err,doc){
        if(err){
            console.log(err);
        }
        else{
            res.send(doc);
        }
    })
})

app.post('/api/saved',function(req,res){

    var newArticle = new Article({
        title:req.body.title,
        date:req.body.date,
        url:req.body.url
    });

    newArticle.save(function(err,doc){
        if(err){
            console.log(err);
            res.send(err);
        }else {
            res.json(doc);
        }
    })
})


app.delete('/api/saved/:id',function(req,res){
    
    Article.find({'_id':req.params.id}).remove()
        .exec(function(err,doc){
            res.send(doc);
        });
});

app.listen(PORT,function(){
    console.log("App listening on PORT: " + PORT);
});