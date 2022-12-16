const ObjectId = require('mongoose').Types.ObjectId;
const Question = require('../models/questions');

exports.list = async (req, res) => {
  await Question.find({}).exec(function(err, docs) {
    res.status(200).json(docs);
  });
}

exports.listarQuestions = async (req, res) => {
  await Question.find({}).exec(function(err, docs) {
    res.render('visualizarQuestoes', { questions: docs, msg: res.msg });
  });
}

exports.show = (req, res) => {
  res.send(`NÃO IMPLEMENTADO: ${req.params.id}`);
}

exports.create = (req, res) => {
  if (req.method == "POST") {
    const questionDocument = new Question({
      title: req.body.title,
      a: req.body.a,
      b: req.body.b,
      c: req.body.c,
      d: req.body.d,
      color: req.body.color,
      answer: req.body.answer,
    });
    questionDocument
      .save()
      .then(result => {
        res.redirect("/questoes");
        console.log("1")
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  } else {
    res.redirect('/questoes');
  }

}

exports.update = async (req, res) => {
  if (req.method == "POST") {
    const filter = { _id: new ObjectId(req.body.id) };
    console.log(filter);
    const update = {
      photo: req.body.photo
    };
    console.log(update);
    await Publication.findOneAndUpdate(filter, update).then(function(err, result) {
      console.log(req.body.photo);
      msg = "Postagem atualizada com sucesso!";
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
  await Question.findOneAndDelete({ _id: new ObjectId(req.params.questionId) }).then(function(err, data) {
    res.redirect('/visualizarQuestoes')
  });
}
