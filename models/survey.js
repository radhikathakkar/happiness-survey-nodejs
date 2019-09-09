var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var questionSchema = new Schema({
  id:String,
  questionText: String,
  questionType: String
});

var assigneesSchema = new Schema({
  _id: { type: ObjectId, ref: 'users' },
  response: [
    {
      questionID: String,
      response: Number
    }
  ]
});

var surveySchema = new Schema({
  ownerID: String,
  title: String,
  questions: [questionSchema],
  assignees: [assigneesSchema]
});


var Survey = mongoose.model('surveys', surveySchema);
module.exports = Survey;