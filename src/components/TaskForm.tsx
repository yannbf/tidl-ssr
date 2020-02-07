import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { IconName } from '@fortawesome/fontawesome-svg-core'

import { Modal } from './Modal/Modal'
import { IconSelector } from './IconSelector'
import Icon from './Icon'
import { ITask } from '@ltid/types'
import { logEvent } from 'util/analytics'
import { IAppTheme } from '@ltid/styles'

const TaskSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short.')
    .max(25, 'Name is too long.')
    .required('Required'),
  date: Yup.date()
    .nullable()
    .max(
      dayjs()
        .add(1, 'minute')
        .format('YYYY-MM-DDTHH:mm'),
      'Do not select dates in the future.'
    )
    .required('Required'),
})

const FieldSet = styled.fieldset`
  color: ${({ theme }: { theme: IAppTheme }) => theme.text.secondary};
  display: flex;
  flex-direction: column;
  border: none;
  padding: 0 0 1rem 0;
  margin: 0;
`

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`

const StyledField = styled(Field)`
  width: 12rem;
  height: 1.5rem;
`

const StyledIcon = styled(Icon)`
  align-self: center;
  cursor: pointer;
  color: ${({ theme }: { theme: IAppTheme }) => theme.text.primary};
`

const SubmitButton = styled.button`
  width: 6rem;
  align-self: center;
  padding: 1rem;
  font-size: 1rem;
  background: white;
  border-radius: 0.75rem;
`

const DeleteButton = styled.button`
  color: red;
  background-color: transparent;
  width: 10rem;
  padding: 0.25rem 0 1rem 0;
  text-align: left;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`

type Props = {
  formData: Partial<ITask>
  onSubmit: (task: ITask) => void
  onDelete?: (id: number) => void
}

export const TaskForm = ({ formData, onSubmit, onDelete }: Props) => {
  const { name = '', date = new Date(), icon = 'coffee' } = formData
  const [selectedIcon, setSelectedIcon] = useState(icon)
  const [openIconSelector, setOpenIconSelector] = useState(false)

  return (
    <>
      <Formik
        initialValues={{ name, date: dayjs(date).format('YYYY-MM-DDTHH:mm'), icon: 'coffee' }}
        validationSchema={TaskSchema}
        onSubmit={({ name, date }: ITask) => {
          setOpenIconSelector(false)
          onSubmit({
            id: formData.id,
            name,
            date,
            icon: selectedIcon,
          })
        }}
      >
        {({ isValid, isSubmitting }: { isValid: boolean; isSubmitting: boolean }) => (
          <StyledForm>
            <StyledIcon onClick={() => setOpenIconSelector(true)} icon={selectedIcon} />
            <FieldSet>
              <label htmlFor="name">Name</label>
              <StyledField type="text" name="name" placeholder="Task name.." />
              <ErrorMessage name="name" component="div" />
            </FieldSet>

            <FieldSet>
              <label htmlFor="name">Last time you did it</label>
              <StyledField type="datetime-local" name="date" />
              <ErrorMessage name="date" component="div" />
            </FieldSet>

            {formData.id && (
              <DeleteButton onClick={() => onDelete(formData.id)}>Delete this task</DeleteButton>
            )}

            <SubmitButton type="submit" disabled={!isValid || isSubmitting}>
              Save
            </SubmitButton>
          </StyledForm>
        )}
      </Formik>

      <Modal small isOpen={openIconSelector} onClose={() => setOpenIconSelector(false)}>
        <IconSelector
          selectedIconName={selectedIcon}
          onIconSelected={(name: IconName) => {
            setSelectedIcon(name)
            logEvent('action', 'selectIcon', name)
          }}
        />
      </Modal>
    </>
  )
}
