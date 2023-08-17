const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@babel/preset-react',
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  'react-github-btn',
]);
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});
module.exports = withTM(
  withPWA(
    {
      reactStrictMode: true,
      async redirects() {
        return [
          {
            source: '/',
            destination: '/Landingpage',
            permanent: true,
          },
        ];
      },
    },
    {
      eslint: {
        ignoreDuringBuilds: true,
      },
    }
  )
);
