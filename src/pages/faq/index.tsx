import { useState } from "react";
import { envs } from "../../utils/envs";

interface FAQItem {
  question: string;
  answer: string;
  link?: string;
  textLink?: string;
}

const faqData: FAQItem[] = [
  {
    question: "O que é o app ROLE?",
    answer:
      "O ROLE é um aplicativo que te ajuda a encontrar os melhores eventos, festas, baladas e bares em São Paulo, de forma rápida e prática.",
  },
  {
    question: "O app ROLE é gratuito?",
    answer:
      "Sim, o download e o uso do app são gratuitos. Algumas funcionalidades, como compra de pacotes ou ingressos, podem envolver custos adicionais.",
  },
  {
    question: "Onde o app ROLE está disponível?",
    answer:
      "Atualmente, o app ROLE está disponível para eventos em São Paulo. Em breve, pretendemos expandir para outras regiões.",
  },
  {
    question: "O app está disponível para Android e iOS?",
    answer:
      "Sim! Você pode baixá-lo na Google Play Store (Android) e na Apple App Store (iOS).",
  },
  {
    question: "Como eu encontro eventos no ROLE?",
    answer:
      "Na aba Home, você pode usar a barra de pesquisa ou aplicar filtros como data, região, gênero musical, faixa etária e preço para encontrar o evento perfeito para você.",
  },
  {
    question: "O que são os pacotes no app ROLE?",
    answer:
      "Os pacotes incluem opções como camarotes, combos de bebidas ou aniversários, que podem ser fechados diretamente pelo app.",
  },
  {
    question: "Consigo ver quais amigos irão ao evento?",
    answer:
      "Sim! Na aba Social, você pode ver quem dos seus amigos está confirmado em cada evento.",
  },
  {
    question: "Posso comprar ingressos pelo ROLE?",
    answer:
      "Ainda não! Você pode adquirir ingressos em outra plataforma pelo botão disponibilizado no ROLE selecionado.",
  },
  {
    question: "Como faço para criar uma conta no app ROLE?",
    answer:
      "Baixe o app, clique em 'Criar conta' e preencha os campos necessários. Você pode conectar-se usando seu e-mail, número de telefone ou conta do Google/Apple.",
  },
  {
    question: "Posso personalizar meu perfil no ROLE?",
    answer:
      "Sim! Na aba Perfil, você pode adicionar foto, nome, bio e conectar-se com amigos.",
  },
  {
    question: "Esqueci minha senha. O que fazer?",
    answer:
      "Na tela de login, clique em 'Esqueci minha senha' e siga as instruções para redefini-la.",
  },
  {
    question: "O app está lento ou travando. O que fazer?",
    answer:
      "Certifique-se de que está usando a versão mais recente do app e que sua conexão com a internet está estável. Se o problema persistir, entre em contato com nosso suporte.",
  },
  {
    question: "Não consigo acessar minha conta. O que fazer?",
    answer:
      "Verifique se está usando o e-mail/telefone correto. Caso continue com problemas, envie um e-mail para suporte@roleapp.com.br.",
  },
  {
    question: "Posso pedir reembolso de um ingresso ou pacote?",
    answer:
      "Depende da política do evento ou estabelecimento. Verifique os detalhes do evento antes de realizar a compra e entre em contato com o suporte caso necessário.",
  },
  {
    question: "Minhas informações estão protegidas no ROLE?",
    answer:
      "Sim! Valorizamos a segurança dos nossos usuários e seguimos todas as práticas recomendadas de proteção de dados. Para mais informações, consulte nosso documento completo em:",
    link: "https://docs.google.com/document/d/1TNHSuWWGY9T4NlfGxheUs5qvsbju4Rwa/",
    textLink: 'Política de Privacidade',

  },
  {
    question: "Como faço para excluir minha conta?",
    answer:
      "Vá no seu PERFIL, clique no ícone do canto superior direito e acesse CONTA, clique em EXCLUIR CONTA e siga os passos até sua conta ser excluída. Além disso, você pode preencher o formulário disponível aqui:",
    link: "https://forms.gle/V2wWt9GnTixH3PMNA",
    textLink: 'Formulário de Exclusão de Conta',
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
              className="w-full text-left p-3 text-xl flex justify-between items-center text-white font-medium transition-colors duration-300"
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
                <p>{item.answer}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white underline font-semibold"
                  >
                    {item.textLink}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
