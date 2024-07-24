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
router.post("/borrow", createNewRecord)
router.put("/return", returnBook);

router.route("/:id")
  .put(updateRecordById)
  .delete(deleteRecordById)



module.exports = router;