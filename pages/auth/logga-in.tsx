import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [css] = useStyletron();
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <>
      <Block
        margin="50px auto"
        height="260px"
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
          <FormControl>
            <Button type="submit">Logga In</Button>
          </FormControl>
        </form>
      </Block>
    </>
  );
};

export default Login;
