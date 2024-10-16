import React, { useState } from 'react';

interface InstituteModalProps {
  setIsCreateInstituteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Institute({ setIsCreateInstituteModalOpen }: InstituteModalProps) {
  const [instituteName, setInstituteName] = useState("");
  const [description, setDescription] = useState("");
  const [instituteType, setInstituteType] = useState("ESTABELECIMENTO_FIXO");
  const [partnerType, setPartnerType] = useState("GLOBAL_PARTNER");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [logoPhoto, setLogoPhoto] = useState<File | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState<File[]>([]);

  // Handlers de mudança para atualizar os estados
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstituteName(e.target.value);
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }

  const handleInstituteTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInstituteType(e.target.value);
  }

  const handlePartnerTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPartnerType(e.target.value);
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/[^0-9]/g, ''));  // Permite apenas números
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  }

  const handleLogoPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLogoPhoto(e.target.files[0]);
    }
  }

  const handleGalleryPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryPhotos(Array.from(e.target.files));
    }
  };


  return (
    <div>
      <div>
        <div className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow backdrop-blur-sm" onClick={() => setIsCreateInstituteModalOpen(false)} />
        <div className="fixed overflow-y-auto left-1/2 top-1/2 max-h-[85vh] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grayModal p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <div className="m-0 text-3xl font-medium text-white">
            Criar <span className="text-violet">INSTITUTO</span>
          </div>
          <div className="mb-5 mt-2.5 text-[15px] leading-normal text-stone-300">
            Utilize os campos abaixo para criar um instituto
          </div>

          {/* Nome */}
          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white" htmlFor="instituteName">
              Nome
            </label>
            <input
              className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
              id="instituteName"
              value={instituteName}
              onChange={handleNameChange}
            />
          </fieldset>

          {/* Descrição */}
          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white" htmlFor="description">
              Descrição
            </label>
            <textarea
              className="h-44 px-2 py-2 resize-none bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </fieldset>

          <div className="flex flex-row justify-evenly ">
            {/* Tipo de Instituto */}
            <fieldset className="mb-4 flex w-[48%] flex-col gap-1 text-white">
              <label className="text-base text-white" htmlFor="instituteType">
                Tipo de Instituto
              </label>
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

            {/* Tipo de Parceiro */}
            <fieldset className="mb-4 flex w-[48%] flex-col gap-1 text-white">
              <label className="text-base text-white" htmlFor="partnerType">
                Tipo de Parceiro
              </label>
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
            <label className="text-base text-white" htmlFor="phone">
              Telefone(opcional)
            </label>
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
            <label className="text-base text-white" htmlFor="address">
              Endereço(opcional)
            </label>
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
            <label className="text-base text-white" htmlFor="logoPhoto">
              Foto do Logotipo
            </label>
            <input
              className=" bg-grayInputModal p-2 outline-none rounded-md focus:ring-2 ring-violet"
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
            <label className="text-base text-white" htmlFor="galleryPhotos">
              Galeria de Imagens
            </label>
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
                  className="w-24 h-24 object-cover rounded-md"
                />
              ))}
          </div>


          <div className="mt-2 flex justify-end">
            <button className="inline-flex h-[35px] items-center justify-center rounded bg-violet px-4 font-medium leading-none text-white hover:bg-violet focus:shadow-[0_0_0_2px] focus:shadow-purple focus:outline-none">
              Salvar Instituto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
