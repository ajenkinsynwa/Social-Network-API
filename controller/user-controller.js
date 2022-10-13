const User = require('../models/User');

//Get ALL users 
const userController = {
  getAllUsers(req,res) {
    User.Find()
    .populate({
      path: ('thoughts'),
      select: ('-_v')
    })
    .select('_v')
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    });
  },
}



//Create User 
createUser ({body}, res) {
  User.create(body)
  .then(dbUserData => res.json(dbUserData))
  .catch(err => res.status(400).json(err));
}

//update User 
updateUser({ params, body}, res) {
  User.findOneAndUpdate({ _id: params.id}, body), body, 
  { new: true, runtheValidators: true}
  .then(dbUserData => {
    if (!dbUserDate) {
      res.status(404).json({message: 'No User Found With This Id'})
      return; 
    }
      res.json(dbUserData);

    })
    .catch(err => res.json(err))

  },

  deleteUser ({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({message: 'No User Found With This Id'});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err =>status(400).json(err))
  },

  getUserbyId({params}, res) {
    User.findOne({ _id: params.id})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .populate ({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    });
  }

  module.exports = userController
  
