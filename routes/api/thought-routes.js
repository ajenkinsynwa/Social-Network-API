const { getAllThoughts, createThought, getThoughtById, updateThought, deleteThought } = require('../../controller/thought-controller');

const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  addReaction,
  updateThought,
  deleteThought,
  removeReaction
} 
= require ('../../controller/thought-controller')

router
.route ('/')
.get(getAllThoughts)
.post(createThought)

router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

router
.route('/:thoughtId/reactions')
.post(addReaction)

router
.route('/:thoughtId/:reactionId')
.delete(removeReaction)

module.exports = router;
