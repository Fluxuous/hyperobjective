import { Command } from 'commander'

import {
  generateNanoids,
  approveUserAction,
  flushAction,
  listAllAction,
  listBillingAccountsAction,
  walletBalanceAction,
  ipfsUploadAction,
} from '@/cli/actions'

const program = new Command()
program
  .name('hyperobjective-cli')
  .description('CLI to manage Hyperobjective application')
  .version('0.1.0')
program
  .command('generate-nanoid')
  .description('generates nanoid')
  .action(generateNanoids)
program
  .command('approve-user')
  .description('approve user')
  .argument('<string>', 'user id')
  .action(approveUserAction)
program.command('flush').description('flush database').action(flushAction)
program
  .command('list-accounts')
  .description('list accounts')
  .action(listBillingAccountsAction)
program.command('list-all').description('list all').action(listAllAction)
program
  .command('wallet-balance')
  .description('wallet balance')
  .action(walletBalanceAction)
program
  .command('ipfs-upload')
  .description('ipfs upload')
  .action(ipfsUploadAction)

program.parse()
