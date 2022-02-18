import { DealTemplate } from '../../common/entities/DealTemplate';
import { SelectFieldOption } from '../components/atoms/Select/SelectField';

export enum DealType {
  FixedAmount = 'fixed-amount',
  Percentage = 'percentage',
  FreeDelivery = 'free-delivery',
}
export function getDealTypeFromDealTemplate(
  dealTemplate: DealTemplate
): DealType | undefined {
  if (dealTemplate.discountAmountRewardBehavior) {
    return DealType.FixedAmount;
  }
  if (dealTemplate.discountPercentageRewardBehavior) {
    return DealType.Percentage;
  }
  if (dealTemplate.freeDeliveryRewardBehavior) {
    return DealType.FreeDelivery;
  }
}

export const dealTypeSelectFieldOptions = (deps: {
  translate: (key: string) => string;
}): SelectFieldOption[] => {
  const vals: SelectFieldOption[] = Object.values(DealType).map((v) => ({
    id: v,
    text: deps.translate(v),
    value: v,
  }));
  return vals;
};
