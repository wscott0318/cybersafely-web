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

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  formatted: Scalars['String'];
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

export type AddressUpdate = {
  city: Scalars['String'];
  state: Scalars['String'];
  street: Scalars['String'];
  zip: Scalars['String'];
};

export type AnyRole = UserRole & {
  __typename?: 'AnyRole';
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

export type GlobalSettings = {
  __typename?: 'GlobalSettings';
  enableSignUps?: Maybe<Scalars['Boolean']>;
};

export type GlobalSettingsUpdate = {
  enableSignUps?: InputMaybe<Scalars['Boolean']>;
};

export type Image = {
  __typename?: 'Image';
  url: Scalars['String'];
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<Scalars['Int']>;
};

export const InviteMemberRole = {
  Admin: 'ADMIN',
  Athlete: 'ATHLETE',
  Coach: 'COACH'
} as const;

export type InviteMemberRole = typeof InviteMemberRole[keyof typeof InviteMemberRole];
export type Item = {
  __typename?: 'Item';
  id: Scalars['ID'];
};

export type Jwt = {
  __typename?: 'JWT';
  token: Scalars['String'];
  user: User;
};

export type MemberFilter = {
  role?: InputMaybe<MemberRole>;
};

export const MemberRole = {
  Admin: 'ADMIN',
  Athlete: 'ATHLETE',
  Coach: 'COACH'
} as const;

export type MemberRole = typeof MemberRole[keyof typeof MemberRole];
export type Mutation = {
  __typename?: 'Mutation';
  activate?: Maybe<Scalars['ID']>;
  contact?: Maybe<Scalars['ID']>;
  createSchool?: Maybe<Scalars['ID']>;
  inviteMember?: Maybe<Scalars['ID']>;
  inviteParent?: Maybe<Scalars['ID']>;
  inviteStaff?: Maybe<Scalars['ID']>;
  login: Jwt;
  prepareForUpload: Upload;
  readAllNotifications?: Maybe<Scalars['ID']>;
  register: Jwt;
  removeMember?: Maybe<Scalars['ID']>;
  removeParent?: Maybe<Scalars['ID']>;
  removeRole?: Maybe<Scalars['ID']>;
  requestResetPassword?: Maybe<Scalars['ID']>;
  resetPassword?: Maybe<Scalars['ID']>;
  updateGlobalSettings?: Maybe<Scalars['ID']>;
  updatePassword?: Maybe<Scalars['ID']>;
  updateProfile?: Maybe<Scalars['ID']>;
  updateSchool?: Maybe<Scalars['ID']>;
};


export type MutationActivateArgs = {
  password: Scalars['String'];
  passwordToken: Scalars['String'];
  user: UserCreate;
};


export type MutationContactArgs = {
  input: ContactInput;
};


export type MutationCreateSchoolArgs = {
  input: SchoolCreate;
};


export type MutationInviteMemberArgs = {
  email: Scalars['String'];
  role: InviteMemberRole;
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
  school: SchoolCreate;
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


export type MutationUpdateGlobalSettingsArgs = {
  input: GlobalSettingsUpdate;
};


export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdateSchoolArgs = {
  input: SchoolUpdate;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  message: Scalars['String'];
  url?: Maybe<Scalars['String']>;
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

export type PaginatedItem = {
  __typename?: 'PaginatedItem';
  nodes: Array<Item>;
  page: PageInfo;
};

export type PaginatedNotification = {
  __typename?: 'PaginatedNotification';
  nodes: Array<Notification>;
  page: PageInfo;
};

export type PaginatedSchool = {
  __typename?: 'PaginatedSchool';
  nodes: Array<School>;
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
  globalSettings: GlobalSettings;
  globalSettingsCanSignUp: Scalars['Boolean'];
  member: User;
  members: PaginatedUser;
  notifications: PaginatedNotification;
  notificationsCount: Scalars['Int'];
  parents: PaginatedUser;
  profile: User;
  school: School;
  schools: PaginatedSchool;
  statsOfAcceptedMembersInSchool: StatsByDay;
  statsOfCreatedMembers: StatsByDay;
  statsOfCreatedMembersInSchool: StatsByDay;
  statsOfCreatedParents: StatsByDay;
  statsOfCreatedSchools: StatsByDay;
  statsOfCreatedUsers: StatsByDay;
  statsOfInvitedMembersInSchool: StatsByDay;
  tempPaginatedItem: PaginatedItem;
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
  filter?: InputMaybe<MemberFilter>;
  order?: InputMaybe<UserOrder>;
  page?: InputMaybe<Page>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryNotificationsArgs = {
  page?: InputMaybe<Page>;
};


export type QueryParentsArgs = {
  childId: Scalars['ID'];
  order?: InputMaybe<UserOrder>;
  page?: InputMaybe<Page>;
  search?: InputMaybe<Scalars['String']>;
};


export type QuerySchoolArgs = {
  id: Scalars['ID'];
};


export type QuerySchoolsArgs = {
  order?: InputMaybe<SchoolOrder>;
  page?: InputMaybe<Page>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryStatsOfAcceptedMembersInSchoolArgs = {
  days?: InputMaybe<Scalars['Int']>;
};


export type QueryStatsOfCreatedMembersArgs = {
  days?: InputMaybe<Scalars['Int']>;
};


export type QueryStatsOfCreatedMembersInSchoolArgs = {
  days?: InputMaybe<Scalars['Int']>;
};


export type QueryStatsOfCreatedParentsArgs = {
  days?: InputMaybe<Scalars['Int']>;
};


export type QueryStatsOfCreatedSchoolsArgs = {
  days?: InputMaybe<Scalars['Int']>;
};


export type QueryStatsOfCreatedUsersArgs = {
  days?: InputMaybe<Scalars['Int']>;
};


export type QueryStatsOfInvitedMembersInSchoolArgs = {
  days?: InputMaybe<Scalars['Int']>;
};


export type QueryTempPaginatedItemArgs = {
  page?: InputMaybe<Page>;
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
  Admin: 'ADMIN',
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
export type School = {
  __typename?: 'School';
  address?: Maybe<Address>;
  cover?: Maybe<Image>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  logo?: Maybe<Image>;
  memberCount: Scalars['Int'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
};

export type SchoolCreate = {
  address?: InputMaybe<AddressCreate>;
  name: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
};

export type SchoolOrder = {
  createdAt?: InputMaybe<OrderDirection>;
  memberCount?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  phone?: InputMaybe<OrderDirection>;
};

export type SchoolRole = UserRole & {
  __typename?: 'SchoolRole';
  id: Scalars['ID'];
  role: Role;
  school: School;
  status: RoleStatus;
};

export type SchoolUpdate = {
  address?: InputMaybe<AddressUpdate>;
  cover?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

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
export type UpdateProfileInput = {
  avatar?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  newEmail?: InputMaybe<Scalars['String']>;
};

export type Upload = {
  __typename?: 'Upload';
  headers: Array<UploadHeader>;
  id: Scalars['ID'];
  method: Scalars['String'];
  url: Scalars['String'];
};

export type UploadHeader = {
  __typename?: 'UploadHeader';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Image>;
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

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: string, email: string, emailConfirmed: boolean, name: string, avatar?: { __typename?: 'Image', url: string } | null, roles: Array<{ __typename?: 'AnyRole', id: string, role: Role, status: RoleStatus } | { __typename?: 'ParentRole', relation?: string | null, id: string, role: Role, status: RoleStatus, childUser: { __typename?: 'User', id: string, name: string } } | { __typename?: 'SchoolRole', id: string, role: Role, status: RoleStatus, school: { __typename?: 'School', id: string, name: string, phone?: string | null, address?: { __typename?: 'Address', street: string, city: string, state: string, zip: string } | null, logo?: { __typename?: 'Image', url: string } | null, cover?: { __typename?: 'Image', url: string } | null } }> } };

export type RemoveMemberMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveMemberMutation = { __typename?: 'Mutation', removeMember?: string | null };

export type RemoveParentMutationVariables = Exact<{
  id: Scalars['ID'];
  childId: Scalars['ID'];
}>;


export type RemoveParentMutation = { __typename?: 'Mutation', removeParent?: string | null };

export type InviteMemberMutationVariables = Exact<{
  email: Scalars['String'];
  role: InviteMemberRole;
}>;


export type InviteMemberMutation = { __typename?: 'Mutation', inviteMember?: string | null };

export type UpdatePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword?: string | null };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: string | null };

export type UpdateSchoolMutationVariables = Exact<{
  input: SchoolUpdate;
}>;


export type UpdateSchoolMutation = { __typename?: 'Mutation', updateSchool?: string | null };

export type StatsByDayForCoachFragment = { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: Date, value: number }> };

export type StatsForCoachQueryVariables = Exact<{
  days: Scalars['Int'];
}>;


export type StatsForCoachQuery = { __typename?: 'Query', statsOfCreatedMembersInSchool: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: Date, value: number }> }, statsOfInvitedMembersInSchool: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: Date, value: number }> }, statsOfAcceptedMembersInSchool: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: Date, value: number }> } };

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
  school: SchoolCreate;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'JWT', token: string } };

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


