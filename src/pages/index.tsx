import * as React from "react";
import { injectIntl } from "gatsby-plugin-intl";

import { IStep } from "utils/interfaces";
import { Steps } from "components/steps/Steps";
import { Helmet } from "components/helmet/Helmet";
import { StepsContainer } from "components/steps/StepsContainer";

interface IProps {
  intl: any;
}

function index({ intl }: IProps) {
  return (
    <>
      <Helmet title={intl.formatMessage({ id: "title" })} />
      <StepsContainer />
    </>
  );
}

export default injectIntl(index);
