import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import _ from 'lodash';
import { useStyletron } from 'baseui';
import { Button } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { useLazyQuery } from '@apollo/client';
import { CHECK_ORDERSTATUS_QUERY } from 'graphql/order';
import { getAsInt } from 'utils/getAsInt';

interface ProfileFormValues {
  customerId: string;
}

interface Props {
  resellerId: string;
  setOrderStatus: (data: any) => void;
}

function OrderStatusForm({ resellerId, setOrderStatus }: Props) {
  const [css] = useStyletron();
  const {
    register,
    handleSubmit,
    setError,
    errors,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>();
  const [findCustomerOrder, { data: customerData }] = useLazyQuery(
    CHECK_ORDERSTATUS_QUERY
  );

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    if (data.customerId) {
      findCustomerOrder({
        variables: {
          resellerId: getAsInt(resellerId),
          customerId: data.customerId,
        },
      });
    } else {
      setError('customerId', { message: 'Du måste ange ditt telefonnummer' });
    }
  };

  React.useEffect(() => {
    setOrderStatus(customerData);
  }, [customerData]);

  return (
    <>
      <form
        className={css({ maxWidth: '550px' })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl label={() => 'Telefon'} error={errors.customerId?.message}>
          <Input
            name="customerId"
            placeholder="Telefon"
            type="text"
            inputRef={register}
          />
        </FormControl>
        <Button
          overrides={{
            BaseButton: { style: { marginTop: '15px' } },
          }}
          type="submit"
          disabled={isSubmitting}
        >
          Kolla orderstatus
        </Button>
      </form>
    </>
  );
}

export default OrderStatusForm;
