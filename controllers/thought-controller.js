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
  .select('__v')
  .sort({_id: -1})
  .then(dbThoughtData => res.json(dbThoughtData))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
},

//Create Thought 
createThought({ params, body }, res) {
  Thought.create(body)
  .then(({_id}) => {
    return User.findOneAndUpdate(
      { username: body.username },
      { $push: { thoughts: _id} },
      { new: true }
    );
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No User Found With This UserName'})
      return;
    }
    res.json(dbUserData)
  })
  .catch(err => res.json(err));
},

//update a thought by ID 
updateThought({ params, body}, res) {
  Thought.findOneAndUpdate(
    { _id: params.id },
    body,
    { new: true, runValidators: true }
  )
  .then(updatedThought => {
    if (!updatedThought) {
      return res.status(404).json({message: 'No thought with this Id'});
    }

    res.json(updatedThought);
  })
  .catch(err => res.json(err));
},

//Delete A Thought By ID
deleteThought ({ params, body}, res) {
  Thought.findOneAndDelete({ _id: params.id})
  .then(deletedThought => {
   if (!this.deleteThought) {
    return res.status(404).json({ message: 'No thought with this Id' })
  }
  res.json(this.deleteThought);

})
.catch(err => res.json(err));
}
};

module.exports = thoughtController