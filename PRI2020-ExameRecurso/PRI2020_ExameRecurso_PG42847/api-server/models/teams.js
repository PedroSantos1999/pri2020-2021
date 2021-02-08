const mongoose = require('mongoose')

var membersSchema = new mongoose.Schema([{
    id: String,
    name: String,
    course: String,
    scores: [Int],
}])

var teamSchema = new mongoose.Schema({
    _id: String,
    guide: String,
    team: String,
    pitch1: Boolean,
    pitch2: Boolean,
    techPitch: Boolean,
    businessReport: Boolean,
    techReport: Boolean,
    members: membersSchema
  })

module.exports = mongoose.model('casamentos', teamSchema)