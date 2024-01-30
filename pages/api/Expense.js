import nextConnect from "next-connect";
import middleware from "../../middleware/middleware";
import { ObjectID } from "mongodb";

const handler = nextConnect();

handler.use(middleware);
handler.get(async (req, res) => {
  try {
    const getResult = await req.db
      .collection("Expenses")
      .aggregate([
        {
          $match: {
            userId: ObjectID(req.query.id),
            deleted: false,
          },
        },
      ])
      .toArray();

    return res.status(201).json({
      message: "Product fetched Successfully",
      data: getResult,
    });
  } catch (err) {
    res.status(500).send("Internal server error!!!");
  }
});
handler.post(async (req, res) => {
  try {
    const expenseObject = req.body;
    expenseObject["userId"] = ObjectID(req.body.userId);
    expenseObject["deleted"] = false;

    const insertResult = await req.db
      .collection("Expenses")
      .insertOne(expenseObject);
    if (expenseObject.insertedCount === 0) {
      throw new Error("Failed to insert the new product");
    }
    return res.status(201).json({
      message: "Product added successfully",
      productId: insertResult.insertedId,
    });
  } catch (err) {
    res.status(500).send("Internal server error!!!");
  }
});
handler.put(async (req, res) => {
  try {
    const updateResult = await req.db
      .collection("Expenses")
      .updateOne(
        { id: req.body.id, userId: ObjectID(req.body.userId), deleted: false },
        { $set: { deleted: true } }
      );
    console.log("updateResult", updateResult);
    if (updateResult.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Expense not found or already marked as deleted." });
    }
    return res.status(200).json({
      message: "Product Updated",
    });
  } catch (err) {
    res.status(500).send("Internal server error!!!");
  }
});
export default handler;
