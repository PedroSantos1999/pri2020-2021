var Casamentos = require('../models/casamentos');

module.exports.list = () => {
    return Casamentos.find({}, {
        "_id": 0,
        "date": 1,
        "title": 1,
        "id": 1
    }).exec()
}

module.exports.consult = id => {
    return Casamentos.findOne({id: id}).exec()
}

module.exports.consultByName = title => {
    return Casamentos.find({
        title: title
    }, {
        "_id": 0,
        "date": 1,
        "title": 1,
        "id": 1
    }).exec()
}

module.exports.consultByYear = date => {
    return Casamentos.find({
        date: {
            $gte: date
        }
    }, {
        "_id": 0,
        "date": 1,
        "title": 1,
        "id": 1
    }).exec()
}

module.exports.consultListByYear = date => {
    return Casamentos.aggregate(([
        {
            $unwind: "$date"
        }, {
            $match: {
                date: date
            }
        }, {
            "_id": 0,
            "title": 1,
            "id": 1
        }
    ])).exec()
}

module.exports.listMarriages = () => {
    return Casamentos.distinct("title").sort().exec()
}