interface InstituteModalProps {
  instSelected: string | null;
  onClick: () => void;
}


export default function InstituteModal({ instSelected, onClick }: InstituteModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 flex justify-center items-center" onClick={onClick}>
      <div className="flex flex-col w-[50%] h-[70%] bg-slate-300 rounded-xl border-4 border-black shadow-sm">
        <div className="w-full border-b-4 flex items-center justify-between z-30 px-20 backdrop-blur-lg border-black h-[14%]">
          <h1 className="text-3xl">{instSelected}</h1>
          <div className="flex flex-row gap-4">
            <div className="h-16 w-20 flex justify-center items-center bg-blue-500 rounded-lg hover:bg-blue-800 hover:cursor-pointer" onClick={onClick} >Update</div>
            <div className="h-16 w-20 flex justify-center items-center bg-red-500 rounded-lg hover:bg-red-800 hover:cursor-pointer" onClick={onClick} >Delete</div>
          </div>
        </div>
        <div className="py-4 flex flex-col flex-1 overflow-y-auto w-full items-center gap-4">
          <p>Informações da instituição</p>
        </div>
      </div>
    </div>
  )
}