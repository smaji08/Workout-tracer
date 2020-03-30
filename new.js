const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now //takes a function or a value
  },
  totalDuration: {
    type: Number,
    default: 0
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ]
});

const User = mongoose.model("Workout", WorkoutSchema);

module.exports = User;


const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: {
        type: String,
    },
    name: {
        type: String,
        trim: true
    },
    distance: {
        type: Number,
        trim: true
    },
    weight: {
        type: Number,
        trim: true
    },
    sets: {
        type: Number,
        trim: true
    },
    reps: {
        type: Number,
        trim: true
    },
    duration: {
        type: Number,
        trim: true
    }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: Array
    
});
const Workout = mongoose.model("Workout",WorkoutSchema);

module.exports = Workout;

module.exports = {
    Workout: require('./workoutModel')
}

  
const express = require('express');
const router = new express.Router();
const db = require('../models');
const {Types: {ObjectId}} = require('mongoose');

router.get('/api/workouts/',(req,res)=>{
    db.Workout.find({})
    .then(workouts => {
        // console.log(workouts[0]);
        res.json(workouts);
    })
    .catch(err=>{
        res.json(err);
    })
});

router.put('/api/workouts/:id',(req,res)=>{
    const id = req.params.id;
    db.Workout.updateOne({"_id": ObjectId(id)}, {$push: {'exercises': req.body}})
    .then(update=>{
        // console.log(update);
        res.json(update);
    })
    .catch(err=>{
        res.json(err);
    })
});

router.post('/api/workouts',(req,res)=>{
    db.Workout.create(req.body)
    .then(success=>{
        res.json(success);
    })
    .catch(err=>{
        res.json(err);
    })
});

router.get('/api/workouts/range',(req,res)=>{
    db.Workout.find({})
    .then(result=>{
        res.json(result);
    })
    .catch(err=>{
        res.json(err);
    });
})

module.exports = router;