const { Sequelize } = require("sequelize");
const branch_logs = require("../models/branches_logs");

const newBranch_logs = async (branch_log) => {
  try {
    const createdBranch_logs = await branch_logs.create(branch_log);
    if (!createdBranch_logs)
      return {
        error: { message: "branch_logs not created, try again", code: 500 },
      };
    return { createdBranch_logs };
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: "Something went wrong to create branch_logs, try again",
        code: 500,
      },
    };
  }
};

const getBranch_logs = async () => {
  try {
    const Branch_log = await branch_logs.findAll();
    if (!Branch_log)
      return {
        error: {
          message: "Nothing found in branch_logs, try again",
          code: 500,
        },
      };
    return { Branch_log };
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: "Something went wrong to found branch_logs, try again",
        code: 500,
      },
    };
  }
};
const getBranch_logsById = async (id) => {
  try {
    const Branch_log = await branch_logs.findAll({ where: { id } });
    if (!Branch_log)
      return {
        error: {
          message: "no branch_logs found against this id, try again",
          code: 500,
        },
      };
    return { Branch_log };
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: "Something went wrong to found branch against id, try again",
        code: 500,
      },
    };
  }
};
const getBranch_logsByUser_id = async (id) => {
  try {
    const Branch_log = await branch_logs.findAll({ where: { userId: id } });
    if (!Branch_log)
      return {
        error: {
          message: "no branch_logs found against this id, try again",
          code: 500,
        },
      };
    return { Branch_log };
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: "Something went wrong to found branch against id, try again",
        code: 500,
      },
    };
  }
};

const deleteBranch_logs = async (id) => {
  try {
    const updatedBranch_logs = await branch_logs.destroy({
      where: { userId: id },
    });
    if (!updatedBranch_logs)
      return {
        error: { message: "Not deleted branch_logs, try again", code: 500 },
      };
    console.log(updatedBranch_logs);
    return { updatedBranch_logs };
  } catch (error) {
    console.log(error);
    return {
      error: {
        message: "Something went wrong to delete branch, try again",
        code: 500,
      },
    };
  }
};

module.exports = {
  deleteBranch_logs,
  getBranch_logsByUser_id,
  getBranch_logsById,
  getBranch_logs,
  newBranch_logs,
};
