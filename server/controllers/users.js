import mongoose from 'mongoose'
import crypto from 'crypto'

const User = mongoose.model("User");
const algorithm = 'aes-256-cbc'; //Using AES encryption
var key = 'password';

const createUser = (req, res) => {
  var user = new User();

  var cipher = crypto.createCipher(algorithm, key);  
  var encrypted = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.password = encrypted;
  user.questions = req.body.questionsArr;
  user.role = req.body.role;

  User.findOne({ email: req.body.email },
    function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
          if (!data) {
            user.save((err, doc) => {
              if (!err) {
                  res.send(doc);
              } else {
                  console.log("Error during insert: " + err);
              }
            });
          } else {
            res.status(422).send({
              errMessage: 'User is aleady registered'
            })
          }
        }
  });

}

const loginUser = (req, res) => {

  var cipher = crypto.createCipher(algorithm, key);  
  var encrypted = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');

  User.findOne({ email: req.body.email, password: encrypted },
    function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
          if (!data) {
            res.status(422).send({
              errMessage: 'User Email or password is incorrect'
            })
          } else {
            res.send(data)
          }
        }
  });

}

const getUser = (req, res) => {
  User.findOne({ _id: req.params.id },
    function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
          res.send(data);
        }
  });

}

const getAllUser = (req, res) => {
  if(req.params.role === 'admin'){
    User.find(
      function (err, data) {
          if (err) {
              console.log(err);
          }
          else {
            res.send(data);
          }
    });
  } else{
    User.findOne({ email: req.params.email },
      function (err, data) {
          if (err) {
              console.log(err);
          }
          else {
            res.send([data]);
          }
    });
  }
 
}

const getQuestions = (req, res) => {
  User.findOne({ email: req.body.email },
    function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
          if(data && data._id){
            let questions = data.questions;
            let newQuestions = [];
            questions.map(item => {
              newQuestions.push({
                id: item.id,
                question: item.question
              })
            })
            res.send({data: newQuestions});
          } else{
            res.status(406).send({errMessage: 'This email is not registered with us'});
          }
        }
  });

}


const updatePassword = (req, res) => {
  User.findOne({ email: req.body.email },
    function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
          if(data && data._id){
            let questions = data.questions;
            let responseAnswers = req.body.questionsArr;
            let errMessage = false
            responseAnswers.map(item => {
              let que = questions.filter(q => q.id === item.id);
              if(que[0].answer !== item.answer){
                errMessage = true
              }
            })

            if(errMessage) {
              res.status(406).send({errMessage: 'Answer for security questions are not correct'});
            } else{
              var cipher = crypto.createCipher(algorithm, key);  
              var encrypted = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');

              User.updateOne({ _id: data._id },
                {
                  $set: { password: encrypted }
                },
                function (err, data) {
                  if (err) {
                      console.log(err);
                  }
                  else {
                    res.send({data: 'Password updated successfully!! Login to continue.'});
                  }
            }
              );
            }
            
          } else{
            res.status(406).send({errMessage: 'This email is not registered with us'});
          }
        }
  });

}

const changePassword = (req, res) => {
  User.findOne({ email: req.body.email },
    function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
          if(data && data._id){
              let cipher = crypto.createCipher(algorithm, key);  
              let decipher = crypto.createDecipher(algorithm, key);
              
              let decryptedPassword = decipher.update(data.password, 'hex', 'utf8') + decipher.final('utf8');

              let encryptedPassword = cipher.update(req.body.newPassword, 'utf8', 'hex') + cipher.final('hex');              

              if(decryptedPassword === req.body.oldPassword){
                User.updateOne({ _id: data._id },
                  {
                    $set: { password: encryptedPassword }
                  },
                  function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                      res.send({data: 'Password changed successfully!!'});
                    }
              }
                );
              } else{
                  res.status(406).send({errMessage: 'Existing Password is incorrect'});
              }
          } else{
            res.status(422).send({errMessage: 'Email is incorrect'});
          }
        }
  });
}


export {
    createUser,
    loginUser,
    getUser,
    getAllUser,
    getQuestions,
    updatePassword,
    changePassword
}


