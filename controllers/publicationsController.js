const ObjectId = require('mongoose').Types.ObjectId;
const Publication = require('../models/publications');

exports.list = async (req, res) => {
  await Publication.find({}).exec(function(err, docs) {
    res.status(200).json(docs);
  });
}

exports.listarPublications = async (req, res) => {
  await Publication.find({}).exec(function(err, docs) {
    res.render('visualizarPostagens', { publications: docs, msg: res.msg });
  });
}

exports.show = (req, res) => {
  res.send(`NÃO IMPLEMENTADO: ${req.params.id}`);
}

exports.create = (req, res) => {
  if (req.method == "POST") {
    const publicationDocument = new Publication({
      photo: req.body.photo,
      author: req.body.author,
      avatar: req.body.avatar,
      date: req.body.date,
      type: req.body.type,
      like: req.body.like,
      comment: req.body.comment,
      caption: req.body.caption
    });
    publicationDocument
      .save()
      .then(result => {
        res.redirect("/postagens");
        console.log("1")
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  } else {
    res.redirect('/postagens');
  }

}

exports.update = async (req, res) => {
  if (req.method == "POST") {
    const filter = { _id: new ObjectId(req.params.publicationId) };
    //console.log(filter);
    const update = {
      photo: req.body.photo
    };
    //console.log(update);
    await Publication.findOneAndUpdate(filter, update).then(function(err, result) {
      console.log(err);
      console.log(req.body.photo);
      msg = "Postagem atualizada com sucesso!";
      console.log(msg);
      // res => response => resposta 
      res.msg = msg;
      exports.list(req, res);
    });
  } else {
    await Publication.findOne({ _id: new ObjectId(req.params.publicationId) }).then(function(result) {
      //console.log(result);
      res.render(`publications/update`, { doc: result });
    })
  }
}

exports.delete = async (req, res) => {
  await Publication.findOneAndDelete({ _id: new ObjectId(req.params.publicationId) }).then(function(err, data) {
    res.redirect('/visualizarPostagens');
  });
}
