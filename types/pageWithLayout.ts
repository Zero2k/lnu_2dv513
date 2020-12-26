import { NextPage } from 'next';
import Public from '../layouts/public';

type PageWithPublicLayoutType = NextPage & { layout: typeof Public };

type PageWithLayoutType = PageWithPublicLayoutType;

export default PageWithLayoutType;
