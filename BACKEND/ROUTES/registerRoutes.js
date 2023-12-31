const router = require("express").Router();
const User = require("../MODELS/UserModel.js"); // Assuming your model is defined here

// Register ~ http://localhost:4000/User/register
router.route("/register").post((req, res) => {
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    firstname,
    lastname,
    email,
    password
  });

  newUser
    .save()
    .then(() => {
      res.json("Added");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error creating user" });
    });
});

// Checking if the user already exists in the system
router.get('/check-email/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.json({ exists: true }); // Email exists
    } else {
      res.json({ exists: false }); // Email doesn't exist
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//login routes ~ http://localhost:4000/User/login
router.route('/login').post((req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
      .then(user => {
          if (user) {
              if (user.password === password) {
                  res.json({ message: "Success" }); // Return a JSON response
              } else {
                  res.json({ error: "Incorrect" });
              }
          } else {
              res.json({ error: "No record existing!!" });
          }
      })
      .catch(error => {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
      });
});


module.exports = router;
