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
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/AppRouter';

const formSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordFormData = z.infer<typeof formSchema>;

interface ForgotPasswordFormProps {
  onSuccess?: (data: ForgotPasswordFormData) => void;
  error?: string;
  loading?: boolean;
}

export function ForgotPasswordForm({
  onSuccess,
  loading,
  error,
}: ForgotPasswordFormProps) {
  const navigate = useNavigate();
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSuccess?.(values);
  }

  function handleBack() {
    navigate(ROUTES.LOGIN);
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
              <h2 className='text-center'>Recuperar senha</h2>
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
            Informe o e-mail cadastrado para receber o link de recuperação
          </p>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder='E-mail' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? 'Carregando' : 'Enviar código de recuperação'}
            </Button>

            <Button
              variant='outline'
              type='submit'
              className='w-full'
              disabled={loading}
              onClick={handleBack}
            >
              voltar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
