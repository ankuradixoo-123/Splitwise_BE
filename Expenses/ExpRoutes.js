const { Router } = require('express')
const controller=require('./ExpControllers');

const router=Router();

router.get('/',controller.Check)

module.exports=router;