import Main from '@/components/dashboard/main'
import PromptsTable from '@/components/tables/prompts-table'
import PromptSheet from '@/components/sheets/prompt-sheet'

export default function Page() {
  return (
    <Main>
      <div className="m-4 justify-end flex">
        <PromptSheet />
      </div>
      <div className="m-4">
        <PromptsTable />
      </div>
    </Main>
  )
}
