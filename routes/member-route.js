const express = require("express");
const { 
  getMembers,
  getMemberById,
  addNewMember,
  updateMemberById,
  deleteMemberById
} = require("../controllers/member-controller");

const router = express.Router();

router.route("/")
  .get(getMembers)
  .post(addNewMember)

router.route("/:id")
  .get(getMemberById)
  .put(updateMemberById)
  .delete(deleteMemberById)

module.exports = router;