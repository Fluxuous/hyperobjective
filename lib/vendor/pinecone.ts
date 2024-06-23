import { Pinecone } from '@pinecone-database/pinecone'

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
})

export const createPineconeIndex = async () => {
  await pc.createIndex({
    name: 'quickstart',
    dimension: 8, // Replace with your model dimensions
    metric: 'euclidean', // Replace with your model metric
    spec: {
      serverless: {
        cloud: 'aws',
        region: 'us-east-1',
      },
    },
  })
}
