import cors from "cors";
import nextConnect from "next-connect";
import database from "./database";
import session from "./session";

const middleware = nextConnect();
middleware
  .use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      optionsSuccessStatus: 200,
    })
  )
  .use(database)
  .use(session);

export default middleware;
