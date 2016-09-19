var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/planetsex")
var Schema = mongoose.Schema

var planetSchema = new Schema({ 
  name: String
})

var visitorSchema = new Schema({ 
	name: String
})

var planetVisitorSchema = new Schema({
	planet: {type: Schema.Types.ObjectId, ref: 'VlanetModel'},
	visitor: {type: Schema.Types.ObjectId, ref: 'VisitorModel'}
})

var PlanetModel = mongoose.model("PlanetModel", planetSchema)
var VisitorModel = mongoose.model("VisitorModel", visitorSchema)
var PlanetVisitorModel = mongoose.model("PlanetVisitorModel", planetVisitorSchema)

var mars = new PlanetModel({name: "Mars"})
var venus = new PlanetModel({name: "Venus"})

var a = new VisitorModel({name: "Alfred"})
var b = new VisitorModel({name: "Barry"})
var c = new VisitorModel({name: "Chris"})
var d = new VisitorModel({name: "Donald"})

//run this setup code ONCE

/*mars.save()
venus.save()
a.save()
b.save()
c.save()
d.save()

function createPVrelationship(planet, visitor){
	var pvr = new PlanetVisitorModel({planet: planet, visitor: visitor})
	pvr.save()
}

var marsV = [a, b, c]
var venusV = [a,c,d]

for(v in marsV){
	createPVrelationship(mars, marsV[v])
}

for(v in venusV){
	createPVrelationship(venus, venusV[v])
}*/

PlanetModel.findOne({name:"Mars"}, function(err, mars){
	PlanetVisitorModel.find({planet:mars._id}, '-planet -_id -__v').populate('visitor', 'name -_id').exec(function(err, rel){
		console.log("got rel", rel)
	})
})

PlanetModel.findOne({name:"Mars"}, function(err, mars){
	PlanetVisitorModel.find({planet:mars._id}).populate('visitor').exec(function(err, rel){
		console.log("got rel", rel)
	})
})

