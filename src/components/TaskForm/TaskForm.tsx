import { useState } from 'react'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { IconName } from '@fortawesome/fontawesome-svg-core'

import { logEvent } from '@tidl/analytics'
import { APP_NAME, APP_URL } from '@tidl/constants'
import { ITask, TaskFrequency } from '@tidl/types'
import { Text, Modal, IconSelector } from '@tidl/components'
import { isDev, daysFromToday, isDue } from '@tidl/util'
import {
  Banner,
  Form,
  StyledIcon,
  FieldSet,
  Input,
  Select,
  SubmitButton,
  ClearButton,
} from './TaskForm.styled'

const TaskSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short.')
    .max(25, 'Name is too long.')
    .required('Required'),
  date: Yup.date()
    .nullable()
    .max(
      dayjs()
        .add(2, 'minute')
        .format('YYYY-MM-DDTHH:mm'),
      'Do not select dates in the future.'
    )
    .required('Required'),
})

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
    icon = 'question',
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
          <Text color="light" fontWeight="bold">
            {dueText}
          </Text>
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
          <Form>
            <StyledIcon onClick={() => setOpenIconSelector(true)} icon={selectedIcon} />
            <FieldSet>
              <label htmlFor="name">
                <Text fontWeight="bold">Name</Text>
              </label>
              <Input type="text" name="name" placeholder="Task name.." />
              <ErrorMessage name="name" component="div" />
            </FieldSet>

            <FieldSet>
              <label htmlFor="name">
                <Text fontWeight="bold">Last time you did it</Text>
              </label>
              <Select type="datetime-local" name="date" />
              <ErrorMessage name="date" component="div" />
            </FieldSet>

            <FieldSet>
              <label htmlFor="name">
                <Text fontWeight="bold">How frequent you should do it</Text>
              </label>
              <Select component="select" name="frequency">
                {FREQUENCY_OPTIONS.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
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
              <Text color="light">Save</Text>
            </SubmitButton>
          </Form>
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
