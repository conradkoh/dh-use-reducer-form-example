import { DealTemplate } from '../../common/entities/DealTemplate';
import { DealFormActionType as DealFormActionType } from './DealFormAction';
import { DealFormState } from './DealFormState';
import { formatDealTemplateAsDiscount } from './DealTemplate';
import {
  dealTypeSelectFieldOptions,
  getDealTypeFromDealTemplate,
} from './DealType';

export function DealFormReducer(
  state: DealFormState,
  action: { type: DealFormActionType; data: any }
) {
  switch (action.type) {
    case DealFormActionType.OnLoad: {
      //init the state of the form
      const dealTemplates: DealTemplate[] = action.data.dealTemplates;
      const translate = action.data.translate;

      //prepare an index of what is available in the form
      const availableTypesIndex = dealTemplates.reduce((state, template) => {
        state[getDealTypeFromDealTemplate(template)] = template;
        return state;
      }, {});

      //set the deal type options
      state.config.dealTypeOptions = dealTypeSelectFieldOptions({
        translate,
      });
      autoUpdateDealTypeOptions(state, availableTypesIndex);
      autoSelectFirstDealType(state);

      //set the preferred discount
      state.config.discountOptions = dealTemplates.map((dealTemplate) => {
        return {
          'id': dealTemplate.id,
          text: formatDealTemplateAsDiscount({ translate })(dealTemplate),
          value: {
            dealTemplate,
          },
        };
      });
      autoUpdateDiscountOptions(state);
      //select the first discount option
      state.data.discount = state.config.discountOptions[0]?.value;
      break;
    }
    case DealFormActionType.SetDealType: {
      state.data.dealType = action.data;
      autoUpdateDiscountOptions(state);
      autoSelectFirstDiscount(state);
      break;
    }
    case DealFormActionType.SetDiscount: {
      state.data.discount = action.data;
      break;
    }
  }
  updateFeatures(state);
  return { ...state }; //copying causes a re-render
}

const autoUpdateDealTypeOptions = (
  state: DealFormState,
  availableTypesIndex: Record<string, DealTemplate>
) => {
  state.currentOptions.dealTypeOptions = state.config.dealTypeOptions.filter(
    (o) => !!availableTypesIndex[o.value]
  );
};

const autoSelectFirstDealType = (state: DealFormState) => {
  state.data.dealType = state.currentOptions.dealTypeOptions[0]?.value;
};

const autoUpdateDiscountOptions = (state: DealFormState) => {
  state.currentOptions.discountOptions = state.config.discountOptions.filter(
    (d) =>
      getDealTypeFromDealTemplate(d.value?.dealTemplate) === state.data.dealType
  );
};
const autoSelectFirstDiscount = (state: DealFormState) => {
  state.data.discount = state.currentOptions.discountOptions[0]?.value;
};

const updateFeatures = (state: DealFormState) => {
  const schedulingEnabled =
    state.data.discount?.dealTemplate?.attributes?.isDayOfWeekSchedulingEnabled;
  if (schedulingEnabled != null) {
    state.features.isDayOfWeekSelectorVisible = schedulingEnabled;
  }
};

export const dealFormInitialState: DealFormState = {
  data: {},
  features: {
    isEndDateVisible: false,
    isDayOfWeekSelectorVisible: false,
  },
  config: {
    dealTypeOptions: [],
    discountOptions: [],
  },
  currentOptions: {
    dealTypeOptions: [],
    discountOptions: [],
  },
  dependencies: {
    translate: (v) => v,
  },
};
