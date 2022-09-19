const companyServices = require("../service/companyServices");
const branchServices = require("../service/branchServices");
const branch_logServices = require("../service/branch_logServices");


const { v4 } = require("uuid");
const uuid = v4;

const createBranch = async (req, res) => {
  const { name,code } = req.body;
  try {
    const company = await companyServices.getCompanies();
    if (!company)
      return res.status(company.error.code).send(company.error.message);

    const branch = {
      id: uuid(),
      name: name,
      code,
      companyId: company.Company[0].id,
    };
    const resp = await branchServices.newBranches(branch);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp.createdBranch);
    res.status(200).send(resp.createdBranch);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const getBranches = async (req, res) => {
  try {
    const resp = await branchServices.getBranches();
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp.Branch);
    let state = resp.Branch;
    let Arr = [];

    for (let i = 0; i < state.length; i++) {

        console.log(state[0])
        let cityName = state[i].name;
        let cityCode = state[i].id;
        Arr.push({value: cityCode, label:cityName});
     
    }
    console.log(Arr)
    res.status(200).send(Arr);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const getBranchById = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await branchServices.getBranchById(id);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp.Branch);
    res.status(200).send(resp.Branch);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const company = {
      name: name,
    };
    const resp = await branchServices.updateBranch(company, id);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp);
    const resp1 = await branchServices.getBranchById(id);
    if (resp1.error)
      return res.status(resp1.error.code).send(resp1.error.message);
    res.status(200).send(resp1.Branch);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await branchServices.deleteBranch(id);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp);
    res.status(200).send("Deleted Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Someth ing went wrong. Please try again");
  }
};

const Getcities = async (req, res) => {
  try {
    const { city } = req.body;
    let Country = require("country-state-city").Country;
    let City = require("country-state-city").City;

    // console.log(Country.getAllCountries()[0]);
    let state = City.getAllCities();
    let Arr = [];

    for (let i = 0; i < state.length; i++) {
      if (state[i].countryCode === city) {
        console.log(state[0])
        let cityName = state[i].name;
        let cityCode = state[i].stateCode;
        Arr.push({value: cityName, label:cityName});
      }
    }

    console.log(Arr);
    res.status(200).send(Arr);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};
const getBranchesByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    let resp8;
        resp8 = await branch_logServices.getBranch_logsByUser_id(
          id
        );
        if (resp8.error)
          return res.status(resp8.error.code).send(resp8.error.message);
          console.log(resp8.Branch_log)
        let Arr = [];
        for (j = 0; j < resp8.Branch_log.length; j++) {
          // let branches = await branchServices.getBranchById(
          //   resp8.Branch_log[j].branchId
          // );
          // if (branches.error)
          //   return res.status(branches.error.code).send(branches.error.message);
          console.log(j)
          Arr.push(resp8.Branch_log[j].branchId);
        }
        res.status(200).send(Arr);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = {
  createBranch,
  getBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
  Getcities,
  getBranchesByUserId
};
