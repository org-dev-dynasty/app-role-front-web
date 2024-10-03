
interface InstituteModalProps {
  instSelected: string | null;
  onClick: () => void;
  setUpdate: () => void;
}

export function InstituteModal({ instSelected, onClick, setUpdate }: InstituteModalProps) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-sm bg-opacity-50 z-40 flex justify-center items-center"
      onClick={onClick}
    >
      <div
        className="flex flex-col w-[50%] h-[70%] bg-slate-300 rounded-xl border-4 border-black shadow-sm"
        onClick={(e) => e.stopPropagation()} // Evita fechar o modal ao clicar no conteúdo interno
      >
        <div className="w-full border-b-4 flex items-center justify-between z-30 px-4 backdrop-blur-lg border-black h-[14%]">
          <h1 className="text-3xl">{instSelected}</h1>
          <div className="flex flex-row gap-4">
            <div
              className="h-16 w-20 flex justify-center items-center bg-blue-500 rounded-lg hover:bg-blue-800 hover:cursor-pointer"
              onClick={setUpdate} // Abre o modal de atualização
            >
              Update
            </div>
            <div
              className="h-16 w-20 flex justify-center items-center bg-green-500 rounded-lg hover:bg-green-800 hover:cursor-pointer"
              onClick={onClick} // Abre o modal de atualização
            >
              Done
            </div>
            <div
              className="h-16 w-20 flex justify-center items-center bg-red-500 rounded-lg hover:bg-red-800 hover:cursor-pointer"
              onClick={onClick} // Fecha o modal (simula uma exclusão)
            >
              Delete
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-col flex-1 overflow-y-auto w-full items-center gap-4">
          <p>Informações da instituição</p>
        </div>
      </div>
    </div>
  );
}

export function InstituteModalUpdate({ instSelected, onClick, setUpdate }: InstituteModalProps) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-sm bg-opacity-50 z-40 flex justify-center items-center"
      onClick={onClick} // Fecha o modal ao clicar fora dele
    >
      <div
        className="flex flex-col w-[50%] h-[70%] bg-slate-300 rounded-xl border-4 border-black shadow-sm"
        onClick={(e) => e.stopPropagation()} // Evita fechar o modal ao clicar no conteúdo interno
      >
        <div className="w-full border-b-4 flex items-center justify-between z-30 px-4 backdrop-blur-lg border-black h-[14%]">
          <h1 className="text-3xl">Update {instSelected}</h1>
          <div className="flex flex-row gap-4">
            <div
              className="h-16 w-20 flex justify-center items-center bg-red-500 rounded-lg hover:bg-red-800 hover:cursor-pointer"
              onClick={onClick} // Cancela a atualização e volta para o modal anterior
            >
              Cancel
            </div>
            <div
              className="h-16 w-20 flex justify-center items-center bg-blue-500 rounded-lg hover:bg-blue-800 hover:cursor-pointer"
              onClick={setUpdate} // Confirma a atualização e fecha o modal
            >
              Done
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-col flex-1 overflow-y-auto w-full items-center gap-4">
          <p>Atualize as informações da instituição</p>
        </div>
      </div>
    </div>
  );
}
