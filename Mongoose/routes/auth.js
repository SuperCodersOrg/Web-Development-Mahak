const router = express.router();
const userSchema = require('../models/user');

router.get('/',(req,res)=>{
    res.render('home_page');
})

router.post('/dashboard',(req,res)=>{
    const {username , email, password} = req.body;

    // await userSchema.find({email});
    // userSchema.create{name,email,password};


    res.render('')
})