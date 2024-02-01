import { MongoClient } from "mongodb";

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

const uri = process.env.MONGODB_URI;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 30000,
  keepAlive: true,
};

let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}
// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// let cached = global.mongo;

// if (!cached) {
//   cached = global.mongo = { conn: null, promise: null };
// }

// export async function connectToDatabase() {

//   try {
//     if (cached.conn) {
//       return cached.conn;
//     }

//     if (!cached.promise) {
//       const opts = {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         connectTimeoutMS: 30000,
//         keepAlive: 1
//       };

//       cached.promise = MongoClient.connect(process.env.MONGODB_URI, opts)
//         .then(client => {
//          // console.log('*** MongoClient connect | ', client);
//           return {
//             client
//           };
//         })
//         .catch(error => {
//           console.log('*** MongoClient Error | ', error);
//           return null;
//         });
//     }
//     cached.conn = await cached.promise;
//     return cached.conn;
//   } catch (error) {
//     console.log('*** connectToDatabase() error', error);
//   }
// }
