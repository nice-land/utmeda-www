import * as React from "react";

import { InlineMarkdown } from "components/inline-markdown/InlineMarkdown";

import s from "./Content.scss";

interface IContentProps {
  count: string | number;
  text: string;
  onClick?(): void;
}

export const Content = ({ count, text, onClick }: IContentProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={s.content} onClick={handleClick}>
      <span className={s.content__count}>{count}</span>

      <span className={s.content__link}>
        <InlineMarkdown source={text} />
      </span>
    </div>
  );
};
