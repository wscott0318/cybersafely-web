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
  id: Scalars['ID'];
  role: Role;
  status: RoleStatus;
};

export type ArrayOrder = {
  _count?: InputMaybe<OrderDirection>;
};

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<Scalars['Boolean']>;
};

export type ContactInput = {
  comments?: InputMaybe<Scalars['String']>;
  describe: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  jobTitle?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  schoolName: Scalars['String'];
  state: Scalars['String'];
  students: Scalars['String'];
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
  contact?: Maybe<Scalars['ID']>;
  createTeam?: Maybe<Scalars['ID']>;
  inviteAthlete?: Maybe<Scalars['ID']>;
  inviteCoach?: Maybe<Scalars['ID']>;
  inviteParent?: Maybe<Scalars['ID']>;
  inviteStaff?: Maybe<Scalars['ID']>;
  leaveTeam?: Maybe<Scalars['ID']>;
  login: Jwt;
  readAllNotifications?: Maybe<Scalars['ID']>;
  register?: Maybe<Scalars['ID']>;
  removeMember?: Maybe<Scalars['ID']>;
  removeParent?: Maybe<Scalars['ID']>;
  removeRole?: Maybe<Scalars['ID']>;
  requestResetPassword?: Maybe<Scalars['ID']>;
  resetPassword?: Maybe<Scalars['ID']>;
  updatePassword?: Maybe<Scalars['ID']>;
  updateProfile?: Maybe<Scalars['ID']>;
  updateTeam?: Maybe<Scalars['ID']>;
};


export type MutationActivateArgs = {
  password: Scalars['String'];
  passwordToken: Scalars['String'];
  user: UserCreate;
};


export type MutationContactArgs = {
  input: ContactInput;
};


export type MutationCreateTeamArgs = {
  input: TeamCreate;
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
  relation?: InputMaybe<Scalars['String']>;
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


export type MutationRemoveMemberArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveParentArgs = {
  childId: Scalars['ID'];
  id: Scalars['ID'];
};


export type MutationRemoveRoleArgs = {
  id: Scalars['ID'];
};


export type MutationRequestResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  passwordToken: Scalars['String'];
};


export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdateTeamArgs = {
  input: UpdateTeamInput;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  message: Scalars['String'];
  object?: Maybe<NotificationObject>;
  objectType: NotificationObjectType;
  unread: Scalars['Boolean'];
};

export type NotificationObject = {
  id: Scalars['ID'];
};

export const NotificationObjectType = {
  None: 'NONE',
  Team: 'TEAM',
  User: 'USER'
} as const;

export type NotificationObjectType = typeof NotificationObjectType[keyof typeof NotificationObjectType];
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

export type PaginatedNotification = {
  __typename?: 'PaginatedNotification';
  nodes: Array<Notification>;
  page: PageInfo;
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
  id: Scalars['ID'];
  relation?: Maybe<Scalars['String']>;
  role: Role;
  status: RoleStatus;
};

export type Query = {
  __typename?: 'Query';
  children: PaginatedUser;
  member: User;
  members: PaginatedUser;
  notifications: PaginatedNotification;
  parents: PaginatedUser;
  profile: User;
  statsOfCreatedMembers: StatsByDay;
  statsOfCreatedParents: StatsByDay;
  statsOfCreatedTeams: StatsByDay;
  statsOfCreatedUsers: StatsByDay;
  team: Team;
  teams: PaginatedTeam;
  user: User;
  users: PaginatedUser;
};


