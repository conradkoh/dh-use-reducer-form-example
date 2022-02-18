import React from 'react';
import { FunctionComponent } from 'react';
interface ConditionalRenderProps {
  condition: boolean;
}
const ConditionalRender: FunctionComponent<ConditionalRenderProps> = (
  props
) => {
  if (!props.condition) {
    return <></>;
  }
  return <>{props.children}</>;
};
export default ConditionalRender;
