/*
1. Create a user application which will have a home page, 
add user page and about us page
2. On Home, It will list all user in a table. There will be one more column Action in a 
table which will have a delete option to delete the user.
3. On add New user page, there will be form to create a new user. There will be a middleware 
that will add the created_on date in user when new user will be created.
4. On About-us page, there will some description of app and app creator.
*/

const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const PORT = 8000;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const getDate = new Date();
const day = getDate.getDate();
const month = getDate.getMonth() + 1;
const year = getDate.getFullYear();
const today = `${day}-${month}-${year}`;

let studentsData = [
    {
        id: uuidv4(),
        name: "Aakash",
        class: 11,
        stream: "Commerce",
        userCreatedDate: today
    },
    {
        id: uuidv4(),
        name: "Shubham",
        class: 12,
        stream: "Science",
        userCreatedDate: today
    },
    {
        id: uuidv4(),
        name: "Abhishek",
        class: 12,
        stream: "Commerce",
        userCreatedDate: today
    }
];


const createdOn = (req, res, next) => {
    if (!(req.body.name === "") && !(req.body.class === "") && !(req.body.stream === "")) {
        next();
    } else {
        res.json({
            status: 400,
            error: "Fields cannot be left blank!"
        });
    }
}


app.get("/", (req, res) => {
    res.render('users', { studentsData });
});

app.get("/adduser", (req, res) => {
    res.render('adduser');
});

app.post("/adduser", createdOn, (req, res) => {
    const user = req.body;
    studentsData.push({ id: uuidv4(), ...user, userCreatedDate: today });
    console.log(`User ${JSON.stringify(user)} added!`);
    res.redirect("/");
});

app.get("/deleteuser/:id", (req, res) => {
    const { id } = req.params;
    studentsData = studentsData.filter((user) => user.id !== id);
    console.log(`User with ID: ${id} deleted from Database!`);
    res.redirect("/");
});

app.get("/aboutus", (req, res) => {
    res.send("This is ABOUT US Page.");
});


app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}...`);
});