export type QueryChildrenArgs = {
  order?: InputMaybe<UserOrder>;
  page?: InputMaybe<Page>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryMemberArgs = {
  id: Scalars['ID'];
};


export type QueryMembersArgs = {
  order?: InputMaybe<UserOrder>;
  page?: InputMaybe<Page>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryNotificationsArgs = {
  page?: InputMaybe<Page>;
  unread?: InputMaybe<Scalars['Boolean']>;
};


export type QueryParentsArgs = {
  childId: Scalars['ID'];
  order?: InputMaybe<UserOrder>;
  page?: InputMaybe<Page>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryStatsOfCreatedMembersArgs = {
  days?: InputMaybe<Scalars['Int']>;
};


export type QueryStatsOfCreatedParentsArgs = {
  days?: InputMaybe<Scalars['Int']>;
};


export type QueryStatsOfCreatedTeamsArgs = {
  days?: InputMaybe<Scalars['Int']>;
};


export type QueryStatsOfCreatedUsersArgs = {
  days?: InputMaybe<Scalars['Int']>;
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
export const RoleStatus = {
  Accepted: 'ACCEPTED',
  Declined: 'DECLINED',
  Pending: 'PENDING'
} as const;

export type RoleStatus = typeof RoleStatus[keyof typeof RoleStatus];
export type StatByDay = {
  __typename?: 'StatByDay';
  day: Scalars['DateTime'];
  value: Scalars['Int'];
};

export type StatsByDay = {
  __typename?: 'StatsByDay';
  stats: Array<StatByDay>;
  total: Scalars['Int'];
};

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
export type Team = NotificationObject & {
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
  id: Scalars['ID'];
  role: Role;
  status: RoleStatus;
  team: Team;
};

export type UpdateProfileInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateTeamInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type User = NotificationObject & {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  emailConfirmed: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  parentCount: Scalars['Int'];
  parentRole?: Maybe<ParentRole>;
  roles: Array<UserRole>;
};

export type UserCreate = {
  name: Scalars['String'];
};

export type UserOrder = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  parentCount?: InputMaybe<OrderDirection>;
};

export type UserRole = {
  id: Scalars['ID'];
  role: Role;
  status: RoleStatus;
};

export type NumberOfNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type NumberOfNotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'PaginatedNotification', page: { __typename?: 'PageInfo', total: number } } };

export type NotificationsQueryVariables = Exact<{
  page?: InputMaybe<Page>;
}>;


export type NotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'PaginatedNotification', page: { __typename?: 'PageInfo', index: number, count: number }, nodes: Array<{ __typename?: 'Notification', id: string, createdAt: Date, message: string, objectType: NotificationObjectType, object?: { __typename?: 'Team', name: string, id: string } | { __typename?: 'User', name: string, id: string } | null }> } };

export type ReadAllNotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type ReadAllNotificationsMutation = { __typename?: 'Mutation', readAllNotifications?: string | null };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: string, email: string, emailConfirmed: boolean, name: string, roles: Array<{ __typename?: 'AnyUserRole', id: string, role: Role, status: RoleStatus } | { __typename?: 'ParentRole', relation?: string | null, id: string, role: Role, status: RoleStatus, childUser: { __typename?: 'User', id: string, name: string } } | { __typename?: 'TeamRole', id: string, role: Role, status: RoleStatus, team: { __typename?: 'Team', id: string, name: string } }> } };

export type RemoveMemberMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveMemberMutation = { __typename?: 'Mutation', removeMember?: string | null };

export type RemoveParentMutationVariables = Exact<{
  id: Scalars['ID'];
  childId: Scalars['ID'];
}>;


export type RemoveParentMutation = { __typename?: 'Mutation', removeParent?: string | null };

export type LeaveTeamMutationVariables = Exact<{ [key: string]: never; }>;


export type LeaveTeamMutation = { __typename?: 'Mutation', leaveTeam?: string | null };

export type UpdatePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword?: string | null };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: string | null };

export type UpdateTeamMutationVariables = Exact<{
  input: UpdateTeamInput;
}>;


export type UpdateTeamMutation = { __typename?: 'Mutation', updateTeam?: string | null };

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

export type ResetPasswordMutationVariables = Exact<{
  password: Scalars['String'];
  passwordToken: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: string | null };

export type RequestResetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type RequestResetPasswordMutation = { __typename?: 'Mutation', requestResetPassword?: string | null };

