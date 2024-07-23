const express = require("express");
const { 
  getRecords,
  createNewRecord,
  returnBook,
  updateRecordById,
  deleteRecordById
} = require("../controllers/records-controller");

const router = express.Router();

router.get("/", getRecords);
router.route("/:id")
  .put(updateRecordById)
  .delete(deleteRecordById)

router.post("/borrow", createNewRecord)
router.put("/return", returnBook);


module.exports = router;