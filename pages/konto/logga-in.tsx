import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button, KIND } from 'baseui/button';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { SIGNIN } from 'graphql/user';
import { useRouter } from 'next/router';

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [css, theme] = useStyletron();
  const [signIn] = useMutation(SIGNIN);
  const space = css({ marginLeft: theme.sizing.scale300 });
  const {
    register,
    handleSubmit,
    setError,
    errors,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    const response = await signIn({ variables: { email, password } });

    const { user, errors } = response.data.signIn;

    if (user) {
      router.push('/konto/oversikt');
    } else {
      errors?.forEach((error) => {
        setError(error.path, { message: error.message });
      });
    }
  };

  return (
    <>
      <Block
        margin="50px auto"
        height={['80px', '200px', '250px', '560px']}
        maxWidth="550px"
        display="flex"
        alignContent="center"
        justifyContent="center"
        flexWrap
      >
        <form
          className={css({ width: '100%' })}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl label={() => 'Email'} error={errors.email?.message}>
            <Input
              name="email"
              placeholder="Email"
              type="email"
              inputRef={register}
            />
          </FormControl>
          <FormControl
            label={() => 'Password'}
            error={errors.password?.message}
          >
            <Input
              name="password"
              placeholder="Password"
              type="password"
              inputRef={register}
            />
          </FormControl>
          <div>
            <Button type="submit" kind={KIND.primary} disabled={isSubmitting}>
              Logga in
            </Button>
            <span className={space} />
            <Link href="/konto/skapa-konto">
              <Button kind={KIND.secondary} $as="a">
                Skapa konto
              </Button>
            </Link>
          </div>
        </form>
      </Block>
    </>
  );
};

export default Login;