export type ContactMutationVariables = Exact<{
  input: ContactInput;
}>;


export type ContactMutation = { __typename?: 'Mutation', contact?: string | null };

export type InviteParentMutationVariables = Exact<{
  childId: Scalars['ID'];
  email: Scalars['String'];
  relation?: InputMaybe<Scalars['String']>;
}>;


export type InviteParentMutation = { __typename?: 'Mutation', inviteParent?: string | null };

export type MemberQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MemberQuery = { __typename?: 'Query', member: { __typename?: 'User', id: string, name: string } };

export type ParentsQueryVariables = Exact<{
  childId: Scalars['ID'];
  page?: InputMaybe<Page>;
  order?: InputMaybe<UserOrder>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type ParentsQuery = { __typename?: 'Query', parents: { __typename?: 'PaginatedUser', page: { __typename?: 'PageInfo', index: number, count: number, total: number }, nodes: Array<{ __typename?: 'User', id: string, createdAt: Date, email: string, emailConfirmed: boolean, name: string, roles: Array<{ __typename?: 'AnyUserRole', id: string, role: Role, status: RoleStatus } | { __typename?: 'ParentRole', relation?: string | null, id: string, role: Role, status: RoleStatus } | { __typename?: 'TeamRole', id: string, role: Role, status: RoleStatus }> }> } };

export type InviteCoachMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type InviteCoachMutation = { __typename?: 'Mutation', inviteCoach?: string | null };

export type InviteAthleteMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type InviteAthleteMutation = { __typename?: 'Mutation', inviteAthlete?: string | null };

export type ChildrenQueryVariables = Exact<{
  page?: InputMaybe<Page>;
  order?: InputMaybe<UserOrder>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type ChildrenQuery = { __typename?: 'Query', children: { __typename?: 'PaginatedUser', page: { __typename?: 'PageInfo', index: number, count: number, total: number }, nodes: Array<{ __typename?: 'User', id: string, createdAt: Date, email: string, name: string, roles: Array<{ __typename?: 'AnyUserRole', id: string, role: Role, status: RoleStatus } | { __typename?: 'ParentRole', id: string, role: Role, status: RoleStatus } | { __typename?: 'TeamRole', id: string, role: Role, status: RoleStatus, team: { __typename?: 'Team', id: string, name: string } }>, parentRole?: { __typename?: 'ParentRole', relation?: string | null } | null }> } };

export type StatsByDayForStaffFragment = { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: Date, value: number }> };

export type StatsForStaffQueryVariables = Exact<{
  days: Scalars['Int'];
}>;


export type StatsForStaffQuery = { __typename?: 'Query', statsOfCreatedUsers: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: Date, value: number }> }, statsOfCreatedTeams: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: Date, value: number }> }, statsOfCreatedMembers: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: Date, value: number }> }, statsOfCreatedParents: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: Date, value: number }> } };

