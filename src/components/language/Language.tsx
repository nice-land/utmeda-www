import React from 'react';
import { IntlContextConsumer, changeLocale, FormattedMessage } from 'gatsby-plugin-intl';

import s from '../header/Header.scss';

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

function onClickHandler(language: string) {
  return (e: any) => {
    e.preventDefault();
    changeLocale(language === 'is' ? '' : language); // fix for default lang
  };
}

export const Language = () => (
  <ul className={s.header__navigation}>
    <IntlContextConsumer>
      {({ languages, language: currentLocale }: IIntlProps) =>
        languages.map((language, i) => language === currentLocale ? null : (
          <li className={s.header__item} key={i}>
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
          </li>
      ))}
    </IntlContextConsumer>
  </ul>
);
