const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/users');

exports.list = async (req, res) => {
  await User.find({}).exec(function(err, docs) {
    res.status(200).json(docs);
  });
}

exports.listarUsers = async (req, res) => {
  await User.find({}).exec(function(err, docs) {
    res.render('visualizarUsuarios', { users: docs, msg: res.msg });
  });
}

exports.show = (req, res) => {
  res.send(`NÃO IMPLEMENTADO: ${req.params.id}`);
}

exports.create = (req, res) => {
  if (req.method == "POST") {
    const UserDocument = new User({
      email: req.body.email,
      password: req.body.password,
    });
    UserDocument
      .save()
      .then(result => {
        res.redirect("/usuarios");
        console.log("1")
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  } else {
    res.redirect('/usuarios');
  }

}

exports.update = async (req, res) => {
  if (req.method == "POST") {
    const filter = { _id: new ObjectId(req.params.userId) };
    //console.log(filter);
    const update = {
      password: req.body.password
    };
    //console.log(update);
    await User.findOneAndUpdate(filter, update).then(function(err, result) {
      console.log(err);
      console.log(req.body.password);
      msg = "Postagem atualizada com sucesso!";
      console.log(msg);
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
  await User.findOneAndDelete({ _id: new ObjectId(req.params.userId) }).then(function(err, data) {
    res.redirect('/visualizarUsuarios')
  });
}
