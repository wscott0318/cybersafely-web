import { z } from 'zod'
import { namedOperations, useCreateUserRoleMutation } from '../../schema'
import { Form } from '../common/form/Form'
import { FormText } from '../common/form/FormText'

const schema = z.object({
  studentEmail: z.string().email(),
  parentEmail: z.string().email().nullish(),
})

type InviteStudentAndParentFormProps = {
  schoolId: string
  onSubmit: () => void
}

export function InviteStudentAndParentForm({ schoolId, onSubmit }: InviteStudentAndParentFormProps) {
  const [createUserRole] = useCreateUserRoleMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  return (
    <Form
      schema={schema}
      onSubmit={async ({ studentEmail, parentEmail }) => {
        const { data } = await createUserRole({
          variables: {
            input: {
              type: 'STUDENT',
              email: studentEmail,
              relationId: schoolId,
            },
          },
        })

        if (!!parentEmail) {
          await createUserRole({
            variables: {
              input: {
                type: 'PARENT',
                email: parentEmail,
                relationId: data!.createUserRole.id,
              },
            },
          })
        }

        onSubmit()
      }}
    >
      <FormText name="studentEmail" label="Student E-mail" type="email" required />
      <FormText name="parentEmail" label="Parent E-mail" type="email" />
    </Form>
  )
}
