const router = require("express").Router();
const mongoose = require("mongoose");
const moment = require("moment");
const Events = mongoose.model("events");
const Participants = mongoose.model("participants");

// @route   POST api/event/create
// @desc    Get specific event
// @access  Public
router.post("/create", (req, res)=>{
  console.log(req.body);
  const date = moment(parseInt(req.body.startDate));
  Events.findOne({date: {$eq: date}, name: req.body.eventName})
    .then(event=>{
      if(event)
        return res.status(400).json({
          success: false,
          msg: "Event already exist"
        });
      const newEvent = new Events({
        date: date,
        name: req.body.eventName,
        openTime: req.body.openTime,
        closeTime: (req.body.closeTime)? req.body.closeTime: null,
        tag: req.body.tag
      });
      newEvent.save()
        .then(event=>{
          return res.json({
            success: true,
            event
          });
        });
    });
});
// @route   GET api/event/all
// @desc    Get all events
// @access  Public
router.get("/all", (req, res)=>{
  Events.find({})
    .then(events=>{
      res.json({
        success: true,
        events
      });
    })
});
// @route   GET api/event/filter
// @desc    Get events pertaining to certain filter
// @access  Public
router.post("/filter", (req, res)=>{
  const filter = req.body.tags.map(tag=>{
    return ({
      tag
    })
  });
  Events.find({$or: filter})
    .then(events=>{
      res.json({
        success: true,
        events
      })
    })
});
// @route   GET api/event/:id
// @desc    Get specific event
// @access  Public
router.get("/:id", (req, res)=>{
  Events.findById(req.params.id)
    .then(event=>{
      if(!event)
        return res.status(404).json({
          success: false,
          msg: "No such event with id"
        });
      event.participants = event.participants.length;
      return res.json({
        success: true,
        event
      });
    });
});
// @route   POST api/event/:id/register
// @desc    Get specific event
// @access  Public
router.post("/:id/register", (req, res)=>{
  Events.findById(req.params.id)
    .then(event=>{
      if(!event)
        return res.status(404).json({
          sucess: false,
          msg: "No such event with id"
        });
      Participants.findOne({email: req.body.email})
        .then(participant=>{
          if(participant){
            
            if(participant.events.indexOf(req.params.id)===-1){
              Participants.findByIdAndUpdate(participant.id, {$push: {events: event.id}}, {new: true})
                .then(participant=>{
                  return res.json({
                    success: true,
                    participant
                  });
                });
            }else{
              return res.status(403).json({
                sucess: false,
                msg: "User already registered"
              });
            }
          }else{
            const newParticipant = new Participants({
              name: req.body.name,
              email: req.body.email,
              events: event
            });
            newParticipant.save()
              .then(participant=>{
                return res.json({
                  success: true,
                  participant
                })
              });
          }  
        });
    });
});

module.exports= router;