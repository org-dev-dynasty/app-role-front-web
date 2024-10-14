import { useNavigate } from "react-router-dom";
import CreateEventModal from "../../../components/CreateEventModal";
import { useState } from "react";


export default function Roles() {
  const navigate = useNavigate();
  
  const handleToggleCRUD = () => {
    navigate('/Institutes')
  }

  const [isCreateActive, setIsCreateActive] = useState<boolean>(false);

  return (
    <div className="flex h-screen w-full justify-center items-center bg-white">
      {isCreateActive && (
        <CreateEventModal onClick={() => setIsCreateActive(false)} />
      )}
    <div className="flex flex-col w-[90%] items-center h-[90%] rounded-lg border-2 border-slate-400 bg-slate-300 shadow-lg">
      <div className="w-full border-b-2 flex items-center justify-between shadow-md z-30 px-10 backdrop-blur-lg border-slate-400 h-[14%]">
          <div className="flex flex-row gap-4">
            <div className="h-20 w-48 bg-white flex justify-center items-center rounded-lg shadow-md">
              <h1 className="text-3xl">Rolês</h1>
            </div>
            <div className="h-10 w-28 bg-white flex justify-center items-center rounded-lg shadow-md hover:cursor-pointer hover:bg-white-purple" onClick={handleToggleCRUD}>
              <h5 className="" >Instituições</h5>
            </div>
          </div>
        <div
            className="h-16 w-16 bg-violet flex justify-center items-center rounded-lg shadow-md hover:bg-light-purple hover:cursor-pointer duration-100"
            onClick={() => setIsCreateActive(true)}
        >
          <p className="text-3xl text-white">+</p>
        </div>
      </div>

        <div className="py-4 flex flex-col flex-1 overflow-y-auto w-full items-center gap-4">
          {/* Aqui você pode adicionar os cards de roles */}
          
      </div>
    </div>
  </div>
);
}