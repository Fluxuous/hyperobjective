# Ouroboros

This is a monorepo for the Hyperobjective LLM router frontend, backend and supporting infrastructure.

## Running locally

You will need to use the environment variables defined in [`.env.local`](.env.local) to run the application.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various OpenAI and authentication provider accounts.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`
4. Install [Foundary](https://book.getfoundry.sh/getting-started/first-steps)

```bash
pnpm install
pnpm dev
```

Your app will now be running on [localhost:3000](http://localhost:3000/).

**Message Queue**

The message queue is used to communicate between the various services. The following command will start the message queue.

```bash
pnpm inngest
```

Your message queue will now be running on [localhost:8288](http://localhost:8288/).

### TDD

Test Driven Development (TDD) is used for all development. The following command will run the test suite in watch mode.

```bash
pnpm test:watch
```

### CLI

Use the CLI to rapidly prototype or play around with functionality. The available commands can be found in the [`cli`](cli) directory.

```bash
pnpm cli --help
```
