const express=require('express');
const validateToken = require('../middlewares/validateToken');
const Notes = require("../models/Notes"); 
const { body, validationResult } = require("express-validator");
const router=express.Router();

//Route: 1 :- fetch all notes at /fetchallnotes
router.get('/fetchallnotes',validateToken, async (request, response)=>{
    
    try {
        
    
    const userID=request.user.id;
    const notes= await Notes.find({user : userID});
    response.json(notes);
} catch (error) {
    console.error(error.message);
    response.status(500).send("Internal Server Error");
}
});














//Route: 2 :- Create a note at /createanote
router.post('/createnote',   
  validateToken,
  [
    body("title","Please eenter a valid title").isLength({min:1})
    // body("description","Please write some description").isLength({ min: 1 })
    // body("name").isLength({ min: 5 }),
  ], 
   async (request, response)=>{
    
        const errors = validationResult(request);
    
        if (!errors.isEmpty()) {
          return response.status(400).json({ errors: errors.array() });
        }
    
        try {
          let note = await Notes.findOne({ title: request.body.title });
          if (note) {
            return response
              .status(400)
              .json({ error: "Sorry a note with this title already exits. Kindly change the title a bit" });
          }
    
    
          note = await Notes.create({
            user: request.user.id,
            title: request.body.title,
            description: request.body.description,
            tag: request.body.tag,
            date:Date.now()
          });
          response.send(note);
        }
    catch(error){
        console.error(error.message);
        response.status(500).send("Internal Server Error");
    }
}
);


//Route: 3 :- Update a note at /updatenote login required
router.put('/updatenote/:id',   
  validateToken,
  [
    body("title","Please eenter a valid title").isLength({min:1})
    // body("description","Please write some description").isLength({ min: 1 })
    // body("name").isLength({ min: 5 }),
  ], 
   async (request, response)=>{
    
        const errors = validationResult(request);
    
        if (!errors.isEmpty()) {
          return response.status(400).json({ errors: errors.array() });
        }
    
        try {
            const {title,description,tag} =  request.body;
            
            // create a new note
            const newNote={};
            if(description); newNote.description=description;
            if(title); newNote.title=title;
            if(tag); newNote.tag=tag;

            
            
            // Find the note that user want to update, check wheather that note even exists or not
          let note = await Notes.findById(request.params.id);
            if(!note){
                return response
                .status(403)
                .json({ error: "Access Denied Note not found" });
            }

            // Check if user is updating his own note or someone else note
            if(note.user.toString()!==request.user.id){
                return response
                .status(403)
                .json({ error: "Access Denied, illegal user" });
            }
            
            const updatedNote= await Notes.findByIdAndUpdate(request.params.id,{$set:newNote},{new:true});
            
          
          response.send(updatedNote);
        }
    catch(error){
        console.error(error.message);
        response.status(500).send("Internal Server Error");
    }
}
);





//Route: 4 :- delete a note at /deletenote | login required
router.delete('/deletenote/:id',   
  validateToken, 
   async (request, response)=>{
        try {
           

            
            
            // Find the note that user want to delete, check wheather that note even exists or not
          let note = await Notes.findById(request.params.id);
            if(!note){
                return response
                .status(403)
                .json({ error: "Access Denied Note not found" });
            }

            // Check if user is deleting his own note or someone else note
            if(note.user.toString()!==request.user.id){
                return response
                .status(403)
                .json({ error: "Access Denied, illegal user" });
            }
            
            const deletedNote= await Notes.findByIdAndDelete(request.params.id);
            
          
          response.json({"Success":"Note is deleted Successfully", "note" : deletedNote});
        }
    catch(error){
        console.error(error.message);
        response.status(500).send("Internal Server Error");
    }
}
);

module.exports=router