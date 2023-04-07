import { z } from 'zod'
import { namedOperations, useCreateUserRoleMutation } from '../../schema'
import { Form } from '../common/form/Form'
import { FormText } from '../common/form/FormText'

const schema = z.object({
  athleteEmail: z.string().email(),
  parentEmail: z.string().email().nullish(),
})

type InviteAthleteAndParentFormProps = {
  schoolId: string
  onSubmit: () => void
}

export function InviteAthleteAndParentForm({ schoolId, onSubmit }: InviteAthleteAndParentFormProps) {
  const [createUserRole] = useCreateUserRoleMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  return (
    <Form
      schema={schema}
      onSubmit={async ({ athleteEmail, parentEmail }) => {
        const { data } = await createUserRole({
          variables: {
            input: {
              type: 'ATHLETE',
              email: athleteEmail,
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
      <FormText name="athleteEmail" label="Athlete E-mail" type="email" required />
      <FormText name="parentEmail" label="Parent E-mail" type="email" />
    </Form>
  )
}
