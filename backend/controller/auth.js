import User from "../models/users";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((err, user) => {
        if(user) return res.status(400).send("Email is already taken");
    });

    const { firstName, lastName, email, password } = req.body;

    // create new user
    const newUser = new User({
      firstName, lastName, email, password,
    });

    newUser.save((err, data) => {
        if(err){
            return res.status(400).json({message: "Something went wrong"})
        }

         if(data){
             return res.status(200).json({ user : data})
         }
    });
  
};



export const login = (req, res) => {
  //email check
  User.findOne({ email: req.body.email })
  .exec((err, user) => {
    if (err) return res.json({ err });
    if (user) {

      //password check
      if(user.authenticate(req.body.password)) {
        //jwt
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        const { firstName, lastName, email, role } = user;
        res.status(200).json({ token, user: { firstName, lastName, email, role } });
      }else{
          return res.status(400).json({message: "Incorrect Password"})
      }


    }else{
        return res.status(400).json({message: "Something's wrong"})
    }
  });
};


export const logout = (req, res) => {
  res.clearCookie('token')
    res.status(200).json({
        message: 'Signout successfully'
    })
}


