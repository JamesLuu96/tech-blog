const { Post } = require('../models');

const postdata = [
  {
    post_title: 'Testing',
    post_text: 'Donec posuere metus vitae ipsum.',
    user_id: 10
  },
  {
    post_title: 'Testing',
    post_text: 'Morbi non quam nec dui luctus rutrum.',
    user_id: 8
  },
  {
    post_title: 'Testing',
    post_text: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    user_id: 1
  },
  {
    post_title: 'Testing',
    post_text: 'Nunc purus.',
    user_id: 4
  },
  {
    post_title: 'Testing',
    post_text: 'Pellentesque eget nunc.',
    user_id: 7
  },
  {
    post_title: 'Testing',
    post_text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    user_id: 4
  },
  {
    post_title: 'Testing',
    post_text: 'In hac habitasse platea dictumst.',
    user_id: 1
  },
  {
    post_title: 'Testing',
    post_text: 'Morbi non quam nec dui luctus rutrum.',
    user_id: 1
  },
  {
    post_title: 'Testing',
    post_text: 'Duis ac nibh.',
    user_id: 9
  },
  {
    post_title: 'Testing',
    post_text: 'Curabitur at ipsum ac tellus semper interdum.',
    user_id: 5
  },
  {
    post_title: 'Testing',
    post_text: 'In hac habitasse platea dictumst.',
    user_id: 3
  },
  {
    post_title: 'Testing',
    post_text: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    user_id: 10
  },
  {
    post_title: 'Testing',
    post_text: 'Donec dapibus.',
    user_id: 8
  },
  {
    post_title: 'Testing',
    post_text: 'Nulla tellus.',
    user_id: 3
  },
  {
    post_title: 'Testing',
    post_text: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
    user_id: 3
  },
  {
    post_title: 'Testing',
    post_text:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
    user_id: 7
  },
  {
    post_title: 'Testing',
    post_text: 'In hac habitasse platea dictumst.',
    user_id: 6
  },
  {
    post_title: 'Testing',
    post_text: 'Etiam justo.',
    user_id: 4
  },
  {
    post_title: 'Testing',
    post_text: 'Nulla ut erat id mauris vulputate elementum.',
    user_id: 6
  },
  {
    post_title: 'Testing',
    post_text: 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    user_id: 7
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