export type MembersQueryVariables = Exact<{
  page?: InputMaybe<Page>;
  order?: InputMaybe<UserOrder>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type MembersQuery = { __typename?: 'Query', members: { __typename?: 'PaginatedUser', page: { __typename?: 'PageInfo', index: number, count: number, total: number }, nodes: Array<{ __typename?: 'User', id: string, createdAt: Date, email: string, emailConfirmed: boolean, name: string, parentCount: number, roles: Array<{ __typename?: 'AnyUserRole', id: string, role: Role, status: RoleStatus } | { __typename?: 'ParentRole', id: string, role: Role, status: RoleStatus } | { __typename?: 'TeamRole', id: string, role: Role, status: RoleStatus }> }> } };

export type TeamQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TeamQuery = { __typename?: 'Query', team: { __typename?: 'Team', id: string, name: string } };

export type CreateTeamMutationVariables = Exact<{
  input: TeamCreate;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam?: string | null };

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

export type RemoveRoleMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveRoleMutation = { __typename?: 'Mutation', removeRole?: string | null };

export type UsersQueryVariables = Exact<{
  page?: InputMaybe<Page>;
  order?: InputMaybe<UserOrder>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUser', page: { __typename?: 'PageInfo', index: number, count: number, total: number }, nodes: Array<{ __typename?: 'User', id: string, createdAt: Date, email: string, emailConfirmed: boolean, name: string, roles: Array<{ __typename?: 'AnyUserRole', id: string, role: Role, status: RoleStatus } | { __typename?: 'ParentRole', relation?: string | null, id: string, role: Role, status: RoleStatus, childUser: { __typename?: 'User', name: string } } | { __typename?: 'TeamRole', id: string, role: Role, status: RoleStatus, team: { __typename?: 'Team', name: string } }> }> } };

export const StatsByDayForStaffFragmentDoc = gql`
    fragment StatsByDayForStaff on StatsByDay {
  stats {
    day
    value
  }
  total
}
    `;
export const NumberOfNotificationsDocument = gql`
    query numberOfNotifications {
  notifications {
    page {
      total
    }
  }
}
    `;

/**
 * __useNumberOfNotificationsQuery__
 *
 * To run a query within a React component, call `useNumberOfNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNumberOfNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNumberOfNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNumberOfNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<NumberOfNotificationsQuery, NumberOfNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NumberOfNotificationsQuery, NumberOfNotificationsQueryVariables>(NumberOfNotificationsDocument, options);
      }
export function useNumberOfNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NumberOfNotificationsQuery, NumberOfNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NumberOfNotificationsQuery, NumberOfNotificationsQueryVariables>(NumberOfNotificationsDocument, options);
        }
export type NumberOfNotificationsQueryHookResult = ReturnType<typeof useNumberOfNotificationsQuery>;
export type NumberOfNotificationsLazyQueryHookResult = ReturnType<typeof useNumberOfNotificationsLazyQuery>;
export type NumberOfNotificationsQueryResult = Apollo.QueryResult<NumberOfNotificationsQuery, NumberOfNotificationsQueryVariables>;
export const NotificationsDocument = gql`
    query notifications($page: Page) {
  notifications(page: $page) {
    page {
      index
      count
    }
    nodes {
      id
      createdAt
      message
      objectType
      object {
        id
        ... on User {
          name
        }
        ... on Team {
          name
        }
      }
    }
  }
}
    `;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const ReadAllNotificationsDocument = gql`
    mutation readAllNotifications {
  readAllNotifications
}
    `;
export type ReadAllNotificationsMutationFn = Apollo.MutationFunction<ReadAllNotificationsMutation, ReadAllNotificationsMutationVariables>;

/**
 * __useReadAllNotificationsMutation__
 *
 * To run a mutation, you first call `useReadAllNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadAllNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readAllNotificationsMutation, { data, loading, error }] = useReadAllNotificationsMutation({
 *   variables: {
 *   },
 * });
 */
export function useReadAllNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<ReadAllNotificationsMutation, ReadAllNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadAllNotificationsMutation, ReadAllNotificationsMutationVariables>(ReadAllNotificationsDocument, options);
      }
export type ReadAllNotificationsMutationHookResult = ReturnType<typeof useReadAllNotificationsMutation>;
export type ReadAllNotificationsMutationResult = Apollo.MutationResult<ReadAllNotificationsMutation>;
export type ReadAllNotificationsMutationOptions = Apollo.BaseMutationOptions<ReadAllNotificationsMutation, ReadAllNotificationsMutationVariables>;
export const ProfileDocument = gql`
    query profile {
  profile {
    id
    email
    emailConfirmed
    name
    roles {
      id
      role
      status
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
export const RemoveMemberDocument = gql`
    mutation removeMember($id: ID!) {
  removeMember(id: $id)
}
    `;
export type RemoveMemberMutationFn = Apollo.MutationFunction<RemoveMemberMutation, RemoveMemberMutationVariables>;

/**
 * __useRemoveMemberMutation__
 *
 * To run a mutation, you first call `useRemoveMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMemberMutation, { data, loading, error }] = useRemoveMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveMemberMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMemberMutation, RemoveMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMemberMutation, RemoveMemberMutationVariables>(RemoveMemberDocument, options);
      }
