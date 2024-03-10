const router = require("express").Router();
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const temperamentInfo = require('../middleware/temperamentInfo')

// register

router.post("/", async (req, res) => {
  try {
    const { name, email, password, passwordVerify, city, gender, age, temperament } =
      req.body;

    // validation

    if (
      !name ||
      !email ||
      !password ||
      !passwordVerify ||
      !city ||
      !gender ||
      !age
    )
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });

    if (password !== passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please enter the same password twice." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ errorMessage: "An account with this email already exists." });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // create avatar
    function get_random(list) {
      return list[Math.floor(Math.random() * list.length)];
    }

    const m = get_random([1, 2, 3]);
    const f = get_random([4, 5, 6]);

    if (gender == "male") {
      avatar = `avatar${m}.svg`;
    } else {
      avatar = `avatar${f}.svg`;
    }

    //date format
    const subDate = new Date(0);
    isAdmin = false;
    // save a new user account to database
    const friends = [];

    const newUser = new User({
      name,
      email,
      passwordHash,
      avatar,
      city,
      gender,
      age,
      subDate,
      isAdmin,
      friends,
      temperament,
    });

    const savedUser = await newUser.save();

    // sign the token

    const token = jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET);

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    console.error(error);
    res.sendStatus(500).send();
  }
});

// log in

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    // sign the token

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    console.error(error);
    res.sendStatus(500).send();
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (error) {
    res.json(false);
  }
});

// get user ID --SECURE--
router.get("/id", auth, (req, res) => {
  try {
    const userId = req.user;
    res.send(userId);
  } catch (error) {
    console.error(error);
    res.sendStatus(500).send();
  }
});

// get isAdmin info

router.get("/isAdmin", auth, async (req, res) => {
  try {
    const userID = req.user;
    const userInfo = await User.findById(userID).select();
    res.send({
      isAdmin: userInfo.isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500).send();
  }
});

// get user info

router.get("/info", auth, temperamentInfo, async (req, res) => {
  try {
    const userID = req.user;
    const userInfo = await User.findById(userID).select("-passwordHash"); //.select('-passwordHash')
    res.send({
      name: userInfo.name,
      email: userInfo.email,
      subDate: userInfo.subDate,
      createdAt: userInfo.createdAt,
      avatar: userInfo.avatar,
      temperament: userInfo.temperament,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500).send();
  }
});

// delete user
router.post("/delete-user", auth, async (req, res) => {
  try {
    const { id } = req.body;
    await User.deleteOne({ _id: id });
    res.sendStatus(200).send();
  } catch (error) {
    console.error(error);
    res.sendStatus(500).send();
  }
});

// multer
//importing schema
const Image = require("../models/imageModel");

const multer = require("multer");
const temperament = require("../middleware/temperamentInfo");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/src/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const mLoad = multer({ storage: storage });

router.post("/uploads", mLoad.single("file"), auth, async (req, res) => {
  console.log(req.file.filename);
  const imageName = req.file.filename;

  try {
    Image.create({ image: imageName });

    // update user profile picture
    const profilePic = imageName;
    const filter = { _id: req.user };
    console.log(req.body);
    const update = { avatar: profilePic };
    const updated_user = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(updated_user);
    res.status(200).send(updated_user);

    // res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/get-image", auth, async (req, res) => {
  try {
    Image.find({}).then((data) => {
      res.status(200).send({ data: data });
    });
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/get-users", auth, async (req, res) => {
  try {
    const userID = req.user;

    //получаем массив друзей пользователя
    const userData = await User.findById(req.user).select("friends");
    const friendsId = userData.friends;

    const checkDate = new Date("2017-01-26");

    //выводим пользователей не являющихся друзьями
    //выводим пользователей у которых не просрочена подписка
    const usersInfo = await User.find({
      _id: { $nin: [userID, friendsId] },
      isAdmin: { $nin: true },
      subDate: { $gt: checkDate },
    }).select("-passwordHash");
    res.status(200).send(usersInfo);
  } catch (error) {
    res.status(500).send();
  }
});

//подписка patch?
router.get("/extendSub", auth, async (req, res) => {
  try {
    const filter = { _id: req.user };
    //date format
    const dateTime = new Date();
    //console.log(dateTime);
    //--
    const update = { subDate: dateTime };
    const updated_user = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    //console.log(updated_user);
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

//добавление в друзья
router.post("/addFriend", auth, async (req, res) => {
  try {
    const filter = { _id: req.user };
    const userId = req.user;
    const { friendId } = req.body;

    //получаем массив друзей пользователя
    const userData = await User.findById(req.user).select("friends");

    //обновляем массив друзей
    const allFriends = [...userData.friends, friendId];
    const update = { friends: allFriends };

    //заменяем массив на обновлённый
    const updated_user = await User.findOneAndUpdate(filter, update, {
      new: true,
    });

    //console.log(updated_user);

    //добавляемся в друзья со стороны друга
    const filter2 = { _id: friendId };
    const userData2 = await User.findById(friendId).select("friends");
    const allFriends2 = [...userData2.friends, userId];
    const update2 = { friends: allFriends2 };

    const updated_friend = await User.findOneAndUpdate(filter2, update2, {
      new: true,
    });

    //console.log(updated_friend);

    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

//добавление в друзья
router.post("/addFriend", auth, async (req, res) => {
  try {
    const filter = { _id: req.user };
    const userId = req.user;
    const { friendId } = req.body;

    //получаем массив друзей пользователя
    const userData = await User.findById(req.user).select("friends");

    //обновляем массив друзей
    const allFriends = [...userData.friends, friendId];
    const update = { friends: allFriends };

    //заменяем массив на обновлённый
    const updated_user = await User.findOneAndUpdate(filter, update, {
      new: true,
    });

    //console.log(updated_user);

    //добавляемся в друзья со стороны друга
    const filter2 = { _id: friendId };
    const userData2 = await User.findById(friendId).select("friends");
    const allFriends2 = [...userData2.friends, userId];
    const update2 = { friends: allFriends2 };

    const updated_friend = await User.findOneAndUpdate(filter2, update2, {
      new: true,
    });

    //console.log(updated_friend);

    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

//вывод друзей
router.get("/get-friends", auth, async (req, res) => {
  try {
    const userID = req.user;

    //получаем массив друзей пользователя
    const userData = await User.findById(userID).select("friends");
    const friendsId = userData.friends;

    //находим друзей
    const usersInfo = await User.find({
      _id: { $in: friendsId },
      isAdmin: { $nin: true },
    }).select("-passwordHash");

    res.status(200).send(usersInfo);
  } catch (error) {
    res.status(500).send();
  }
});
module.exports = router;
