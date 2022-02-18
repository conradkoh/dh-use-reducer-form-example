import { DealTemplate } from '../../common/entities/DealTemplate';

export const formatDealTemplateAsDiscount =
  (deps: { translate: (v: string) => string }) =>
  (dealTemplate: DealTemplate): string => {
    if (dealTemplate.discountAmountRewardBehavior) {
      return `$${dealTemplate.discountAmountRewardBehavior.amount} off`;
    }
    if (dealTemplate.discountPercentageRewardBehavior) {
      return `${dealTemplate.discountPercentageRewardBehavior?.percentage}% off`;
    }
    if (dealTemplate.freeDeliveryRewardBehavior) {
      return `Free Delivery!`;
    }
    return '';
  };
