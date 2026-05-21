
function SkelotonComment() {
  return (
    <div className="flex gap-3 p-3 rounded-xl bg-white/2">
      <div className="shimmer h-8 w-8 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="shimmer h-3 w-24 rounded" />
        <div className="shimmer h-3 w-full rounded" />
      </div>
    </div>
  )
}

export default SkelotonComment
