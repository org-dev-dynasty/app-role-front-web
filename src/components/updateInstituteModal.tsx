import React, { useEffect, useState } from 'react';

interface InstituteModalProps {
  setIsUpdateInstituteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  institute: InstituteProps;
}

interface InstituteProps {
  institute_id: string;
  name: string;
  description: string;
  institute_type: string;
  partner_type: string;
  phone: string;
  logo_photo: string;
  address: string;
  price: number;
  district_id: string;
  photos_url: string[];
  events_id: string[];
}

export default function UpdateInstituteModal({ setIsUpdateInstituteModalOpen, institute }: InstituteModalProps) {
  const [instituteNameDisplay, setInstituteNameDisplay] = useState("");
  const [instituteName, setInstituteName] = useState(institute.name || "");
  const [description, setDescription] = useState(institute.description || "");
  const [instituteType, setInstituteType] = useState(institute.institute_type || "ESTABELECIMENTO_FIXO");
  const [partnerType, setPartnerType] = useState(institute.partner_type || "GLOBAL_PARTNER");
  const [phone, setPhone] = useState(institute.phone || "");
  const [address, setAddress] = useState(institute.address || "");
  const [logoPhoto, setLogoPhoto] = useState<string | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);

  const [logoPhotoIncoming, setLogoPhotoIncoming] = useState<File | null>(null);
  const [galleryPhotosIncoming, setGalleryPhotosIncoming] = useState<File[]>([]);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    setInstituteNameDisplay(institute.name);
    setInstituteName(institute.name);
    setDescription(institute.description);
    setInstituteType(institute.institute_type);
    setPartnerType(institute.partner_type);
    setPhone(institute.phone);
    setAddress(institute.address);
    setLogoPhoto(institute.logo_photo);
    setGalleryPhotos(institute.photos_url);
  }, [institute]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setInstituteName(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
  const handleInstituteTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setInstituteType(e.target.value);
  const handlePartnerTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPartnerType(e.target.value);
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value.replace(/[^0-9]/g, ''));
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value);
  const handleLogoPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setLogoPhotoIncoming(e.target.files[0]);
  };
  const handleGalleryPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setGalleryPhotosIncoming(Array.from(e.target.files));
  };

  const handleUpdateClick = () => {
    setIsConfirmOpen(true);
  };

  return (
    <div className="inset-0 z-40">
      {isConfirmOpen && <ConfirmUpdate setIsConfirmOpen={setIsConfirmOpen} setIsUpdateInstituteModalOpen={setIsUpdateInstituteModalOpen} />}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsUpdateInstituteModalOpen(false)} />
      <div className="fixed overflow-y-auto left-1/2 top-1/2 max-h-[85vh] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grayModal p-[25px] shadow-md focus:outline-none">
        <div className="m-0 text-3xl font-medium text-white">
          Atualizar Instituto: <span className="text-violet">{instituteNameDisplay}</span>
        </div>
        <div className="mb-5 mt-2.5 text-[15px] leading-normal text-stone-300">
          Utilize os campos abaixo para atualizar as informações do instituto.
        </div>

        {/* Nome */}
        <fieldset className="mb-4 flex flex-col gap-1 text-white">
          <label className="text-base" htmlFor="instituteName">Nome</label>
          <input
            className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
            id="instituteName"
            value={instituteName}
            onChange={handleNameChange}
          />
        </fieldset>

        {/* Descrição */}
        <fieldset className="mb-4 flex flex-col gap-1 text-white">
          <label className="text-base" htmlFor="description">Descrição</label>
          <textarea
            className="h-44 px-2 py-2 resize-none bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </fieldset>

        {/* Tipos */}
        <div className="flex flex-row justify-evenly ">
          <fieldset className="mb-4 w-[48%] flex flex-col gap-1 text-white">
            <label className="text-base" htmlFor="instituteType">Tipo de Instituto</label>
            <select
              name="instituteType"
              id="instituteType"
              className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
              value={instituteType}
              onChange={handleInstituteTypeChange}
            >
              <option value="ESTABELECIMENTO_FIXO">Estabelecimento Fixo</option>
              <option value="AGENCIA_DE_FESTAS">Agência de Festas</option>
            </select>
          </fieldset>

          <fieldset className="mb-4 w-[48%] flex flex-col gap-1 text-white">
            <label className="text-base" htmlFor="partnerType">Tipo de Parceiro</label>
            <select
              name="partnerType"
              id="partnerType"
              className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
              value={partnerType}
              onChange={handlePartnerTypeChange}
            >
              <option value="GLOBAL_PARTNER">Parceiro Global</option>
              <option value="PROMOTER_PARTNER">Promotor</option>
              <option value="NO_PARTNER">Sem Parceiro</option>
            </select>
          </fieldset>
        </div>

        {/* Telefone */}
        <fieldset className="mb-4 flex flex-col gap-1 text-white">
          <label className="text-base" htmlFor="phone">Telefone (opcional)</label>
          <input
            className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="(XX) XXXX-XXXX"
            pattern="\(\d{2}\)\s\d{4,5}-\d{4}"
            inputMode="numeric"
            type="tel"
          />
        </fieldset>

        {/* Endereço */}
        <fieldset className="mb-4 flex flex-col gap-1 text-white">
          <label className="text-base" htmlFor="address">Endereço (opcional)</label>
          <input
            className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
            id="address"
            value={address}
            onChange={handleAddressChange}
            placeholder="Digite o endereço"
          />
        </fieldset>

        {/* Upload da Logo */}
        <fieldset className="mb-4 flex flex-col gap-1 text-white">
          <label className="text-base" htmlFor="logoPhoto">Foto do Logotipo</label>
          <input
            className="bg-grayInputModal p-2 outline-none rounded-md focus:ring-2 ring-violet"
            id="logoPhoto"
            type="file"
            onChange={handleLogoPhotoChange}
          />
        </fieldset>

        <div className="flex flex-wrap gap-2">
          {logoPhotoIncoming ? (
            <img
              src={URL.createObjectURL(logoPhotoIncoming)}
              alt="Imagem logo"
              className="w-24 h-24 mb-4 object-cover rounded-md bg-grayInputModal text-white"
            />
          ) : logoPhoto ? (
            <img
              src={logoPhoto}
              alt="Imagem logo"
              className="w-24 h-24 mb-4 object-cover rounded-md bg-grayInputModal text-white"
            />
          ) : null}
        </div>

        {/* Upload da Galeria de Imagens */}
        <fieldset className="mb-4 flex flex-col gap-1 text-white">
          <label className="text-base" htmlFor="galleryPhotos">Galeria de Imagens</label>
          <input
            className="p-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
            id="galleryPhotos"
            type="file"
            multiple
            onChange={handleGalleryPhotosChange}
          />
        </fieldset>

        <div className="flex flex-wrap gap-2">
          {galleryPhotosIncoming.length > 0
            ? galleryPhotosIncoming.map((photo, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(photo)}
                alt={`Imagem carregada ${idx}`}
                className="w-24 h-24 object-cover rounded-md bg-grayInputModal text-white"
              />
            ))
            : galleryPhotos.map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt={`Imagem galeria ${idx}`}
                className="w-24 h-24 object-cover rounded-md bg-grayInputModal text-white"
              />
            ))}
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white"
            onClick={() => setIsUpdateInstituteModalOpen(false)}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-violet text-white hover:bg-violet-dark"
            onClick={handleUpdateClick}
          >
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
}

interface ConfirmUpdateProp {
  setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUpdateInstituteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConfirmUpdate({ setIsConfirmOpen, setIsUpdateInstituteModalOpen }: ConfirmUpdateProp) {
  const handleCancelClick = () => {
    setIsConfirmOpen(false); // Fecha somente o modal de confirmação
  }

  return (
    <div className="fixed h-full w-full backdrop-blur-md bg-black/50 flex z-50 justify-center items-center">
      <div
        className="rounded-lg bg-grayModal p-6 w-1/3 text-center"
        onClick={(e) => e.stopPropagation()} // Impede a propagação do clique para o fundo
      >
        <p className="text-white mb-4">Você tem certeza que deseja atualizar este instituto?</p>
        <div className="flex justify-center gap-4">
          <button className="px-4 py-2 rounded-lg bg-gray-600 text-white" onClick={handleCancelClick}>Cancelar</button>
          <button className="px-4 py-2 rounded-lg bg-violet text-white" onClick={() => setIsUpdateInstituteModalOpen(false)}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

