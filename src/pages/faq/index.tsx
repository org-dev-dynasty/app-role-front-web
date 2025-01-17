import { useState } from "react";
import { envs } from "../../utils/envs";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Atualização do aplicativo",
    answer: "",
  },
  {
    question:
      "O cálculo da média ou a função “atingir meta” está errada ou não está funcionando corretamente, o que devo fazer?",
    answer:
      "Cálculo da média ou a função “atingir meta” esteja errada ou não esteja funcionando corretamente no aplicativo do DevMédias, por favor envie um e-mail para devmedias.devmaua@gmail.com notificando o problema.",
  },
  {
    question:
      "Está faltando alguma disciplina ou os pesos dos trabalhos e provas estão incorretos, o que devo fazer?",
    answer: "",
  },
  {
    question:
      "O que fazer se alguém pedir meus dados por WhatsApp dizendo que é um funcionário do DevMédias?",
    answer: "",
  },
  {
    question: "Em caso de dúvidas, como faço para entrar em contato?",
    answer: "",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="bg-[#2A2A2A] min-h-screen flex flex-col items-center justify-center">
      {/* Imagem centralizada */}
      <img
        src={`${envs.cloudfrontUrl}/approle_logo_navbar.png`}
        alt="AppRole Logo"
        className="h-16 mb-6"
      />

      {/* Conteúdo FAQ centralizado */}
      <div className="w-full max-w-[800px] p-5">
        <h1 className="text-4xl font-bold text-center text-white mb-6">FAQ</h1>
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-300 gap-2 mb-4 rounded-md overflow-hidden hover:bg-light-purple"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left p-3 text-xl flex justify-between items-center text-white font-medium  transition-colors duration-300"
            >
              {item.question}
              <span className="text-gray-400">
                {openIndex === index ? "˄" : "˅"}
              </span>
            </button>
            <div
              className={`pl-4 text-white transition-[max-height] duration-500 ease-in-out ${
                openIndex === index ? "max-h-40" : "max-h-0"
              }`}
              style={{ overflow: "hidden" }}
            >
              <div className="pb-4">
                {item.answer || "Conteúdo em construção."}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
