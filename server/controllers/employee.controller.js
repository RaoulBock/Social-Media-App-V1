const Employee = require("../models/employee.model");
const errorHandler = require("../helpers/dbErrorHandler");

const create = async (req, res) => {
  let newEmployee = {
    company: req.company,
    access_group: req.access_group,
    display_name: req.display_name,
    employee_code: req.employee_code,
    first_name: req.first_name,
    last_name: req.last_name,
    email: req.email,
    target_device_list: req.target_device_list,
  };
  newEmployee.lessonStatus = req.course.lessons.map((lesson) => {
    return { lesson: lesson, complete: false };
  });
  const model = new Employee(newEmployee);
  try {
    let result = await model.save();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/**
 * Extract a list of all employees.
 */
const listEmployees = async (req, res) => {
  try {
    let list = await Employee.find({})
      .populate("company", "_id name description country_code default_group")
      .populate(
        "company",
        "_id name description shift_rules work_breaks target_hours"
      );

    return res.json(list);
  } catch (err) {
    return res.status("401").json({
      error: "Cannot list employees at this time.",
    });
  }
};

module.exports = {
  create,
  listEmployees,
};
