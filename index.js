const fs = require('fs')
const express = require('express')
const morgan = require('morgan')

const index = fs.readFileSync('index.html','utf-8')
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8')) 
const products = data.products;

const server = express();

server.use(express.json());
// server.use(express.urlencoded());

server.use(morgan('dev'))
server.use(express.static('public'));


// server.use((req, res, next)=>{
//   console.log(req.get('User-Agent'),req.method, req.ip, req.hostname);
//   next();
// })


const auth = (req, res, next)=>{
  // console.log(req.query);
  if (req.body.password=='123') {
    next()
  }else{
    res.sendStatus(401)
  }
}

server.get('/product/:id',/* auth, */(req, res)=>{
  console.log(req.params);
  res.json({ type: 'GET'})
});

server.use(auth);


server.get('/',auth,(req, res) => {
  res.json({type:'GET'})
})
server.post('/',auth,(req, res) => {
  res.json({type:'POST'})
})

server.get('/demo',(req, res) => {

  // res.json(products)
  res.status(200).send('<h1>Hello</h1>')
  // res.sendFile('/home/rishav/rm/node_application/index.html')
})

server.listen(8080, () => {
  console.log("Server Started");
})
