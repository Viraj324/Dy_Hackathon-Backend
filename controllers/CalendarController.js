// const router = require('express').Router();
// const Event = require('../models/Event');
// const moment = require('moment');

// router.post('/create-event', async (req, res) => {
//     try {
//         const event = new Event(req.body);
//         await event.save();
//         res.sendStatus(201); // 201 Created status
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// router.get('/get-events', async (req, res) => {
//     try {
//         const events = await Event.find({
//             start: { $gte: moment(req.query.start).toDate() },
//             end: { $lte: moment(req.query.end).toDate() }
//         });
//         res.send(events);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// module.exports = router;


const Event = require('../models/Event');
const moment = require('moment');

exports.createEvent = async (req, res) => {
    try {
        const { start, end, title } = req.body;
        const event = new Event({ start, end, title });
        await event.save();
        res.sendStatus(201); // 201 Created status
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getEvents = async (req, res) => {
    try {
        const { start, end } = req.query;
        const events = await Event.find({
            start: { $gte: moment(start).toDate() },
            end: { $lte: moment(end).toDate() }
        });
        res.send(events);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
