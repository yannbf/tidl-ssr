import chalk from 'chalk'

expect.extend({
  toHaveDispatched(actual, expectedAction) {
    const pass = actual.type === expectedAction

    const message = pass
      ? () =>
          `Should not have dispatched action ${chalk.bold.green(actual.type)}, but ${chalk.bold.red(
            expectedAction
          )} instead.`
      : () =>
          `Should have dispatched action ${chalk.green(expectedAction)}, but received ${chalk.red(
            actual.type
          )} instead.`

    return { actual, message, pass }
  },
})
