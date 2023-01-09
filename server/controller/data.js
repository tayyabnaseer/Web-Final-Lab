const Data = require('../models/data');

const getData = async (req, res) => {

    try {
        const data = await Data.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const postData = async (req, res) => {
    try {
        const {title} = req.body;
        const data = new Data({title});
        await data.save();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateData = async (req, res) => {
    try {
        const {title} = req.body;
        const {id} = req.params;
        const data = await Data.findByIdAndUpdate(id, {title}, {new: true});
        if(!data) return res.status(404).json({message: "Data not found"});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteData = async (req, res) => {
    try {
        const {id} = req.params;
        const data
            = await Data.findByIdAndDelete(id);
            res.status(200).json({message: "Data deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getData,
    postData,
    updateData,
    deleteData
}