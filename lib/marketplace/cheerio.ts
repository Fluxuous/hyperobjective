'use server'

import { FunctionTool } from 'llamaindex'
import { HTMLReader } from 'llamaindex/readers/HTMLReader'
import { load } from 'cheerio'

interface CrawlOptions {
  maxDepth: number
  onlyInDomain: boolean
}

interface Payload {
  url: string
  title: string
  body: string
}

function isSameDomain(url1: string, url2: string): boolean {
  const domain1 = new URL(url1).hostname
  const domain2 = new URL(url2).hostname
  return domain1 === domain2
}

export async function crawlWebpage(
  url: string,
  options: CrawlOptions,
  currentDepth: number = 0,
  visitedUrls: Set<string> = new Set()
): Promise<Payload[]> {
  if (currentDepth > options.maxDepth || visitedUrls.has(url)) {
    return []
  }

  visitedUrls.add(url)

  const payloads: Payload[] = []

  try {
    const response = await fetch(url)
    const data = await response.text()
    const $ = load(data)

    const htmlReader = new HTMLReader()
    const title = $('title').text()
    const text = $('body').text()

    const body = await htmlReader.parseContent(text)

    payloads.push({
      url,
      body,
      title,
    })

    // Follow links to other pages
    const links = $('a')
      .map((_, el) => $(el).attr('href'))
      .get()

    // TODO: Only follow links that are pages
    const filteredLinks = links.filter((link) => link && link.endsWith('/'))
    for (const link of filteredLinks) {
      if (link) {
        const absoluteUrl = new URL(link, url).toString()
        if (!options.onlyInDomain || isSameDomain(url, absoluteUrl)) {
          const payload = await crawlWebpage(
            absoluteUrl,
            options,
            currentDepth + 1,
            visitedUrls
          )
          payloads.push(...payload)
        }
      }
    }
  } catch (error) {
    console.error(`Error crawling ${url}:`, error)
  }

  return payloads
}

export const getCheerioCrawlWebpageFT = () =>
  new FunctionTool(
    async ({ url }: { url: string }) => {
      const response = await crawlWebpage(url, {
        maxDepth: 3,
        onlyInDomain: true,
      })
      return response.map((item) => item.body).join('\n')
    },
    {
      name: 'cheerioCrawlWebpage',
      description: 'Use this function to crawl a webpage',
      parameters: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'The run id',
          },
        },
        required: ['url'],
      },
    }
  )
