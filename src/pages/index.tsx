import * as React from "react";
import { injectIntl } from "gatsby-plugin-intl";

import { IStep } from "utils/interfaces";
import { Steps } from "components/steps/Steps";
import { Helmet } from "components/helmet/Helmet";

interface IProps {
  intl: any;
}

function index({ intl }: IProps) {
  const steps: IStep[] = [
    {
      num: 1,
      title: intl.formatMessage({ id: "steps.one.title" }),
      poster: require("assets/posters/1_bright@2x.jpg"),
      video: require("assets/videos/one.mp4")
    },
    {
      num: 2,
      title: intl.formatMessage({ id: "steps.two.title" }),
      poster: require("assets/posters/2_bright@2x.jpg"),
      video: require("assets/videos/two.mp4")
    },
    {
      num: 3,
      title: intl.formatMessage({ id: "steps.three.title" }),
      poster: require("assets/posters/3_bright@2x.jpg"),
      video: require("assets/videos/three.mp4")
    },
    {
      num: 4,
      title: intl.formatMessage({ id: "steps.four.title" }),
      poster: require("assets/posters/4_bright@2x.jpg"),
      video: require("assets/videos/four.mp4")
    },
    {
      num: 5,
      title: intl.formatMessage({ id: "steps.five.title" }),
      poster: require("assets/posters/5_bright@2x.jpg"),
      video: require("assets/videos/five.mp4")
    },
    {
      num: 6,
      title: intl.formatMessage({ id: "steps.six.title" }),
      poster: require("assets/posters/6_bright@2x.jpg"),
      video: require("assets/videos/six.mp4")
    },
    {
      num: 7,
      title: intl.formatMessage({ id: "steps.seven.title" }),
      poster: require("assets/posters/7_bright@2x.jpg"),
      video: require("assets/videos/seven.mp4")
    },
    {
      num: 8,
      title: intl.formatMessage({ id: "steps.eight.title" }),
      poster: require("assets/posters/8_bright@2x.jpg"),
      video: require("assets/videos/eight.mp4")
    },
    {
      num: 9,
      title: intl.formatMessage({ id: "steps.nine.title" }),
      poster: require("assets/posters/9_bright@2x.jpg"),
      video: require("assets/videos/nine.mp4")
    },
    {
      num: 10,
      title: intl.formatMessage({ id: "steps.ten.title" }),
      poster: require("assets/posters/10_bright@2x.jpg"),
      video: require("assets/videos/ten.mp4")
    }
  ];

  return (
    <>
      <Helmet title={intl.formatMessage({ id: "title" })} />
      <Steps title={intl.formatMessage({ id: "title" })} list={steps} />
    </>
  );
}

export default injectIntl(index);