export type RemoveMemberMutationHookResult = ReturnType<typeof useRemoveMemberMutation>;
export type RemoveMemberMutationResult = Apollo.MutationResult<RemoveMemberMutation>;
export type RemoveMemberMutationOptions = Apollo.BaseMutationOptions<RemoveMemberMutation, RemoveMemberMutationVariables>;
export const RemoveParentDocument = gql`
    mutation removeParent($id: ID!, $childId: ID!) {
  removeParent(id: $id, childId: $childId)
}
    `;
export type RemoveParentMutationFn = Apollo.MutationFunction<RemoveParentMutation, RemoveParentMutationVariables>;

/**
 * __useRemoveParentMutation__
 *
 * To run a mutation, you first call `useRemoveParentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveParentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeParentMutation, { data, loading, error }] = useRemoveParentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      childId: // value for 'childId'
 *   },
 * });
 */
export function useRemoveParentMutation(baseOptions?: Apollo.MutationHookOptions<RemoveParentMutation, RemoveParentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveParentMutation, RemoveParentMutationVariables>(RemoveParentDocument, options);
      }
export type RemoveParentMutationHookResult = ReturnType<typeof useRemoveParentMutation>;
export type RemoveParentMutationResult = Apollo.MutationResult<RemoveParentMutation>;
export type RemoveParentMutationOptions = Apollo.BaseMutationOptions<RemoveParentMutation, RemoveParentMutationVariables>;
export const LeaveTeamDocument = gql`
    mutation leaveTeam {
  leaveTeam
}
    `;
export type LeaveTeamMutationFn = Apollo.MutationFunction<LeaveTeamMutation, LeaveTeamMutationVariables>;

/**
 * __useLeaveTeamMutation__
 *
 * To run a mutation, you first call `useLeaveTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveTeamMutation, { data, loading, error }] = useLeaveTeamMutation({
 *   variables: {
 *   },
 * });
 */
export function useLeaveTeamMutation(baseOptions?: Apollo.MutationHookOptions<LeaveTeamMutation, LeaveTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveTeamMutation, LeaveTeamMutationVariables>(LeaveTeamDocument, options);
      }
export type LeaveTeamMutationHookResult = ReturnType<typeof useLeaveTeamMutation>;
export type LeaveTeamMutationResult = Apollo.MutationResult<LeaveTeamMutation>;
export type LeaveTeamMutationOptions = Apollo.BaseMutationOptions<LeaveTeamMutation, LeaveTeamMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation updatePassword($oldPassword: String!, $newPassword: String!) {
  updatePassword(oldPassword: $oldPassword, newPassword: $newPassword)
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation updateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input)
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateTeamDocument = gql`
    mutation updateTeam($input: UpdateTeamInput!) {
  updateTeam(input: $input)
}
    `;
export type UpdateTeamMutationFn = Apollo.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTeamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, options);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = Apollo.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
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
export const ResetPasswordDocument = gql`
    mutation resetPassword($password: String!, $passwordToken: String!) {
  resetPassword(password: $password, passwordToken: $passwordToken)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      passwordToken: // value for 'passwordToken'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const RequestResetPasswordDocument = gql`
    mutation requestResetPassword($email: String!) {
  requestResetPassword(email: $email)
}
    `;
export type RequestResetPasswordMutationFn = Apollo.MutationFunction<RequestResetPasswordMutation, RequestResetPasswordMutationVariables>;

/**
 * __useRequestResetPasswordMutation__
 *
 * To run a mutation, you first call `useRequestResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestResetPasswordMutation, { data, loading, error }] = useRequestResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRequestResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<RequestResetPasswordMutation, RequestResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestResetPasswordMutation, RequestResetPasswordMutationVariables>(RequestResetPasswordDocument, options);
      }
