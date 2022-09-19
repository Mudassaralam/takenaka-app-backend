const rolePermissions = require('../models/role_permissions')

const newRolePermission = async(role) => {
    try {
        const createdRolePermissions = await rolePermissions.create(role);
        if(!createdRolePermissions) return {error: {message: "Not created, try again", code: 500}};
        return {createdRolePermissions};
    } catch (error) {
        console.log(error);
        return {error: {message: error , code: 500}};
    }
};

const getRolePermissions = async() => {
    try {
        const rolePermissionsAll = await rolePermissions.findAll({where:{active: true}});
        if(!rolePermissionsAll) return {error: {message: "No role find, try again", code: 500}};
        return {rolePermissionsAll};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong to find roles, try again", code: 500}};
    }
};
const getRolePermissionsBYRoleId = async(roleId) => {
    try {
        const rolePermissionsById = await rolePermissions.findAll({where:{roleId,active: true}});
        if(!rolePermissionsById) return {error: {message: "No role find, try again", code: 500}};
        return {rolePermissionsById};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong to find roles, try again", code: 500}};
    }
};
const getRolePermissionById = async(id) => {
    try {
        const role = await rolePermissions.findAll({where:{id, active: true}});
        if(!role) return {error: {message: "no role found against this id, try again", code: 500}};
        return {role};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong to find role against id, try again", code: 500}};
    }
};
const deleteRolePermissionById = async( id) => {
    try {
        const updatedrole = await rolePermissions.destroy( {where: { id}});
        if(!updatedrole) return {error: {message: "Not deleted, try again", code: 500}};
        console.log(updatedrole);
        return {updatedrole};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong to delete comapny, try again", code: 500}};
    }
};

module.exports = {
    newRolePermission,
    getRolePermissions,
    getRolePermissionsBYRoleId,
    getRolePermissionById,
    deleteRolePermissionById
}