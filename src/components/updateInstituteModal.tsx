import { useState } from "react";
import { InstituteModalProps } from "./instituteModal";



export default function InstituteModalUpdate({ instSelected, onClick, setUpdate }: InstituteModalProps) {
  const [description, setDescription] = useState(instSelected?.description);
  const [address, setAddress] = useState(instSelected?.address);
  const [district_id, setDistrict_id] = useState(instSelected?.district_id);
  const [price, setPrice] = useState(instSelected?.price);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Atualiza o estado da descrição com o novo valor
    setDescription(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Atualiza o estado do endereço com o novo valor
    setAddress(e.target.value);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Atualiza o estado do distrito com o novo valor
    setDistrict_id(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Atualiza o estado do preço com o novo valor
    setPrice(e.target.value);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-sm bg-opacity-50 z-40 flex justify-center items-center"
      onClick={onClick} // Fecha o modal ao clicar fora dele
    >
      <div
        className="flex flex-col w-[50%] h-[70%] bg-slate-300 rounded-lg border-2 border-slate-400 shadow-sm"
        onClick={(e) => e.stopPropagation()} // Evita fechar o modal ao clicar no conteúdo interno
      >
        <div className="w-full border-b-2 shadow-md flex items-center justify-between z-30 px-4 backdrop-blur-lg border-slate-400 h-[14%]">
          <h1 className="text-3xl">Update {instSelected?.name}</h1>
          <div className="flex flex-row gap-4">
            <div
              className="h-16 w-20 flex justify-center items-center bg-red-500 rounded-lg shadow-md hover:bg-red-800 hover:cursor-pointer"
              onClick={onClick} // Cancela a atualização e volta para o modal anterior
            >
              Cancel
            </div>
            <div
              className="h-16 w-20 flex justify-center items-center bg-blue-500 rounded-lg shadow-md hover:bg-blue-800 hover:cursor-pointer"
              onClick={setUpdate} // Confirma a atualização e fecha o modal
            >
              Done
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-col flex-1 overflow-y-auto w-full items-center gap-4">
          <div className="w-full px-5 gap-2 flex flex-col items-center">
            <div className="h-80 bg-white mb-6 w-80">
              <img
                src={instSelected?.photo}
                alt="Instituição"
                className="w-96 h-52 object-cover rounded-lg"
              />
            </div>
            <p>Descrição: </p>
            <div className="w-[80%] h-52 mb-6 flex flex-row rounded-md p-4 bg-white ">
              <input
                className="w-full h-full"
                type="text"
                value={description}
                onChange={handleDescriptionChange} // Corrigido para passar a referência da função
              />
            </div>
            <div className="flex flex-row justify-evenly w-full">
              <div className="flex flex-col gap-2">
                <p>Selecione o tipo de Instituição:</p>
                <div className="w-full h-10 mb-6 flex flex-row rounded-md items-center px-2 bg-white ">
                  <select className="w-full" name="institutetype" id="instituteType">
                    <option value="ESTABELECIMENTO_FIXO">Estabelecimento fixo</option>
                    <option value="AGENCIA_DE_FESTAS">Agência de festas</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p>Selecione o tipo de Parceiro:</p>
                <div className="w-full h-10 mb-6 flex flex-row rounded-md items-center px-4 bg-white ">
                  <select className="w-full" name="partnerType" id="partnerType">
                    <option value="GLOBAL_PARTNER">Parceiro Global</option>
                    <option value="PROMOTER_PARTNER">Parceiro Promocional</option>
                    <option value="NO_PARTNER">Sem Parceiro</option>
                  </select>
                </div>
              </div>
            </div>
            <p>Endereço:</p>
            <div className="w-[80%] h-10 mb-6 flex flex-row rounded-md items-center px-4 bg-white ">
              <input
                className="w-full"
                type="text"
                value={address}
                onChange={handleAddressChange} // Corrigido para passar a referência da função
              />
            </div>
            <p>Id do distrito:</p>
            <div className="w-[80%] h-10 mb-6 flex flex-row rounded-md items-center px-4 bg-white ">
              <input
                className="w-full"
                type="text"
                value={district_id}
                onChange={handleDistrictChange} // Corrigido para passar a referência da função
              />
            </div>
            <p>Preço:</p>
            <div className="w-[80%] h-10 mb-6 flex flex-row rounded-md items-center px-4 bg-white ">
              <input
                className="w-full"
                type="text"
                value={price}
                onChange={handlePriceChange} // Corrigido para passar a referência da função
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
