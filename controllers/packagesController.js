const ObjectId = require('mongoose').Types.ObjectId;
const Package = require('../models/packages');

exports.list = async (req, res) => {
  await Package.find({}).exec(function(err, docs) {
    res.status(200).json(docs);
  });
}

exports.listarPackages = async (req, res) => {
  await Package.find({}).exec(function(err, docs) {
    res.render('visualizarPacotes', { users: docs, msg: res.msg });
  });
}

exports.show = (req, res) => {
  res.send(`NÃO IMPLEMENTADO: ${req.params.id}`);
}

exports.create = (req, res) => {
  if (req.method == "POST") {
    const PackageDocument = new Package({
      imagem: req.body.imagem,
      titulo: req.body.titulo,
      desconto: req.body.desconto,
      precoAtual: req.body.precoAtual,
      precoAntigo: req.body.precoAntigo,
    });
    PackageDocument
      .save()
      .then(result => {
        res.redirect("/pacotes");
        console.log("1")
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  } else {
    res.redirect('/pacotes');
  }

}

exports.update = async (req, res) => {
  if (req.method == "POST") {
    const filter = { _id: new ObjectId(req.body.id) };
    console.log(filter);
    const update = {
      imagem: req.body.imagem
    };
    console.log(update);
    await Package.findOneAndUpdate(filter, update).then(function(err, result) {
      console.log(req.body.password);
      msg = "Pacote atualizado com sucesso!";
      // res => response => resposta 
      res.msg = msg;
      exports.list(req, res);
    });
  } else {
    await Package.findOne({ _id: new ObjectId(req.params.userId) }).then(function(result) {
      //console.log(result);
      res.render(`packages/update`, { doc: result });
    })
  }
}

exports.delete = async (req, res) => {
  await Package.findOneAndDelete({ _id: new ObjectId(req.params.userId) }).then(function(err, data) {
    res.redirect('/visualizarPacotes')
  });
}
