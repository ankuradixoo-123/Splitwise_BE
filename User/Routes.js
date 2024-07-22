const { Router } = require('express')
const controller=require('./Controller');

const router=Router();

router.get('/',controller.getusers);
router.get('/:id',controller.getusersById);
router.post("/",controller.addUsers);
router.delete("/:id",controller.deleteusers);
router.put("/:id",controller.UpdateUsers);
router.post('/register',controller.register)
router.post('/login',controller.login)
router.get("/",(req,res)=>{
    res.send('using api route');
})
module.exports=router;

