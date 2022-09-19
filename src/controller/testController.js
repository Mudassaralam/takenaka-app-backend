const testServices = require("../service/testService");


const { v4 } = require("uuid");
const uuid = v4;

 const newTest = async (req, res) =>{
   const {id,firstName, lastName, gender,country, age, date } = req.body;
   try{
       const company = {
           id ,
           firstName,
           lastName,
           gender,
           country,
           age,
           date,

       }
    const resp = await testServices.createTest(company);
    if(resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp)
    res.status(200).send(  resp.createdUser );
   }
   catch(err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = {newTest}
  