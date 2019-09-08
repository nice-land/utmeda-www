import React from "react";
import { injectIntl } from "gatsby-plugin-intl";
import { IStep } from "utils/interfaces";
import { Steps } from "./Steps";

interface IProps {
  initialStep?: number;
  intl: any;
}

export const StepsContainer = injectIntl(({ initialStep, intl }: IProps) => {
  const steps: IStep[] = [
    {
      num: 1,
      title: intl.formatMessage({ id: "steps.one.title" }),
      text: intl.formatMessage({ id: "steps.one.text" }),
      poster: require("assets/posters/1_bright@2x.jpg"),
      video: require("assets/videos/one.mp4")
    },
    {
      num: 2,
      title: intl.formatMessage({ id: "steps.two.title" }),
      text: intl.formatMessage({ id: "steps.two.text" }),
      poster: require("assets/posters/2_bright@2x.jpg"),
      video: require("assets/videos/two.mp4")
    },
    {
      num: 3,
      title: intl.formatMessage({ id: "steps.three.title" }),
      text: intl.formatMessage({ id: "steps.three.text" }),
      poster: require("assets/posters/3_bright@2x.jpg"),
      video: require("assets/videos/three.mp4")
    },
    {
      num: 4,
      title: intl.formatMessage({ id: "steps.four.title" }),
      text: intl.formatMessage({ id: "steps.four.text" }),
      poster: require("assets/posters/4_bright@2x.jpg"),
      video: require("assets/videos/four.mp4")
    },
    {
      num: 5,
      title: intl.formatMessage({ id: "steps.five.title" }),
      text: intl.formatMessage({ id: "steps.five.text" }),
      poster: require("assets/posters/5_bright@2x.jpg"),
      video: require("assets/videos/five.mp4")
    },
    {
      num: 6,
      title: intl.formatMessage({ id: "steps.six.title" }),
      text: intl.formatMessage({ id: "steps.six.text" }),
      poster: require("assets/posters/6_bright@2x.jpg"),
      video: require("assets/videos/six.mp4")
    },
    {
      num: 7,
      title: intl.formatMessage({ id: "steps.seven.title" }),
      text: intl.formatMessage({ id: "steps.seven.text" }),
      poster: require("assets/posters/7_bright@2x.jpg"),
      video: require("assets/videos/seven.mp4")
    },
    {
      num: 8,
      title: intl.formatMessage({ id: "steps.eight.title" }),
      text: intl.formatMessage({ id: "steps.eight.text" }),
      poster: require("assets/posters/8_bright@2x.jpg"),
      video: require("assets/videos/eight.mp4")
    },
    {
      num: 9,
      title: intl.formatMessage({ id: "steps.nine.title" }),
      text: intl.formatMessage({ id: "steps.nine.text" }),
      poster: require("assets/posters/9_bright@2x.jpg"),
      video: require("assets/videos/nine.mp4")
    },
    {
      num: 10,
      title: intl.formatMessage({ id: "steps.ten.title" }),
      text: intl.formatMessage({ id: "steps.ten.text" }),
      poster: require("assets/posters/10_bright@2x.jpg"),
      video: require("assets/videos/ten.mp4")
    }
  ];

  return (
    <Steps
      initialStep={initialStep}
      list={steps}
      title={intl.formatMessage({ id: "title" })}
    />
  );
});
