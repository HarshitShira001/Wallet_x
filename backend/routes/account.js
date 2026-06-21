const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json({ balance: account.balance });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { amount, to } = req.body;
    const transferAmount = Number(amount);

    if (!transferAmount || transferAmount <= 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Invalid transfer amount" });
    }

    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Sender account not found" });
    }

    if (account.balance < transferAmount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Recipient account not found" });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -transferAmount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: transferAmount } }
    ).session(session);

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Transfer Successful!" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transfer error:", error);
    res.status(500).json({ message: "Transfer failed: " + error.message });
  }
});

module.exports = router;