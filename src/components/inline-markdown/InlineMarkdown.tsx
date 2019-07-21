import * as React from 'react';
import ReactMarkdown from 'react-markdown';

interface IProps {
  source: string;
}

export const InlineMarkdown = ({ source }: IProps) => (
  <ReactMarkdown
    skipHtml
    disallowedTypes={['paragraph']}
    unwrapDisallowed
    source={source}
  />
);
