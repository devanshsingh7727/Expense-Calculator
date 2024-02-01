const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
  "react-github-btn",
]);
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});
module.exports = withTM(
  withPWA(
    {
      reactStrictMode: true,
      async redirects() {
        return [
          {
            source: "/",
            destination: "/Landingpage",
            permanent: true,
          },
        ];
      },
      env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        SERVER: process.env.FINAL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECERT: process.env.GOOGLE_CLIENT_SECERT,
        MONGODB_URI: process.env.MONGODB_URI,
      },
    },
    {
      eslint: {
        ignoreDuringBuilds: true,
      },
    }
  )
);
