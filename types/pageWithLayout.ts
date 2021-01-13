import { NextPage } from 'next';
import Public from '../layouts/public';
import Private from '../layouts/private';

type PageWithPublicLayoutType = NextPage & { layout: typeof Public };
type PageWithPrivateLayoutType = NextPage & { layout: typeof Private };

type PageWithLayoutType = PageWithPublicLayoutType | PageWithPrivateLayoutType;

export default PageWithLayoutType;
