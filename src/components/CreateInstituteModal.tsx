import { useState } from "react";

interface CreateInstituteModalProps {
  onClick: () => void;
}


export default function CreateInstituteModal({ onClick }: CreateInstituteModalProps) {
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [district_id, setDistrictId] = useState('');
  const [price, setPrice] = useState('');

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleDistrictChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistrictId(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-sm bg-opacity-50 z-40 flex justify-center items-center" onClick={onClick}>
      <div className="flex flex-col w-[50%] h-[70%] bg-slate-300 rounded-xl border-4 border-black shadow-sm" onClick={(e) => e.stopPropagation()}>
        <div className="w-full border-b-4 flex items-center justify-between z-30 px-4 backdrop-blur-lg border-black h-[14%]">
          <h1 className="text-3xl">Criação de Instituto</h1>
          <div className="flex flex-row gap-4">
            <div className="h-16 w-20 flex justify-center items-center bg-blue-500 rounded-lg hover:bg-blue-800 hover:cursor-pointer" onClick={onClick}>Finalizar</div>
            <div
              className="h-16 w-20 flex justify-center items-center bg-red-500 rounded-lg hover:bg-red-800 hover:cursor-pointer"
              onClick={onClick}
            >
              Cancel
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-col flex-1 overflow-y-auto w-full items-center gap-4">
          <div className="w-full px-5 gap-2 flex flex-col items-center">
            <div className="h-80 bg-white mb-6 w-80">
            </div>
            <p>Descrição: </p>
            <div className="w-[80%] h-52 mb-6 flex flex-row rounded-md p-4 bg-white ">
              <input
                className="w-full h-full"
                type="text"
                value={description}
                placeholder="Descrição do Instituto"
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
                placeholder="Endereço do Instituto"
                onChange={handleAddressChange} // Corrigido para passar a referência da função
              />
            </div>
            <p>Id do distrito:</p>
            <div className="w-[80%] h-10 mb-6 flex flex-row rounded-md items-center px-4 bg-white ">
              <input
                className="w-full"
                type="text"
                value={district_id}
                placeholder="Id do distrito"
                onChange={handleDistrictChange} // Corrigido para passar a referência da função
              />
            </div>
            <p>Preço:</p>
            <div className="w-[80%] h-10 mb-6 flex flex-row rounded-md items-center px-4 bg-white ">
              <input
                className="w-full"
                type="text"
                value={price}
                placeholder="Preço do Instituto"
                onChange={handlePriceChange} // Corrigido para passar a referência da função
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}