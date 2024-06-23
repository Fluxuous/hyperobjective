import Main from '@/components/dashboard/main'
import DocumentTable from '@/components/tables/documents-table'
import DocumentSheet from '@/components/sheets/document-sheet'

export default function Page() {
  return (
    <Main>
      <div className="m-4 justify-end flex">
        <DocumentSheet />
      </div>
      <div className="m-4">
        <DocumentTable />
      </div>
    </Main>
  )
}
