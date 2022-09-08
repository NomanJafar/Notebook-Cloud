const express = require("express");
const User = require("../models/User"); // user from user model
const router = express.Router(); // to send post and get requests
const { body, validationResult } = require("express-validator"); // to validate the input data given by user and through the errors
const bcrypt = require("bcryptjs"); // for incription of password
const jwt = require("jsonwebtoken"); // jwt is used to send a web token when user successfully signup
const jwtSecretKey = "tutmealite";
const validateToken = require("../middlewares/validateToken")

// Route: 1 :-no checks required, signup endpoint
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 5 }),
  ],

  async (request, response) => {
    console.log(request.body);
    // if errors show: Status 400 and send response according to errors
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: request.body.email });
      if (user) {
        return response
          .status(400)
          .json({ error: "Sorry a user with this email already exits" });
      }

      // incription of password
      const salt = await bcrypt.genSalt(10);

      const securePassword = await bcrypt.hash(request.body.password, salt);

      user = await User.create({
        name: request.body.name,
        password: securePassword,
        email: request.body.email,
        date:Date.now()
      });

      // user token so everytime user send us request, we can validate the user without pasword, just with token
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecretKey);
      response.json({ authToken });
    } catch (error) {
      console.error(error.message);
      response.status(500).send("Internal Server Error");
    }
  }
);


//------------------------------------



// Route: 2 :- signin/login endpoint
router.post(
  "/login",
  [
    body("email", "Not an Email format").isEmail(),
    body("password", "please login with right credentials").isLength({
      min: 5,
    }),
  ],

  async (request, response) => {
    console.log(request.body);
    // if errors show: Status 400 and send response according to errors
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: request.body.email });
      if (!user) {
        return response
          .status(400)
          .json({ error: "Please login with right credentials" });
      }

      // decription of password and check if password mactches with the user password in database
      const validatePassword = await bcrypt.compare(
        request.body.password,
        user.password
      );
      console.log(validatePassword);
      // send user token so everytime user send us request, we can validate the user without pasword, just with token
      if (validatePassword) {
        const data = {
          user: {
            id: user.id,
          },
        };

        const authToken = jwt.sign(data, jwtSecretKey);
        response.json({ authToken });
      } else {
        response.json({ message: "please enter the right credentials" });
      }
    } catch (error) {
      console.error(error.message);
      response.status(500).send("Internal Server Error");
    }
  }
);


//--------------------------------------
//Route: 3 :- getuser
router.post( "/getuser" , validateToken , async (request, response) => {
      console.log(request.body);
  
      try {
            userData=await  User.findById(request.user.id).select("-password");

       console.log(request.user);
       response.send(userData);
       
      } catch (error) {
        console.error(error.message);
        response.status(500).send("Internal Server Error");
      }
    }
  );
  

module.exports = router;



