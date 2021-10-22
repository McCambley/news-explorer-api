const Article = require('../models/article');

const getArticles = (req, res) => {
  res.send({ data: 'You did it!' });
  // still need to filter by user
  //   Article.find({})
  //     .then((articles) => {
  //       res.send({ data: articles });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
};

const createArticle = (req, res) => {
  res.send({ data: 'You did it!' });
  //   const { keyword, title, text, date, source, link, image } = req.body;
  //   Article.create({ keyword, title, text, date, source, link, image, owner: 'temp id' }).then(
  //     (article) => {
  //       res.send({ data: article }).catch((error) => {
  //         console.log(error);
  //       });
  //     }
  //   );
};

const deleteArticle = (req, res) => {
  res.send({ data: 'You did it!' });
  // delete card
};

module.exports = { getArticles, createArticle, deleteArticle };