export type ParentsQuery = { __typename?: 'Query', parents: { __typename?: 'PaginatedUser', page: { __typename?: 'PageInfo', index: number, count: number, total: number }, nodes: Array<{ __typename?: 'User', id: string, createdAt: Date, email: string, emailConfirmed: boolean, name: string, avatar?: { __typename?: 'Image', url: string } | null, roles: Array<{ __typename?: 'AnyRole', id: string, role: Role, status: RoleStatus } | { __typename?: 'ParentRole', relation?: string | null, id: string, role: Role, status: RoleStatus } | { __typename?: 'SchoolRole', id: string, role: Role, status: RoleStatus }> }> } };

export type TempPaginatedItemQueryVariables = Exact<{
  page?: InputMaybe<Page>;
}>;


export type TempPaginatedItemQuery = { __typename?: 'Query', tempPaginatedItem: { __typename?: 'PaginatedItem', page: { __typename?: 'PageInfo', index: number, count: number, total: number }, nodes: Array<{ __typename?: 'Item', id: string }> } };

export type NotificationsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsCountQuery = { __typename?: 'Query', notificationsCount: number };

export type NotificationsQueryVariables = Exact<{
  page?: InputMaybe<Page>;
}>;


export type NotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'PaginatedNotification', page: { __typename?: 'PageInfo', index: number, count: number, total: number }, nodes: Array<{ __typename?: 'Notification', id: string, createdAt: Date, message: string, url?: string | null }> } };

