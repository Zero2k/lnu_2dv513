import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useStyletron } from 'baseui';
import { Button } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Checkbox, LABEL_PLACEMENT } from 'baseui/checkbox';
import { useMutation } from '@apollo/client';
import { HANDLE_PROFILE } from 'graphql/user';

interface ProfileFormValues {
  name: string;
  phone: string;
  email: string;
}

interface Props {
  resellerId: number;
  cart: any[];
}

function OrderForm({ resellerId, cart }: Props) {
  const [css] = useStyletron();
  const [] = useMutation(HANDLE_PROFILE);
  const {
    register,
    handleSubmit,
    setError,
    errors,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>();
  const [checked, setChecked] = React.useState(false);

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    console.log('resellerId', resellerId);
    console.log('form', data);
    console.log('cart', cart);
    /* const response = await handleProfile({
      variables: { ...data },
    });

    const { user, errors } = response.data.handleProfile;

    if (user && !errors) {
    } else {
      errors?.forEach((error) => {
        setError(error.path, { message: error.message });
      });
    } */
  };

  return (
    <>
      <form
        className={css({ width: '100%' })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl label={() => 'Namn'} error={errors.name?.message}>
          <Input
            name="name"
            placeholder="Namn"
            type="text"
            inputRef={register}
          />
        </FormControl>
        <FormControl
          label={() => 'Telefon & E-post'}
          error={errors.phone?.message || errors.email?.message}
        >
          <div className={css({ display: 'flex' })}>
            <div className={css({ width: '500px', paddingRight: '8px' })}>
              <Input
                name="phone"
                placeholder="Telefon"
                type="text"
                inputRef={register}
              />
            </div>
            <Input
              name="email"
              placeholder="E-post"
              type="text"
              inputRef={register}
            />
          </div>
        </FormControl>
        <Checkbox
          checked={checked}
          onChange={() => setChecked(!checked)}
          labelPlacement={LABEL_PLACEMENT.right}
        >
          Godkänn din beställning
        </Checkbox>
        <Button
          overrides={{
            BaseButton: { style: { marginTop: '15px' } },
          }}
          type="submit"
          disabled={!checked || isSubmitting}
        >
          Skicka beställning
        </Button>
      </form>
    </>
  );
}

export default OrderForm;
