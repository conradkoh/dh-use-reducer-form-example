import React, { useMemo } from 'react';
import { FunctionComponent } from 'react';
import CreateDealForm from '../src/client/components/molecules/CreateDealForm/CreateDealForm';
import {
  DealTemplate,
  defaultDealTemplateAttributes,
} from '../src/common/entities/DealTemplate';
import styles from './create-promo.module.scss';
interface CreatePromoPageProps {}
const CreatePromoPage: FunctionComponent<CreatePromoPageProps> = (props) => {
  const dealTemplates = useMemo(() => {
    const templates: DealTemplate[] = [
      {
        id: '1',
        discountAmountRewardBehavior: {
          amount: 10,
        },
        attributes: defaultDealTemplateAttributes,
      },
      {
        id: '2',
        discountAmountRewardBehavior: {
          amount: 20,
        },
        attributes: defaultDealTemplateAttributes,
      },
      {
        id: '3',
        discountAmountRewardBehavior: {
          amount: 30,
        },
        attributes: defaultDealTemplateAttributes,
      },
      {
        id: '4',
        discountPercentageRewardBehavior: {
          percentage: 15,
        },
        attributes: {
          ...defaultDealTemplateAttributes,
          isDayOfWeekSchedulingEnabled: false,
        },
      },
      {
        id: '5',
        discountPercentageRewardBehavior: {
          percentage: 30,
        },
        attributes: defaultDealTemplateAttributes,
      },
    ];
    return templates;
  }, []);
  return (
    <div className={styles['page-container']}>
      <div className={styles['form-container']}>
        <div className={styles['form-inner-wrapper']}>
          <CreateDealForm dealTemplates={dealTemplates} />
        </div>
      </div>
    </div>
  );
};
export default CreatePromoPage;
