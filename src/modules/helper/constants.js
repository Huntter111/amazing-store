export const TYPES = {
  product: 'product',
  productSize: 'productSize',
  productCost: 'productCost',
  drinkProduct: 'drinkProduct',
  drinkSize: 'drinkSize',
}

export const SINGLE_PRODUCT = {
  pizza: { value: 'pizza', label: 'Пицца' },
  burger: { value: 'burger', label: 'Бургер' },
  bowl: { value: 'bowl', label: 'Боул' },
  sushi: { value: 'sushi', label: 'Суши' },
  donner: { value: 'donner', label: 'Донер' },
  tacos: { value: 'tacos', label: 'Тако' },
}

export const SET_PRODUCTS = {
  PIZZA_MENU: { value: 'pizza menu', label: 'Пицца меню' },
  BURGER_MENU: { value: 'burger menu', label: 'Бургер меню' },
  BOWL_MENU: { value: 'bowl menu', label: 'Боул меню' },
  SUSHI_MENU: { value: 'sushi menu', label: 'Суши меню' },
  DONNER_MENU: { value: 'donner menu', label: 'Донер меню' },
  TACOS_MENU: { value: 'tacos menu', label: 'Тако меню' },
}

export const PRODUCT_SIZE = {
  small: { value: 'small', label: 'Маленький' },
  medium: { value: 'medium', label: 'Средний' },
  big: { value: 'big', label: 'Большой' },
}

export const PRODUCT_COST = {
  premium: { value: 'premium', label: 'Премиум' },
  middle: { value: 'middle', label: 'Средний' },
}

export const DRINK_PRODUCTS = {
  tea: { value: 'tea', label: 'Чай' },
  coffee: { value: 'coffee', label: 'Кофе' },
  cola: { value: 'cola', label: 'Кола' },
  sprite: { value: 'sprite', label: 'Спрайт' },
  fanta: { value: 'fanta', label: 'Фанта' },
  beer: { value: 'beer', label: 'Пиво' },
  juices: { value: 'juices', label: 'Соки' },
  cocktail: { value: 'cocktail', label: 'Коктейли' },
}

export const DRINK_SIZE = PRODUCT_SIZE

export const STEPS = {
  [TYPES.productSize]: PRODUCT_SIZE,
  [TYPES.productCost]: PRODUCT_COST,
  [TYPES.drinkProduct]: DRINK_PRODUCTS,
  [TYPES.drinkSize]: DRINK_SIZE,
}

export const TEXTS = {
  [TYPES.productSize]: { title: 'Выберите размер блюда' },
  [TYPES.productCost]: { title: 'Выберите ценовой диапазон' },
  [TYPES.drinkProduct]: { title: 'Выберите напиток' },
  [TYPES.drinkSize]: { title: 'Выберите размер напитка' },
}
