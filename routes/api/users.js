const express = require('express');
const router = express.Router();
const users = require ('../../users');
const uuid = require('uuid');
const req = require('express/lib/request');

// get all users
router.get('/', (req, res) => res.json(users));

//get single users
router.get('/:id', (req , res) =>{
    //res.send(req.params.id);
    let found = (users.some(user => user.id === parseInt(req.params.id)));
    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({ msg : `No user with the id of ${req.params.id}`})
    }
})

// create users
router.post('/', (req , res) =>{
 const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email
}
if (!newUser.name || !newUser.email) {
    return res.status(400).json({ mag : 'Please include a name and email'});
}
    users.push(newUser);
   // res.redirect('/');
    res.json(users);
}
)

// update users
router.put('/:id', (req, res) => {
    let found = (users.some(user => user.id === parseInt(req.params.id)));

    if (found){
        const upduser = req.body;
        users.forEach(user => {
            if (user.id === parseInt(req.params.id)){
                user.name = upduser.name ? upduser.name : user.name;
                user.email = upduser.email ? upduser.email : user.email;

                res.json({ msg : "User updated", user});
            }
            else {
                res.status(400).json({ mag : `No user with the id of ${req.params.id}`});
            }
        })
    }
})

// Delete user
router.delete('/:id', (req, res) => {
    let found = users.some(user => user.id === parseInt(req.params.id));

    if (found){
        res.json({
           msg : 'Member Deleted',
           users: users.filter(user => user.id !== parseInt(req.params.id))
        })
    } else {
        res.status(400).json({msg: `No user with the id of ${req.params.id}`})
    }
})

module.exports = router;