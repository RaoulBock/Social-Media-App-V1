const mongoose = require("mongoose");

/**
 * Clocking data will contain biomatrics timestamps on
 * in conjunction with additive information associated to the
 * user under clocking authentication.
 *
 * - First we will identify the employee by means of user_id lookups.
 * - Than we will mapp the user to access groups,
 * - and finally to a given shift.
 *
 * Additional aggrigate data well be handled at respective models associated
 * by object reference.
 */
const AccessSchema = new mongoose.Schema({
  // Maps back to the employees table.
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "employees",
  },
  // Time stamp associated with the clocking record.
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // Direction indicates enumeration of [IN: 0 and OUT: 1]
  direction: {
    type: Number,
    required: "Device serial is required!",
  },
  // Device serial indicates the serialized string received from the bio
  // metrics device.
  device_serial: {
    type: String,
    required: "Device serial is required!",
  },
  // Productive zones are series of serialized sequences which we will map
  // back to for reporting purposes.
  productive_zone: {
    tyoe: String,
    required: "Productive zone is required!",
  },
  // Shift rules as per employee shift criteria.
  access_shifts: {
    type: mongoose.Schema.ObjectId,
    ref: "employees",
  },
  // Descriptive object for clicking metadata.
  descriptives: Object,
});

/**
 * Keeps a down-wards propicated record of employee clocking.
 */
const ClockingSchema = new mongoose.Schema({
  // User points to an employee and emplies the use of access device.
  user: { type: mongoose.Schema.ObjectId, ref: "company_employees" },
  // Terminated emplies that the given employees' contract was ended.
  terminated: {
    type: Boolean,
    default: false,
  },
  // Access history reviels the employees clocking activity.
  access_history: [{ type: mongoose.Schema.ObjectId, ref: "clocking" }],
});

/**
 * Default exports.
 */
module.exports = {
  accessSchema: mongoose.model("access_records", AccessSchema),
  clockingSchema: mongoose.model("clocking", ClockingSchema),
};
