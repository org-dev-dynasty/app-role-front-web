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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignInFormData = z.infer<typeof formSchema>;

interface SinInFormProps {
  onSuccess?: (data: SignInFormData) => void;
  error?: string;
  loading?: boolean;
}

export function SignInForm({ onSuccess, loading, error }: SinInFormProps) {
  const navigate = useNavigate();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSuccess?.(values);
  }

  function handleForgotPassword() {
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

              {error && (
                <div className='w-full flex justify-center'>
                  <span className='text-sm text-destructive'>{error}</span>
                </div>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder='E-mail' {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              {loading ? 'Carregando' : 'Login'}
            </Button>

            <Button
              variant='ghost'
              type='submit'
              className='w-full'
              onClick={handleForgotPassword}
            >
              Recuperar senha
            </Button>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
