const { Sequelize, DataTypes } = require("sequelize");

// console.log(DATABASE_NAME);
const sequelize = new Sequelize('nodemysql', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  // logging: false,
  // pool: { max: 5, min: 0, idle: 10000 },
});

sequelize
  .authenticate()
  .then(() => {
    console.log(' 🚀 Connected to Database 🚀')
  })
  .catch((err) => {
    // console.log('Could Not Connect to Database')
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// db.backup = require("./backup")(sequelize, DataTypes);
// db.reporting = require("./reporting")(sequelize, DataTypes);
db.User = require("./model/User")(sequelize, DataTypes);
// db.groups = require("./groups")(sequelize, DataTypes);
// db.scheduleBackup = require("./scheduleBackup")(sequelize, DataTypes);
// db.siems = require("./siems")(sequelize, DataTypes);
// db.alarms = require("./alarms")(sequelize, DataTypes);
// db.closingReasons = require("./closingReasons")(sequelize, DataTypes);
// db.smtps = require("./smtps")(sequelize, DataTypes);
// db.sla = require("./sla")(sequelize, DataTypes);
// db.thirdPartyIntegrations = require("./thirdPartyIntegrations")(sequelize,DataTypes);
// db.midware = require("./midware")(sequelize,DataTypes);
// db.userTypes = require("./userTypes")(sequelize, DataTypes);
// db.backupDetails = require("./backupDetails")(sequelize, DataTypes);
// db.caseCategorys = require("./case/categorys")(sequelize, DataTypes);
// db.impactedAssets = require("./impacteAssets")(sequelize, DataTypes);
// db.ti_report = require("./ti_reports/reporting")(sequelize, DataTypes);
// db.ti_iocs = require("./ti_reports/iocs")(sequelize, DataTypes);
// db.ti_cves = require("./ti_reports/cves")(sequelize, DataTypes);
// db.affected_products = require("./ti_reports/affectedProducts")(
//   sequelize,
//   DataTypes
// );
// db.cases = require("./case/cases")(sequelize, DataTypes);
// db.assets = require("./assets")(sequelize, DataTypes);
// db.sessions = require("./sessions")(sequelize, DataTypes);
// db.activityLogs = require("./activityLogs")(sequelize, DataTypes);
// db.license = require("./license")(sequelize, DataTypes)
// db.case_comments = require("./case/case_comments")(sequelize, DataTypes);
// db.ti_report_comments = require("./ti_reports/comments")(sequelize, DataTypes);
// db.ti_source = require("./ti_source")(sequelize, DataTypes);
// db.additionalSummaries = require("./additionalSummaries")(sequelize, DataTypes);
// db.proxyConf = require("./proxy")(sequelize, DataTypes);
// db.seimAuth = require("./seimAuth")(sequelize, DataTypes);
db.sequelize
  .sync() //{force:true}==>table agr hoga to usko dubara create krdega pehla wala delete krky
  .then(() => {});

module.exports = db;
