const companies = require("./companies");
const branches = require("./branches");
const roles = require("./roles");
const users = require("./users");
const projects = require("./projects");
const devices = require("./devices");
const clients = require("./clients")
const utils = require("./utils")
const role_permissions = require("./role_permissions")
const permissions = require("./permissions")
const login_logs = require("./login_logs")
const positions = require("./positions")
const phenomenons = require("./phenomenon")
const wbs = require("./wbs")
const issues = require("./issues")
const qpis = require("./qpis")
const attachments = require("./attachments")
const mapping = require("./mapping")
const branch_logs = require("./branches_logs")
const test = require("./test")

companies.hasMany(branches, {
  foreignkey: "company_id",
});

branches.hasMany(users, {
  foreignkey: "branch_id",
});

roles.hasMany(users, {
  foreignkey: "role_id",
});

users.hasMany(projects, {
  foreignkey: "user_id",
});

branches.hasMany(projects, {
    foreignkey: "branch_id",
  });

users.hasOne(devices, {
    foreignkey: "user_id",
  });

  users.hasMany(utils, {
    foreignkey: "user_id",
  });

  roles.hasMany(role_permissions, {
    foreignkey: "role_id",
  });

  permissions.hasMany(role_permissions, {
    foreignkey: "permission_id",
  });

  // clients.hasMany(projects, {
  //   foreignkey: "client_id",
  // });

  users.hasMany(login_logs, {
    foreignkey: "user_id",
  });

  devices.hasMany(login_logs, {
    foreignkey: "device_id",
  });

  users.hasMany(issues, {
    foreignkey: "user_id",
  });

  projects.hasMany(issues, {
    foreignkey: "project_id",
  });

  branches.hasMany(issues, {
    foreignkey: "branch_id",
  });

  clients.hasMany(issues, {
    foreignkey: "client_id",
  });

  users.hasMany(issues, {
    foreignkey: "assign",
  });

  users.hasMany(issues, {
    foreignkey: "cc",
  });

  users.hasMany(issues, {
    foreignkey: "responsibility",
  });

  positions.hasMany(issues, {
    foreignkey: "positions",
  });

  phenomenons.hasMany(issues, {
    foreignkey: "phenomenons",
  });

  wbs.hasMany(issues, {
    foreignkey: "wbs",
  });
  
  issues.hasMany(qpis,{
    foreignKey: 'issue_id'
  })

  issues.hasMany(attachments,{
    foreignKey: 'issue_id'
  })

  qpis.hasMany(attachments,{
    foreignKey: 'qpis'
  })

  users.hasMany(mapping, {
    foreignkey: "user_id",
  });

  users.hasMany(branch_logs, {
    foreignkey: "user_id",
  });

  branches.hasMany(branch_logs, {
    foreignkey: "branch_id",
  });

module.exports = {
  companies,
  branches,
  roles,
  users,
  projects,
  devices,
  clients,
  utils,
  login_logs,
  role_permissions,
  permissions,
  issues,
  positions,
  phenomenons,
  wbs,
  qpis,
  attachments,
  mapping,
  test
};
