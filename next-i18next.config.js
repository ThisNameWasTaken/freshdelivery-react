const path = require('path');
module.exports = {
  i18n: {
    locales: ['en', 'ro'],
    defaultLocale: 'ro',
    localeDetection: false,
  },
  localePath: path.resolve('./public/locales'),
};
