import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Select, Value } from 'baseui/select';
import { useStyletron } from 'baseui';
import { Button, SHAPE, ButtonProps, KIND, SIZE } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { useMutation } from '@apollo/client';
import { HANDLE_PRODUCTS } from 'graphql/product';
import { ME_QUERY } from 'graphql/user';

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
            marginTop: $theme.sizing.scale200,
          }),
        },
      }}
    />
  );
}

interface ProductsFormValues {
  id: number;
}

interface Props {
  setStep?: (step: number) => void;
  redirect?: () => void;
  products?: any;
  userProducts?: any;
}

function HandleProductsForm({
  setStep,
  redirect,
  products,
  userProducts,
}: Props) {
  const [css] = useStyletron();
  const [values, setValues] = React.useState<Value>([]);
  const [handleProducts] = useMutation(HANDLE_PRODUCTS);
  const {
    handleSubmit,
    setError,
    errors,
    clearErrors,
    formState: { isSubmitting },
  } = useForm<ProductsFormValues>();

  React.useEffect(() => {
    if (userProducts) {
      setValues(userProducts);
    }
  }, [userProducts]);

  const onSubmit: SubmitHandler<ProductsFormValues> = async () => {
    const productIds = values.map((item) => parseInt(item.id.toString()));
    let deleteAction: boolean = false;
    if (userProducts) {
      deleteAction = !!(userProducts.length >= values.length);
    }

    const response = await handleProducts({
      variables: { productIds, deleteAction },
      update: async (cache, { data: { handleProducts } }) => {
        cache.writeQuery({
          query: ME_QUERY,
          data: {
            __typename: 'User',
            me: {
              products: handleProducts.products,
            },
          },
        });
      },
    });

    const { products, errors } = response.data.handleProducts;

    if (products && !errors) {
      setStep && setStep(2);
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
        <FormControl label={() => 'Produkter'} error={errors.id?.message}>
          <Select
            labelKey="name"
            valueKey="id"
            options={products}
            onChange={({ value }) => {
              clearErrors(), setValues(value);
            }}
            value={values}
            multi
            closeOnSelect={false}
            maxDropdownHeight="250px"
          />
        </FormControl>
        <SpacedButton type="submit" disabled={isSubmitting}>
          Spara
        </SpacedButton>
      </form>
    </>
  );
}

export default HandleProductsForm;
