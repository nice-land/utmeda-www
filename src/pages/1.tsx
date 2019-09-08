import * as React from "react";
import { injectIntl } from "gatsby-plugin-intl";

import { Step } from "components/step/Step";
import { Helmet } from "components/helmet/Helmet";
import { StepsContainer } from "components/steps/StepsContainer";

interface IProps {
  intl: any;
}

function one({ intl }: IProps) {
  const socialTitle = intl.formatMessage({ id: "steps.one.socialTitle" });
  const text = intl.formatMessage({ id: "steps.one.text" });
  const socialPoster: string = require("assets/posters/1_bright@2x.jpg");

  return (
    <>
      <Helmet title={socialTitle} description={text} image={socialPoster} />

      <StepsContainer initialStep={1} />
    </>
  );
}

export default injectIntl(one);
