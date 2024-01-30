import clientPromise from "./db";
export async function setUpDb(db) {
  db.collection("users").createIndex({ email: 1 }, { unique: true });
}

export default async function database(req, res, next) {
  try {
    const client = await clientPromise;
    if (client) {
      // await setUpDb(client.db());
      req.dbClient = client;
      req.db = client.db();
      // console.log(client, "clientssss");
      // console.log("reqqqq", req);
      // console.log(res, "resss");
    } else {
      res.status(500).send("Could not connect to database.");
    }
    // console.log(next(), "sss", next());
    return next();
  } catch (err) {
    console.log("***database middleware error | ", err);
    return next();
  }
}
