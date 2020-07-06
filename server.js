const express = require("express");
const mongoose = require("mongoose");
const app = express();

//bodyparser middleware
app.use(express.json());
//connecting to db
const db =
  "mongodb+srv://prajjawal:prajjawal0311@cluster0-lvzri.gcp.mongodb.net/test?retryWrites=true&w=majority";

const connect = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("connected to database");
  } catch (err) {
    console.log(err.message);
  }
};
connect();
//route middleware
app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/profile", require("./routes/profile"));
app.use("/posts", require("./routes/posts"));

const PORT = 5000;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));
