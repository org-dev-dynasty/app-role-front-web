import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { IMAGES } from '@/constants/image';
import PasswordInput from '../input/Password';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/AppRouter';

const formSchema = z
  .object({
    code: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type ConfirmForgotPasswordFormData = z.infer<typeof formSchema>;

interface ConfirmForgotPasswordFormProps {
  onSuccess?: (data: ConfirmForgotPasswordFormData) => void;
  error?: string;
  loading?: boolean;
}

export function ConfirmForgotPasswordForm({
  onSuccess,
  loading,
  error,
}: ConfirmForgotPasswordFormProps) {
  const navigate = useNavigate();
  const form = useForm<ConfirmForgotPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
      confirmPassword: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSuccess?.(values);
  }

  function handleBack() {
    navigate(ROUTES.FORGOT_PASSWORD);
  }

  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className='flex flex-col gap-y-4'>
              <div className='w-full flex justify-center h-16'>
                <img
                  src={IMAGES.logo}
                  alt='AppRole Logo'
                  className='w-full h-full object-contain'
                />
              </div>
              <h2 className='text-center'>Nova senha</h2>

              {error && (
                <div className='w-full flex justify-center'>
                  <span className='text-sm text-destructive'>{error}</span>
                </div>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-center'>
            Foi enviado um e-mail com o código de recuperação
          </p>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input placeholder='Código' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='Senha' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar nova senha</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='Senha' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? 'Carregando' : 'Recuperar senha'}
            </Button>

            <Button
              variant='outline'
              type='submit'
              className='w-full'
              onClick={handleBack}
              disabled={loading}
            >
              Voltar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
