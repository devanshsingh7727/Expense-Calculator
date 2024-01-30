import nextConnect from "next-connect";
import middleware from "../../middleware/middleware";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const data = await req.db.collection("planets").find().toArray();
    // console.log(req.db);
    return res.status(200).json({ message: "Data found", data });
  } catch (err) {
    res.status(500).send("Internal server error!!!");
  }
});
export default handler;
