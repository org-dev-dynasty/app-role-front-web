/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "./http";

export async function sendMail(email: string, name: string, message: string) {
  try {
    const resp = await http.post('/send-email', { to : "contato@roleapp.com.br", subject : name,
      text : `Tem um novo usuário querendo participar do ROLE: ${name} - ${email}. Mensagem: ${message}`
    });
    if (resp.status === 200) {
      return true
    }

  } catch(error: any) {
    console.error(error.message)
    throw new Error('Erro ao enviar email: ' + error.message)
  }
}

export async function sendMailParticpant(email: string) {
  try {
    const resp = await http.post('/send-email', { to : email, subject: 'Captura de novo participante para o ROLE', text: `${email} deseja participar do ROLE`} );

    if (resp.status === 200) {
      return true
    }

  } catch(error: any) {
    console.error(error.message)
    throw new Error('Erro ao enviar email: ' + error.message)
  }
}