export type ReadAllNotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type ReadAllNotificationsMutation = { __typename?: 'Mutation', readAllNotifications?: string | null };

export type ChildrenQueryVariables = Exact<{
  page?: InputMaybe<Page>;
  order?: InputMaybe<UserOrder>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type ChildrenQuery = { __typename?: 'Query', children: { __typename?: 'PaginatedUser', page: { __typename?: 'PageInfo', index: number, count: number, total: number }, nodes: Array<{ __typename?: 'User', id: string, createdAt: Date, email: string, name: string, roles: Array<{ __typename?: 'AnyRole', id: string, role: Role, status: RoleStatus } | { __typename?: 'ParentRole', id: string, role: Role, status: RoleStatus } | { __typename?: 'SchoolRole', id: string, role: Role, status: RoleStatus, school: { __typename?: 'School', id: string, name: string } }>, parentRole?: { __typename?: 'ParentRole', relation?: string | null } | null }> } };

export type StatsByDayForStaffFragment = { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: Date, value: number }> };

export type StatsForStaffQueryVariables = Exact<{
  days: Scalars['Int'];
}>;


export type StatsForStaffQuery = { __typename?: 'Query', statsOfCreatedUsers: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: Date, value: number }> }, statsOfCreatedSchools: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: Date, value: number }> }, statsOfCreatedMembers: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: Date, value: number }> }, statsOfCreatedParents: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: Date, value: number }> } };

