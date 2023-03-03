const mongoose = require("mongoose");

/**
 * Access Groups are the joint which describes overtime mapping against the employees clocking.
 * With the given shift, we can discribe the total hours worked per day, the amount of undertime,
 * and perhaps some indication of the overtime with overlapping attendance beyond the descriptive
 * criteria.
 */
const AccessGroupSchema = new mongoose.Schema({
  // Short name of the given group.
  name: [{ type: mongoose.Schema.ObjectId, ref: "clocking" }],
  // Descriptive name of the given group.
  description: {
    type: Boolean,
    default: false,
  },
  // What are the weekly shift rules for the given group?
  shift_rules: [Object],
  // What are the work break rules for this group?
  work_breaks: [Object],
  // What are the target hours for this group?
  target_hours: [Object],
});

module.exports = {
  accessGroupsSchema: mongoose.model("access_groups", AccessGroupSchema),
};
