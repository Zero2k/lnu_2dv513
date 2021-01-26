import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import _ from 'lodash';
import { useStyletron } from 'baseui';
import { Button } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Checkbox, LABEL_PLACEMENT } from 'baseui/checkbox';
import { useSnackbar } from 'baseui/snackbar';
import { useMutation } from '@apollo/client';
import { ORDER_MUTATION } from 'graphql/order';

interface ProfileFormValues {
  customerName: string;
  customerId: string;
  customerEmail: string;
}

interface Props {
  resellerId: string;
  cart: any[];
  setFormPart: (part: number) => void;
}

function OrderForm({ resellerId, cart, setFormPart }: Props) {
  const [css] = useStyletron();
  const [createOrder] = useMutation(ORDER_MUTATION);
  const { enqueue } = useSnackbar();
  const {
    register,
    handleSubmit,
    setError,
    errors,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>();
  const [checked, setChecked] = React.useState(false);

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    const formatCart = _.each(
      cart,
      (item) => (item.id = parseInt(item.id, 10))
    );
    const productIds = _.map(formatCart, 'id');
    const response = await createOrder({
      variables: {
        userId: parseInt(resellerId),
        productIds,
        customerId: data.customerId,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
      },
    });

    console.log(response);

    const { order, errors } = response.data.createOrder;

    if (order && !errors) {
      enqueue({ message: 'Din order har blivit skapad.' });
      setFormPart(3);
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
        <FormControl label={() => 'Namn'} error={errors.customerName?.message}>
          <Input
            name="customerName"
            placeholder="Namn"
            type="text"
            inputRef={register}
          />
        </FormControl>
        <FormControl
          label={() => 'Telefon & E-post'}
          error={errors.customerId?.message || errors.customerEmail?.message}
        >
          <div className={css({ display: 'flex' })}>
            <div className={css({ width: '500px', paddingRight: '8px' })}>
              <Input
                name="customerId"
                placeholder="Telefon"
                type="text"
                inputRef={register}
              />
            </div>
            <Input
              name="customerEmail"
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
