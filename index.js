const fs = require('fs')
const express = require('express')
const morgan = require('morgan')

const index = fs.readFileSync('index.html','utf-8')
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8')) 
const products = data.products;

const server = express();

server.use(express.json());

server.use(morgan('dev'))
server.use(express.static('public'));

//Create POST /products
server.post('/products',(req, res) => {
  console.log(req.body);
  products.push(req.body)
  res.json(req.body);
})

// Read GET /products
server.get('/products',(req, res)=>{
  res.json(products)
});
// Read GET /products/:id
server.get('/products/:id',(req, res)=>{
  const  id = +req.params.id;
  const product = products.find(p=>p.id===id)
  res.json(product)
});

// Update PUT /products/:id
server.put ('/products/:id',(req, res)=>{
  const  id = +req.params.id;
  const product = products.find(p=>p.id===id)
  
  res.json(product)
});


server.get('/demo',(req, res) => {
  // res.json(products)
  res.status(200).send('<h1>Hello</h1>')
  // res.sendFile('/home/rishav/rm/node_application/index.html')
})

server.listen(8080, () => {
  console.log("Server Started");
})
