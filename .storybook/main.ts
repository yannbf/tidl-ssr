module.exports = {
  stories: ['../src/components/**/*.stories.*'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
    '@storybook/addon-a11y',
    'storybook-addon-styled-component-theme/dist/register',
    '@storybook/addon-storysource/register',
  ],
}
