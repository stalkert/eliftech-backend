import { Good } from '../../goods/schemas/good.schema';

export interface PurchaseGoodItem {
  good: Good;
  checked: boolean;
}
