import Image from 'next/image';

export const siteSettings = {
  name: 'FreshDelivery',
  description: 'Get your fresh food delivered to your doorstep.',
  author: {
    name: 'Fresh Delivery',
    websiteUrl: 'https://freshdelivery.vercel.app',
    address: '',
  },
  logo: {
    url: '/assets/images/logo.svg',
    alt: 'FreshDelivery',
    href: '/',
    width: 128,
    height: 30,
  },
  defaultLanguage: 'ro',
  currencyCode: 'USD',
  site_header: {
    languageMenu: [
      {
        id: 'en',
        name: 'English',
        value: 'en',
        icon: (
          <Image
            className="object-cover"
            src="/assets/images/flags/en.svg"
            alt=""
            width={100}
            height={100}
          />
        ),
      },
      {
        id: 'ro',
        name: 'Romana',
        value: 'ro',
        icon: (
          <Image
            className="object-cover"
            src="/assets/images/flags/ro.svg"
            alt=""
            width={100}
            height={100}
          />
        ),
      },
    ],
  },
};
