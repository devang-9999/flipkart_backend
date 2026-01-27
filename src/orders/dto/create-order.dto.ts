export class CreateOrderDto {
  address: string;
  phoneNumber: string;
  paymentMethod: 'COD' | 'ONLINE';
}
