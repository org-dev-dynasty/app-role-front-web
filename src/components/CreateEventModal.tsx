import { useState } from "react";

interface CreateEventModalProps {
  onClick: () => void;
}

export default function CreateEventModal({ onClick }: CreateEventModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [institute_id, setInstituteId] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleInstituteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstituteId(event.target.value);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-sm bg-opacity-50 z-40 flex justify-center items-center" onClick={onClick}>
      <div className="flex flex-col w-[50%] h-[70%] bg-slate-300 rounded-lg border-2 border-slate-400 shadow-sm" onClick={(e) => e.stopPropagation()}>
        <div className="w-full border-b-2 shadow-md flex items-center justify-between z-30 px-4 backdrop-blur-lg border-slate-400 h-[14%]">
          <h1 className="text-3xl">Criação de Evento</h1>
          <div className="flex flex-row gap-4">
            <div className="h-16 w-20 flex justify-center items-center bg-blue-500 rounded-lg hover:bg-blue-800 shadow-md hover:cursor-pointer" onClick={onClick}>Finalizar</div>
            <div
              className="h-16 w-20 flex justify-center items-center bg-red-500 rounded-lg hover:bg-red-800 shadow-md hover:cursor-pointer"
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
            <p>Nome:</p>
            <div className="w-[80%] h-16 mb-6 flex flex-row rounded-md p-4 bg-white ">
              <input
                className="w-full h-full"
                type="text"
                value={name}
                placeholder="Nome do Evento"
                onChange={handleNameChange}
              />
            </div>
            <p>Descrição:</p> 
            <div className="w-[80%] h-52 mb-6 flex flex-row rounded-md p-4 bg-white ">
              <input
                className="w-full h-full"
                type="text"
                value={description}
                placeholder="Descrição do Evento"
                onChange={handleDescriptionChange}
              />
            </div>
            <p>Data:</p>
            <div className="w-[80%] h-16 mb-6 flex flex-row rounded-md p-4 bg-white ">
              <input
                className="w-full h-full"
                type="date"
                value={date}
                placeholder="Data do Evento"
                onChange={handleDateChange}
              />  
            </div>
            <p>Preço:</p>
            <div className="w-[80%] h-16 mb-6 flex flex-row rounded-md p-4 bg-white ">
              <input
                className="w-full h-full"
                type="text"
                value={price}
                placeholder="Preço do Evento"
                onChange={handlePriceChange}
              />
            </div>
            <p>Instituto:</p>
            <div className="w-[80%] h-16 mb-6 flex flex-row rounded-md p-4 bg-white ">
              <input
                className="w-full h-full"
                type="text"
                value={institute_id}
                placeholder="ID do Instituto"
                onChange={handleInstituteChange}
              />
            </div>
          </div>
        </div>
      </div>  
    </div>  
  );
}