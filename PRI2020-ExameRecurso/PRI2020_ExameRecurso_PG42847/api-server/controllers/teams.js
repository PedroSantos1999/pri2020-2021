var Teams = require('../models/teams');

module.exports.listar = () => {
    return Teams.aggregate([
        {
            $project: {
                _id: 1,
                team: 1,
                pitch1: 1,
                pitch1: 1,
                techPitch: 1,
                businessReport: 1, 
                techReport: 1,
                nMembers: { $cond: { if: { $isArray: "$members" }, then: { $size: "$members" }, else: "NA"} }
            }
        }
    ])
    .exec()
}

module.exports.consultar = id => {
    return Compra.findOne({_id: id}).exec()
}

module.exports.consultarMember = idMember => {
    return Compra.findOne({id: idMember}).exec()
}

module.exports.insert = t => {
    var novo = new Teams(t)
    return novo.save()
}

module.exports.insertMember = (m, id) => {
    return Teams.updateOne(
        { _id: id }, 
        { $push: { members: m } }
    );
}

module.exports.remove = id => {
    return Teams.deleteOne({_id: id}).exec()
}

module.exports.removeMember = (idTeam, idMember) => {
    return Teams.updateOne(
        { _id: idTeam },
        { $pull: { "members" : { id: idMember } } }
    );
  }