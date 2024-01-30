import nextConnect from "next-connect";
import middleware from "../../middleware/middleware";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    let date = new Date();
    const { id, name, email, image, provider } = req.body;

    const userLogin = await req.db.collection("users").findOne({ email });

    if (userLogin) {
      if (userLogin.provider == provider) {
        res.status(200).json({
          user: { ...userLogin },
        });
        return;
      } else {
        res.status(202).json({
          message:
            "This account is linked with " +
            userLogin.provider +
            " you are trying to login with " +
            provider +
            ". Try logging in with " +
            userLogin.provider +
            ".",
        });
      }
      return;
    }
    req.db
      .collection("users")
      .insertOne({
        email,
        name,
        image,
        provider,
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then((response) => {
        if (response.acknowledged) {
          req.db
            .collection("credentialsOnFile")
            .insertOne({
              userId: response.insertedId,
              provider,
              verified: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
            .then((mainres) => {
              let schemaLogin = {
                _id: response.insertedId,
                email,
                name,
                image,
                provider,
                verified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
              };
              res.status(200).json({
                user: { ...schemaLogin },
              });
            });
        }
      });
  } catch (err) {
    res
      .status(err && err?.responseCode ? err?.responseCode : 500)
      .json({ message: "Internal server error!!!", error: err });
  }
});

export default handler;
