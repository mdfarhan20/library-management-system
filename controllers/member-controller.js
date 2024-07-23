const asyncHandler = require("express-async-handler");
const Member = require("../models/member-model");

const getMembers = asyncHandler(async (req, res) => {
  const members = await Member.find();
  res.status(200).json({ members });
});


const getMemberById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const member = await Member.findById(id);
  
  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }

  res.status(200).json({ member });
});


const addNewMember = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400);
    throw new Error("Insufficient Data");
  }

  const member = await Member.create({ name, email, borrowedBooks: [] });

  if (!member) {
    throw new Error("Member cannot be created");
  }

  res.status(201).json({ 
    message: "Member has been registered",
    member
  })
});


const updateMemberById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const member = await Member.findByIdAndUpdate(id, req.body, { new: true });

  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }

  res.status(200).json({
    message: "Member updated successfully",
    member
  })
});


const deleteMemberById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const member = await Member.findByIdAndDelete(id);

  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }

  res.status(200).json({
    message: "Member has been deleted",
    member
  });
});

module.exports = { getMembers, getMemberById, addNewMember, updateMemberById, deleteMemberById }


