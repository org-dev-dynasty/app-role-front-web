/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "./http";

export async function sendMail(email: string, name: string, message: string) {
  try {
    const resp = await http.post('/sendMail', { email, name, message });
    if (resp.status === 200) {
      return true
    }

  } catch(error: any) {
    console.error(error)
    throw new Error('Erro ao enviar email: ' + error.message)
  }
  
}