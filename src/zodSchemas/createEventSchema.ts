import { z } from 'zod'

export const createEventSchema = z.object({
  name: z
    .string({ required_error: 'O campo nome é obrigatório.' })
    .min(1, 'O campo nome é obrigatório.') // Para garantir que o campo não seja vazio
    .max(100, 'O nome pode ter no máximo 100 caracteres.'),

  description: z
    .string({ required_error: 'O campo descrição é obrigatório.' })
    .min(1, 'O campo descrição é obrigatório.')
    .min(5, 'A descrição deve ter pelo menos 5 caracteres.'),

  address: z
    .string({ required_error: 'O campo endereço é obrigatório.' })
    .min(1, 'O campo endereço é obrigatório.')
    .max(70, 'O endereço pode ter no máximo 70 caracteres.'),

  eventDate: z
    .date({ required_error: 'A data do evento é obrigatória.' })
    .refine(date => date > new Date(), {
      message: 'A data do evento deve ser no futuro.'
    }),

  price: z
    .number({ required_error: 'O campo preço é obrigatório.' })
    .min(1, 'O preço mínimo deve ser 1.')
    .max(5, 'O preço máximo permitido é 5.'),

  category: z
    .string({ required_error: 'O campo categoria é obrigatório.' })
    .min(1, 'O campo categoria é obrigatório.'),

  ageRange: z
    .string({ required_error: 'O campo faixa etária é obrigatório.' })
    .min(1, 'O campo faixa etária é obrigatório.'),

  musicType: z
    .array(z.string({ required_error: 'Cada tipo de música é obrigatório.' }))
    .nonempty('É necessário incluir pelo menos um tipo de música.')
    .min(1, 'É necessário incluir pelo menos um tipo de música.'),

  districtId: z
    .string({ required_error: 'O campo do distrito é obrigatório.' })
    .min(1, 'O campo do distrito é obrigatório.'),

  instituteId: z
    .string({ required_error: 'O campo ID da instituição é obrigatório.' })
    .min(1, 'O campo ID da instituição é obrigatório.'),

  features: z
    .array(z.string({ required_error: 'Cada característica é obrigatória.' }))
    .min(1, 'É necessário incluir pelo menos uma característica.'),

  menuLink: z
    .string({ required_error: 'O link do menu é obrigatório.' })
    .url('O link do menu deve ser uma URL válida.')
    .optional(),

  packageType: z
    .array(z.string())
    .optional(),

  ticketUrl: z
    .string({ required_error: 'O link do ingresso é obrigatório.' })
    .url('O link do ingresso deve ser uma URL válida.')
    .optional(),

  eventStatus: z
    .string({ required_error: 'O campo status do evento é obrigatório.' })
    .min(1, 'O campo status do evento é obrigatório.')
})
