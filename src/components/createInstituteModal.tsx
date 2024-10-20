import React, { useContext, useEffect, useState } from 'react';
import { InstituteContext } from '../context/institute_context';
import { ClipLoader } from 'react-spinners';

interface InstituteModalProps {
  setIsCreateInstituteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onInstituteCreated?: () => void;
}

export default function Institute({ setIsCreateInstituteModalOpen, onInstituteCreated }: InstituteModalProps) {
  const [isVisible, setIsVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const { createInstitute } = useContext(InstituteContext);
  const [instituteName, setInstituteName] = useState("");
  const [description, setDescription] = useState("");
  const [instituteType, setInstituteType] = useState("ESTABELECIMENTO_FIXO");
  const [partnerType, setPartnerType] = useState("GLOBAL_PARTNER");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [logoPhoto, setLogoPhoto] = useState<File | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState<File[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Torna o modal visível quando é montado
  }, []);

  // Função para aplicar a máscara de telefone
  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length > 14) {
      return phone;
    }
    const match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
    if (match) {
      return `+${match[1]} ${match[2]}-${match[3]}`;
    } else if (cleaned.length <= 10) {
      return `+${cleaned}`;
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formatted = formatPhone(input);
    setPhone(formatted);
  };

  const saveInstituteClick = async () => {
    if (isCreating) return;
    setIsCreating(true);
    const data = {
      name: instituteName,
      description: description,
      institute_type: instituteType,
      partner_type: partnerType,
      phone: phone,
      address: address,
      logo_photo: logoPhoto,
      photos_url: galleryPhotos
    };

    try {
      await createInstitute(data);
      if (onInstituteCreated) {
        onInstituteCreated();
      }
      setIsCreateInstituteModalOpen(false);
    } catch (error: any) {
      console.error("Erro ao criar instituto:", error.message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`fixed overflow-y-auto left-1/2 top-1/2 max-h-[85vh] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grayModal p-[25px] shadow-lg transition-transform duration-300 transform ${isVisible ? 'scale-100' : 'scale-95'}`}>
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
            onChange={(e) => setInstituteName(e.target.value)}
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
            onChange={(e) => setDescription(e.target.value)}
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
              onChange={(e) => setInstituteType(e.target.value)}
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
              onChange={(e) => setPartnerType(e.target.value)}
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
            placeholder="+XX XXXX-XXXX"
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
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Digite o endereço"
          />
        </fieldset>

        {/* Upload da Logo */}
        <fieldset className="mb-4 flex flex-col gap-1 text-white">
          <label className="text-base text-white" htmlFor="logoPhoto">
            Foto do Logotipo
          </label>
          <input
            className="bg-grayInputModal p-2 outline-none rounded-md focus:ring-2 ring-violet"
            id="logoPhoto"
            type="file"
            onChange={(e) => e.target.files && setLogoPhoto(e.target.files[0])}
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
            className="bg-grayInputModal p-2 outline-none rounded-md focus:ring-2 ring-violet"
            id="galleryPhotos"
            type="file"
            multiple
            onChange={(e) => e.target.files && setGalleryPhotos(Array.from(e.target.files))}
          />
        </fieldset>

        <div className="flex flex-wrap gap-2">
          {galleryPhotos.length > 0 &&
            galleryPhotos.map((photo, index) => (
              <img
                key={index}
                src={URL.createObjectURL(photo)}
                alt="Imagem da galeria"
                className="w-24 h-24 mb-4 object-cover rounded-md"
              />
            ))}
        </div>

        <div className="flex flex-row justify-end gap-4">
          <button
            className="mt-5 inline-flex h-12 items-center justify-center rounded-md bg-red-600 px-6 font-medium text-white"
            onClick={() => setIsCreateInstituteModalOpen(false)}
          >
            Cancelar
          </button>
          <button
            className="mt-5 inline-flex h-12 items-center justify-center rounded-md bg-violet px-6 font-medium text-white"
            onClick={saveInstituteClick}
            disabled={isCreating}
          >
            {isCreating ? <ClipLoader color="white" size={20} /> : "Salvar Instituto"}
          </button>
        </div>
      </div>
    </div>
  );
}
