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
  email: Scalars['String'];
  password: Scalars['String'];
  passwordToken: Scalars['String'];
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
};


export type QueryTeamArgs = {
  id: Scalars['ID'];
};


export type QueryTeamsArgs = {
  order?: InputMaybe<TeamOrder>;
  page?: InputMaybe<Page>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  order?: InputMaybe<UserOrder>;
  page?: InputMaybe<Page>;
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

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'JWT', token: string } };

export type MembersQueryVariables = Exact<{
  id: Scalars['ID'];
  page?: InputMaybe<Page>;
  order?: InputMaybe<UserOrder>;
}>;


export type MembersQuery = { __typename?: 'Query', team: { __typename?: 'Team', id: string, name: string }, members: { __typename?: 'PaginatedUser', page: { __typename?: 'PageInfo', index: number, count: number, total: number }, nodes: Array<{ __typename?: 'User', id: string, createdAt: Date, email: string, emailConfirmed: boolean, name: string, teamRoles: Array<{ __typename?: 'AnyUserRole', role: Role } | { __typename?: 'ParentRole', role: Role } | { __typename?: 'TeamRole', role: Role }> }> } };

export type TeamsQueryVariables = Exact<{
  page?: InputMaybe<Page>;
  order?: InputMaybe<TeamOrder>;
}>;


export type TeamsQuery = { __typename?: 'Query', teams: { __typename?: 'PaginatedTeam', page: { __typename?: 'PageInfo', index: number, count: number, total: number }, nodes: Array<{ __typename?: 'Team', id: string, createdAt: Date, name: string, memberCount: number }> } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, createdAt: Date, email: string, emailConfirmed: boolean, name: string, roles: Array<{ __typename?: 'AnyUserRole', role: Role } | { __typename?: 'ParentRole', relation?: string | null, role: Role, childUser: { __typename?: 'User', name: string } } | { __typename?: 'TeamRole', role: Role, team: { __typename?: 'Team', name: string } }> } };

export type UsersQueryVariables = Exact<{
  page?: InputMaybe<Page>;
  order?: InputMaybe<UserOrder>;
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
export const MembersDocument = gql`
    query members($id: ID!, $page: Page, $order: UserOrder) {
  team(id: $id) {
    id
    name
  }
  members(page: $page, order: $order) {
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
 *      id: // value for 'id'
 *      page: // value for 'page'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useMembersQuery(baseOptions: Apollo.QueryHookOptions<MembersQuery, MembersQueryVariables>) {
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
export const TeamsDocument = gql`
    query teams($page: Page, $order: TeamOrder) {
  teams(page: $page, order: $order) {
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
export const UserDocument = gql`
    query user($id: ID!) {
  user(id: $id) {
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
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query users($page: Page, $order: UserOrder) {
  users(page: $page, order: $order) {
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
    teams: 'teams',
    user: 'user',
    users: 'users'
  },
  Mutation: {
    login: 'login'
  }
}