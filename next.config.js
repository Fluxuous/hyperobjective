const pkg = require('./package.json')
const { withLogtail } = require('@logtail/next')
const { withContentlayer } = require('next-contentlayer')

const commitHash = require('child_process')
  .execSync('git log --pretty=format:"%h" -n1')
  .toString()
  .trim()

/** @type {import('next').NextConfig} */
module.exports = withLogtail(
  withContentlayer({
    reactStrictMode: true,
    env: {
      APP_VERSION: pkg.version,
      NEXT_PUBLIC_COMMIT_HASH: commitHash,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
          port: '',
          pathname: '**',
        },
      ],
    },
    experimental: {
      runtime: 'nodejs',
      serverComponentsExternalPackages: [
        'pdf2json',
        '@zilliz/milvus2-sdk-node',
      ],
      outputFileTracingIncludes: {
        '/*': ['./cache/**/*'],
      },
      instrumentationHook: true,
      turbo: {
        resolveExtensions: [
          '.mdx',
          '.tsx',
          '.ts',
          '.jsx',
          '.js',
          '.mjs',
          '.json',
        ],
      },
    },
    webpack: (config) => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding', 'nunjucks')
      config.module.rules.push({
        test: /\.node$/,
        loader: 'node-loader',
      })
      config.resolve.alias = {
        ...config.resolve.alias,
        sharp$: false,
        mongodb$: false,
        'onnxruntime-node$': false,
      }
      return config
    },
  })
)
