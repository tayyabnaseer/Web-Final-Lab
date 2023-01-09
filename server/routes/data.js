const router = require('express').Router();
const {getData, postData, updateData, deleteData} = require('../controller/data');

router.get("/", getData);
router.post("/", postData);
router.put("/:id", updateData);
router.delete("/:id", deleteData);


module.exports = router;