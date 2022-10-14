const { Thought, User } = require('../models')

//Get All Thoughts
const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
    .populate({
      path: 'user',
      select: '__v'
    })
    .select('__v')
    .sort({_id: -1})
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
  },

//Get Thought By ID
getThoughtById ({ params }, res) {
  Thought.findOne({ _id: params.id })
  .populate({
    path: 'user',
    select: '-__v'
  })
}
}