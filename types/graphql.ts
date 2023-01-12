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

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  id: Scalars['ID'];
  state: Scalars['String'];
  street: Scalars['String'];
  zip: Scalars['String'];
};

export type AddressCreate = {
  city: Scalars['String'];
  state: Scalars['String'];
  street: Scalars['String'];
  zip: Scalars['String'];
};

export type AddressFilter = {
  city?: InputMaybe<StringFilter>;
  state?: InputMaybe<StringFilter>;
  street?: InputMaybe<StringFilter>;
  zip?: InputMaybe<StringFilter>;
};

export type AddressOrder = {
  city?: InputMaybe<OrderDirection>;
  state?: InputMaybe<OrderDirection>;
  street?: InputMaybe<OrderDirection>;
  zip?: InputMaybe<OrderDirection>;
};

export type AddressUpdate = {
  city?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
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

export type Membership = {
  __typename?: 'Membership';
  createdAt: Scalars['DateTime'];
  isAdmin: Scalars['Boolean'];
  organization: Organization;
  user: User;
};

export type MembershipFilter = {
  createdAt?: InputMaybe<DateTimeFilter>;
  isAdmin?: InputMaybe<BooleanFilter>;
  organization?: InputMaybe<OrganizationFilter>;
  user?: InputMaybe<UserFilter>;
};

export type MembershipOrder = {
  createdAt?: InputMaybe<OrderDirection>;
  isAdmin?: InputMaybe<OrderDirection>;
  organization?: InputMaybe<OrganizationOrder>;
  user?: InputMaybe<UserOrder>;
};

export type MembershipUpdate = {
  isAdmin?: InputMaybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activate?: Maybe<Scalars['ID']>;
  inviteMember?: Maybe<Scalars['ID']>;
  inviteParent?: Maybe<Scalars['ID']>;
  inviteStaff?: Maybe<Scalars['ID']>;
  login: Jwt;
  register?: Maybe<Scalars['ID']>;
  removeMember?: Maybe<Scalars['ID']>;
  removeParent?: Maybe<Scalars['ID']>;
  updateOrganization?: Maybe<Scalars['ID']>;
  updateProfile?: Maybe<Scalars['ID']>;
  updateRelationship?: Maybe<Scalars['ID']>;
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
  input: RegisterInput;
  password: Scalars['String'];
};


export type MutationRemoveMemberArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveParentArgs = {
  childId: Scalars['ID'];
  id: Scalars['ID'];
};


export type MutationUpdateOrganizationArgs = {
  input: OrganizationUpdate;
};


export type MutationUpdateProfileArgs = {
  input: ProfileUpdate;
};


export type MutationUpdateRelationshipArgs = {
  childId: Scalars['ID'];
  input: RelationshipUpdate;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input: UserUpdate;
};

export const OrderDirection = {
  Asc: 'ASC',
  Desc: 'DESC'
} as const;

export type OrderDirection = typeof OrderDirection[keyof typeof OrderDirection];
export type Organization = {
  __typename?: 'Organization';
  address: Address;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type OrganizationCreate = {
  address: AddressCreate;
  name: Scalars['String'];
};

export type OrganizationFilter = {
  address?: InputMaybe<AddressFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
};

export type OrganizationOrder = {
  address?: InputMaybe<AddressOrder>;
  createdAt?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type OrganizationUpdate = {
  address?: InputMaybe<AddressUpdate>;
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

export type PaginatedMembership = {
  __typename?: 'PaginatedMembership';
  nodes: Array<Membership>;
  page: PageInfo;
};

export type PaginatedOrganization = {
  __typename?: 'PaginatedOrganization';
  nodes: Array<Organization>;
  page: PageInfo;
};

export type PaginatedRelationship = {
  __typename?: 'PaginatedRelationship';
  nodes: Array<Relationship>;
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
  children: PaginatedRelationship;
  members: PaginatedMembership;
  organization: Organization;
  organizations: PaginatedOrganization;
  profile: User;
  user: User;
  users: PaginatedUser;
};


export type QueryChildrenArgs = {
  filter?: InputMaybe<RelationshipFilter>;
  order?: InputMaybe<RelationshipOrder>;
  page?: InputMaybe<Page>;
};


export type QueryMembersArgs = {
  filter?: InputMaybe<MembershipFilter>;
  order?: InputMaybe<MembershipOrder>;
  page?: InputMaybe<Page>;
};


export type QueryOrganizationsArgs = {
  filter?: InputMaybe<OrganizationFilter>;
  order?: InputMaybe<OrganizationOrder>;
  page?: InputMaybe<Page>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilter>;
  order?: InputMaybe<UserOrder>;
  page?: InputMaybe<Page>;
};

export type RegisterInput = {
  name: Scalars['String'];
  organization: OrganizationCreate;
};

export type Relationship = {
  __typename?: 'Relationship';
  childUser: User;
  createdAt: Scalars['DateTime'];
  parentUser: User;
  relation: Scalars['String'];
};

export type RelationshipFilter = {
  childUser?: InputMaybe<UserFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  parentUser?: InputMaybe<UserFilter>;
  relation?: InputMaybe<StringFilter>;
};

export type RelationshipOrder = {
  childUser?: InputMaybe<UserOrder>;
  createdAt?: InputMaybe<OrderDirection>;
  parentUser?: InputMaybe<UserOrder>;
  relation?: InputMaybe<OrderDirection>;
};

export type RelationshipUpdate = {
  relation?: InputMaybe<Scalars['String']>;
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
export type User = {
  __typename?: 'User';
  children: Array<Relationship>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  isConfirmed: Scalars['Boolean'];
  isStaff: Scalars['Boolean'];
  memberships: Array<Membership>;
  name: Scalars['String'];
  parents: Array<Relationship>;
};

export type UserFilter = {
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  isConfirmed?: InputMaybe<BooleanFilter>;
  isStaff?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
};

export type UserOrder = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  isConfirmed?: InputMaybe<OrderDirection>;
  isStaff?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type UserUpdate = {
  email?: InputMaybe<Scalars['String']>;
  isConfirmed?: InputMaybe<Scalars['Boolean']>;
  isStaff?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: string, email: string, name: string, isStaff: boolean, isConfirmed: boolean, memberships: Array<{ __typename?: 'Membership', isAdmin: boolean, organization: { __typename?: 'Organization', id: string, name: string } }>, children: Array<{ __typename?: 'Relationship', relation: string, childUser: { __typename?: 'User', id: string, email: string, name: string } }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'JWT', token: string, user: { __typename?: 'User', memberships: Array<{ __typename?: 'Membership', organization: { __typename?: 'Organization', id: string } }> } } };


export const ProfileDocument = gql`
    query profile {
  profile {
    id
    email
    name
    isStaff
    isConfirmed
    memberships {
      isAdmin
      organization {
        id
        name
      }
    }
    children {
      relation
      childUser {
        id
        email
        name
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
    user {
      memberships {
        organization {
          id
        }
      }
    }
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
    profile: 'profile'
  },
  Mutation: {
    login: 'login'
  }
}