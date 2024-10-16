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
  const [logoPhoto, setLogoPhoto] = useState<File | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState<File[]>([]);

  useEffect(() => {
    setInstituteNameDisplay(institute.name);
    setInstituteName(institute.name);
    setDescription(institute.description);
    setInstituteType(institute.institute_type);
    setPartnerType(institute.partner_type);
    setPhone(institute.phone);
    setAddress(institute.address);
    // Se logo e fotos forem URLs já existentes, você pode usar a estrutura que preferir para exibir as imagens.
    // setLogoPhoto(logo_photo);
    // setGalleryPhotos(photos_url);
  }, [institute]);

  // Handlers de mudança para atualizar os estados
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setInstituteName(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
  const handleInstituteTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setInstituteType(e.target.value);
  const handlePartnerTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPartnerType(e.target.value);
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value.replace(/[^0-9]/g, ''));
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value);
  const handleLogoPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setLogoPhoto(e.target.files[0]);
  };
  const handleGalleryPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setGalleryPhotos(Array.from(e.target.files));
  };

  return (
    <div className='inset-0 z-50'>
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
          {logoPhoto && (
            <img
              src={URL.createObjectURL(logoPhoto)}
              alt="Imagem logo"
              className="w-24 h-24 mb-4 object-cover rounded-md"
            />
          )}
        </div>

        {/* Upload da Galeria de Imagens */}
        <fieldset className="mb-4 flex flex-col gap-1 text-white">
          <label className="text-base" htmlFor="galleryPhotos">Galeria de Imagens</label>
          <input
            className="p-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
            id="galleryPhotos"
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryPhotosChange}
          />
        </fieldset>

        <div className="flex flex-wrap gap-2">
          {galleryPhotos.length > 0 &&
            galleryPhotos.map((photo, index) => (
              <img
                key={index}
                src={URL.createObjectURL(photo)}
                alt={`Imagem ${index + 1}`}
                className="w-24 h-24 mb-4 object-cover rounded-md"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
