import React from 'react';
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl';

interface ILanguages {
  [key: string]: string;
}

const languageName: ILanguages = {
  en: 'EN',
  is: 'IS',
};

function onClickHandler(language: string): undefined {
  return (e: any): undefined => {
    e.preventDefault();
    changeLocale(language);
  };
}

export const Language = () => {
  return (
    <div>
      <IntlContextConsumer>
        {({ languages, language: currentLocale }: { languages: string[], language: string}) =>
          languages.map((language) => language === currentLocale ? null : (
            <a
              key={language}
              href={`/${language}`}
              onClick={onClickHandler(language)}
            >
              {languageName[language]}
            </a>
        ))}
      </IntlContextConsumer>
    </div>
  )
}
