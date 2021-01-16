import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useStyletron } from 'baseui';
import { Button, SHAPE, ButtonProps, KIND, SIZE } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { useMutation } from '@apollo/client';
import { HANDLE_PROFILE } from 'graphql/user';

function SpacedButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      shape={SHAPE.pill}
      kind={KIND.secondary}
      size={SIZE.compact}
      overrides={{
        BaseButton: {
          style: ({ $theme }) => ({
            marginLeft: $theme.sizing.scale200,
            marginRight: $theme.sizing.scale200,
            marginTop: $theme.sizing.scale700,
          }),
        },
      }}
    />
  );
}

interface ProfileFormValues {
  name: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
}

interface Props {
  setStep?: (step: number) => void;
  redirect?: () => void;
  user: any;
}

function HandleProfileForm({ setStep, redirect, user }: Props) {
  const [css] = useStyletron();
  const [handleProfile] = useMutation(HANDLE_PROFILE);
  const {
    register,
    handleSubmit,
    setError,
    errors,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      address: user?.address,
      zip: user?.zip,
      city: user?.city,
    },
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    const response = await handleProfile({
      variables: { ...data },
    });

    const { user, errors } = response.data.handleProfile;

    if (user && !errors) {
      setStep && setStep(1);
      redirect && redirect();
    } else {
      errors?.forEach((error) => {
        setError(error.path, { message: error.message });
      });
    }
  };

  return (
    <>
      <form
        className={css({ width: '100%' })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl label={() => 'Företagsnamn'} error={errors.name?.message}>
          <Input
            name="name"
            placeholder="Namn"
            type="text"
            inputRef={register}
          />
        </FormControl>
        <FormControl label={() => 'Telefon'} error={errors.phone?.message}>
          <Input
            name="phone"
            placeholder="Telefon"
            type="text"
            inputRef={register}
          />
        </FormControl>
        <FormControl label={() => 'Adress'} error={errors.address?.message}>
          <Input
            name="address"
            placeholder="Adress"
            type="text"
            inputRef={register}
          />
        </FormControl>
        <div className={css({ display: 'flex' })}>
          <div className={css({ width: '300px', paddingRight: '8px' })}>
            <Input
              name="zip"
              placeholder="PostNr"
              type="text"
              inputRef={register}
            />
          </div>
          <Input
            name="city"
            placeholder="Stad"
            type="text"
            inputRef={register}
          />
        </div>
        <SpacedButton type="submit" disabled={isSubmitting}>
          Spara
        </SpacedButton>
      </form>
    </>
  );
}

export default HandleProfileForm;
