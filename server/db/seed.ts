import db from '.';
import { Category } from '../entity/Category';
import { Product } from '../entity/Product';
import { User } from '../entity/User';

const seed = async () => {
  await db();

  /* Create test reseller */
  await User.create({
    email: 'test@test.com',
    password: 'test@test.com',
  }).save();

  /* Create default product categories */
  const pyrosatser = await Category.create({
    name: 'Pyrosatser',
  }).save();

  const familjesatser = await Category.create({
    name: 'Familjesatser',
  }).save();

  const bombtartor = await Category.create({
    name: 'Bombtårtor',
  }).save();

  const fyreverkeritartor = await Category.create({
    name: 'Fyreverkeritårtor',
  }).save();

  const proffsfyrverkerier = await Category.create({
    name: 'Proffsfyrverkerier',
  }).save();

  const inomhus = await Category.create({
    name: 'Inomhus & Tomtebloss',
  }).save();

  const markpjaser = await Category.create({
    name: 'Markpjäser & Airbombs',
  }).save();

  const overigt = await Category.create({
    name: 'Övrigt',
  }).save();

  /* Create products */
  await Product.create({
    name: 'Pyropack Extreme',
    description: 'Vår största pyrosats med en riklig blandning av markpjäser.',
    art: 504,
    price: 199,
    category: pyrosatser,
  }).save();

  await Product.create({
    name: 'Big Bang Bomb Pack',
    description:
      'Bombpaketet med bomber i olika kaliber som har grymma effekter.',
    art: 220,
    price: 399,
    category: familjesatser,
  }).save();

  await Product.create({
    name: 'Bonfire 82 Krevader',
    description:
      'Vår storsäljande tårta med noggrant utvalda effekter och hög prestanda som slår er med häpnad.',
    art: 466,
    price: 699,
    category: fyreverkeritartor,
  }).save();

  await Product.create({
    name: 'Brage 42 krevader',
    description:
      'Ett komplett fyrverkeri med alla regnbågens färger som fyller himlen.',
    art: 468,
    price: 299,
    category: fyreverkeritartor,
  }).save();

  await Product.create({
    name: 'Yes Box 135 Krevader',
    description:
      'Proffstårta med allt från eldbägare till kraftiga bomber, med en spektakulär final som fyller himlen.',
    art: 891,
    price: 1999,
    category: proffsfyrverkerier,
  }).save();

  await Product.create({
    name: 'Alien Fountain',
    description: 'Lysande & sprakande fontän med utomjordiska effekter.',
    art: 1823,
    price: 199,
    category: markpjaser,
  }).save();

  await Product.create({
    name: 'Himmelslykta',
    description:
      'Populärt tyst fyrverkeri. Sänd önskningar till stjärnorna. Lyktan stiger sakta mot skyn.',
    art: 200,
    price: 49,
    category: overigt,
  }).save();

  await Product.create({
    name: 'Jätte Tomtebloss 5 Pack',
    description: 'Sprakande guldsken.',
    art: 2006,
    price: 19,
    category: inomhus,
  }).save();

  await Product.create({
    name: 'Mighty Explosive',
    description:
      'Bombtårtan som briserar med 25st. Gigantiska effekter som har den bästa prestanda man kan önska.',
    art: 229,
    price: 1399,
    category: bombtartor,
  }).save();
};

seed();
