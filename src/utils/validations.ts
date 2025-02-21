import { z } from 'zod';

export const phoneValidation = z
  .string()
  .regex(/^$$\d{2}$$\s\d{4,5}-\d{4}$/, 'Formato de telefone inválido')
  .min(14, 'O número de telefone deve estar completo')
  .max(16, 'O número de telefone deve estar completo');

Location;

export const addressValidation = z.object({
  address: z.string().min(1, 'Endereço é obrigatório'),
  number: z.string().min(1, 'Número é obrigatório'),
  cep: z.string().min(1, 'CEP é obrigatório'),
  city: z.string(),
  neighborhood: z.string(),
  state: z.string(),
  latitude: z.string(),
  longitude: z.string(),
});
