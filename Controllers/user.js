const User = require("../Models/users")
const {v4: uuidv4} = require('uuid')

const {getUser, setUser} = require("../services/auth")
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


async function handleUserSignUp(req,res){
    const {name, email, password} = req.body
    await User.create({name, email, password})
    return res.redirect('/')
}

async function handleUserLogin(req,res){
    const {email, password} = req.body
    const user = await User.findOne({email, password})
    if(!user)
        return res.render('login',{
            error: 'Invalid Credentials'
        })
    const userToken = setUser(user)
    res.cookie("token", userToken)
    return res.redirect('/')
}

async function handleForgotPassword(req,res){
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.render("forgot-password", { error: "User not found"});

        const secret = 'Namaste' + user.password; // unique per user
        const token = jwt.sign({ id: user._id, email: user.email }, secret, {
            expiresIn: "15m",
        });

        const link = `http://localhost:8001/user/reset-password/${user._id}/${token}`;

        // Send Email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "njsreactdom@gmail.com",
                pass: "vaweeqqzwmjakwoj",
            },
        });

        const mailOptions = {
            from: "njsreactdom@gmail.com",
            to: user.email,
            subject: "URL Shortener App - Password Reset Link",
            html: `<p>Click <a href="${link}">here</a> to reset your password</p>`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send(`
            <h1 style="color: green; text-align: center;">Reset Link Sent to your mail..</h1>
        `)
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

async function handleResetPasswordCheck(req, res){
    const { id, token } = req.params;
    const user = await User.findById(id);
    if (!user) return res.render("reset-password", { error: "Token is invalid or expired"});

    const secret = 'Namaste' + user.password;
    try {
        jwt.verify(token, secret);
        res.render("reset-password", { email: user.email });
    } catch (err) {
        res.send("Invalid or expired token");
    }
}

async function handleResetPassword(req, res) {
    const { id, token } = req.params;
    const { new_password } = req.body;
    const user = await User.findById(id);
    if (!user) return res.send("Invalid user");

    const secret = 'Namaste' + user.password;
    try {
        jwt.verify(token, secret);
        // const hashedPassword = await bcrypt.hash(password, 10);
        await User.updateOne({ _id: id }, { $set: { password: new_password } });
        // ✅ Send success HTML directly
        res.send(`
          <html>
            <head>
              <title>Password Reset Successful</title>
              <style>
                body {
                  background-color: #d4edda;
                  color: #155724;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  font-family: sans-serif;
                }
                a {
                  margin-top: 20px;
                  padding: 10px 20px;
                  background-color: #155724;
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;
                }
                a:hover {
                  background-color: #0b3d1c;
                }
              </style>
            </head>
            <body>
              <h1>Password Updated Successfully!</h1>
              <a href="/login">Back to Login</a>
            </body>
          </html>
        `);
    } catch (err) {
        res.send("Something went wrong");
    }
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
    handleForgotPassword,
    handleResetPasswordCheck,
    handleResetPassword,
}
