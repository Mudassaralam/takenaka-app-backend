const {Sequelize} = require('sequelize');
const branches = require('../models/branches')

const newBranches = async(branch) => {
    try {
        const createdBranch = await branches.create(branch);
        if(!createdBranch) return {error: {message: "branch not created, try again", code: 500}};
        return {createdBranch};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong to create branch, try again", code: 500}};
    }
};

const getBranches = async() => {
    try {
        const Branch = await branches.findAll({where:{active: true}});
        if(!Branch) return {error: {message: "Nothing found in branches, try again", code: 500}};
        return {Branch};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong to found branches, try again", code: 500}};
    }
};
const getBranchById = async(id) => {
    try {
        const Branch = await branches.findAll({where:{id, active: true}});
        if(!Branch) return {error: {message: "no branch found against this id, try again", code: 500}};
        return {Branch};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong to found branch against id, try again", code: 500}};
    }
};

const getBranchByCode = async(code) => {
    try {
        const Branch = await branches.findOne({where:{code, active: true}});
        if(!Branch) return {error: {message: "Branch not existed, try again", code: 500}};
        return {Branch};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong to found branch against id, try again", code: 500}};
    }
};

const updateBranch = async(user, id) => {
    try {
        const updatedCompany = await branches.update( user , {where: { id, active: true}});
        if(!updatedCompany) return {error: {message: "not updated, try again", code: 500}};
        console.log(updatedCompany);
        return {updatedCompany};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong in update branch, try again", code: 500}};
    }
};

const deleteBranch = async( id) => {
    try {
        const updatedBranch = await branches.update( {active: false} , {where: { id}});
        if(!updatedBranch) return {error: {message: "Not deleted branch, try again", code: 500}};
        console.log(updatedBranch);
        return {updatedBranch};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong to delete branch, try again", code: 500}};
    }
};



module.exports = {
    newBranches,
    getBranches,
    getBranchById,
    updateBranch,
    deleteBranch,
    getBranchByCode
}