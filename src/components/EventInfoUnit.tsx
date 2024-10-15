interface EventInfoUnitProps {
  label: string;
  value: string;
  children: React.ReactNode;
}

export function EventInfoUnit({ label, children }: EventInfoUnitProps) {
  return (
    <div className="bg-[#2A2A2A] flex flex-col gap-2 mx-2 text-2xl rounded-lg">
      <p className="text-center">{label}</p>

      <span className="bg-grayModal px-6 py-4 rounded-lg text-center text-stone-300 w-80 h-16 overflow-y-auto">{children}</span>
    </div>
  )
}