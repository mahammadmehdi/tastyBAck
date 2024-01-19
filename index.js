import express from 'express';
import mongoose, { Schema } from 'mongoose';
import cors from "cors"
const app = express()
const port = 3000

app.use(express.json())

app.use(cors())

const tastySchema = new Schema({
    image: String,
    name: String,
    desc: String,
    price: Number

});

const tastyModel = mongoose.model('Tasty', tastySchema);
app.get('/', async (req, res) => {
    const tasty = await tastyModel.find({})
    res.send(tasty)
})

app.get('/:id', async (req, res) => {
    const { id } = req.params
    const tasty = await tastyModel.findById(id)
    res.send(tasty)
})

app.post('/', async (req, res) => {
    const { image, name, desc, price } = req.body
    const newTasty = new tastyModel({ image, name, desc, price })
    await newTasty.save()
    res.send("Ugurla yuklendi")
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    const { image, name, desc, price } = req.body
    const tasty = await tastyModel.findByIdAndUpdate(id, { image, name, desc, price })
    res.send(tasty)
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    const tasty = await tastyModel.findByIdAndDelete(id)
    res.send(tasty)
})

mongoose.connect('mongodb+srv://mahammad:mahammad@cluster0.errjuf4.mongodb.net/');

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})