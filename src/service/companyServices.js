const {Sequelize} = require('sequelize');
const comapnies = require('../models/companies')

const newCompany = async(company) => {
    try {
        const createdCompany = await comapnies.create(company);
        if(!createdCompany) return {error: {message: "Not created, try again", code: 500}};
        return {createdCompany};
    } catch (error) {
        console.log(error);
        return {error: {message: error , code: 500}};
    }
};

const getCompanies = async() => {
    try {
        const Company = await comapnies.findAll({where:{active: true}});
        if(!Company) return {error: {message: "No company find, try again", code: 500}};
        return {Company};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong to find companies, try again", code: 500}};
    }
};
const getCompanyById = async(id) => {
    try {
        const Company = await comapnies.findAll({where:{id, active: true}});
        if(!Company) return {error: {message: "no company found against this id, try again", code: 500}};
        return {Company};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong to find company against id, try again", code: 500}};
    }
};

const updateCompany = async(user, id) => {
    try {
        const updatedCompany = await comapnies.update( user , {where: { id, active: true}});
        if(!updatedCompany) return {error: {message: "Not updated, try again", code: 500}};
        console.log(updatedCompany);
        return {updatedCompany};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong in update company, try again", code: 500}};
    }
};

const deleteCompany = async( id) => {
    try {
        const updatedCompany = await comapnies.update( {active: false} , {where: { id}});
        if(!updatedCompany) return {error: {message: "Not deleted, try again", code: 500}};
        console.log(updatedCompany);
        return {updatedCompany};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong to delete comapny, try again", code: 500}};
    }
};

module.exports = {
    newCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
}