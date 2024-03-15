const express=require('express');
const cors = require('cors');
const books=require('./books');

const path=require('path');

const app=express();

const idFilter = req => member => member.id === parseInt(req.params.id);

// Body Parser Middleware

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is Running ${PORT}`));


//GET All USERS

app.get('/api/books',(req,res)=>res.json(books));

//GET Specific USER Based on ID

app.get('/api/books/:id', (req, res) => {

const found = books.some(idFilter(req));

if (found) {

res.json(books.filter(idFilter(req)));

} else {

res.status(400).json({ msg: `No book with the id of ${req.params.id}` });

}

});


//CREATE A NEW USER

app.post('/api/books',(req,res)=>{

const newMember={

id: books.length + 1,

name: req.body.name,

author: req.body.author,

genre: req.body.genre,

rating: 3

};

if(!newMember.name || !newMember.author){

return res.status(400).json({msg:'NAME and Author must be provided'});

}

books.push(newMember);

res.json(books);

}

);

//DELETE Specific USER Based on ID

app.delete('/api/books/:id', (req, res) => {

const found = books.some(idFilter(req));

if (found) {

res.json({msg:'Deleted',

members:books.filter(

member=>member.id!==parseInt(req.params.id))})

} else {

res.status(400).json({ msg: `No member with the id of ${req.params.id}` });

}

});

//UPDATE Specific USER Based on ID

app.put('/api/books/:id',(req,res)=>

{

const found = books.some(member=>member.id===parseInt(req.params.id));

if(found)

{

const updMember=req.body;

books.forEach(

member=>{

if(member.id===parseInt(req.params.id))

{

member.name=updMember ? updMember.name : member.name;

member.author=updMember.author ? updMember.author : member.author;

res.json({msg:'Updated Details',member})

}

}

);

}

else{

res.status(400).json({msg:'No Book found with ${req.params.id}'});

}

});
