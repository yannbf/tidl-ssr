import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const TaskSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short.')
    .max(25, 'Name is too long.')
    .required('Required'),
  date: Yup.date()
    .nullable()
    .max(new Date(), 'Do not select dates in the future.')
    .required('Required'),
})

export const TaskForm = ({ formData, onSubmit }) => {
  const { name = '', date = new Date() } = formData

  return (
    <Formik
      initialValues={{ name, date }}
      validationSchema={TaskSchema}
      onSubmit={({ name, date }) =>
        onSubmit({
          id: formData.id,
          name,
          date,
        })
      }
    >
      {({ isValid, isSubmitting }) => (
        <Form>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" />
          <Field type="date" name="date" />
          <ErrorMessage name="date" component="div" />
          <button type="submit" disabled={!isValid || isSubmitting}>
            Save
          </button>
        </Form>
      )}
    </Formik>
  )
}