export type RequestResetPasswordMutationHookResult = ReturnType<typeof useRequestResetPasswordMutation>;
export type RequestResetPasswordMutationResult = Apollo.MutationResult<RequestResetPasswordMutation>;
export type RequestResetPasswordMutationOptions = Apollo.BaseMutationOptions<RequestResetPasswordMutation, RequestResetPasswordMutationVariables>;
export const ContactDocument = gql`
    mutation contact($input: ContactInput!) {
  contact(input: $input)
}
    `;
export type ContactMutationFn = Apollo.MutationFunction<ContactMutation, ContactMutationVariables>;

/**
 * __useContactMutation__
 *
 * To run a mutation, you first call `useContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [contactMutation, { data, loading, error }] = useContactMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useContactMutation(baseOptions?: Apollo.MutationHookOptions<ContactMutation, ContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ContactMutation, ContactMutationVariables>(ContactDocument, options);
      }
export type ContactMutationHookResult = ReturnType<typeof useContactMutation>;
export type ContactMutationResult = Apollo.MutationResult<ContactMutation>;
export type ContactMutationOptions = Apollo.BaseMutationOptions<ContactMutation, ContactMutationVariables>;
export const InviteParentDocument = gql`
    mutation inviteParent($childId: ID!, $email: String!, $relation: String) {
  inviteParent(childId: $childId, email: $email, relation: $relation)
}
    `;
export type InviteParentMutationFn = Apollo.MutationFunction<InviteParentMutation, InviteParentMutationVariables>;

/**
 * __useInviteParentMutation__
 *
 * To run a mutation, you first call `useInviteParentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteParentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteParentMutation, { data, loading, error }] = useInviteParentMutation({
 *   variables: {
 *      childId: // value for 'childId'
 *      email: // value for 'email'
 *      relation: // value for 'relation'
 *   },
 * });
 */
export function useInviteParentMutation(baseOptions?: Apollo.MutationHookOptions<InviteParentMutation, InviteParentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteParentMutation, InviteParentMutationVariables>(InviteParentDocument, options);
      }
export type InviteParentMutationHookResult = ReturnType<typeof useInviteParentMutation>;
export type InviteParentMutationResult = Apollo.MutationResult<InviteParentMutation>;
export type InviteParentMutationOptions = Apollo.BaseMutationOptions<InviteParentMutation, InviteParentMutationVariables>;
export const MemberDocument = gql`
    query member($id: ID!) {
  member(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useMemberQuery__
 *
 * To run a query within a React component, call `useMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemberQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMemberQuery(baseOptions: Apollo.QueryHookOptions<MemberQuery, MemberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MemberQuery, MemberQueryVariables>(MemberDocument, options);
      }
export function useMemberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MemberQuery, MemberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MemberQuery, MemberQueryVariables>(MemberDocument, options);
        }
export type MemberQueryHookResult = ReturnType<typeof useMemberQuery>;
export type MemberLazyQueryHookResult = ReturnType<typeof useMemberLazyQuery>;
export type MemberQueryResult = Apollo.QueryResult<MemberQuery, MemberQueryVariables>;
export const ParentsDocument = gql`
    query parents($childId: ID!, $page: Page, $order: UserOrder, $search: String) {
  parents(childId: $childId, page: $page, order: $order, search: $search) {
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
        id
        role
        status
        ... on ParentRole {
          relation
        }
      }
    }
  }
}
    `;

