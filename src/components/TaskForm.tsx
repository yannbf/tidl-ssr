import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import Icon from './Icon'
import dayjs from 'dayjs'

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

const FieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: none;
`

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`

const StyledField = styled(Field)`
  width: 8rem;
  height: 1.5rem;
`

const StyledIcon = styled(Icon)`
  align-self: center;
`

const SubmitButton = styled.button`
  width: 6rem;
  align-self: center;
  padding: 1rem;
  font-size: 1rem;
  background: white;
  border-radius: 0.75rem;
`

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
        <StyledForm>
          <StyledIcon icon="coffee" />
          <FieldSet>
            <label htmlFor="name">Name</label>
            <StyledField type="text" name="name" placeholder="Task name.." />
            <ErrorMessage name="name" component="div" />
          </FieldSet>

          <FieldSet>
            <label htmlFor="name">Last time you did it</label>
            <StyledField type="date" name="date" max={dayjs().format('YYYY-MM-DD')} />
            <ErrorMessage name="date" component="div" />
          </FieldSet>

          <SubmitButton type="submit" disabled={!isValid || isSubmitting}>
            Save
          </SubmitButton>
        </StyledForm>
      )}
    </Formik>
  )
}
