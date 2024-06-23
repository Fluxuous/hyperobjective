'use server'

export async function sendEmail({
  Subject,
  TextBody,
  To,
}: {
  Subject: string
  TextBody: string
  To: string
}) {
  return await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': process.env.POSTMARK_API_TOKEN ?? '',
    },
    body: JSON.stringify({
      From: 'noreply@hyperobjective.capital',
      To,
      Subject,
      TextBody,
      Tag: 'Test',
      HtmlBody: TextBody,
      TrackLinks: 'None',
      TrackOpens: true,
      Headers: [],
      Attachments: [],
    }),
  })
}
