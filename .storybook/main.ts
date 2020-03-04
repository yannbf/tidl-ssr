module.exports = {
  stories: ['../src/components/**/*.stories.*'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-a11y/register',
    'storybook-addon-styled-component-theme/dist/register',
    '@storybook/addon-storysource/register',
  ],
}
