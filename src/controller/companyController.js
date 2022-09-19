const companyServices = require("../service/companyServices");


const { v4 } = require("uuid");
const uuid = v4;

 const createCompany = async (req, res) =>{
   const {name} = req.body;
   try{
       const company = {
           id : uuid(),
           name: name.toLowerCase()
       }
    const resp = await companyServices.newCompany(company);
    if(resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp)
    res.status(200).send({ company: resp.createdCompany });
   }
   catch(err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const getCompanies = async (req, res) =>{
  try{
      
   const resp = await companyServices.getCompanies();
   if(resp.error) return res.status(resp.error.code).send(resp.error.message);
   console.log(resp)
   res.status(200).send({ company: resp.Company });
  }
  catch(err) {
   console.error(err);
   res.status(500).send("Something went wrong. Please try again");
 }
};

const getCompanyById = async (req, res) =>{
  try{
   const {id} = req.params;
   const resp = await companyServices.getCompanyById(id);
   if(resp.error) return res.status(resp.error.code).send(resp.error.message);
   console.log(resp)
   res.status(200).send({ company: resp.Company[0] });
  }
  catch(err) {
   console.error(err);
   res.status(500).send("Something went wrong. Please try again");
 }
};

const updateCompany = async (req, res) =>{
  try{
    const {id} = req.params;
    const {name} = req.body;
    const company = {
      name: name.toLowerCase()
    }
    const resp = await companyServices.updateCompany(company, id);
    if(resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp)
    res.status(200).send({ company: resp.updatedCompany });
   }
   catch(err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
}

const deleteCompany = async (req, res) =>{
  try{
    const {id} = req.params;
    const resp = await companyServices.deleteCompany(id);
    if(resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp)
    res.status(200).send({ company: resp.updatedCompany });
   }
   catch(err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
}


module.exports = {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
}