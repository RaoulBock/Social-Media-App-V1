const express = require("express");
const employeeCtrl = require("../controllers/employee.controller");

const router = express.Router();

router.route("/api/employees/list").get(employeeCtrl.listEmployees);

module.exports = router;
