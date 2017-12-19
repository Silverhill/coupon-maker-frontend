import { configure, setAddon, addDecorator } from '@storybook/react';
import infoAddon, { setDefaults } from '@storybook/addon-info'
import { setIntlConfig, withIntl } from 'storybook-addon-intl/dist/preview';

import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import esLocaleData from 'react-intl/locale-data/es';
import messages from '../src/messages.json';
import { flattenMessages } from '../src/commons/utils';

addLocaleData([...enLocaleData, ...esLocaleData]);

const getMessages = (locale) => flattenMessages(messages[locale]);
// Set intl configuration
setIntlConfig({
    locales: ['en', 'es'],
    defaultLocale: 'en',
    getMessages
});

setDefaults({
  inline: true,
  maxPropsIntoLine: 1,
  maxPropObjectKeys: 10,
  maxPropArrayLength: 10,
  maxPropStringLength: 100,
});

setAddon(infoAddon);
addDecorator(withIntl);

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
