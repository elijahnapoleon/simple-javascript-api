const express = require('express');
const app = express();

app.use(express.json());

let items = [
    {id: 1, name: "fruit"},
    {id: 2, name: "phone"}
];

app.get('/items', (req,res) => {
    res.json(items);
});

app.get('/items/:id', (req,res) => {
    const i = Number(req.params.id);

    const target = items.find(item => item.id === i);

    if(!target){
        return res.status(404).json({message : "Item not found"});
    }

    res.json(target);
});

app.post('/items', (req,res) => {

    const item = {id: items.length + 1, name: req.body.name};

    items.push(item);
    return res.status(201).json(item);
});

app.put('/items/:id', (req,res) => {
    const i = Number(req.params.id);
    const target = items.find(item => item.id === i);

    target.name = req.body.name;

    res.json(target);
});

app.delete('/items', (req,res) => {
    const i = Number(req.body.id);
    const index = items.findIndex(item => item.id === i);
    items.splice(index,1);

    return res.status(204).json(items);
});

app.listen(3000, () => {
    console.log("Server running on localhost");
});