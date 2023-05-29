export class OrderGoodDto {
  id;
  shopId;
  name;
  imageUrl;
  price;
  count;
}

export class Customer {
  name;
  email;
  phone;
  address;
}
export class CreateOrderDto {
  cartGoods: OrderGoodDto[];
  customer: Customer;
}