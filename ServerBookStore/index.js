var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.listen(3000);

app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); //autoriser server Angular utilises des methodes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); //méthodes autorisées
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//body-parse pass:1
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//mongoose
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const { isForOfStatement } = require("typescript");
mongoose.connect('mongodb+srv://root:1@cluster0.d0szw.mongodb.net/BookStore?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err){
        console.log("Mongodb connected error!!")
    }else{
        console.log("Mongodb connected successfully.");
    }
});

//multer pour upload file
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload')//route qui contient l'immage pour upload
    },
    filename: function (req, file, cb) {//filename uploaded, Date() pour éviter que 2 fichier ayent le meme nom
        cb(null, Date.now() + "-" + file.originalname)
    }
});

var upload = multer({
    storage: storage,
    fileFilter:  function(req, file, cb) {
        console.log(file);
        if(file.mimetype=="image/bmp" || 
           file.mimetype=="image/png" ||
           file.mimetype=="image/jpg" ||
           file.mimetype=="image/jpeg"||
           file.mimetype=="image/gif"){ //verifier si le type de fichier est bien une image
            cb(null, true)
        }else{
            return cb(new Error('Seulement images autorissée! '))
        }
    }
}).single("BookImage");



const Category = require("./Models/Category");
const Book = require("./Models/Book");


app.post("/api/cate", function(req, res){
    Category.find(function (err, items){
        if(err){
            res.json({resultat:0, "err": err});
        }else{
            res.json(items);
        }
    })
});

app.post("/api/book", function(req, res){
    Book.find(function (err, items){
        if(err){
            res.json({resultat:0, "err": err});
        }else{
            res.json(items);
        }
    })
});



app.get("/", function(req, res){
    res.render("home");
});

app.get("/cate", function(req, res){
    res.render("cate");
});


app.post("/cate", function(req, res){
    var newCate = new Category({
        name : req.body.txtCate,
        Books_id : []
    });
    newCate.save(function(err){
        if(err){
            console.log("Save Cate error : " + err);
            res.json({résultat : 0 });
        }else{
            console.log("Save successfully");
            res.json({résultat : 1});
        }
    })
});

app.get("/book", function(req, res){
    Category.find(function(err, items){
        if(err){
            res.send("Error get Categories");
            console.log("Error" + err);
        }else{
            res.render("book", {Cates:items});
            console.log(items);
        }
    });
});

app.post("/book", function(req, res){
    //Upload Image
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            console.log("Multer error while uploading ");
            res.json({result:0, "err": err});
        } else if(err){
            console.log("Unknown error while uploading ");
            res.json({result:0, "err": err});
        } else{
            console.log("Upload successfully");
            console.log(req.file); //File information apres upload
            //res.send({result:1, "file" : req.file});

            //Sauvegarder Livre
            var book = new Book({
                name : req.body.txtName, //voir dans book.ejs, 
                image: req.file.filename, //voir dans book.ejs
                file: req.body.txtFile
            });

            //res.json(book);

            book.save(function(err){
                if(err){
                    res.json({
                        result:0, "err" : "Error saving book"
                    });
                }else{
                    //Update Books_id (Category)
                    Category.findOneAndUpdate(
                        {_id:req.body.selectCate},   //selectCate dans form select de book.ejs
                        {$push: {Books_id:book._id} },   //push book_id dans la table de bookID dans db Category
                        function(err){
                        if(err){
                            res.json({result:0,"err": err});
                            //return;
                        }else{
                            res.json({result:1});
                        }
                    });
            }
        });

    }});});