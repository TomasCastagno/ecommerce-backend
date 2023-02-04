const PurchaseService = require("../services/purchase.service");
const purchaseMail = require("../templates/purchase.mail");
const transporter = require("../utils/mailer");
require("dotenv").config();

const purchaseCart = async (req, res) => {
  try {
    const { id } = req.user;
    const result = await PurchaseService.purchase(id);
    if (result) {
      await transporter.sendMail({
        to: req.user.email,
        from: process.env.MAIL,
        subject: "purchase confirmation #12345",
        html: purchaseMail,
      });
      res
        .status(200)
        .json({ message: "the purchase has been successfully completed" });
    } else {
      res
        .status(401)
        .json({ message: "Something is wrong with the send mail." });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getPurchases = async (req, res) => {
  try {
    const { id } = req.user;
    const result = await PurchaseService.getAll(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  purchaseCart,
  getPurchases,
};
