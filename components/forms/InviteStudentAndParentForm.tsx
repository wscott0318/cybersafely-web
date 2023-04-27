import { Button, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { z } from 'zod'
import { useLogoUrl } from '../../helpers/hooks'
import { namedOperations, useCreateUserRoleMutation } from '../../schema'
import { Form } from '../common/form/Form'
import { FormText } from '../common/form/FormText'
import { FormTexts } from '../common/form/FormTexts'
import { CompletedAnimation } from '../common/lottie/CompletedAnimation'

const schema = z.object({
  studentEmail: z.string().email(),
  parentEmails: z.array(z.string().email().nullish()),
})

type InviteStudentAndParentFormProps = {
  schoolId: string
  onSubmit: () => void
}

export function InviteStudentAndParentForm({ schoolId, onSubmit }: InviteStudentAndParentFormProps) {
  const logoUrl = useLogoUrl()

  const [success, setSuccess] = useState(false)

  const [createUserRole] = useCreateUserRoleMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  if (success) {
    return (
      <Stack>
        <Typography variant="h5">Invite Sent</Typography>
        <CompletedAnimation />
        <Button onClick={onSubmit}>Done</Button>
      </Stack>
    )
  }

  return (
    <Form
      schema={schema}
      defaultValues={{ parentEmails: [''] }}
      onSubmit={async ({ studentEmail, parentEmails }) => {
        const { data } = await createUserRole({
          variables: {
            input: {
              type: 'STUDENT',
              email: studentEmail,
              relationId: schoolId,
            },
          },
        })

        const parentEmailsNorm = parentEmails.filter((e) => !!e)

        if (parentEmailsNorm.length > 0) {
          for (const parentEmail of parentEmailsNorm) {
            await createUserRole({
              variables: {
                input: {
                  type: 'PARENT',
                  email: parentEmail!,
                  relationId: data!.createUserRole.id,
                },
              },
            })
          }
        }

        setSuccess(true)
      }}
    >
      <Image alt="Logo" src={logoUrl} height={50} width={108} />
      <Typography variant="h5">Invite Student</Typography>
      <FormText name="studentEmail" label="Student E-mail" type="email" required />
      <FormTexts name="parentEmails" label="Parent E-mail" type="email" />
    </Form>
  )
}
