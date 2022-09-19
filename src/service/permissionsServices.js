const permissions = require('../models/permissions')

const newPermission = async(permission) => {
    try {
        const createdPermission = await permissions.create(permission);
        if(!createdPermission) return {error: {message: "Not created, try again", code: 500}};
        return {createdPermission};
    } catch (error) {
        console.log(error);
        return {error: {message: error , code: 500}};
    }
};

const getPermissions = async() => {
    try {
        const Permission = await permissions.findAll({where:{active: true}});
        if(!Permission) return {error: {message: "No permission find, try again", code: 500}};
        return {Permission};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong to find permissions, try again", code: 500}};
    }
};
const getPermissionById = async(id) => {
    try {
        const Permission = await permissions.findAll({where:{id, active: true}});
        if(!Permission) return {error: {message: "no permission found against this id, try again", code: 500}};
        return {Permission};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong to find permission against id, try again", code: 500}};
    }
};

const updatePermission = async(user, id) => {
    try {
        const updatedPermission = await permissions.update( user , {where: { id, active: true}});
        if(!updatedPermission) return {error: {message: "Not updated, try again", code: 500}};
        console.log(updatedPermission);
        return {updatedPermission};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong in update permission, try again", code: 500}};
    }
};

const deletePermission = async( id) => {
    try {
        const updatedPermission = await permissions.update( {active: false} , {where: { id}});
        if(!updatedPermission) return {error: {message: "Not deleted, try again", code: 500}};
        console.log(updatedPermission);
        return {updatedPermission};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong to delete comapny, try again", code: 500}};
    }
};

module.exports = {
    newPermission,
    getPermissions,
    getPermissionById,
    updatePermission,
    deletePermission
}