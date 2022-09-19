const db = require("../config/db");
const { Sequelize } = require("sequelize");

const Qpis = db.define("qpis", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  headline: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  project_code: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  design_by: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  why_problem: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sub_constructor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  problem_no: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  qlty_lvl: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  info_no: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  occur_date: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  defect_group: {
    type: Sequelize.ENUM('position', 'phenomenon'),
    allowNull: true,
  },
  subsidary: {
   type: Sequelize.STRING,
   allowNull: true
  },
  issue_bey_date: {
    type: Sequelize.DATE,
    allowNull: true
   },
   build_use: {
    type: Sequelize.STRING,
    allowNull: true
   },
   complition_year: {
    type: Sequelize.DATE,
    allowNull: true
   },
   official_letter: {
    type: Sequelize.STRING,
    allowNull: true
   },
   affected_part: {
    type: Sequelize.STRING,
    allowNull: true
   },
   impact: {
    type: Sequelize.STRING,
    allowNull: true
   },
   warranty_work_application: {
    type: Sequelize.STRING,
    allowNull: true
   },
   work_description: {
    type: Sequelize.STRING,
    allowNull: true
   },
   malfunction_cause: {
    type: Sequelize.STRING,
    allowNull: true
   },
   measure_taken: {
    type: Sequelize.STRING,
    allowNull: true
   },
   measure_taken_att: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
   },
   who: {
    type: Sequelize.STRING,
    allowNull: true
   },
   what: {
    type: Sequelize.STRING,
    allowNull: true
   },
   how: {
    type: Sequelize.STRING,
    allowNull: true
   },
   app_number: {
    type: Sequelize.STRING,
    allowNull: true
   },
});

module.exports = Qpis;