const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');


const app = express();

app.use(bodyParser.json());
app.use(cors())

const database = {
   users: [
      {
         id: '123',
         fristName: 'Jordan',
         lastName: 'Ancheta',
         email: 'jordan@gmail.com',
         password: '123',
         organization: 'Capsotne'
      }
   ],
   login: [
      {
         id:'987',
         hash: '',
         email: 'jordan@gmail.com'
      }
   ]
}

app.get('/', (req, res)=> {
   res.send(console.log("working"));
})

app.post('/login', (req, res) => {
   if (req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password) {
    res.json(database.users[0]);
      }else {
         res.status(400).json('error logging in');
      }
})

app.post('/register', (req, res) => {
   const { email, firstName, lastName, password, organization } = req.body; 
   database.users.push({
      id: '124',
      fristName: '',
      lastName: '',
      email: '',
      organization: ''
   })
   res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
   const { id } = req.params;
   let found = false;
   database.users.forEach(user => {
      if (user.id === id) {
         found = true;
         return res.json(user);
      } 
   })
   if (!found) {
      res.status(400).json('not found');
   }
})


app.listen(3000, () => {
   console.log('app is running on port 3000')
})