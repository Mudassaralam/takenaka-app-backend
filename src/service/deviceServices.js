const devices = require("../models/devices");

const newDevice = async (device) => {
  try {
    const createdDevice = await devices.create(device);
    if (!createdDevice)
      return { error: { message: "Not created, try again", code: 500 } };
    return { createdDevice };
  } catch (error) {
    console.log(error);
    return { error: { message: error, code: 500 } };
  }
};

const getDevices = async () => {
  try {
    const device = await devices.findAll({ where: { active: true } });
    if (!device)
      return { error: { message: "No device find, try again", code: 500 } };
    return { device };
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: "Something went wrong to find devices, try again",
        code: 500,
      },
    };
  }
};

const getDeviceById = async (id) => {
  try {
    const device = await devices.findAll({ where: { id, active: true } });
    if (!device)
      return {
        error: {
          message: "no device found against this id, try again",
          code: 500,
        },
      };
    return { device };
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: "Something went wrong to find device against id, try again",
        code: 500,
      },
    };
  }
};

const updateDevice = async (user, id) => {
  try {
    const updatedDevice = await devices.update(user, {
      where: { id, active: true },
    });
    if (!updatedDevice)
      return { error: { message: "Not updated, try again", code: 500 } };
    console.log(updatedDevice);
    return { updatedDevice };
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: "Something went wrong in update permission, try again",
        code: 500,
      },
    };
  }
};

const deleteDevice = async (id) => {
  try {
    const updatedDevice = await devices.update(
      { active: false },
      { where: { id } }
    );
    if (!updatedDevice)
      return { error: { message: "Not deleted, try again", code: 500 } };
    console.log(updatedDevice);
    return { updatedDevice };
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: "Something went wrong to delete device, try again",
        code: 500,
      },
    };
  }
};

module.exports = {
  newDevice,
  getDevices,
  getDeviceById,
  updateDevice,
  deleteDevice,
};
