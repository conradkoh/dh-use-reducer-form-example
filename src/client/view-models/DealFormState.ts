import { DealTemplate } from '../../common/entities/DealTemplate';
import { SelectFieldOption } from '../components/atoms/Select/SelectField';
import { DealType } from './DealType';

export interface DealFormState {
  data: DealFormData;
  features: DealFormFeatures;
  config: {
    dealTypeOptions: SelectFieldOption<DealType>[];
    discountOptions: SelectFieldOption<{ dealTemplate: DealTemplate }>[];
  };
  currentOptions: {
    dealTypeOptions: SelectFieldOption<DealType>[];
    discountOptions: SelectFieldOption<{ dealTemplate: DealTemplate }>[];
  };
  dependencies: {
    translate: (v: string) => string;
  };
}

export interface DealFormData {
  dealType?: string;
  discount?: {
    dealTemplate: DealTemplate;
  };
  isRecurring?: boolean;
  startDate?: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
}

export interface DealFormFeatures {
  isEndDateVisible: boolean;
  isDayOfWeekSelectorVisible: boolean;
}
