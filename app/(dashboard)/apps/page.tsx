'use server'

import { AppItemCard } from '@/components/dashboard/app-item-card'
import { manifest } from '@/lib/manifests/apps'
import { safeFetchIsAppProviderConfigured } from '@/lib/db/helpers'

export default async function Page() {
  const items = await Promise.all(
    manifest.items.map(async (app) => ({
      app,
      isConfigured: app.provider
        ? await safeFetchIsAppProviderConfigured(app.id)
        : undefined,
    }))
  )
  return (
    <div className="space-y-6">
      {items
        .sort((a, b) => a.app.name.localeCompare(b.app.name))
        .map(({ app, isConfigured }, i) => {
          return <AppItemCard key={i} app={app} isConfigured={isConfigured} />
        })}
    </div>
  )
}
