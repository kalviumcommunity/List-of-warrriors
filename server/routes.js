
const express = require('express');
const router = express.Router();
const  {war} = require('./schema');
const Joi = require("joi");
const person = require('./Usersschema')
const jwt = require('jsonwebtoken')

require('dotenv').config()                             

router.use(express.json()) 

// Defined CRUD routes and handlers
router.get('/get', async (req, res) => {
  try {
      const sword = await war.find(); 
      res.json(sword); 
  } catch (err) {
      console.error('Error in GET request:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

const newSchema = Joi.object({
  Warrior: Joi.string().required(),
  BirthYear: Joi.number().required(),
  DeathYear: Joi.number().required(),
  State: Joi.string().required(),
  FamousBattle: Joi.string().required(),
  Image: Joi.string().required(),
  created_by: Joi.string()
});



router.post('/add', async (req, res) => {

  try {
      const { error } = newSchema.validate(req.body);
        if (error) {
            return res  .status(400).json({ error: error.details[0].message });
        }
      const newData = await war.create(req.body);
      console.log(newData)
      res.send(newData);
  } catch (error) {
      console.error(error);
      console.log('error',error)
      // res.send('Error');  
  }
});

router.get('/get/:id', async (req,res) => {
  const _id = req.params.id
  war.findById({_id})
  .then(users => res.json(users))
  .catch(err => console.log(err))
})

router.put('/update/:id', async (req, res) => {
  try {
      const { error } = newSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
      }
      const updatedData = await war.findByIdAndUpdate(req.params.id, req.body, { add: true });
      if (!updatedData) {
          return res.status(404).json({ error: 'Data not found' });
      }
      console.log('Data updated:', updatedData);
      res.status(200).json({ message: 'Data updated successfully', data: updatedData });
  } catch (err) {
      console.error('Error in PUT request:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
      const deletedData = await war.findByIdAndDelete(req.params.id); 
      if (!deletedData) {
          return res.status(404).json({ error: 'Data not found' });
      }
      console.log('Data deleted:', deletedData);
      res.status(200).json({ message: 'Data deleted successfully' });
  } catch (err) {
      console.error('Error in DELETE request:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/Signup',async(req,res)=>{
  try{
      const user = await person.create({
          username:req.body.username,
          password:req.body.password
      })
      res.send(user)
  }catch(err){
      console.error(err)
  }

})
router.post('/Login', async (req, res) => {
  try {
      const { username, password } = req.body;
      const user = await person.findOne({ username, password });
      
      if (!user) {
          return res.status(401).json({ error: 'Invalid username / password' });
      }

      
      res.status(200).json({ user });
      
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/logout',(req,res)=>{
  res.clearCookie('username')
  res.clearCookie('password')

  res.status(200).json({message:'Logout succesful'})
})

router.post('/auth', async(req,res) => {
  try{
      const {username,password} = req.body
  const user = {
      "username" : username,
      "password" : password
  }
  const ACCESS_TOKEN = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1d' });
  res.cookie('token',ACCESS_TOKEN,{maxAge:365*24*60*60*100})
  // res.json({"accessToken" : ACCESS_TOKEN})
  res.json({ "accessToken": ACCESS_TOKEN });
}catch(err){
  console.error(err)
  res.status(500).json({error:'Internal Server Error'})
}
});

module.exports = router;
