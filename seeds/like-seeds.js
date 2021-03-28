const { Like } = require('../models');

const likedata = [
  {
    user_id: 10,
    comment_id: 2
  },
  {
    user_id: 6,
    comment_id: 10
  },
  {
    user_id: 5,
    comment_id: 11
  },
  {
    user_id: 6,
    comment_id: 1
  },
  {
    user_id: 9,
    comment_id: 18
  },
  {
    user_id: 6,
    comment_id: 15
  },
  {
    user_id: 6,
    comment_id: 7
  },
  {
    user_id: 6,
    comment_id: 4
  },
  {
    user_id: 1,
    comment_id: 16
  },
  {
    user_id: 10,
    comment_id: 18
  },
  {
    user_id: 4,
    comment_id: 10
  },
  {
    user_id: 10,
    comment_id: 5
  },
  {
    user_id: 5,
    comment_id: 16
  },
  {
    user_id: 6,
    comment_id: 17
  },
  {
    user_id: 1,
    comment_id: 15
  },
  {
    user_id: 7,
    comment_id: 13
  },
  {
    user_id: 6,
    comment_id: 3
  },
  {
    user_id: 6,
    comment_id: 13
  },
  {
    user_id: 7,
    comment_id: 1
  },
  {
    user_id: 4,
    comment_id: 15
  },
  {
    user_id: 2,
    comment_id: 18
  },
  {
    user_id: 9,
    comment_id: 10
  },
  {
    user_id: 10,
    comment_id: 15
  },
  {
    user_id: 8,
    comment_id: 1
  }
];

const seedVotes = () => Like.bulkCreate(likedata);

module.exports = seedVotes;
