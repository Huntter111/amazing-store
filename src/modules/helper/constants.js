export const TYPES = {
  sets: 'sets',
  product: 'product',
  productSize: 'productSize',
  productCost: 'productCost',
  drinkProduct: 'drinkProduct',
  drinkSize: 'drinkSize',
  drinkCost: 'drinkCost',
}

export const SINGLE_PRODUCT = {
  pizza: { value: 'pizza', label: 'Піцца' },
  burger: { value: 'burger', label: 'Бургер' },
  bowl: { value: 'bowl', label: 'Боул' },
  sushi: { value: 'sushi', label: 'Суші' },
  donner: { value: 'donner', label: 'Донер' },
  tacos: { value: 'tacos', label: 'Тако' },
}

export const SET_PRODUCTS = {
  PIZZA_MENU: { value: 'pizzaMenu', label: 'Піцца меню' },
  BURGER_MENU: { value: 'burgerMenu', label: 'Бургер меню' },
  BOWL_MENU: { value: 'bowlMenu', label: 'Боул меню' },
  SUSHI_MENU: { value: 'sushiMenu', label: 'Суші меню' },
  DONNER_MENU: { value: 'donnerMenu', label: 'Донер меню' },
  TACOS_MENU: { value: 'tacosMenu', label: 'Тако меню' },
}

export const PRODUCT_SIZE = {
  small: { value: 'small', label: 'Маленький' },
  medium: { value: 'medium', label: 'Средній' },
  big: { value: 'big', label: 'Великий' },
}

export const PRODUCT_COST = {
  premium: { value: 'premium', label: 'Преміум' },
  middle: { value: 'middle', label: 'Середній' },
  cheap: { value: 'cheap', label: 'Дешевий' },
}

export const DRINK_PRODUCTS = {
  tea: { value: 'tea', label: 'Чай' },
  coffee: { value: 'coffee', label: 'Кофе' },
  cola: { value: 'cola', label: 'Кола' },
  sprite: { value: 'sprite', label: 'Спрайт' },
  fanta: { value: 'fanta', label: 'Фанта' },
  beer: { value: 'beer', label: 'Пиво' },
  juices: { value: 'juices', label: 'Соки' },
  cocktail: { value: 'cocktail', label: 'Коктейлі' },
}

export const DRINK_SIZE = PRODUCT_SIZE
export const DRINK_COST = PRODUCT_COST

export const STEPS = {
  [TYPES.productSize]: PRODUCT_SIZE,
  [TYPES.productCost]: PRODUCT_COST,
  [TYPES.drinkProduct]: DRINK_PRODUCTS,
  [TYPES.drinkSize]: DRINK_SIZE,
  [TYPES.drinkCost]: DRINK_COST,
}

export const TEXTS = {
  [TYPES.productSize]: { title: 'Оберіть розмір продукту' },
  [TYPES.productCost]: { title: 'Оберіть ціновий діапазон' },
  [TYPES.drinkProduct]: { title: 'Оберіть напій' },
  [TYPES.drinkSize]: { title: 'Оберіть розмір напою' },
  [TYPES.drinkCost]: { title: 'Оберіть ціновий діапазон' },
}
