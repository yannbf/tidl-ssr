import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { IconName } from '@fortawesome/fontawesome-svg-core'

import { logEvent } from '@tidl/analytics'
import { IAppTheme } from '@tidl/styles'
import { APP_NAME, APP_URL } from '@tidl/constants'
import { ITask, TaskFrequency } from '@tidl/types'
import { Icon, Text, Modal, IconSelector } from '@tidl/components'
import { isDev, daysFromToday, isDue } from '@tidl/util'

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

const ClearButton = styled.button`
  background-color: transparent;
  width: 10rem;
  padding: 0.25rem 0 1rem 0;
  text-align: left;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`

const Banner = styled.div`
  background-color: red;
  padding: 0.5rem;
  text-align: left;
  border-radius: 1rem;
`

type Props = {
  formData: Partial<ITask>
  onSubmit: (task: ITask) => void
  onDelete?: (id: number) => void
}

const FREQUENCY_OPTIONS: TaskFrequency[] = [
  'none',
  'daily',
  'weekly',
  'biweekly',
  'monthly',
  'yearly',
]

export const TaskForm = ({ formData, onSubmit, onDelete }: Props) => {
  const {
    name = isDev ? 'Test' : '',
    date = new Date(),
    frequency = 'none',
    icon = 'archive',
  } = formData

  const [selectedIcon, setSelectedIcon] = useState(icon)
  const [openIconSelector, setOpenIconSelector] = useState(false)

  const canShare = navigator['share'] !== undefined

  const share = async () => {
    const shareData = {
      title: APP_NAME,
      text: `Hey! I just wanted to say that since ${dayjs().to(
        date
      )} I haven't done this: ${name}!`,
      url: APP_URL,
    }

    logEvent('action', 'shareTask', name)
    await (navigator as any).share(shareData)
  }
  const isLate = isDue(formData.date, formData.frequency)
  const dueText =
    isLate &&
    `Woah! It's been ${daysFromToday(formData.date)} days since you should have done: ${
      formData.name
    }. Guess it's time to do it?`

  return (
    <>
      {dueText && (
        <Banner>
          <Text fontWeight="bold">{dueText}</Text>
        </Banner>
      )}
      <Formik
        initialValues={{
          name,
          frequency,
          date: dayjs(date).format('YYYY-MM-DDTHH:mm'),
          icon,
        }}
        validationSchema={TaskSchema}
        onSubmit={({ name, date, frequency }: ITask) => {
          setOpenIconSelector(false)
          onSubmit({
            id: formData.id,
            name,
            date,
            icon: selectedIcon,
            frequency,
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

            <FieldSet>
              <label htmlFor="name">How frequent you should do it</label>
              <StyledField component="select" name="frequency">
                {FREQUENCY_OPTIONS.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </StyledField>
            </FieldSet>

            {formData.id && (
              <>
                <ClearButton type="button" onClick={() => onDelete(formData.id)}>
                  <Text color="danger">Delete this task</Text>
                </ClearButton>

                {canShare && (
                  <ClearButton type="button" onClick={share}>
                    <Text>Share about this</Text>
                  </ClearButton>
                )}
              </>
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