export type MembersQueryVariables = Exact<{
  page?: InputMaybe<Page>;
  order?: InputMaybe<UserOrder>;
  search?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<MemberFilter>;
}>;


export type MembersQuery = { __typename?: 'Query', members: { __typename?: 'PaginatedUser', page: { __typename?: 'PageInfo', index: number, count: number, total: number }, nodes: Array<{ __typename?: 'User', id: string, createdAt: Date, email: string, emailConfirmed: boolean, name: string, parentCount: number, avatar?: { __typename?: 'Image', url: string } | null, roles: Array<{ __typename?: 'AnyRole', id: string, role: Role, status: RoleStatus } | { __typename?: 'ParentRole', id: string, role: Role, status: RoleStatus } | { __typename?: 'SchoolRole', id: string, role: Role, status: RoleStatus }> }> } };

export type SchoolQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SchoolQuery = { __typename?: 'Query', school: { __typename?: 'School', id: string, name: string, phone?: string | null, address?: { __typename?: 'Address', street: string, city: string, state: string, zip: string } | null, logo?: { __typename?: 'Image', url: string } | null, cover?: { __typename?: 'Image', url: string } | null } };

export type CreateSchoolMutationVariables = Exact<{
  input: SchoolCreate;
}>;


export type CreateSchoolMutation = { __typename?: 'Mutation', createSchool?: string | null };

