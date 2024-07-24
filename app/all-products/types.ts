export type ProductFilterType = ProductPriceFilter | ProductCategoryFilter;

export enum ProductPriceFilter {
  LOW_TO_HIGH = 'Low to High',
  HIGH_TO_LOW = 'High to Low',
  LESS_THAN_200 = 'Less than $200',
}

export enum ProductCategoryFilter {
  BEAUTY = 'Beauty',
  CLOTHING = 'Clothing',
  ELECTRONICS = 'Electronics',
  HOME_GOODS = 'Home Goods',
  TOYS = 'Toys',
}