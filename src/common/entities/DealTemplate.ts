export interface DealTemplate {
  id: string;
  discountAmountRewardBehavior?: DiscountAmountRewardBehavior;
  discountPercentageRewardBehavior?: DiscountPercentageRewardBehavior;
  freeDeliveryRewardBehavior?: FreeDeliveryRewardBehavior;
  attributes: DealTemplateAttributes;
}

export interface DiscountAmountRewardBehavior {
  amount: number;
}

export interface DiscountPercentageRewardBehavior {
  percentage: number;
}

export interface FreeDeliveryRewardBehavior {
  freeDelivery: 'free-delivery';
}

export interface DealTemplateAttributes {
  isDayOfWeekSchedulingEnabled: boolean;
}

export const defaultDealTemplateAttributes: DealTemplateAttributes = {
  isDayOfWeekSchedulingEnabled: true,
};