export type SchoolsQueryVariables = Exact<{
  page?: InputMaybe<Page>;
  order?: InputMaybe<SchoolOrder>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type SchoolsQuery = { __typename?: 'Query', schools: { __typename?: 'PaginatedSchool', page: { __typename?: 'PageInfo', index: number, count: number, total: number }, nodes: Array<{ __typename?: 'School', id: string, createdAt: Date, name: string, phone?: string | null, memberCount: number, address?: { __typename?: 'Address', formatted: string } | null, logo?: { __typename?: 'Image', url: string } | null }> } };

export type GlobalSettingsCanSignUpQueryVariables = Exact<{ [key: string]: never; }>;


export type GlobalSettingsCanSignUpQuery = { __typename?: 'Query', globalSettingsCanSignUp: boolean };

export type GlobalSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GlobalSettingsQuery = { __typename?: 'Query', globalSettings: { __typename?: 'GlobalSettings', enableSignUps?: boolean | null } };

export type UpdateGlobalSettingsMutationVariables = Exact<{
  input: GlobalSettingsUpdate;
}>;


export type UpdateGlobalSettingsMutation = { __typename?: 'Mutation', updateGlobalSettings?: string | null };

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


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUser', page: { __typename?: 'PageInfo', index: number, count: number, total: number }, nodes: Array<{ __typename?: 'User', id: string, createdAt: Date, email: string, emailConfirmed: boolean, name: string, avatar?: { __typename?: 'Image', url: string } | null, roles: Array<{ __typename?: 'AnyRole', id: string, role: Role, status: RoleStatus } | { __typename?: 'ParentRole', relation?: string | null, id: string, role: Role, status: RoleStatus, childUser: { __typename?: 'User', name: string } } | { __typename?: 'SchoolRole', id: string, role: Role, status: RoleStatus, school: { __typename?: 'School', name: string } }> }> } };

export type PrepareForUploadMutationVariables = Exact<{ [key: string]: never; }>;


export type PrepareForUploadMutation = { __typename?: 'Mutation', prepareForUpload: { __typename?: 'Upload', id: string, url: string, method: string, headers: Array<{ __typename?: 'UploadHeader', key: string, value: string }> } };

export const StatsByDayForCoachFragmentDoc = gql`
    fragment StatsByDayForCoach on StatsByDay {
  stats {
    day
    value
  }
  total
}
    `;
export const StatsByDayForStaffFragmentDoc = gql`
    fragment StatsByDayForStaff on StatsByDay {
  stats {
    day
    value
  }
  total
}
    `;
export const ProfileDocument = gql`
    query profile {
  profile {
    id
    email
    emailConfirmed
    name
    avatar {
      url
    }
    roles {
      id
      role
      status
      ... on SchoolRole {
        school {
          id
          name
          phone
          address {
            street
            city
            state
            zip
          }
          logo {
            url
          }
          cover {
            url
          }
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
export const InviteMemberDocument = gql`
    mutation inviteMember($email: String!, $role: InviteMemberRole!) {
  inviteMember(email: $email, role: $role)
}
    `;
export type InviteMemberMutationFn = Apollo.MutationFunction<InviteMemberMutation, InviteMemberMutationVariables>;

/**
 * __useInviteMemberMutation__
 *
 * To run a mutation, you first call `useInviteMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteMemberMutation, { data, loading, error }] = useInviteMemberMutation({
 *   variables: {
 *      email: // value for 'email'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useInviteMemberMutation(baseOptions?: Apollo.MutationHookOptions<InviteMemberMutation, InviteMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteMemberMutation, InviteMemberMutationVariables>(InviteMemberDocument, options);
      }
export type InviteMemberMutationHookResult = ReturnType<typeof useInviteMemberMutation>;
export type InviteMemberMutationResult = Apollo.MutationResult<InviteMemberMutation>;
export type InviteMemberMutationOptions = Apollo.BaseMutationOptions<InviteMemberMutation, InviteMemberMutationVariables>;
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
export const UpdateSchoolDocument = gql`
    mutation updateSchool($input: SchoolUpdate!) {
  updateSchool(input: $input)
}
    `;
export type UpdateSchoolMutationFn = Apollo.MutationFunction<UpdateSchoolMutation, UpdateSchoolMutationVariables>;

/**
 * __useUpdateSchoolMutation__
 *
 * To run a mutation, you first call `useUpdateSchoolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSchoolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSchoolMutation, { data, loading, error }] = useUpdateSchoolMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSchoolMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSchoolMutation, UpdateSchoolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSchoolMutation, UpdateSchoolMutationVariables>(UpdateSchoolDocument, options);
      }
export type UpdateSchoolMutationHookResult = ReturnType<typeof useUpdateSchoolMutation>;
export type UpdateSchoolMutationResult = Apollo.MutationResult<UpdateSchoolMutation>;
export type UpdateSchoolMutationOptions = Apollo.BaseMutationOptions<UpdateSchoolMutation, UpdateSchoolMutationVariables>;
export const StatsForCoachDocument = gql`
    query statsForCoach($days: Int!) {
  statsOfCreatedMembersInSchool(days: $days) {
    ...StatsByDayForCoach
  }
  statsOfInvitedMembersInSchool(days: $days) {
    ...StatsByDayForCoach
  }
  statsOfAcceptedMembersInSchool(days: $days) {
    ...StatsByDayForCoach
  }
}
    ${StatsByDayForCoachFragmentDoc}`;

/**
 * __useStatsForCoachQuery__
 *
 * To run a query within a React component, call `useStatsForCoachQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatsForCoachQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatsForCoachQuery({
 *   variables: {
 *      days: // value for 'days'
 *   },
 * });
 */
export function useStatsForCoachQuery(baseOptions: Apollo.QueryHookOptions<StatsForCoachQuery, StatsForCoachQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatsForCoachQuery, StatsForCoachQueryVariables>(StatsForCoachDocument, options);
      }
export function useStatsForCoachLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatsForCoachQuery, StatsForCoachQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatsForCoachQuery, StatsForCoachQueryVariables>(StatsForCoachDocument, options);
        }
export type StatsForCoachQueryHookResult = ReturnType<typeof useStatsForCoachQuery>;
export type StatsForCoachLazyQueryHookResult = ReturnType<typeof useStatsForCoachLazyQuery>;
export type StatsForCoachQueryResult = Apollo.QueryResult<StatsForCoachQuery, StatsForCoachQueryVariables>;
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
    mutation register($email: String!, $password: String!, $user: UserCreate!, $school: SchoolCreate!) {
  register(email: $email, password: $password, user: $user, school: $school) {
    token
  }
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
 *      school: // value for 'school'
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
      avatar {
        url
      }
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
export const TempPaginatedItemDocument = gql`
    query tempPaginatedItem($page: Page) {
  tempPaginatedItem(page: $page) {
    page {
      index
      count
      total
    }
    nodes {
      id
    }
  }
}
    `;

/**
 * __useTempPaginatedItemQuery__
 *
 * To run a query within a React component, call `useTempPaginatedItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useTempPaginatedItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTempPaginatedItemQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useTempPaginatedItemQuery(baseOptions?: Apollo.QueryHookOptions<TempPaginatedItemQuery, TempPaginatedItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TempPaginatedItemQuery, TempPaginatedItemQueryVariables>(TempPaginatedItemDocument, options);
      }
export function useTempPaginatedItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TempPaginatedItemQuery, TempPaginatedItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TempPaginatedItemQuery, TempPaginatedItemQueryVariables>(TempPaginatedItemDocument, options);
        }
export type TempPaginatedItemQueryHookResult = ReturnType<typeof useTempPaginatedItemQuery>;
export type TempPaginatedItemLazyQueryHookResult = ReturnType<typeof useTempPaginatedItemLazyQuery>;
export type TempPaginatedItemQueryResult = Apollo.QueryResult<TempPaginatedItemQuery, TempPaginatedItemQueryVariables>;
export const NotificationsCountDocument = gql`
    query notificationsCount {
  notificationsCount
}
    `;

/**
 * __useNotificationsCountQuery__
 *
 * To run a query within a React component, call `useNotificationsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationsCountQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsCountQuery, NotificationsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsCountQuery, NotificationsCountQueryVariables>(NotificationsCountDocument, options);
      }
export function useNotificationsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsCountQuery, NotificationsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsCountQuery, NotificationsCountQueryVariables>(NotificationsCountDocument, options);
        }
export type NotificationsCountQueryHookResult = ReturnType<typeof useNotificationsCountQuery>;
export type NotificationsCountLazyQueryHookResult = ReturnType<typeof useNotificationsCountLazyQuery>;
export type NotificationsCountQueryResult = Apollo.QueryResult<NotificationsCountQuery, NotificationsCountQueryVariables>;
export const NotificationsDocument = gql`
    query notifications($page: Page) {
  notifications(page: $page) {
    page {
      index
      count
      total
    }
    nodes {
      id
      createdAt
      message
      url
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
        ... on SchoolRole {
          school {
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
  statsOfCreatedSchools(days: $days) {
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
    query members($page: Page, $order: UserOrder, $search: String, $filter: MemberFilter) {
  members(page: $page, order: $order, search: $search, filter: $filter) {
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
      avatar {
        url
      }
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
 *      filter: // value for 'filter'
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
export const SchoolDocument = gql`
    query school($id: ID!) {
  school(id: $id) {
    id
    name
    phone
    address {
      street
      city
      state
      zip
    }
    logo {
      url
    }
    cover {
      url
    }
  }
}
    `;

/**
 * __useSchoolQuery__
 *
 * To run a query within a React component, call `useSchoolQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchoolQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchoolQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSchoolQuery(baseOptions: Apollo.QueryHookOptions<SchoolQuery, SchoolQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SchoolQuery, SchoolQueryVariables>(SchoolDocument, options);
      }
export function useSchoolLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchoolQuery, SchoolQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SchoolQuery, SchoolQueryVariables>(SchoolDocument, options);
        }
export type SchoolQueryHookResult = ReturnType<typeof useSchoolQuery>;
export type SchoolLazyQueryHookResult = ReturnType<typeof useSchoolLazyQuery>;
export type SchoolQueryResult = Apollo.QueryResult<SchoolQuery, SchoolQueryVariables>;
export const CreateSchoolDocument = gql`
    mutation createSchool($input: SchoolCreate!) {
  createSchool(input: $input)
}
    `;
export type CreateSchoolMutationFn = Apollo.MutationFunction<CreateSchoolMutation, CreateSchoolMutationVariables>;

/**
 * __useCreateSchoolMutation__
 *
 * To run a mutation, you first call `useCreateSchoolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSchoolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSchoolMutation, { data, loading, error }] = useCreateSchoolMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSchoolMutation(baseOptions?: Apollo.MutationHookOptions<CreateSchoolMutation, CreateSchoolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSchoolMutation, CreateSchoolMutationVariables>(CreateSchoolDocument, options);
      }
export type CreateSchoolMutationHookResult = ReturnType<typeof useCreateSchoolMutation>;
export type CreateSchoolMutationResult = Apollo.MutationResult<CreateSchoolMutation>;
export type CreateSchoolMutationOptions = Apollo.BaseMutationOptions<CreateSchoolMutation, CreateSchoolMutationVariables>;
export const SchoolsDocument = gql`
    query schools($page: Page, $order: SchoolOrder, $search: String) {
  schools(page: $page, order: $order, search: $search) {
    page {
      index
      count
      total
    }
    nodes {
      id
      createdAt
      name
      phone
      memberCount
      address {
        formatted
      }
      logo {
        url
      }
    }
  }
}
    `;

/**
 * __useSchoolsQuery__
 *
 * To run a query within a React component, call `useSchoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchoolsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      order: // value for 'order'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useSchoolsQuery(baseOptions?: Apollo.QueryHookOptions<SchoolsQuery, SchoolsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SchoolsQuery, SchoolsQueryVariables>(SchoolsDocument, options);
      }
export function useSchoolsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchoolsQuery, SchoolsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SchoolsQuery, SchoolsQueryVariables>(SchoolsDocument, options);
        }
export type SchoolsQueryHookResult = ReturnType<typeof useSchoolsQuery>;
export type SchoolsLazyQueryHookResult = ReturnType<typeof useSchoolsLazyQuery>;
export type SchoolsQueryResult = Apollo.QueryResult<SchoolsQuery, SchoolsQueryVariables>;
export const GlobalSettingsCanSignUpDocument = gql`
    query globalSettingsCanSignUp {
  globalSettingsCanSignUp
}
    `;

/**
 * __useGlobalSettingsCanSignUpQuery__
 *
 * To run a query within a React component, call `useGlobalSettingsCanSignUpQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalSettingsCanSignUpQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalSettingsCanSignUpQuery({
 *   variables: {
 *   },
 * });
 */
export function useGlobalSettingsCanSignUpQuery(baseOptions?: Apollo.QueryHookOptions<GlobalSettingsCanSignUpQuery, GlobalSettingsCanSignUpQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GlobalSettingsCanSignUpQuery, GlobalSettingsCanSignUpQueryVariables>(GlobalSettingsCanSignUpDocument, options);
      }
export function useGlobalSettingsCanSignUpLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GlobalSettingsCanSignUpQuery, GlobalSettingsCanSignUpQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GlobalSettingsCanSignUpQuery, GlobalSettingsCanSignUpQueryVariables>(GlobalSettingsCanSignUpDocument, options);
        }
export type GlobalSettingsCanSignUpQueryHookResult = ReturnType<typeof useGlobalSettingsCanSignUpQuery>;
export type GlobalSettingsCanSignUpLazyQueryHookResult = ReturnType<typeof useGlobalSettingsCanSignUpLazyQuery>;
export type GlobalSettingsCanSignUpQueryResult = Apollo.QueryResult<GlobalSettingsCanSignUpQuery, GlobalSettingsCanSignUpQueryVariables>;
export const GlobalSettingsDocument = gql`
    query globalSettings {
  globalSettings {
    enableSignUps
  }
}
    `;

/**
 * __useGlobalSettingsQuery__
 *
 * To run a query within a React component, call `useGlobalSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGlobalSettingsQuery(baseOptions?: Apollo.QueryHookOptions<GlobalSettingsQuery, GlobalSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GlobalSettingsQuery, GlobalSettingsQueryVariables>(GlobalSettingsDocument, options);
      }
export function useGlobalSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GlobalSettingsQuery, GlobalSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GlobalSettingsQuery, GlobalSettingsQueryVariables>(GlobalSettingsDocument, options);
        }
export type GlobalSettingsQueryHookResult = ReturnType<typeof useGlobalSettingsQuery>;
export type GlobalSettingsLazyQueryHookResult = ReturnType<typeof useGlobalSettingsLazyQuery>;
export type GlobalSettingsQueryResult = Apollo.QueryResult<GlobalSettingsQuery, GlobalSettingsQueryVariables>;
export const UpdateGlobalSettingsDocument = gql`
    mutation updateGlobalSettings($input: GlobalSettingsUpdate!) {
  updateGlobalSettings(input: $input)
}
    `;
export type UpdateGlobalSettingsMutationFn = Apollo.MutationFunction<UpdateGlobalSettingsMutation, UpdateGlobalSettingsMutationVariables>;

/**
 * __useUpdateGlobalSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateGlobalSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGlobalSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGlobalSettingsMutation, { data, loading, error }] = useUpdateGlobalSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateGlobalSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGlobalSettingsMutation, UpdateGlobalSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGlobalSettingsMutation, UpdateGlobalSettingsMutationVariables>(UpdateGlobalSettingsDocument, options);
      }
export type UpdateGlobalSettingsMutationHookResult = ReturnType<typeof useUpdateGlobalSettingsMutation>;
export type UpdateGlobalSettingsMutationResult = Apollo.MutationResult<UpdateGlobalSettingsMutation>;
export type UpdateGlobalSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateGlobalSettingsMutation, UpdateGlobalSettingsMutationVariables>;
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
      avatar {
        url
      }
      roles {
        id
        role
        status
        ... on SchoolRole {
          school {
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
export const PrepareForUploadDocument = gql`
    mutation prepareForUpload {
  prepareForUpload {
    id
    url
    method
    headers {
      key
      value
    }
  }
}
    `;
export type PrepareForUploadMutationFn = Apollo.MutationFunction<PrepareForUploadMutation, PrepareForUploadMutationVariables>;

/**
 * __usePrepareForUploadMutation__
 *
 * To run a mutation, you first call `usePrepareForUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePrepareForUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [prepareForUploadMutation, { data, loading, error }] = usePrepareForUploadMutation({
 *   variables: {
 *   },
 * });
 */
export function usePrepareForUploadMutation(baseOptions?: Apollo.MutationHookOptions<PrepareForUploadMutation, PrepareForUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PrepareForUploadMutation, PrepareForUploadMutationVariables>(PrepareForUploadDocument, options);
      }
export type PrepareForUploadMutationHookResult = ReturnType<typeof usePrepareForUploadMutation>;
export type PrepareForUploadMutationResult = Apollo.MutationResult<PrepareForUploadMutation>;
export type PrepareForUploadMutationOptions = Apollo.BaseMutationOptions<PrepareForUploadMutation, PrepareForUploadMutationVariables>;
export const namedOperations = {
  Query: {
    profile: 'profile',
    statsForCoach: 'statsForCoach',
    member: 'member',
    parents: 'parents',
    tempPaginatedItem: 'tempPaginatedItem',
    notificationsCount: 'notificationsCount',
    notifications: 'notifications',
    children: 'children',
    statsForStaff: 'statsForStaff',
    members: 'members',
    school: 'school',
    schools: 'schools',
    globalSettingsCanSignUp: 'globalSettingsCanSignUp',
    globalSettings: 'globalSettings',
    users: 'users'
  },
  Mutation: {
    removeMember: 'removeMember',
    removeParent: 'removeParent',
    inviteMember: 'inviteMember',
    updatePassword: 'updatePassword',
    updateProfile: 'updateProfile',
    updateSchool: 'updateSchool',
    activate: 'activate',
    login: 'login',
    register: 'register',
    resetPassword: 'resetPassword',
    requestResetPassword: 'requestResetPassword',
    contact: 'contact',
    inviteParent: 'inviteParent',
    readAllNotifications: 'readAllNotifications',
    createSchool: 'createSchool',
    updateGlobalSettings: 'updateGlobalSettings',
    inviteStaff: 'inviteStaff',
    removeRole: 'removeRole',
    prepareForUpload: 'prepareForUpload'
  },
  Fragment: {
    StatsByDayForCoach: 'StatsByDayForCoach',
    StatsByDayForStaff: 'StatsByDayForStaff'
  }
}