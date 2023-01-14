import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
  NullObject: null;
};

export type AnyUserRole = UserRole & {
  __typename?: 'AnyUserRole';
  role: Role;
};

export type ArrayOrder = {
  _count?: InputMaybe<OrderDirection>;
};

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<Scalars['Boolean']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<Scalars['DateTime']>;
};

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<Scalars['Float']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<Scalars['Int']>;
};

export type Jwt = {
  __typename?: 'JWT';
  token: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  activate?: Maybe<Scalars['ID']>;
  inviteAthlete?: Maybe<Scalars['ID']>;
  inviteCoach?: Maybe<Scalars['ID']>;
  inviteParent?: Maybe<Scalars['ID']>;
  inviteStaff?: Maybe<Scalars['ID']>;
  login: Jwt;
  register?: Maybe<Scalars['ID']>;
};


export type MutationActivateArgs = {
  password: Scalars['String'];
  passwordToken: Scalars['String'];
  user: UserCreate;
};


export type MutationInviteAthleteArgs = {
  email: Scalars['String'];
};


export type MutationInviteCoachArgs = {
  email: Scalars['String'];
};


export type MutationInviteParentArgs = {
  childId: Scalars['ID'];
  email: Scalars['String'];
};


export type MutationInviteStaffArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  team: TeamCreate;
  user: UserCreate;
};

export const OrderDirection = {
  Asc: 'ASC',
  Desc: 'DESC'
} as const;

export type OrderDirection = typeof OrderDirection[keyof typeof OrderDirection];
export type Page = {
  index?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  count: Scalars['Int'];
  hasNext: Scalars['Boolean'];
  hasPrev: Scalars['Boolean'];
  index: Scalars['Int'];
  size: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginatedTeam = {
  __typename?: 'PaginatedTeam';
  nodes: Array<Team>;
  page: PageInfo;
};

export type PaginatedUser = {
  __typename?: 'PaginatedUser';
  nodes: Array<User>;
  page: PageInfo;
};

export type ParentRole = UserRole & {
  __typename?: 'ParentRole';
  childUser: User;
  relation?: Maybe<Scalars['String']>;
  role: Role;
};

export type Query = {
  __typename?: 'Query';
  members: PaginatedUser;
  profile: User;
  team: Team;
  teams: PaginatedTeam;
  user: User;
  users: PaginatedUser;
};


export type QueryMembersArgs = {
  order?: InputMaybe<UserOrder>;
  page?: InputMaybe<Page>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryTeamArgs = {
  id: Scalars['ID'];
};


export type QueryTeamsArgs = {
  order?: InputMaybe<TeamOrder>;
  page?: InputMaybe<Page>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  order?: InputMaybe<UserOrder>;
  page?: InputMaybe<Page>;
  search?: InputMaybe<Scalars['String']>;
};

export const Role = {
  Athlete: 'ATHLETE',
  Coach: 'COACH',
  Parent: 'PARENT',
  Staff: 'STAFF'
} as const;

export type Role = typeof Role[keyof typeof Role];
export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<StringFilterMode>;
  not?: InputMaybe<Scalars['String']>;
};

export const StringFilterMode = {
  Default: 'DEFAULT',
  Insensitive: 'INSENSITIVE'
} as const;

export type StringFilterMode = typeof StringFilterMode[keyof typeof StringFilterMode];
export type Team = {
  __typename?: 'Team';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  memberCount: Scalars['Int'];
  name: Scalars['String'];
};

export type TeamCreate = {
  name: Scalars['String'];
};

export type TeamOrder = {
  createdAt?: InputMaybe<OrderDirection>;
  memberCount?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type TeamRole = UserRole & {
  __typename?: 'TeamRole';
  role: Role;
  team: Team;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  emailConfirmed: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  roles: Array<UserRole>;
  teamRoles: Array<UserRole>;
};

export type UserCreate = {
  name: Scalars['String'];
};

export type UserOrder = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type UserRole = {
  role: Role;
};

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: string, email: string, emailConfirmed: boolean, name: string, roles: Array<{ __typename?: 'AnyUserRole', role: Role } | { __typename?: 'ParentRole', relation?: string | null, role: Role, childUser: { __typename?: 'User', id: string, name: string } } | { __typename?: 'TeamRole', role: Role, team: { __typename?: 'Team', id: string, name: string } }> } };