/**
 * __useParentsQuery__
 *
 * To run a query within a React component, call `useParentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useParentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParentsQuery({
 *   variables: {
 *      childId: // value for 'childId'
 *      page: // value for 'page'
 *      order: // value for 'order'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useParentsQuery(baseOptions: Apollo.QueryHookOptions<ParentsQuery, ParentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ParentsQuery, ParentsQueryVariables>(ParentsDocument, options);
      }
export function useParentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParentsQuery, ParentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ParentsQuery, ParentsQueryVariables>(ParentsDocument, options);
        }
export type ParentsQueryHookResult = ReturnType<typeof useParentsQuery>;
export type ParentsLazyQueryHookResult = ReturnType<typeof useParentsLazyQuery>;
export type ParentsQueryResult = Apollo.QueryResult<ParentsQuery, ParentsQueryVariables>;
export const InviteCoachDocument = gql`
    mutation inviteCoach($email: String!) {
  inviteCoach(email: $email)
}
    `;
export type InviteCoachMutationFn = Apollo.MutationFunction<InviteCoachMutation, InviteCoachMutationVariables>;

/**
 * __useInviteCoachMutation__
 *
 * To run a mutation, you first call `useInviteCoachMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteCoachMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteCoachMutation, { data, loading, error }] = useInviteCoachMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useInviteCoachMutation(baseOptions?: Apollo.MutationHookOptions<InviteCoachMutation, InviteCoachMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteCoachMutation, InviteCoachMutationVariables>(InviteCoachDocument, options);
      }
export type InviteCoachMutationHookResult = ReturnType<typeof useInviteCoachMutation>;
export type InviteCoachMutationResult = Apollo.MutationResult<InviteCoachMutation>;
export type InviteCoachMutationOptions = Apollo.BaseMutationOptions<InviteCoachMutation, InviteCoachMutationVariables>;
export const InviteAthleteDocument = gql`
    mutation inviteAthlete($email: String!) {
  inviteAthlete(email: $email)
}
    `;
export type InviteAthleteMutationFn = Apollo.MutationFunction<InviteAthleteMutation, InviteAthleteMutationVariables>;

/**
 * __useInviteAthleteMutation__
 *
 * To run a mutation, you first call `useInviteAthleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteAthleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteAthleteMutation, { data, loading, error }] = useInviteAthleteMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useInviteAthleteMutation(baseOptions?: Apollo.MutationHookOptions<InviteAthleteMutation, InviteAthleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteAthleteMutation, InviteAthleteMutationVariables>(InviteAthleteDocument, options);
      }
export type InviteAthleteMutationHookResult = ReturnType<typeof useInviteAthleteMutation>;
export type InviteAthleteMutationResult = Apollo.MutationResult<InviteAthleteMutation>;
export type InviteAthleteMutationOptions = Apollo.BaseMutationOptions<InviteAthleteMutation, InviteAthleteMutationVariables>;
export const ChildrenDocument = gql`
    query children($page: Page, $order: UserOrder, $search: String) {
  children(page: $page, order: $order, search: $search) {
    page {
      index
      count
      total
    }
    nodes {
      id
      createdAt
      email
      name
      roles {
        id
        role
        status
        ... on TeamRole {
          team {
            id
            name
          }
        }
      }
      parentRole {
        relation
      }
    }
  }
}
    `;

/**
 * __useChildrenQuery__
 *
 * To run a query within a React component, call `useChildrenQuery` and pass it any options that fit your needs.
 * When your component renders, `useChildrenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChildrenQuery({
 *   variables: {
 *      page: // value for 'page'
 *      order: // value for 'order'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useChildrenQuery(baseOptions?: Apollo.QueryHookOptions<ChildrenQuery, ChildrenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChildrenQuery, ChildrenQueryVariables>(ChildrenDocument, options);
      }
export function useChildrenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChildrenQuery, ChildrenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChildrenQuery, ChildrenQueryVariables>(ChildrenDocument, options);
        }
export type ChildrenQueryHookResult = ReturnType<typeof useChildrenQuery>;
export type ChildrenLazyQueryHookResult = ReturnType<typeof useChildrenLazyQuery>;
export type ChildrenQueryResult = Apollo.QueryResult<ChildrenQuery, ChildrenQueryVariables>;
export const StatsForStaffDocument = gql`
    query statsForStaff($days: Int!) {
  statsOfCreatedUsers(days: $days) {
    ...StatsByDayForStaff
  }
  statsOfCreatedTeams(days: $days) {
    ...StatsByDayForStaff
  }
  statsOfCreatedMembers(days: $days) {
    ...StatsByDayForStaff
  }
  statsOfCreatedParents(days: $days) {
    ...StatsByDayForStaff
  }
}
    ${StatsByDayForStaffFragmentDoc}`;

/**
 * __useStatsForStaffQuery__
 *
 * To run a query within a React component, call `useStatsForStaffQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatsForStaffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatsForStaffQuery({
 *   variables: {
 *      days: // value for 'days'
 *   },
 * });
 */
