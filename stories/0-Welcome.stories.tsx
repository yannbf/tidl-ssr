import React, { FunctionComponent } from 'react'

export default {
  title: 'Welcome',
}

const Main: FunctionComponent = props => (
  <article
    {...props}
    style={{
      padding: 15,
      lineHeight: 1.4,
      fontFamily: '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif',
      backgroundColor: '#fff',
      color: '#000',
    }}
  />
)

const InlineCode: FunctionComponent = props => (
  <code
    {...props}
    style={{
      fontSize: 15,
      fontWeight: 600,
      padding: '2px 5px',
      border: '1px solid #eae9e9',
      borderRadius: 4,
      backgroundColor: '#f3f2f2',
      color: '#3a3a3a',
    }}
  />
)

export const toStorybook = () => (
  <Main>
    <h1>Welcome to storybook!</h1>
    <p>
      This is a UI component dev environment for the <i>Last Time I Used</i> app.
    </p>
    <p>
      The stories are located inside the <InlineCode>src/stories</InlineCode> directory.
      <br />
      A story is a single state of one or more UI components. You can have as many stories as you
      want.
      <br />
      (Basically a story is like a visual test case.)
    </p>
    <p>
      Usually we create stories with smaller UI components in the app.
      <br />
      Have a look at the{' '}
      <a
        href="https://storybook.js.org/basics/writing-stories"
        target="_blank"
        rel="noopener noreferrer"
      >
        Writing Stories
      </a>{' '}
      section in the Storybook documentation.
    </p>
  </Main>
)

toStorybook.story = {
  name: 'to Storybook',
}