export type ActivateMutationVariables = Exact<{
  password: Scalars['String'];
  passwordToken: Scalars['String'];
  user: UserCreate;
}>;


export type ActivateMutation = { __typename?: 'Mutation', activate?: string | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'JWT', token: string } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  user: UserCreate;
  team: TeamCreate;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: string | null };

export type MembersQueryVariables = Exact<{
  page?: InputMaybe<Page>;
  order?: InputMaybe<UserOrder>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type MembersQuery = { __typename?: 'Query', members: { __typename?: 'PaginatedUser', page: { __typename?: 'PageInfo', index: number, count: number, total: number }, nodes: Array<{ __typename?: 'User', id: string, createdAt: Date, email: string, emailConfirmed: boolean, name: string, teamRoles: Array<{ __typename?: 'AnyUserRole', role: Role } | { __typename?: 'ParentRole', role: Role } | { __typename?: 'TeamRole', role: Role }> }> } };

export type TeamQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TeamQuery = { __typename?: 'Query', team: { __typename?: 'Team', id: string, name: string } };

export type TeamsQueryVariables = Exact<{
  page?: InputMaybe<Page>;
  order?: InputMaybe<TeamOrder>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type TeamsQuery = { __typename?: 'Query', teams: { __typename?: 'PaginatedTeam', page: { __typename?: 'PageInfo', index: number, count: number, total: number }, nodes: Array<{ __typename?: 'Team', id: string, createdAt: Date, name: string, memberCount: number }> } };

export type InviteStaffMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type InviteStaffMutation = { __typename?: 'Mutation', inviteStaff?: string | null };

export type UsersQueryVariables = Exact<{
  page?: InputMaybe<Page>;
  order?: InputMaybe<UserOrder>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUser', page: { __typename?: 'PageInfo', index: number, count: number, total: number }, nodes: Array<{ __typename?: 'User', id: string, createdAt: Date, email: string, emailConfirmed: boolean, name: string, roles: Array<{ __typename?: 'AnyUserRole', role: Role } | { __typename?: 'ParentRole', relation?: string | null, role: Role, childUser: { __typename?: 'User', name: string } } | { __typename?: 'TeamRole', role: Role, team: { __typename?: 'Team', name: string } }> }> } };


export const ProfileDocument = gql`
    query profile {
  profile {
    id
    email
    emailConfirmed
    name
    roles {
      role
      ... on TeamRole {
        team {
          id
          name
        }
      }
      ... on ParentRole {
        relation
        childUser {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const ActivateDocument = gql`
    mutation activate($password: String!, $passwordToken: String!, $user: UserCreate!) {
  activate(password: $password, passwordToken: $passwordToken, user: $user)
}
    `;
export type ActivateMutationFn = Apollo.MutationFunction<ActivateMutation, ActivateMutationVariables>;

/**
 * __useActivateMutation__
 *
 * To run a mutation, you first call `useActivateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateMutation, { data, loading, error }] = useActivateMutation({
 *   variables: {
 *      password: // value for 'password'
 *      passwordToken: // value for 'passwordToken'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useActivateMutation(baseOptions?: Apollo.MutationHookOptions<ActivateMutation, ActivateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateMutation, ActivateMutationVariables>(ActivateDocument, options);
      }
export type ActivateMutationHookResult = ReturnType<typeof useActivateMutation>;
export type ActivateMutationResult = Apollo.MutationResult<ActivateMutation>;
export type ActivateMutationOptions = Apollo.BaseMutationOptions<ActivateMutation, ActivateMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($email: String!, $password: String!, $user: UserCreate!, $team: TeamCreate!) {
  register(email: $email, password: $password, user: $user, team: $team)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      user: // value for 'user'
 *      team: // value for 'team'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MembersDocument = gql`
    query members($page: Page, $order: UserOrder, $search: String) {
  members(page: $page, order: $order, search: $search) {
    page {
      index
      count
      total
    }
    nodes {
      id
      createdAt
      email
      emailConfirmed
      name
      teamRoles {
        role
      }
    }
  }
}
    `;

/**
 * __useMembersQuery__
 *
 * To run a query within a React component, call `useMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMembersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      order: // value for 'order'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useMembersQuery(baseOptions?: Apollo.QueryHookOptions<MembersQuery, MembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MembersQuery, MembersQueryVariables>(MembersDocument, options);
      }
export function useMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MembersQuery, MembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MembersQuery, MembersQueryVariables>(MembersDocument, options);
        }
export type MembersQueryHookResult = ReturnType<typeof useMembersQuery>;
export type MembersLazyQueryHookResult = ReturnType<typeof useMembersLazyQuery>;
export type MembersQueryResult = Apollo.QueryResult<MembersQuery, MembersQueryVariables>;
export const TeamDocument = gql`
    query team($id: ID!) {
  team(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useTeamQuery__
 *
 * To run a query within a React component, call `useTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTeamQuery(baseOptions: Apollo.QueryHookOptions<TeamQuery, TeamQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamQuery, TeamQueryVariables>(TeamDocument, options);
      }
export function useTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamQuery, TeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamQuery, TeamQueryVariables>(TeamDocument, options);
        }
export type TeamQueryHookResult = ReturnType<typeof useTeamQuery>;
export type TeamLazyQueryHookResult = ReturnType<typeof useTeamLazyQuery>;
export type TeamQueryResult = Apollo.QueryResult<TeamQuery, TeamQueryVariables>;
export const TeamsDocument = gql`
    query teams($page: Page, $order: TeamOrder, $search: String) {
  teams(page: $page, order: $order, search: $search) {
    page {
      index
      count
      total
    }
    nodes {
      id
      createdAt
      name
      memberCount
    }
  }
}
    `;

/**
 * __useTeamsQuery__
 *
 * To run a query within a React component, call `useTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      order: // value for 'order'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useTeamsQuery(baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
      }
export function useTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
        }
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>;
export const InviteStaffDocument = gql`
    mutation inviteStaff($email: String!) {
  inviteStaff(email: $email)
}
    `;
export type InviteStaffMutationFn = Apollo.MutationFunction<InviteStaffMutation, InviteStaffMutationVariables>;

/**
 * __useInviteStaffMutation__
 *
 * To run a mutation, you first call `useInviteStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteStaffMutation, { data, loading, error }] = useInviteStaffMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useInviteStaffMutation(baseOptions?: Apollo.MutationHookOptions<InviteStaffMutation, InviteStaffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteStaffMutation, InviteStaffMutationVariables>(InviteStaffDocument, options);
      }
export type InviteStaffMutationHookResult = ReturnType<typeof useInviteStaffMutation>;
export type InviteStaffMutationResult = Apollo.MutationResult<InviteStaffMutation>;
export type InviteStaffMutationOptions = Apollo.BaseMutationOptions<InviteStaffMutation, InviteStaffMutationVariables>;
export const UsersDocument = gql`
    query users($page: Page, $order: UserOrder, $search: String) {
  users(page: $page, order: $order, search: $search) {
    page {
      index
      count
      total
    }
    nodes {
      id
      createdAt
      email
      emailConfirmed
      name
      roles {
        role
        ... on TeamRole {
          team {
            name
          }
        }
        ... on ParentRole {
          relation
          childUser {
            name
          }
        }
      }
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      order: // value for 'order'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const namedOperations = {
  Query: {
    profile: 'profile',
    members: 'members',
    team: 'team',
    teams: 'teams',
    users: 'users'
  },
  Mutation: {
    activate: 'activate',
    login: 'login',
    register: 'register',
    inviteStaff: 'inviteStaff'
  }
}