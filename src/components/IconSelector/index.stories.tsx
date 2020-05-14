import React from 'react'
import { action } from '@storybook/addon-actions'

import { IconSelector } from '.'

export default {
  title: 'Icon Selector',
  component: IconSelector,
}

export const Basic = () => (
  <IconSelector onIconSelected={() => action('icon selected')} selectedIconName="coffee" />
)
