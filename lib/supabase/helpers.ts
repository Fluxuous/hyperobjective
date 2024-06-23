import { Client } from 'postmark'

import { siteConfig } from '@/config/site'

const postmarkClient = new Client(process.env.POSTMARK_API_TOKEN ?? '')

export const sendVerificationRequest = async ({
  identifier,
  url,
  provider,
}: {
  identifier: string
  url: string
  provider: any
}) => {
  const user = { emailVerified: false }

  const templateId = user?.emailVerified
    ? process.env.POSTMARK_SIGN_IN_TEMPLATE
    : process.env.POSTMARK_ACTIVATION_TEMPLATE
  if (!templateId) {
    throw new Error('Missing template id')
  }

  const result = await postmarkClient.sendEmailWithTemplate({
    TemplateId: parseInt(templateId),
    To: identifier,
    From: provider.from as string,
    TemplateModel: {
      action_url: url,
      product_name: siteConfig.name,
    },
    Headers: [
      {
        // Set this to prevent Gmail from threading emails.
        // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
        Name: 'X-Entity-Ref-ID',
        Value: new Date().getTime() + '',
      },
    ],
  })

  if (result.ErrorCode) {
    throw new Error(result.Message)
  }
}
