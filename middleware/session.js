import MongoStore from "connect-mongo";
import clientPromise from "./db";
import nextSession from "next-session";
import { promisifyStore } from "next-session/lib/compat";

const mongoStore = MongoStore.create({
  clientPromise: clientPromise,
  stringify: false,
});

const getSession = nextSession({
  store: promisifyStore(mongoStore),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 2 * 7 * 24 * 60 * 60, // 2 weeks,
    path: "/",
    sameSite: "strict",
  },
  touchAfter: 1 * 7 * 24 * 60 * 60, // 1 week
});

export default async function session(req, res, next) {
  await getSession(req, res);
  console.log("test");
  next();
}