export function useStatsForStaffQuery(baseOptions: Apollo.QueryHookOptions<StatsForStaffQuery, StatsForStaffQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatsForStaffQuery, StatsForStaffQueryVariables>(StatsForStaffDocument, options);
      }
export function useStatsForStaffLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatsForStaffQuery, StatsForStaffQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatsForStaffQuery, StatsForStaffQueryVariables>(StatsForStaffDocument, options);
        }
export type StatsForStaffQueryHookResult = ReturnType<typeof useStatsForStaffQuery>;
export type StatsForStaffLazyQueryHookResult = ReturnType<typeof useStatsForStaffLazyQuery>;
export type StatsForStaffQueryResult = Apollo.QueryResult<StatsForStaffQuery, StatsForStaffQueryVariables>;
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
      parentCount
      roles {
        id
        role
        status
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
export const CreateTeamDocument = gql`
    mutation createTeam($input: TeamCreate!) {
  createTeam(input: $input)
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
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
export const RemoveRoleDocument = gql`
    mutation removeRole($id: ID!) {
  removeRole(id: $id)
}
    `;
export type RemoveRoleMutationFn = Apollo.MutationFunction<RemoveRoleMutation, RemoveRoleMutationVariables>;

/**
 * __useRemoveRoleMutation__
 *
 * To run a mutation, you first call `useRemoveRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeRoleMutation, { data, loading, error }] = useRemoveRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveRoleMutation(baseOptions?: Apollo.MutationHookOptions<RemoveRoleMutation, RemoveRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveRoleMutation, RemoveRoleMutationVariables>(RemoveRoleDocument, options);
      }
export type RemoveRoleMutationHookResult = ReturnType<typeof useRemoveRoleMutation>;
export type RemoveRoleMutationResult = Apollo.MutationResult<RemoveRoleMutation>;
export type RemoveRoleMutationOptions = Apollo.BaseMutationOptions<RemoveRoleMutation, RemoveRoleMutationVariables>;
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
        id
        role
        status
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
    numberOfNotifications: 'numberOfNotifications',
    notifications: 'notifications',
    profile: 'profile',
    member: 'member',
    parents: 'parents',
    children: 'children',
    statsForStaff: 'statsForStaff',
    members: 'members',
    team: 'team',
    teams: 'teams',
    users: 'users'
  },
  Mutation: {
    readAllNotifications: 'readAllNotifications',
    removeMember: 'removeMember',
    removeParent: 'removeParent',
    leaveTeam: 'leaveTeam',
    updatePassword: 'updatePassword',
    updateProfile: 'updateProfile',
    updateTeam: 'updateTeam',
    activate: 'activate',
    login: 'login',
    register: 'register',
    resetPassword: 'resetPassword',
    requestResetPassword: 'requestResetPassword',
    contact: 'contact',
    inviteParent: 'inviteParent',
    inviteCoach: 'inviteCoach',
    inviteAthlete: 'inviteAthlete',
    createTeam: 'createTeam',
    inviteStaff: 'inviteStaff',
    removeRole: 'removeRole'
  },
  Fragment: {
    StatsByDayForStaff: 'StatsByDayForStaff'
  }
}