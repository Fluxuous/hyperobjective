import { Project } from '@/lib/types'
import { user } from '@/tests/mocks/user'

export const project: Project = {
  id: 'DkiC6LG',
  userId: user.id,
  createdAt: new Date(0),
  updatedAt: new Date(0),
  name: 'Crypto Meme T-shirt Shop',
  vision:
    'Become the leading online platform for crypto meme-inspired T-shirts.',
  budget: 50,
  strategy:
    'Search social media for trending memes, create T-shirt products using a dropship supplier, list products on an e-commerce platform and market on social media.',
  resourceIds: ['6MsC9XO', 'GGsvfdQ', 'nnrAjm3', 'QpMWAAx'],
  memberIds: [],
  contractAddress: null,
  ipfsUri: null,
  sharePath: null,
  private: false,
}
