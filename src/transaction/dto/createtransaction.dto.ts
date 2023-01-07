export class CreateTransactionDTO {
  readonly from_currency: string;
  readonly from_amount: number;
  readonly to_currency: string;
  readonly to_amount: number;
  readonly scrapped_date: Date;
  readonly price_type: string;
}
