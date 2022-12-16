const ObjectId = require('mongoose').Types.ObjectId;
const About = require('../models/abouts');

exports.list = async (req, res) => {
  await About.find({}).exec(function(err, docs) {
    res.status(200).json(docs);
  });
}

exports.listarAbouts = async (req, res) => {
  await About.find({}).exec(function(err, docs) {
    res.render('visualizarSobre', { abouts: docs, msg: res.msg });
  });
}

exports.show = (req, res) => {
  res.send(`NÃO IMPLEMENTADO: ${req.params.id}`);
}

exports.create = (req, res) => {
  if (req.method == "POST") {
    const AboutDocument = new About({
      title: req.body.title,
      text: req.body.text,
      image: req.body.image,
    });
    AboutDocument
      .save()
      .then(result => {
        res.redirect("/sobre");
        console.log("1")
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  } else {
    res.redirect('/sobre');
  }

}

exports.update = async (req, res) => {
  if (req.method == "POST") {
    const filter = { _id: new ObjectId(req.body.id) };
    console.log(filter);
    const update = {
      image: req.body.image
    };
    console.log(update);
    await About.findOneAndUpdate(filter, update).then(function(err, result) {
      console.log(req.body.password);
      msg = "Card Sobre atualizada com sucesso!";
      // res => response => resposta 
      res.msg = msg;
      exports.list(req, res);
    });
  } else {
    await About.findOne({ _id: new ObjectId(req.params.userId) }).then(function(result) {
      //console.log(result);
      res.render(`about/update`, { doc: result });
    })
  }
}

exports.delete = async (req, res) => {
  await About.findOneAndDelete({ _id: new ObjectId(req.params.aboutId) }).then(function(err, data) {
    res.redirect('/visualizarSobre')
  });
}
