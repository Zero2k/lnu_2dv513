import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button, KIND } from 'baseui/button';
import Link from 'next/link';

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [css, theme] = useStyletron();
  const space = css({ marginLeft: theme.sizing.scale300 });
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

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
          <FormControl label={() => 'Email'}>
            <Input
              name="email"
              placeholder="Email"
              type="email"
              inputRef={register}
            />
          </FormControl>
          <FormControl label={() => 'Password'}>
            <Input
              name="password"
              placeholder="Password"
              type="password"
              inputRef={register}
            />
          </FormControl>
          <div>
            <Button type="submit" kind={KIND.primary}>
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
