import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Section from '../helpers/Section';

const story = storiesOf('example/Button', module)
story.addWithInfo('with text', () => (
  <Section>
    <button onClick={action('clicked')}>Hello Button</button>
  </Section>
));

story.addWithInfo('with some emoji', () => (
  <Section>
    <button onClick={action('clicked')}>😀 😎 👍 💯</button>
  </Section>
));
