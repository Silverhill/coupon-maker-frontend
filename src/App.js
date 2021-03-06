import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import es from 'react-intl/locale-data/es';
import en from 'react-intl/locale-data/en';
import Pages from './Routes';

import store from './store';
import messages from './messages';
import client from './apollo-client';
import { ApolloProvider } from 'react-apollo';
import { flattenMessages } from './commons/utils';

addLocaleData([...en, ...es])
const locale = navigator.languages.indexOf('es') >= 0 ? 'es' : 'en'

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
            <BrowserRouter>
              <Pages />
            </BrowserRouter>
          </IntlProvider>
          </Provider>
        </ApolloProvider>
      );
  }
}

export default App;
