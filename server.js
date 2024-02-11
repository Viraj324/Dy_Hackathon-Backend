// // const express = require('express');
// // const cors = require('cors');
// // const dotenv = require('dotenv');
// // const mongoDB = require('./config/db');
// // const authRoutes = require('./routes/users');
// // const bodyParser = require('body-parser');

// // //config dotenv
// // dotenv.config();

// // //database config
// // mongoDB();

// // const app = express();
// // // middlewares
// // app.use(express.json());
// // app.use(cors());
// // app.use(bodyParser.json());

// // // Route

// // app.use("/auth", authRoutes);

// // app.use('/api/calendar', require('./controllers/CalendarController'));

// // //test route
// // app.get('/',(req, res)=>{
// //     res.send('<h1>Welcome</h1>');
// // });


// // const PORT = process.env.PORT || 8080

// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });



// // // var nodemailer = require('nodemailer');
// // // const { sendMail } = require('./config/emailConfig');

// const mongoose = require('mongoose');
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const mongoDB = require('./config/db');
// const authRoutes = require('./routes/users');
// const eventRoutes = require('./routes/events'); // Add this line
// const bodyParser = require('body-parser');


// //config dotenv
// dotenv.config();

// //database config
// // mongoDB();
// mongoose.connect("mongodb+srv://shrutiPagar:shru1234@cluster0.w20gm2l.mongodb.net/Event_Management" || 'mongodb://localhost:27017/events', { useNewUrlParser: true, useUnifiedTopology: true })

// // mongoose.connect('mongodb://localhost:27017/events', { useNewUrlParser: true, useUnifiedTopology: true })

// // mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/events', { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// const app = express();
// // middlewares
// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());

// // Route

// app.use("/auth", authRoutes);

// app.use('/api/events', eventRoutes); // Use eventRoutes for calendar routes

// //test route
// app.get('/',(req, res)=>{
//     res.send('<h1>Welcome</h1>');
// });

// // app.get('/teacherhead', (req, res)=> {
// //   EventModel.find()
// //   .then(events => res.json(events))
// //   .catch(err => res.json(err))
// // })

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/auth", authRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Welcome</h1>');
});
