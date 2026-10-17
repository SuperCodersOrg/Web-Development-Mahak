const User = require('../models/user');

function setTokenCookie(res, token) {
    res.cookie(process.env.JWT_SECRET_KEY, token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000
    });
}

const SignInPost = async function signinPost(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.render('home_page', { error: 'It is an error' });
    }

    const existUser = await User.find({ email });
    if (existUser) {
        res.send("User already exist");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashPassword
    });

    const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET_KEY || 'secretkeyabc',
        { expiresIn: '20m' }
    );

    setTokenCookie(res, token);
    
    res.render('data', {
        username: username,
        email: email
    })
}

module.exports = { SignInPost };