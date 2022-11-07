const { response } = require('express');
const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const fetchUser = require('../middleware/fetchUser')
const upload=require('../middleware/upload')
const fs = require('fs');
const path = require('path');



/*-------------------------------------------Route 1-----------------------------------------*/
//Get all the notes using:GET '/api/notes/fetchallnotes'.
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const note = await Note.find({ user: req.user.id })
        res.json(note)

    } catch (error) {
        res.status(500).send("Internal server error")
    }

})



/*-------------------------------------------Route 2-----------------------------------------*/


//Add new note using:POST "/api/notes/addnote".
router.post('/addnote',fetchUser, upload.single('ufile'),body('title').isLength({min:1}), (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        var encode_file;
        if(req.file!==undefined) encode_file = fs.readFileSync(req.file.path).toString('base64');
        var obj = {
            user:req.user.id,
            title: req.body.title,
            description: req.body.description,
            ufile: (req.file!==undefined)&&{
                data:new Buffer(encode_file,'base64'),
		        contentType: req.file.mimetype,
                name:req.file.originalname
            }
        }
        
        Note.create(obj, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Image uploaded");
            }
        });
    } catch (error) {
        res.status(500).send("Internal server error")
    }
});

/*-------------------------------------------Route 3-----------------------------------------*/
//Update note using:PUT "/api/notes/updatenote/:id".
router.put('/updatenote/:id', fetchUser,upload.single("ufile"),body('title').isLength({min:1}), async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        var encode_file;
        if(req.file!==undefined) encode_file = fs.readFileSync(req.file.path).toString('base64');
        
        var updatenote = {
            user:req.user.id,
            title: req.body.title,
            description: req.body.description,
            ufile: ((req.file!==undefined)|| (req.body.old===false))&&{
                data:new Buffer(encode_file,'base64'),
		        contentType: req.file.mimetype,
                name:req.file.originalname
            }
        }

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }


        if (note.user.toString() !== req.user.id) {
            return response.status(404).send("not allowed")
        }
        if(req.body.old==="true"){
            note = await Note.findByIdAndUpdate(req.params.id, {title: req.body.title, description: req.body.description }, { new: true })
        }else if(req.file===undefined){
            note = await Note.findByIdAndUpdate(req.params.id, { $unset: {ufile:1} })
            note = await Note.findByIdAndUpdate(req.params.id, {title: req.body.title, description: req.body.description }, { new: true })
        }else{
            note = await Note.findByIdAndUpdate(req.params.id, { $set: updatenote }, { new: true })
        }
        res.json({ note });
    } catch (error) {

        res.status(500).send("Internal server error")
    }

})



/*-------------------------------------------Route 4-----------------------------------------*/
//Delete note using:DELETE "/api/auth/deletenote/:id".
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }
        if (note.user.toString() !== req.user.id) {
            return response.status(404).send("not allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ success: "Note has been deleted" });

    } catch (error) {

        res.status(500).send("Internal server error")
    }

})

/*-------------------------------------------Route 5-----------------------------------------*/
//update background color using:PUT "/api/notes/updateBackground/:id"
router.put('/updateBackground/:id', fetchUser, async (req, res) => {
    try {

        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not found");
        }


        if (note.user.toString() !== req.user.id) {
            return response.status(404).send("not allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { backgroundColor: req.body.backgroundColor }, { new: true })

        res.json({ note });
    } catch (error) {

        res.status(500).send("Internal server error")
    }

})


module.exports = router;