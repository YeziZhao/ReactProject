const adminJson = {
  id: 1,
  name: 'Admin',
  authorities: 'admin',
};
const userJson = {
  id: 2,
  name: 'User',
  authorities: 'user',
};
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var url = require('url');

const app = new express();

app.use(bodyParser.json());

app.post('/api/login', function(req, res) {
  console.log(req.body)
  if (req.body.username === 'admin' && req.body.password === '123') {
    res.status(200).json(adminJson);
  } else if (req.body.username === 'user' && req.body.password === '123') {
    res.status(200).json(userJson);
  } else {
    res.status(400).json({ error: 'wrong password' });
  }
});
app.get('/api/notices', function(req, res) {
  let notices = [
    {
      "id": 0,
      "title": "Task A",
      "message": "Task needs to be done before 2020.08.20"
    },
    {
      "id": 1,
      "title": "Task B",
      "message": "Task needs to be done before 2020.08.20"
    },
    {
      "id": 2,
      "title": "Task C",
      "message": "Task needs to be done before 2020.08.20"
    }
  ];
  res.status(200).json(notices);
});

app.get('/api/outlets', function(req, res) {
  let outlets =  [
    {
      "id": 1,
      "name": "Starbucks",
      "description": "3 Abc Street 7 #01-J4, XYZ Mall",
      "imgSrc": "https://media.cntraveler.com/photos/5af4afcff535091186d4acbc/5:4/w_480,c_limit/GettyImages-522435114.jpg",
      "hours": "Open 24 hours",
      "phone": "1234 5678",
      "categories": [
        "Coffee",
        "Cafes",
        "Desert",
        "Western"
      ]
    },
    {
      "id": 2,
      "name": "Starbucks",
      "description": "3 Abc Street 7 #01-J4, XYZ Mall",
      "imgSrc": "https://media.cntraveler.com/photos/5af4afcff535091186d4acbc/5:4/w_480,c_limit/GettyImages-522435114.jpg",
      "hours": "Open 24 hours",
      "phone": "1234 5678",
      "categories": [
        "Coffee",
        "Cafes",
        "Desert",
        "Western"
      ]
    },
    {
      "id": 3,
      "name": "Starbucks",
      "description": "3 Abc Street 7 #01-J4, XYZ Mall",
      "imgSrc": "https://media.cntraveler.com/photos/5af4afcff535091186d4acbc/5:4/w_480,c_limit/GettyImages-522435114.jpg",
      "hours": "Open 24 hours",
      "phone": "1234 5678",
      "categories": [
        "Coffee",
        "Cafes",
        "Desert",
        "Western"
      ]
    },
    {
      "id": 4,
      "name": "Starbucks",
      "description": "3 Abc Street 7 #01-J4, XYZ Mall",
      "imgSrc": "https://media.cntraveler.com/photos/5af4afcff535091186d4acbc/5:4/w_480,c_limit/GettyImages-522435114.jpg",
      "hours": "Open 24 hours",
      "phone": "1234 5678",
      "categories": [
        "Coffee",
        "Cafes",
        "Desert",
        "Western"
      ]
    },
    {
      "id": 5,
      "name": "Starbucks",
      "description": "3 Abc Street 7 #01-J4, XYZ Mall",
      "imgSrc": "https://media.cntraveler.com/photos/5af4afcff535091186d4acbc/5:4/w_480,c_limit/GettyImages-522435114.jpg",
      "hours": "Open 24 hours",
      "phone": "1234 5678",
      "categories": [
        "Coffee",
        "Cafes",
        "Desert",
        "Western"
      ]
    },
    {
      "id": 6,
      "name": "Starbucks",
      "description": "3 Abc Street 7 #01-J4, XYZ Mall",
      "imgSrc": "https://media.cntraveler.com/photos/5af4afcff535091186d4acbc/5:4/w_480,c_limit/GettyImages-522435114.jpg",
      "hours": "Open 24 hours",
      "phone": "1234 5678",
      "categories": [
        "Coffee",
        "Cafes",
        "Desert",
        "Western"
      ]
    },
    {
      "id": 7,
      "name": "Starbucks",
      "description": "3 Abc Street 7 #01-J4, XYZ Mall",
      "imgSrc": "https://media.cntraveler.com/photos/5af4afcff535091186d4acbc/5:4/w_480,c_limit/GettyImages-522435114.jpg"
    },
    {
      "id": 8,
      "name": "Starbucks",
      "description": "3 Abc Street 7 #01-J4, XYZ Mall",
      "imgSrc": "https://media.cntraveler.com/photos/5af4afcff535091186d4acbc/5:4/w_480,c_limit/GettyImages-522435114.jpg",
      "hours": "Open 24 hours",
      "phone": "1234 5678",
      "categories": [
        "Coffee",
        "Cafes",
        "Desert",
        "Western"
      ]
    },
    {
      "id": 9,
      "name": "Starbucks",
      "description": "3 Abc Street 7 #01-J4, XYZ Mall",
      "imgSrc": "https://media.cntraveler.com/photos/5af4afcff535091186d4acbc/5:4/w_480,c_limit/GettyImages-522435114.jpg",
      "hours": "Open 24 hours",
      "phone": "1234 5678",
      "categories": [
        "Coffee",
        "Cafes",
        "Desert",
        "Western"
      ]
    },
    {
      "id": 10,
      "name": "Starbucks",
      "description": "3 Abc Street 7 #01-J4, XYZ Mall",
      "imgSrc": "https://media.cntraveler.com/photos/5af4afcff535091186d4acbc/5:4/w_480,c_limit/GettyImages-522435114.jpg",
      "hours": "Open 24 hours",
      "phone": "1234 5678",
      "categories": [
        "Coffee",
        "Cafes",
        "Desert",
        "Western"
      ]
    }
  ];

  res.status(200).json(outlets);
});

app.delete('/api/notices/*', function(req, res) {
  res.status(200).json({
    data: "success"
  })
})
app.listen(3001, 'localhost',  function() {console.log(`
=====================================================
-> Server start
=====================================================
`)})


