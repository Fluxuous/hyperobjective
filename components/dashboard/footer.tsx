export default function Footer() {
  return (
    <div className="border-t p-0 m-1 text-black/50 dark:text-white/50 flex items-stretch shrink-0 h-4">
      <div className="ml-3 w-96 text-left text-xs">
        <span className="text-green-400">&bull;</span> All systems operational
      </div>
      <div className="w-full"></div>
      <div className="mr-3 w-96 text-right text-xs">
        Build {process.env.NEXT_PUBLIC_COMMIT_HASH}
      </div>
    </div>
  )
}
