import { Good } from '../../goods/schemas/good.schema';

export interface FridgeGoodItem {
  good: Good;
  checked: boolean;
}
