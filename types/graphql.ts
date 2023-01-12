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

export type ActivateInput = {
  name: Scalars['String'];
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

export type Facebook = {
  __typename?: 'Facebook';
  createdAt: Scalars['DateTime'];
};

export type FacebookFilter = {
  is?: InputMaybe<Scalars['NullObject']>;
  isNot?: InputMaybe<Scalars['NullObject']>;
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
  token?: Maybe<Scalars['String']>;
  user: User;
};

export type Membership = {
  __typename?: 'Membership';
  createdAt: Scalars['DateTime'];
  isAdmin: Scalars['Boolean'];
  organization: Organization;
};

export type MembershipFilter = {
  createdAt?: InputMaybe<DateTimeFilter>;
  isAdmin?: InputMaybe<BooleanFilter>;
  organization?: InputMaybe<OrganizationFilter>;
};

export type MembershipOrder = {
  createdAt?: InputMaybe<OrderDirection>;
  isAdmin?: InputMaybe<OrderDirection>;
  organization?: InputMaybe<OrganizationOrder>;
};

export type MembershipUpdate = {
  isAdmin?: InputMaybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activate?: Maybe<Scalars['ID']>;
  inviteMember?: Maybe<Scalars['ID']>;
  inviteStaff?: Maybe<Scalars['ID']>;
  linkFacebook?: Maybe<Scalars['ID']>;
  login: Jwt;
  register?: Maybe<Scalars['ID']>;
  removeMember?: Maybe<Scalars['ID']>;
  unlinkSocial?: Maybe<Scalars['ID']>;
  updateMember?: Maybe<Scalars['ID']>;
  updateOrganization?: Maybe<Scalars['ID']>;
  updateProfile?: Maybe<Scalars['ID']>;
  updateUser?: Maybe<Scalars['ID']>;
};


export type MutationActivateArgs = {
  input: ActivateInput;
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationInviteMemberArgs = {
  email: Scalars['String'];
  isAdmin?: InputMaybe<Scalars['Boolean']>;
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
  input: RegisterInput;
  password: Scalars['String'];
};


export type MutationRemoveMemberArgs = {
  id: Scalars['ID'];
};


export type MutationUnlinkSocialArgs = {
  social?: InputMaybe<SocialType>;
};


export type MutationUpdateMemberArgs = {
  id: Scalars['ID'];
  input: MembershipUpdate;
};


export type MutationUpdateOrganizationArgs = {
  input?: InputMaybe<OrganizationUpdate>;
};


export type MutationUpdateProfileArgs = {
  input?: InputMaybe<ProfileUpdate>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<UserUpdate>;
};

export const OrderDirection = {
  Asc: 'ASC',
  Desc: 'DESC'
} as const;

export type OrderDirection = typeof OrderDirection[keyof typeof OrderDirection];
export type Organization = {
  __typename?: 'Organization';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type OrganizationFilter = {
  createdAt?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
};

export type OrganizationOrder = {
  createdAt?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type OrganizationUpdate = {
  name?: InputMaybe<Scalars['String']>;
};

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

export type PaginatedOrganization = {
  __typename?: 'PaginatedOrganization';
  nodes: Array<Organization>;
  page: PageInfo;
};

export type PaginatedUser = {
  __typename?: 'PaginatedUser';
  nodes: Array<User>;
  page: PageInfo;
};

export type ProfileUpdate = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  members: PaginatedUser;
  organizations: PaginatedOrganization;
  users: PaginatedUser;
};


export type QueryMembersArgs = {
  filter?: InputMaybe<UserFilter>;
  order?: InputMaybe<UserOrder>;
  page?: InputMaybe<Page>;
};


export type QueryOrganizationsArgs = {
  filter?: InputMaybe<OrganizationFilter>;
  order?: InputMaybe<OrganizationOrder>;
  page?: InputMaybe<Page>;
};


export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilter>;
  order?: InputMaybe<UserOrder>;
  page?: InputMaybe<Page>;
};

export type RegisterInput = {
  name: Scalars['String'];
  organizationName: Scalars['String'];
};

export const SocialType = {
  Facebook: 'FACEBOOK'
} as const;

export type SocialType = typeof SocialType[keyof typeof SocialType];
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
export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  facebook?: Maybe<Facebook>;
  id: Scalars['ID'];
  isConfirmed: Scalars['Boolean'];
  isStaff: Scalars['Boolean'];
  membership?: Maybe<Membership>;
  name: Scalars['String'];
};

export type UserFilter = {
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  facebook?: InputMaybe<FacebookFilter>;
  id?: InputMaybe<StringFilter>;
  isConfirmed?: InputMaybe<BooleanFilter>;
  isStaff?: InputMaybe<BooleanFilter>;
  membership?: InputMaybe<MembershipFilter>;
  name?: InputMaybe<StringFilter>;
};

export type UserOrder = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  isConfirmed?: InputMaybe<OrderDirection>;
  isStaff?: InputMaybe<OrderDirection>;
  membership?: InputMaybe<MembershipOrder>;
  name?: InputMaybe<OrderDirection>;
};

export type UserUpdate = {
  email?: InputMaybe<Scalars['String']>;
  isConfirmed?: InputMaybe<Scalars['Boolean']>;
  isStaff?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, name: string, isStaff: boolean, membership?: { __typename?: 'Membership', isAdmin: boolean, organization: { __typename?: 'Organization', id: string, name: string } } | null } };

export type UsersQueryVariables = Exact<{
  page?: InputMaybe<Page>;
  filter?: InputMaybe<UserFilter>;
  order?: InputMaybe<UserOrder>;
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUser', page: { __typename?: 'PageInfo', index: number, count: number, total: number, hasPrev: boolean, hasNext: boolean }, nodes: Array<{ __typename?: 'User', id: string, createdAt: Date, email: string, name: string, isStaff: boolean, membership?: { __typename?: 'Membership', isAdmin: boolean, organization: { __typename?: 'Organization', id: string, name: string } } | null }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'JWT', token?: string | null } };


export const MeDocument = gql`
    query me {
  me {
    id
    email
    name
    isStaff
    membership {
      isAdmin
      organization {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UsersDocument = gql`
    query users($page: Page, $filter: UserFilter, $order: UserOrder) {
  users(page: $page, filter: $filter, order: $order) {
    page {
      index
      count
      total
      hasPrev
      hasNext
    }
    nodes {
      id
      createdAt
      email
      name
      isStaff
      membership {
        isAdmin
        organization {
          id
          name
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
 *      filter: // value for 'filter'
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
export const namedOperations = {
  Query: {
    me: 'me',
    users: 'users'
  },
  Mutation: {
    login: 'login'
  }
}