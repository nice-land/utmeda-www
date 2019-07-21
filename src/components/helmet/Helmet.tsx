import * as React from 'react';
import ReactHelmet from 'react-helmet';
import { IntlContextConsumer } from 'gatsby-plugin-intl';

import { IIntlProps } from 'utils/interfaces';

const favicon: string = require('assets/images/favicon.png');
const defaultImage: string = require('assets/images/share.png');

const domain = process.env.GATSBY_DOMAIN || '';

interface IProps {
  title?: string;
  description?: string;
  image?: string;
}

export const Helmet = ({ title, description, image }: IProps) => (
  <IntlContextConsumer>
    {({ language, messages }: IIntlProps) => {

      const usedTitle = title || messages.defaultPageTitle;

      // remove markdown, TODO more intricate
      const strippedTitle = usedTitle.replace(/_/g, '');
      const usedDescription = description || messages.defaultPageDescription;
      const usedImage = image || defaultImage;

      const imageUrl = `${domain}${usedImage}`;

      const helmet = {
        title: strippedTitle,
        titleTemplate: `%s - ${messages.defaultPageTitle}`,
        htmlAttributes: { lang: language },
        meta: [
          { name: 'description', content: usedDescription },
          { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
          { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
          { name: 'msapplication-navbutton-color', content: '#000' },
          { name: 'msapplication-TileColor', content: '#000' },
          { name: 'theme-color', content: '#000' },

          { property: 'og:title', content: strippedTitle },
          { property: 'og:image', content: imageUrl },
          { property: 'og:image:width', content: '880px' },
          { property: 'og:image:height', content: '440px' },
          { property: 'og:image:alt', content: usedDescription },

          { name: 'twitter:title', content: strippedTitle },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:image', content: imageUrl },
          { name: 'twitter:description', content: usedDescription },
        ],
        link: [
          { rel: 'icon', type: 'image/x-icon', href: favicon },
        ],
      };

      return (
        <ReactHelmet {...helmet} />
      );
    }}
  </IntlContextConsumer>
);
