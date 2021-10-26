
const userModel = require("../src/models/VehicleModel");

const getallvehicledetails = async function (req, res) {
  try{ 
    let a=req.params.id;
    userModel.find({},function(err,result){
      if(!err){
        res.send(result);
      }
})
  }
  catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}
module.exports = getallvehicledetails;
