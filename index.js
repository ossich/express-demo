const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());


const courses = [
    { id : 1, name : 'course1' },
    { id : 2, name : 'course2' },
    { id : 3, name : 'course3' },
    { id : 4, name : 'course4' },
];
app.get('/', (req,res) => {

    res.send('Hello World! 001...');

});

app.get('/api/courses', (req,res) => {

    res.send(courses);

});

app.get('/api/courses/:id', (req,res) => {

   const course = courses.find(c => c.id === parseInt(req.params.id));
   if (!course) res.status(404).send('The course whith the given ID is not found.'); // 404
   res.send(course);


 // res.send(req.query);
 // res.send(req.params);

});

app.post('/api/courses', (req,res) =>{ 
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    if (result.error) {
        // 400 Bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course={
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port , () => console.log(`Listening on port ${port}...`));