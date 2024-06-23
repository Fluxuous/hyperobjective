import { ResourceManifest } from '@/lib/types'

export const manifest: ResourceManifest = {
  name: 'Apps',
  items: [
    {
      id: 'GGsvfdQ',
      name: 'Twitter',
      description:
        'Twitter is a social media platform that allows users to share short messages, called "tweets," with their followers.',
      category: 'app',
      active: false,
      provider: 'twitter',
      cost: 0,
    },
    {
      id: 'nnrAjm3',
      name: 'Shopify',
      description:
        'Shopify is an e-commerce company that provides businesses with an online platform to design, set up, and manage their stores across various sales channels, including web, mobile, social media, marketplaces, and physical retail locations.',
      category: 'app',
      active: false,
      provider: 'shopify',
      cost: 0,
    },
    {
      id: 'QpMWAAx',
      name: 'Printify',
      description:
        'Printify is a service that connects you to a network of print providers who will print and ship products directly to your customers.',
      category: 'app',
      active: false,
      provider: 'printify',
      cost: 0,
    },
    {
      id: 'U7pYxH1',
      name: 'Telegram',
      description:
        'Telegram is a messaging app that lets you communicate with your friends and family.',
      category: 'app',
      active: false,
      provider: 'telegram',
      cost: 0,
    },
    {
      id: '6MsC9XO',
      name: 'Bing',
      description:
        'Search the web with an engine that uses AI to find the most relevant information on the Internet.',
      category: 'app',
      active: true,
      cost: 0.0001,
    },
    {
      id: 'YBHDAR5',
      name: 'Postmark',
      description: 'A service that allows you to send emails.',
      category: 'app',
      active: true,
      cost: 0.0001,
    },
    {
      id: 'E0OQ7GX',
      name: 'Hello Moon',
      description:
        'Hello Moon provides infrastructure for interacting with the Solana blockchain, including information on tokens, wallets, and transactions.',
      category: 'app',
      active: false,
      cost: 0,
    },
  ],
}
