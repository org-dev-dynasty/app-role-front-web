interface EventInfoUnitProps {
  label: string;
  value: string;
  children: React.ReactNode;
}

export function EventInfoUnit({ label, children }: EventInfoUnitProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 mx-2 text-2xl rounded-lg">
      <p className="text-center">{label}</p>

      <span className="bg-neutral-800 px-6 py-4 rounded-lg text-center flex items-center justify-center text-stone-300 w-80 h-32 overflow-y-auto">{children}</span>
    </div>
  )
}