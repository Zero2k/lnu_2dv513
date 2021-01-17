import * as React from 'react';
import _ from 'lodash';
import { Block } from 'baseui/block';
import Private from '../../layouts/private';
import HandleProductsForm from 'forms/handleProducts';
import { useIsAuth } from 'utils/useIsAuth';
import { useQuery } from '@apollo/client';
import { CATEGORIES_QUERY } from 'graphql/category';
import { isServer } from 'utils/isServer';
import { useRouter } from 'next/router';

const Produkter = () => {
  const { currentUser, loading } = useIsAuth();
  const [products, setProducts] = React.useState({});
  const categoryData = useQuery(CATEGORIES_QUERY, { skip: isServer() });
  const router = useRouter();
  const { data, loading: loadingCategory } = categoryData;

  React.useEffect(() => {
    const products = {};
    const categories: any = _.groupBy(data?.categories, 'name');
    for (const [key, value] of Object.entries(categories)) {
      const categoryWithProducts = { [key]: value[0].products };
      const allProducts = Object.assign(products, categoryWithProducts);
      setProducts(allProducts);
    }
  }, [data]);

  if (loading || loadingCategory)
    return (
      <React.Fragment>
        <div>Loading...</div>
      </React.Fragment>
    );

  return (
    <>
      <Block
        margin="20px auto"
        height={['80px', '200px', '250px', '560px']}
        maxWidth="550px"
        display="flex"
        flexWrap
      >
        <HandleProductsForm
          products={products}
          userProducts={currentUser?.products}
          redirect={() => router.push('/konto/oversikt')}
        />
      </Block>
    </>
  );
};

Produkter.layout = Private;

export default Produkter;
