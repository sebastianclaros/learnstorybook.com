import React from 'react';
import { storiesOf } from '@storybook/react';
import GatsbyLink from './GatsbyLink';

storiesOf('Basics|GatsbyLink', module).add('default', () => (
  <GatsbyLink to="/">I am a GatsbyLink</GatsbyLink>
));