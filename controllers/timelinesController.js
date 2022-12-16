const ObjectId = require('mongoose').Types.ObjectId;
const Timeline = require('../models/timelines');

exports.list = async (req, res) => {
  await Timeline.find({}).exec(function(err, docs) {
    res.status(200).json(docs);
  });
}

exports.listarTimelines = async (req, res) => {
  await User.find({}).exec(function(err, docs) {
    res.render('visualizarCronogramas', { timelines: docs, msg: res.msg });
  });
}

exports.show = (req, res) => {
  res.send(`NÃO IMPLEMENTADO: ${req.params.id}`);
}

exports.create = (req, res) => {
  if (req.method == "POST") {
    const TimelineDocument = new Timeline({
      title: req.body.title,
      hour: req.body.hour,
      minute: req.body.minute,
      day: req.body.day,
    });
    timelineDocument
      .save()
      .then(result => {
        res.redirect("/cronogramas");
        console.log("1")
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  } else {
    res.redirect('/cronograma');
  }

}

exports.update = async (req, res) => {
  if (req.method == "POST") {
    const filter = { _id: new ObjectId(req.body.id) };
    console.log(filter);
    const update = {
      password: req.body.password
    };
    console.log(update);
    await User.findOneAndUpdate(filter, update).then(function(err, result) {
      console.log(req.body.password);
      msg = "Usuário atualizada com sucesso!";
      // res => response => resposta 
      res.msg = msg;
      exports.list(req, res);
    });
  } else {
    await User.findOne({ _id: new ObjectId(req.params.userId) }).then(function(result) {
      //console.log(result);
      res.render(`users/update`, { doc: result });
    })
  }
}

exports.delete = async (req, res) => {
  await Timeline.findOneAndDelete({ _id: new ObjectId(req.params.timelineId) }).then(function(err, data) {
    res.redirect('/visualizarCronogramas')
  });
}
