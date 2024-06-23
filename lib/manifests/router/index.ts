import { manifest as huggingFaceManifest } from '@/lib/manifests/router/huggingface'
import { manifest as openaiManifest } from '@/lib/manifests/router/openai'
import { manifest as geminiManifest } from '@/lib/manifests/router/gemini'
import { manifest as anthropicManifest } from '@/lib/manifests/router/anthropic'
import { manifest as mistralManifest } from '@/lib/manifests/router/mistral'
import { manifest as groqManifest } from '@/lib/manifests/router/groq'
import { RouterItem } from '@/lib/types'

export const routerItems: RouterItem[] = [
  ...huggingFaceManifest.items,
  ...openaiManifest.items,
  ...geminiManifest.items,
  ...anthropicManifest.items,
  ...mistralManifest.items,
  ...groqManifest.items,
]
