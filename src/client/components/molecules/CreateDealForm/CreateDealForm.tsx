import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { FunctionComponent } from 'react';
import styles from './CreateDealForm.module.scss';
import SelectField, { SelectFieldOption } from '../../atoms/Select/SelectField';
import { DealTemplate } from '../../../../common/entities/DealTemplate';
import { Box } from '@mui/material';
import {
  dealFormInitialState,
  DealFormReducer,
} from '../../../view-models/DealFormReducer';
import { DealFormActionType } from '../../../view-models/DealFormAction';
import ConditionalRender from '../../atoms/ConditionalRender';
interface CreateDealFormProps {
  dealTemplates: DealTemplate[];
}
const CreateDealForm: FunctionComponent<CreateDealFormProps> = ({
  dealTemplates,
}) => {
  const [state, dispatch] = useReducer(DealFormReducer, dealFormInitialState);
  useEffect(() => {
    dispatch({
      type: DealFormActionType.OnLoad,
      data: {
        translate: (v: string) => v,
        dealTemplates,
      },
    });
  }, [dealTemplates]);
  return (
    <div>
      <div className={styles['general-fields-container']}>
        <Box sx={{ minWidth: 180 }}>
          <SelectField
            className={styles['deal-type-select-field']}
            label="Deal Type"
            options={state.currentOptions.dealTypeOptions}
            value={state.data.dealType}
            onChange={(v) => {
              dispatch({ type: DealFormActionType.SetDealType, data: v });
            }}
          />
        </Box>
        <div className={styles['space']} />
        <Box sx={{ minWidth: 180 }}>
          <SelectField
            className={styles['discount-select-field']}
            label="Discount"
            options={state.currentOptions.discountOptions}
            value={state.data.discount}
            onChange={(v) => {
              dispatch({ type: DealFormActionType.SetDiscount, data: v });
            }}
          />
        </Box>
      </div>
      <ConditionalRender condition={state.features.isDayOfWeekSelectorVisible}>
        <div className={styles['dow-container']}>
          <div>Day of week selector</div>
        </div>
      </ConditionalRender>
    </div>
  );
};
export default CreateDealForm;
