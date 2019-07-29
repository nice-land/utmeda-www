import React from 'react';
import { IntlContextConsumer, changeLocale, FormattedMessage } from 'gatsby-plugin-intl';

interface ILanguages {
  [key: string]: string;
}

interface IIntlProps {
  languages: string[];
  language: string;
}

const languageName: ILanguages = {
  en: 'EN',
  is: 'IS',
};

function onClickHandler(language: string): undefined {
  return (e: any): undefined => {
    e.preventDefault();
    changeLocale(language === 'is' ? '' : language); // fix for default lang
  };
}

export const Language = () => (
  <IntlContextConsumer>
    {({ languages, language: currentLocale }: IIntlProps) =>
      languages.map((language) => language === currentLocale ? null : (
        <a
          key={language}
          href={`/${language}`}
          onClick={onClickHandler(language)}
        >
          <FormattedMessage
            id={`navigation.${language}`}
            defaultMessage={languageName[language]}
          />
        </a>
    ))}
  </IntlContextConsumer>
);
