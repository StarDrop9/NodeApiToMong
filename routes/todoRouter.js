const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Todo = require("../models/todoModel");
//const Todos = db.todos
router.post("/todo", auth, async (req, res) => {
  try {
    const { text, priority, creator_id } = req.body;
 
//console.log(text)
console.log(req.body)
//need to make user specific and change text task and add title & priority
    // validate
    if (!text)
      return res.status(400).json({ msg: "Not all fields have been entered yet." });
      const newTodo = new Todo({
               text,
               priority,
               creator_id
                    });
            const savedTodo = await newTodo.save();
             res.json(savedTodo);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/todo/:id", auth, async (req, res) => {
  try {
      
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id; 
    const { text, priority, creator_id} = req.body;
 
//console.log(text)
console.log(req.body)
//need to make user specific and change text task and add title & priority
    // validate
    Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found!`
        });
      } else res.send({ message: "Todo was updated successfully." });
    })
       
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/todo/:id", auth, async (req, res) => {
  try {
     
    const id = req.params.id; 
   // const { text } = req.body;
 
    await Todo.findByIdAndDelete(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was deleted successfully!" });
    })
        //"Could not delete Tutorial with id=" + id
      } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', function(req, res) {
  Todo.find({}, function(err, todos) {
    var todoMap = {};

    todos.forEach(function(todo) {
      todoMap[todo.id] = todo;
    });

    res.send(todoMap);  
  });
});

router.get('/:id', function(req, res) {
  const id = req.params.id; 
 
  Todo.find({creator_id:`${id}`}, function(err, todos) {
    var todoMap = {};

    todos.forEach(function(todo) {
      todoMap[todo.id] = todo;
    });

    res.send(todoMap);  
  });
});




module.exports = router;
