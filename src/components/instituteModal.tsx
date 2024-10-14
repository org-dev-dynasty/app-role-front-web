import { useState } from "react";
import { institutionProps } from "../pages/restrictedArea/Institutions";

export interface InstituteModalProps {
  instSelected: institutionProps | null;
  onClick: () => void; // Função para fechar o modal principal
  setUpdate: () => void; // Função para abrir o modal de atualização
  onDelete: () => void;  // Função para realizar a exclusão
}

export function InstituteModal({
  instSelected,
  onClick,
  setUpdate,
  onDelete,
}: InstituteModalProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-sm bg-opacity-50 z-40 flex justify-center items-center"
        onClick={onClick} // Fecha o modal principal ao clicar fora
      >
        <div
          className="flex flex-col w-[50%] h-[70%] bg-slate-300 rounded-lg border-2 border-slate-400 shadow-sm"
          onClick={(e) => e.stopPropagation()} // Evita fechar o modal ao clicar no conteúdo interno
        >
          {!confirmDelete && (
            <>
              <div className="w-full border-b-2 shadow-md flex items-center justify-between z-30 px-4 backdrop-blur-lg border-slate-400 h-[14%]">
                <h1 className="text-3xl">{instSelected?.name}</h1>
                <div className="flex flex-row gap-4">
                  <div
                    className="h-16 w-20 flex justify-center items-center bg-blue-500 rounded-lg shadow-md hover:bg-blue-800 hover:cursor-pointer"
                    onClick={setUpdate} // Abre o modal de atualização
                  >
                    Update
                  </div>
                  <div
                    className="h-16 w-20 flex justify-center items-center bg-green-500 rounded-lg shadow-md hover:bg-green-800 hover:cursor-pointer"
                    onClick={onClick} // Fecha o modal
                  >
                    Done
                  </div>
                  <div
                    className="h-16 w-20 flex justify-center items-center bg-red-500 rounded-lg shadow-md hover:bg-red-800 hover:cursor-pointer"
                    onClick={() => setConfirmDelete(true)} // Abre a confirmação de exclusão
                  >
                    Delete
                  </div>
                </div>
              </div>
              <div className="py-4 flex flex-col flex-1 overflow-y-auto w-full items-center gap-4">
                <div className="w-full flex flex-col gap-6 items-center ">
                  <div className="h-80 w-80 flex mb-6 justify-center items-center bg-white rounded-lg">
                    <img
                      src={instSelected?.photo}
                      alt="Instituição"
                      className="w-96 h-52 object-cover rounded-lg"
                    />
                  </div>
                  <p>Descrição:</p>
                  <div className="h-80 w-[80%] flex px-4 mb-6 bg-white items-center rounded-md">
                    <p>{instSelected?.description}</p>
                  </div>
                  <div className="flex flex-row mb-6 w-full justify-evenly">
                    <div className="flex flex-col gap-4 w-[50%] items-center">
                      <p>Tipo de instituição:</p>
                      <div className="h-10 w-[80%] flex px-4 mb-6 bg-white items-center rounded-md">
                        <p>{instSelected?.institution_type}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 w-[50%] items-center">
                      <p>Tipo de parceiro:</p>
                      <div className="h-10 w-[80%] flex px-4 mb-6 bg-white items-center rounded-md">
                        <p>{instSelected?.partner_type}</p>
                      </div>
                    </div>
                  </div>
                  <p>Endereço:</p>
                  <div className="h-10 w-[80%] flex px-4 mb-6 bg-white items-center rounded-md">
                    <p>{instSelected?.address}</p>
                  </div>
                  <p>Distrito:</p>
                  <div className="h-10 w-[80%] flex px-4 mb-6 bg-white items-center rounded-md">
                    <p>{instSelected?.district_id}</p>
                  </div>
                  <p>Preço:</p>
                  <div className="h-10 w-[80%] flex px-4 mb-6 bg-white items-center rounded-md">
                    <p>{instSelected?.price}</p>
                  </div>
                </div>
              </div>
            </>
          )}
          {confirmDelete && (
            <ConfirmDeleteInstitute
              instSelected={instSelected}
              onCancel={() => setConfirmDelete(false)} // Cancelar a exclusão e fechar modal de confirmação
              onDelete={() => {
                onDelete(); // Executa a exclusão
                setConfirmDelete(false); // Fecha o modal de confirmação
                onClick(); // Fecha o modal principal após a exclusão
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

interface ConfirmDeleteInstituteProps {
  instSelected: institutionProps | null;
  onCancel: () => void; // Função para cancelar a exclusão
  onDelete: () => void; // Função para confirmar a exclusão
}

export function ConfirmDeleteInstitute({
  instSelected,
  onCancel,
  onDelete,
}: ConfirmDeleteInstituteProps) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-opacity-50 bg-black z-50 flex justify-center items-center"
      onClick={onCancel} // Fecha o modal ao clicar fora dele
    >
      <div
        className="flex flex-col w-[30%] h-[40%] bg-slate-300 rounded-lg border-2 border-slate-400 shadow-sm"
        onClick={(e) => e.stopPropagation()} // Evita fechar o modal ao clicar no conteúdo interno
      >
        <div className="w-full border-b-2 shadow-md flex items-center justify-between z-30 px-4 backdrop-blur-lg border-slate-400 h-[14%]">
          <h1 className="text-3xl">Confirm Delete {instSelected?.name}</h1>
        </div>
        <div className="py-4 flex flex-col overflow-y-auto w-full items-center gap-4">
          <p>Tem certeza que deseja excluir a instituição {instSelected?.name}?</p>
        </div>
        <div className="flex justify-center items-center gap-4 p-4">
          <button
            className="px-4 py-2 bg-red-500 rounded-lg text-white shadow-md hover:bg-red-800"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 rounded-lg text-white shadow-md hover:bg-blue-800"
            onClick={onDelete}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}