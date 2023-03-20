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
  DateTime: string;
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  formatted: Scalars['String'];
  id: Scalars['ID'];
  state: Scalars['String'];
  street: Scalars['String'];
  zip: Scalars['String'];
};

export type AnyUserRole = {
  __typename?: 'AnyUserRole';
  id: Scalars['ID'];
  status: UserRoleStatusEnum;
  type: UserRoleTypeEnum;
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

export type CreateAddressInput = {
  city: Scalars['String'];
  state: Scalars['String'];
  street: Scalars['String'];
  zip: Scalars['String'];
};

export type CreateSchoolInput = {
  name: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['ID']>;
};

export type CreateUserRoleInput = {
  email: Scalars['String'];
  relationId?: InputMaybe<Scalars['ID']>;
  type: UserRoleTypeEnum;
};

export type EmailSettings = {
  __typename?: 'EmailSettings';
  receivePostFlagged: Scalars['Boolean'];
};

export type FinalizeAccountInput = {
  name: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type Flag = {
  __typename?: 'Flag';
  flagged: Scalars['Boolean'];
  reasons: Array<Scalars['String']>;
};

export type Header = {
  __typename?: 'Header';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['ID'];
  url: Scalars['String'];
};

export type LoginWithEmailInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Media = {
  __typename?: 'Media';
  id: Scalars['ID'];
  type: MediaTypeEnum;
  url: Scalars['String'];
};

export const MediaTypeEnum = {
  Image: 'IMAGE',
  Video: 'VIDEO'
} as const;

export type MediaTypeEnum = typeof MediaTypeEnum[keyof typeof MediaTypeEnum];
export type Mutation = {
  __typename?: 'Mutation';
  authWithTwitter: Scalars['String'];
  contact: Scalars['Boolean'];
  createAddress: Address;
  createSchool: School;
  createUserRole: User;
  finalizeAccount: UserWithToken;
  forgotPassword: Scalars['Boolean'];
  loginWithEmail: UserWithToken;
  prepareUpload: Upload;
  readNotifications: Scalars['Boolean'];
  registerWithEmail: UserWithToken;
  removeAddress: Scalars['Boolean'];
  removeImage: Scalars['Boolean'];
  removeTwitter: Scalars['Boolean'];
  removeUserRole: Scalars['Boolean'];
  resetPassword: UserWithToken;
  updateAddress: Address;
  updateEmailSettings: Scalars['Boolean'];
  updateImage: Image;
  updatePassword: Scalars['Boolean'];
  updateSchool: School;
  updateSettings: Scalars['Boolean'];
  updateUser: User;
};


export type MutationContactArgs = {
  input: ContactInput;
};


export type MutationCreateAddressArgs = {
  input: CreateAddressInput;
  schoolId: Scalars['ID'];
};


export type MutationCreateSchoolArgs = {
  input: CreateSchoolInput;
};


export type MutationCreateUserRoleArgs = {
  input: CreateUserRoleInput;
};


export type MutationFinalizeAccountArgs = {
  input: FinalizeAccountInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginWithEmailArgs = {
  input: LoginWithEmailInput;
};


export type MutationRegisterWithEmailArgs = {
  input: RegisterWithEmailInput;
};


export type MutationRemoveAddressArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveImageArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveTwitterArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveUserRoleArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationUpdateAddressArgs = {
  id: Scalars['ID'];
  input: UpdateAddressInput;
};


export type MutationUpdateEmailSettingsArgs = {
  input: UpdateEmailSettingsInput;
};


export type MutationUpdateImageArgs = {
  input: UpdateImageInput;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};


export type MutationUpdateSchoolArgs = {
  id: Scalars['ID'];
  input: UpdateSchoolInput;
};


export type MutationUpdateSettingsArgs = {
  input: UpdateSettingsInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input: UpdateUserInput;
};

export type Notification = {
  __typename?: 'Notification';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  url?: Maybe<Scalars['String']>;
};

export type NotificationPage = {
  __typename?: 'NotificationPage';
  nodes: Array<Notification>;
  page: Page;
};

export const OrderDirectionEnum = {
  Asc: 'ASC',
  Desc: 'DESC'
} as const;

export type OrderDirectionEnum = typeof OrderDirectionEnum[keyof typeof OrderDirectionEnum];
export type Page = {
  __typename?: 'Page';
  count: Scalars['Int'];
  index: Scalars['Int'];
  size: Scalars['Int'];
  total: Scalars['Int'];
};

export type PageInput = {
  index?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};

export type ParentRole = {
  __typename?: 'ParentRole';
  childUser: User;
  id: Scalars['ID'];
  status: UserRoleStatusEnum;
  type: UserRoleTypeEnum;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTime'];
  flag?: Maybe<Flag>;
  id: Scalars['ID'];
  media: Array<Media>;
  text: Scalars['String'];
  url: Scalars['String'];
  user: User;
};

export type PostFilter = {
  flagged?: InputMaybe<Scalars['Boolean']>;
};

export type PostPage = {
  __typename?: 'PostPage';
  nodes: Array<Post>;
  page: Page;
};

export type Query = {
  __typename?: 'Query';
  emailSettings: EmailSettings;
  notifications: NotificationPage;
  post: Post;
  posts: PostPage;
  school: School;
  schools: SchoolPage;
  settings: Settings;
  statsOfAcceptedMembersInSchool: StatsByDay;
  statsOfCreatedMembers: StatsByDay;
  statsOfCreatedMembersInSchool: StatsByDay;
  statsOfCreatedParents: StatsByDay;
  statsOfCreatedSchools: StatsByDay;
  statsOfCreatedUsers: StatsByDay;
  statsOfInvitedMembersInSchool: StatsByDay;
  user: User;
  users: UserPage;
};


export type QueryNotificationsArgs = {
  page?: InputMaybe<PageInput>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  filter?: InputMaybe<PostFilter>;
  page?: InputMaybe<PageInput>;
  schoolId?: InputMaybe<Scalars['ID']>;
};


export type QuerySchoolArgs = {
  id: Scalars['ID'];
};


export type QuerySchoolsArgs = {
  filter?: InputMaybe<SchoolFilter>;
  order?: InputMaybe<SchoolOrder>;
  page?: InputMaybe<PageInput>;
};


export type QueryStatsOfAcceptedMembersInSchoolArgs = {
  days?: Scalars['Int'];
  schoolId: Scalars['ID'];
};


export type QueryStatsOfCreatedMembersArgs = {
  days?: Scalars['Int'];
};


export type QueryStatsOfCreatedMembersInSchoolArgs = {
  days?: Scalars['Int'];
  schoolId: Scalars['ID'];
};


export type QueryStatsOfCreatedParentsArgs = {
  days?: Scalars['Int'];
};


export type QueryStatsOfCreatedSchoolsArgs = {
  days?: Scalars['Int'];
};


export type QueryStatsOfCreatedUsersArgs = {
  days?: Scalars['Int'];
};


export type QueryStatsOfInvitedMembersInSchoolArgs = {
  days?: Scalars['Int'];
  schoolId: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilter>;
  order?: InputMaybe<UserOrder>;
  page?: InputMaybe<PageInput>;
};

export type RegisterWithEmailInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

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


export type SchoolMemberCountArgs = {
  status?: InputMaybe<UserRoleStatusEnum>;
};

export type SchoolFilter = {
  search?: InputMaybe<Scalars['String']>;
};

export type SchoolOrder = {
  address?: InputMaybe<OrderDirectionEnum>;
  createdAt?: InputMaybe<OrderDirectionEnum>;
  memberCount?: InputMaybe<OrderDirectionEnum>;
  name?: InputMaybe<OrderDirectionEnum>;
  phone?: InputMaybe<OrderDirectionEnum>;
};

export type SchoolPage = {
  __typename?: 'SchoolPage';
  nodes: Array<School>;
  page: Page;
};

export type SchoolRole = {
  __typename?: 'SchoolRole';
  id: Scalars['ID'];
  school: School;
  status: UserRoleStatusEnum;
  type: UserRoleTypeEnum;
};

export const SchoolRoleTypeEnum = {
  Admin: 'ADMIN',
  Athlete: 'ATHLETE',
  Coach: 'COACH'
} as const;

export type SchoolRoleTypeEnum = typeof SchoolRoleTypeEnum[keyof typeof SchoolRoleTypeEnum];
export type Settings = {
  __typename?: 'Settings';
  enableSignUps: Scalars['Boolean'];
};

export type StatByDay = {
  __typename?: 'StatByDay';
  day: Scalars['String'];
  value: Scalars['Int'];
};

export type StatsByDay = {
  __typename?: 'StatsByDay';
  stats: Array<StatByDay>;
  total: Scalars['Int'];
};

export type Twitter = {
  __typename?: 'Twitter';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type UpdateAddressInput = {
  city?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type UpdateEmailSettingsInput = {
  receivePostFlagged?: InputMaybe<Scalars['Boolean']>;
};

export const UpdateImageForEnum = {
  SchoolCover: 'SCHOOL_COVER',
  SchoolLogo: 'SCHOOL_LOGO',
  UserAvatar: 'USER_AVATAR'
} as const;

export type UpdateImageForEnum = typeof UpdateImageForEnum[keyof typeof UpdateImageForEnum];
export type UpdateImageInput = {
  for: UpdateImageForEnum;
  forId: Scalars['ID'];
  uploadId: Scalars['ID'];
};

export type UpdatePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type UpdateSchoolInput = {
  cover?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type UpdateSettingsInput = {
  enableSignUps?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateUserInput = {
  name?: InputMaybe<Scalars['String']>;
  newEmail?: InputMaybe<Scalars['String']>;
};

export type Upload = {
  __typename?: 'Upload';
  headers: Array<Header>;
  id: Scalars['ID'];
  method: Scalars['String'];
  url: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Image>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  emailConfirmed: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  notificationCount: Scalars['Int'];
  roles: Array<UserRole>;
  twitter?: Maybe<Twitter>;
};


export type UserRolesArgs = {
  status?: InputMaybe<UserRoleStatusEnum>;
};

export type UserFilter = {
  from?: InputMaybe<UsersFromEnum>;
  fromId?: InputMaybe<Scalars['ID']>;
  roles?: InputMaybe<Array<UserRoleTypeEnum>>;
  search?: InputMaybe<Scalars['String']>;
};

export type UserOrder = {
  createdAt?: InputMaybe<OrderDirectionEnum>;
  email?: InputMaybe<OrderDirectionEnum>;
  name?: InputMaybe<OrderDirectionEnum>;
  roles?: InputMaybe<OrderDirectionEnum>;
};

export type UserPage = {
  __typename?: 'UserPage';
  nodes: Array<User>;
  page: Page;
};

export type UserRole = AnyUserRole | ParentRole | SchoolRole;

export const UserRoleStatusEnum = {
  Accepted: 'ACCEPTED',
  Declined: 'DECLINED',
  Pending: 'PENDING'
} as const;

export type UserRoleStatusEnum = typeof UserRoleStatusEnum[keyof typeof UserRoleStatusEnum];
export const UserRoleTypeEnum = {
  Admin: 'ADMIN',
  Athlete: 'ATHLETE',
  Coach: 'COACH',
  Parent: 'PARENT',
  Staff: 'STAFF'
} as const;

export type UserRoleTypeEnum = typeof UserRoleTypeEnum[keyof typeof UserRoleTypeEnum];
export type UserWithToken = {
  __typename?: 'UserWithToken';
  token: Scalars['String'];
  user: User;
};

export const UsersFromEnum = {
  Child: 'CHILD',
  Parent: 'PARENT',
  School: 'SCHOOL'
} as const;

export type UsersFromEnum = typeof UsersFromEnum[keyof typeof UsersFromEnum];
export type NotificationsQueryVariables = Exact<{
  page?: InputMaybe<PageInput>;
}>;


export type NotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationPage', page: { __typename?: 'Page', index: number, size: number, count: number, total: number }, nodes: Array<{ __typename?: 'Notification', id: string, createdAt: string, body: string, url?: string | null }> } };

export type ReadNotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type ReadNotificationsMutation = { __typename?: 'Mutation', readNotifications: boolean };

export type MyUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MyUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, emailConfirmed: boolean, name: string, notificationCount: number, avatar?: { __typename?: 'Image', id: string, url: string } | null, roles: Array<{ __typename?: 'AnyUserRole', type: UserRoleTypeEnum } | { __typename?: 'ParentRole', type: UserRoleTypeEnum } | { __typename?: 'SchoolRole', type: UserRoleTypeEnum, school: { __typename?: 'School', id: string, name: string, logo?: { __typename?: 'Image', url: string } | null, cover?: { __typename?: 'Image', url: string } | null } }>, twitter?: { __typename?: 'Twitter', id: string, username: string } | null } };

export type LoginWithEmailMutationVariables = Exact<{
  input: LoginWithEmailInput;
}>;


export type LoginWithEmailMutation = { __typename?: 'Mutation', loginWithEmail: { __typename?: 'UserWithToken', token: string, user: { __typename?: 'User', id: string } } };

export type PageFragmentFragment = { __typename?: 'Page', index: number, size: number, count: number, total: number };

export type SchoolsQueryVariables = Exact<{
  page?: InputMaybe<PageInput>;
  order?: InputMaybe<SchoolOrder>;
  filter?: InputMaybe<SchoolFilter>;
}>;


export type SchoolsQuery = { __typename?: 'Query', schools: { __typename?: 'SchoolPage', page: { __typename?: 'Page', index: number, size: number, count: number, total: number }, nodes: Array<{ __typename?: 'School', id: string, name: string, phone?: string | null, createdAt: string, memberCount: number, logo?: { __typename?: 'Image', url: string } | null, address?: { __typename?: 'Address', formatted: string } | null }> } };

export type SchoolQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SchoolQuery = { __typename?: 'Query', school: { __typename?: 'School', id: string, name: string, phone?: string | null, logo?: { __typename?: 'Image', id: string, url: string } | null, cover?: { __typename?: 'Image', id: string, url: string } | null, address?: { __typename?: 'Address', id: string, street: string, state: string, city: string, zip: string } | null } };

export type CreateSchoolMutationVariables = Exact<{
  input: CreateSchoolInput;
}>;


export type CreateSchoolMutation = { __typename?: 'Mutation', createSchool: { __typename?: 'School', id: string } };

export type UpdateSchoolMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateSchoolInput;
}>;


export type UpdateSchoolMutation = { __typename?: 'Mutation', updateSchool: { __typename?: 'School', id: string } };

export type UsersQueryVariables = Exact<{
  page?: InputMaybe<PageInput>;
  order?: InputMaybe<UserOrder>;
  filter?: InputMaybe<UserFilter>;
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'UserPage', page: { __typename?: 'Page', index: number, size: number, count: number, total: number }, nodes: Array<{ __typename?: 'User', id: string, createdAt: string, name: string, email: string, emailConfirmed: boolean, avatar?: { __typename?: 'Image', url: string } | null, roles: Array<{ __typename?: 'AnyUserRole', id: string, type: UserRoleTypeEnum, status: UserRoleStatusEnum } | { __typename?: 'ParentRole', id: string, type: UserRoleTypeEnum, status: UserRoleStatusEnum, childUser: { __typename?: 'User', id: string } } | { __typename?: 'SchoolRole', id: string, type: UserRoleTypeEnum, status: UserRoleStatusEnum, school: { __typename?: 'School', id: string, name: string } }> }> } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, createdAt: string, name: string, email: string, emailConfirmed: boolean, avatar?: { __typename?: 'Image', id: string, url: string } | null, roles: Array<{ __typename?: 'AnyUserRole', id: string, type: UserRoleTypeEnum, status: UserRoleStatusEnum } | { __typename?: 'ParentRole', id: string, type: UserRoleTypeEnum, status: UserRoleStatusEnum, childUser: { __typename?: 'User', id: string } } | { __typename?: 'SchoolRole', id: string, type: UserRoleTypeEnum, status: UserRoleStatusEnum, school: { __typename?: 'School', id: string } }> } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string } };

export type PrepareUploadMutationVariables = Exact<{ [key: string]: never; }>;


export type PrepareUploadMutation = { __typename?: 'Mutation', prepareUpload: { __typename?: 'Upload', id: string, url: string, method: string, headers: Array<{ __typename?: 'Header', key: string, value: string }> } };

export type UpdateImageMutationVariables = Exact<{
  input: UpdateImageInput;
}>;


export type UpdateImageMutation = { __typename?: 'Mutation', updateImage: { __typename?: 'Image', id: string } };

export type RemoveImageMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveImageMutation = { __typename?: 'Mutation', removeImage: boolean };

export type CreateAddressMutationVariables = Exact<{
  schoolId: Scalars['ID'];
  input: CreateAddressInput;
}>;


export type CreateAddressMutation = { __typename?: 'Mutation', createAddress: { __typename?: 'Address', id: string } };

export type UpdateAddressMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateAddressInput;
}>;


export type UpdateAddressMutation = { __typename?: 'Mutation', updateAddress: { __typename?: 'Address', id: string } };

export type RemoveAddressMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveAddressMutation = { __typename?: 'Mutation', removeAddress: boolean };

export type CreateUserRoleMutationVariables = Exact<{
  input: CreateUserRoleInput;
}>;


export type CreateUserRoleMutation = { __typename?: 'Mutation', createUserRole: { __typename?: 'User', id: string } };

export type RemoveUserRoleMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveUserRoleMutation = { __typename?: 'Mutation', removeUserRole: boolean };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', settings: { __typename?: 'Settings', enableSignUps: boolean } };

export type UpdateSettingsMutationVariables = Exact<{
  input: UpdateSettingsInput;
}>;


export type UpdateSettingsMutation = { __typename?: 'Mutation', updateSettings: boolean };

export type UpdatePasswordMutationVariables = Exact<{
  input: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: boolean };

export type FinalizeAccountMutationVariables = Exact<{
  input: FinalizeAccountInput;
}>;


export type FinalizeAccountMutation = { __typename?: 'Mutation', finalizeAccount: { __typename?: 'UserWithToken', user: { __typename?: 'User', id: string } } };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'UserWithToken', user: { __typename?: 'User', id: string } } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type RegisterWithEmailMutationVariables = Exact<{
  input: RegisterWithEmailInput;
}>;


export type RegisterWithEmailMutation = { __typename?: 'Mutation', registerWithEmail: { __typename?: 'UserWithToken', token: string, user: { __typename?: 'User', id: string } } };

export type ContactMutationVariables = Exact<{
  input: ContactInput;
}>;


export type ContactMutation = { __typename?: 'Mutation', contact: boolean };

export type StatsByDayFragmentFragment = { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: string, value: number }> };

export type StatsForStaffQueryVariables = Exact<{
  days: Scalars['Int'];
}>;


export type StatsForStaffQuery = { __typename?: 'Query', statsOfCreatedUsers: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: string, value: number }> }, statsOfCreatedSchools: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: string, value: number }> }, statsOfCreatedMembers: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: string, value: number }> }, statsOfCreatedParents: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: string, value: number }> } };

export type StatsForSchoolQueryVariables = Exact<{
  schoolId: Scalars['ID'];
  days: Scalars['Int'];
}>;


export type StatsForSchoolQuery = { __typename?: 'Query', statsOfCreatedMembersInSchool: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: string, value: number }> }, statsOfInvitedMembersInSchool: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: string, value: number }> }, statsOfAcceptedMembersInSchool: { __typename?: 'StatsByDay', total: number, stats: Array<{ __typename?: 'StatByDay', day: string, value: number }> } };

export type AuthWithTwitterMutationVariables = Exact<{ [key: string]: never; }>;


export type AuthWithTwitterMutation = { __typename?: 'Mutation', authWithTwitter: string };

export type RemoveTwitterMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveTwitterMutation = { __typename?: 'Mutation', removeTwitter: boolean };

export type EmailSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type EmailSettingsQuery = { __typename?: 'Query', emailSettings: { __typename?: 'EmailSettings', receivePostFlagged: boolean } };

export type UpdateEmailSettingsMutationVariables = Exact<{
  input: UpdateEmailSettingsInput;
}>;


export type UpdateEmailSettingsMutation = { __typename?: 'Mutation', updateEmailSettings: boolean };

export type PostsQueryVariables = Exact<{
  schoolId?: InputMaybe<Scalars['ID']>;
  page?: InputMaybe<PageInput>;
  filter?: InputMaybe<PostFilter>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostPage', page: { __typename?: 'Page', index: number, size: number, count: number, total: number }, nodes: Array<{ __typename?: 'Post', id: string, createdAt: string, url: string, text: string, flag?: { __typename?: 'Flag', flagged: boolean, reasons: Array<string> } | null, user: { __typename?: 'User', id: string, name: string, email: string, avatar?: { __typename?: 'Image', url: string } | null } }> } };

export type PostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: string, createdAt: string, url: string, text: string, flag?: { __typename?: 'Flag', flagged: boolean, reasons: Array<string> } | null, user: { __typename?: 'User', id: string, name: string, email: string, avatar?: { __typename?: 'Image', url: string } | null }, media: Array<{ __typename?: 'Media', id: string, url: string, type: MediaTypeEnum }> } };

export type PostCardsQueryVariables = Exact<{
  schoolId?: InputMaybe<Scalars['ID']>;
}>;


export type PostCardsQuery = { __typename?: 'Query', totalPosts: { __typename?: 'PostPage', page: { __typename?: 'Page', total: number } }, flaggedPosts: { __typename?: 'PostPage', page: { __typename?: 'Page', total: number } } };

export const PageFragmentFragmentDoc = gql`
    fragment PageFragment on Page {
  index
  size
  count
  total
}
    `;
export const StatsByDayFragmentFragmentDoc = gql`
    fragment StatsByDayFragment on StatsByDay {
  stats {
    day
    value
  }
  total
}
    `;
export const NotificationsDocument = gql`
    query notifications($page: PageInput) {
  notifications(page: $page) {
    page {
      ...PageFragment
    }
    nodes {
      id
      createdAt
      body
      url
    }
  }
}
    ${PageFragmentFragmentDoc}`;

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
export const ReadNotificationsDocument = gql`
    mutation readNotifications {
  readNotifications
}
    `;
export type ReadNotificationsMutationFn = Apollo.MutationFunction<ReadNotificationsMutation, ReadNotificationsMutationVariables>;

/**
 * __useReadNotificationsMutation__
 *
 * To run a mutation, you first call `useReadNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readNotificationsMutation, { data, loading, error }] = useReadNotificationsMutation({
 *   variables: {
 *   },
 * });
 */
export function useReadNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<ReadNotificationsMutation, ReadNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadNotificationsMutation, ReadNotificationsMutationVariables>(ReadNotificationsDocument, options);
      }
export type ReadNotificationsMutationHookResult = ReturnType<typeof useReadNotificationsMutation>;
export type ReadNotificationsMutationResult = Apollo.MutationResult<ReadNotificationsMutation>;
export type ReadNotificationsMutationOptions = Apollo.BaseMutationOptions<ReadNotificationsMutation, ReadNotificationsMutationVariables>;
export const MyUserDocument = gql`
    query myUser($id: ID!) {
  user(id: $id) {
    id
    email
    emailConfirmed
    name
    notificationCount
    avatar {
      id
      url
    }
    roles(status: ACCEPTED) {
      ... on AnyUserRole {
        type
      }
      ... on SchoolRole {
        type
        school {
          id
          name
          logo {
            url
          }
          cover {
            url
          }
        }
      }
      ... on ParentRole {
        type
      }
    }
    twitter {
      id
      username
    }
  }
}
    `;

/**
 * __useMyUserQuery__
 *
 * To run a query within a React component, call `useMyUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMyUserQuery(baseOptions: Apollo.QueryHookOptions<MyUserQuery, MyUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyUserQuery, MyUserQueryVariables>(MyUserDocument, options);
      }
export function useMyUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyUserQuery, MyUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyUserQuery, MyUserQueryVariables>(MyUserDocument, options);
        }
export type MyUserQueryHookResult = ReturnType<typeof useMyUserQuery>;
export type MyUserLazyQueryHookResult = ReturnType<typeof useMyUserLazyQuery>;
export type MyUserQueryResult = Apollo.QueryResult<MyUserQuery, MyUserQueryVariables>;
export const LoginWithEmailDocument = gql`
    mutation loginWithEmail($input: LoginWithEmailInput!) {
  loginWithEmail(input: $input) {
    token
    user {
      id
    }
  }
}
    `;
export type LoginWithEmailMutationFn = Apollo.MutationFunction<LoginWithEmailMutation, LoginWithEmailMutationVariables>;

/**
 * __useLoginWithEmailMutation__
 *
 * To run a mutation, you first call `useLoginWithEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithEmailMutation, { data, loading, error }] = useLoginWithEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginWithEmailMutation(baseOptions?: Apollo.MutationHookOptions<LoginWithEmailMutation, LoginWithEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginWithEmailMutation, LoginWithEmailMutationVariables>(LoginWithEmailDocument, options);
      }
export type LoginWithEmailMutationHookResult = ReturnType<typeof useLoginWithEmailMutation>;
export type LoginWithEmailMutationResult = Apollo.MutationResult<LoginWithEmailMutation>;
export type LoginWithEmailMutationOptions = Apollo.BaseMutationOptions<LoginWithEmailMutation, LoginWithEmailMutationVariables>;
export const SchoolsDocument = gql`
    query schools($page: PageInput, $order: SchoolOrder, $filter: SchoolFilter) {
  schools(page: $page, order: $order, filter: $filter) {
    page {
      ...PageFragment
    }
    nodes {
      id
      name
      phone
      createdAt
      memberCount
      logo {
        url
      }
      address {
        formatted
      }
    }
  }
}
    ${PageFragmentFragmentDoc}`;

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
 *      filter: // value for 'filter'
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
export const SchoolDocument = gql`
    query school($id: ID!) {
  school(id: $id) {
    id
    name
    phone
    logo {
      id
      url
    }
    cover {
      id
      url
    }
    address {
      id
      street
      state
      city
      zip
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
    mutation createSchool($input: CreateSchoolInput!) {
  createSchool(input: $input) {
    id
  }
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
export const UpdateSchoolDocument = gql`
    mutation updateSchool($id: ID!, $input: UpdateSchoolInput!) {
  updateSchool(id: $id, input: $input) {
    id
  }
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
 *      id: // value for 'id'
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
export const UsersDocument = gql`
    query users($page: PageInput, $order: UserOrder, $filter: UserFilter) {
  users(page: $page, order: $order, filter: $filter) {
    page {
      ...PageFragment
    }
    nodes {
      id
      createdAt
      name
      email
      emailConfirmed
      avatar {
        url
      }
      roles {
        ... on AnyUserRole {
          id
          type
          status
        }
        ... on SchoolRole {
          id
          type
          status
          school {
            id
            name
          }
        }
        ... on ParentRole {
          id
          type
          status
          childUser {
            id
          }
        }
      }
    }
  }
}
    ${PageFragmentFragmentDoc}`;

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
 *      filter: // value for 'filter'
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
export const UserDocument = gql`
    query user($id: ID!) {
  user(id: $id) {
    id
    createdAt
    name
    email
    emailConfirmed
    avatar {
      id
      url
    }
    roles {
      ... on AnyUserRole {
        id
        type
        status
      }
      ... on SchoolRole {
        id
        type
        status
        school {
          id
        }
      }
      ... on ParentRole {
        id
        type
        status
        childUser {
          id
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
export const UpdateUserDocument = gql`
    mutation updateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const PrepareUploadDocument = gql`
    mutation prepareUpload {
  prepareUpload {
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
export type PrepareUploadMutationFn = Apollo.MutationFunction<PrepareUploadMutation, PrepareUploadMutationVariables>;

/**
 * __usePrepareUploadMutation__
 *
 * To run a mutation, you first call `usePrepareUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePrepareUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [prepareUploadMutation, { data, loading, error }] = usePrepareUploadMutation({
 *   variables: {
 *   },
 * });
 */
export function usePrepareUploadMutation(baseOptions?: Apollo.MutationHookOptions<PrepareUploadMutation, PrepareUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PrepareUploadMutation, PrepareUploadMutationVariables>(PrepareUploadDocument, options);
      }
export type PrepareUploadMutationHookResult = ReturnType<typeof usePrepareUploadMutation>;
export type PrepareUploadMutationResult = Apollo.MutationResult<PrepareUploadMutation>;
export type PrepareUploadMutationOptions = Apollo.BaseMutationOptions<PrepareUploadMutation, PrepareUploadMutationVariables>;
export const UpdateImageDocument = gql`
    mutation updateImage($input: UpdateImageInput!) {
  updateImage(input: $input) {
    id
  }
}
    `;
export type UpdateImageMutationFn = Apollo.MutationFunction<UpdateImageMutation, UpdateImageMutationVariables>;

/**
 * __useUpdateImageMutation__
 *
 * To run a mutation, you first call `useUpdateImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateImageMutation, { data, loading, error }] = useUpdateImageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateImageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateImageMutation, UpdateImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateImageMutation, UpdateImageMutationVariables>(UpdateImageDocument, options);
      }
export type UpdateImageMutationHookResult = ReturnType<typeof useUpdateImageMutation>;
export type UpdateImageMutationResult = Apollo.MutationResult<UpdateImageMutation>;
export type UpdateImageMutationOptions = Apollo.BaseMutationOptions<UpdateImageMutation, UpdateImageMutationVariables>;
export const RemoveImageDocument = gql`
    mutation removeImage($id: ID!) {
  removeImage(id: $id)
}
    `;
export type RemoveImageMutationFn = Apollo.MutationFunction<RemoveImageMutation, RemoveImageMutationVariables>;

/**
 * __useRemoveImageMutation__
 *
 * To run a mutation, you first call `useRemoveImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeImageMutation, { data, loading, error }] = useRemoveImageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveImageMutation(baseOptions?: Apollo.MutationHookOptions<RemoveImageMutation, RemoveImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveImageMutation, RemoveImageMutationVariables>(RemoveImageDocument, options);
      }
export type RemoveImageMutationHookResult = ReturnType<typeof useRemoveImageMutation>;
export type RemoveImageMutationResult = Apollo.MutationResult<RemoveImageMutation>;
export type RemoveImageMutationOptions = Apollo.BaseMutationOptions<RemoveImageMutation, RemoveImageMutationVariables>;
export const CreateAddressDocument = gql`
    mutation createAddress($schoolId: ID!, $input: CreateAddressInput!) {
  createAddress(schoolId: $schoolId, input: $input) {
    id
  }
}
    `;
export type CreateAddressMutationFn = Apollo.MutationFunction<CreateAddressMutation, CreateAddressMutationVariables>;

/**
 * __useCreateAddressMutation__
 *
 * To run a mutation, you first call `useCreateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAddressMutation, { data, loading, error }] = useCreateAddressMutation({
 *   variables: {
 *      schoolId: // value for 'schoolId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAddressMutation(baseOptions?: Apollo.MutationHookOptions<CreateAddressMutation, CreateAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAddressMutation, CreateAddressMutationVariables>(CreateAddressDocument, options);
      }
export type CreateAddressMutationHookResult = ReturnType<typeof useCreateAddressMutation>;
export type CreateAddressMutationResult = Apollo.MutationResult<CreateAddressMutation>;
export type CreateAddressMutationOptions = Apollo.BaseMutationOptions<CreateAddressMutation, CreateAddressMutationVariables>;
export const UpdateAddressDocument = gql`
    mutation updateAddress($id: ID!, $input: UpdateAddressInput!) {
  updateAddress(id: $id, input: $input) {
    id
  }
}
    `;
export type UpdateAddressMutationFn = Apollo.MutationFunction<UpdateAddressMutation, UpdateAddressMutationVariables>;

/**
 * __useUpdateAddressMutation__
 *
 * To run a mutation, you first call `useUpdateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddressMutation, { data, loading, error }] = useUpdateAddressMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAddressMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAddressMutation, UpdateAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAddressMutation, UpdateAddressMutationVariables>(UpdateAddressDocument, options);
      }
export type UpdateAddressMutationHookResult = ReturnType<typeof useUpdateAddressMutation>;
export type UpdateAddressMutationResult = Apollo.MutationResult<UpdateAddressMutation>;
export type UpdateAddressMutationOptions = Apollo.BaseMutationOptions<UpdateAddressMutation, UpdateAddressMutationVariables>;
export const RemoveAddressDocument = gql`
    mutation removeAddress($id: ID!) {
  removeAddress(id: $id)
}
    `;
export type RemoveAddressMutationFn = Apollo.MutationFunction<RemoveAddressMutation, RemoveAddressMutationVariables>;

/**
 * __useRemoveAddressMutation__
 *
 * To run a mutation, you first call `useRemoveAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAddressMutation, { data, loading, error }] = useRemoveAddressMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveAddressMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAddressMutation, RemoveAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveAddressMutation, RemoveAddressMutationVariables>(RemoveAddressDocument, options);
      }
export type RemoveAddressMutationHookResult = ReturnType<typeof useRemoveAddressMutation>;
export type RemoveAddressMutationResult = Apollo.MutationResult<RemoveAddressMutation>;
export type RemoveAddressMutationOptions = Apollo.BaseMutationOptions<RemoveAddressMutation, RemoveAddressMutationVariables>;
export const CreateUserRoleDocument = gql`
    mutation createUserRole($input: CreateUserRoleInput!) {
  createUserRole(input: $input) {
    id
  }
}
    `;
export type CreateUserRoleMutationFn = Apollo.MutationFunction<CreateUserRoleMutation, CreateUserRoleMutationVariables>;

/**
 * __useCreateUserRoleMutation__
 *
 * To run a mutation, you first call `useCreateUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserRoleMutation, { data, loading, error }] = useCreateUserRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserRoleMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserRoleMutation, CreateUserRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserRoleMutation, CreateUserRoleMutationVariables>(CreateUserRoleDocument, options);
      }
export type CreateUserRoleMutationHookResult = ReturnType<typeof useCreateUserRoleMutation>;
export type CreateUserRoleMutationResult = Apollo.MutationResult<CreateUserRoleMutation>;
export type CreateUserRoleMutationOptions = Apollo.BaseMutationOptions<CreateUserRoleMutation, CreateUserRoleMutationVariables>;
export const RemoveUserRoleDocument = gql`
    mutation removeUserRole($id: ID!) {
  removeUserRole(id: $id)
}
    `;
export type RemoveUserRoleMutationFn = Apollo.MutationFunction<RemoveUserRoleMutation, RemoveUserRoleMutationVariables>;

/**
 * __useRemoveUserRoleMutation__
 *
 * To run a mutation, you first call `useRemoveUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserRoleMutation, { data, loading, error }] = useRemoveUserRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveUserRoleMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserRoleMutation, RemoveUserRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserRoleMutation, RemoveUserRoleMutationVariables>(RemoveUserRoleDocument, options);
      }
export type RemoveUserRoleMutationHookResult = ReturnType<typeof useRemoveUserRoleMutation>;
export type RemoveUserRoleMutationResult = Apollo.MutationResult<RemoveUserRoleMutation>;
export type RemoveUserRoleMutationOptions = Apollo.BaseMutationOptions<RemoveUserRoleMutation, RemoveUserRoleMutationVariables>;
export const SettingsDocument = gql`
    query settings {
  settings {
    enableSignUps
  }
}
    `;

/**
 * __useSettingsQuery__
 *
 * To run a query within a React component, call `useSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSettingsQuery(baseOptions?: Apollo.QueryHookOptions<SettingsQuery, SettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, options);
      }
export function useSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingsQuery, SettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, options);
        }
export type SettingsQueryHookResult = ReturnType<typeof useSettingsQuery>;
export type SettingsLazyQueryHookResult = ReturnType<typeof useSettingsLazyQuery>;
export type SettingsQueryResult = Apollo.QueryResult<SettingsQuery, SettingsQueryVariables>;
export const UpdateSettingsDocument = gql`
    mutation updateSettings($input: UpdateSettingsInput!) {
  updateSettings(input: $input)
}
    `;
export type UpdateSettingsMutationFn = Apollo.MutationFunction<UpdateSettingsMutation, UpdateSettingsMutationVariables>;

/**
 * __useUpdateSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSettingsMutation, { data, loading, error }] = useUpdateSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSettingsMutation, UpdateSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSettingsMutation, UpdateSettingsMutationVariables>(UpdateSettingsDocument, options);
      }
export type UpdateSettingsMutationHookResult = ReturnType<typeof useUpdateSettingsMutation>;
export type UpdateSettingsMutationResult = Apollo.MutationResult<UpdateSettingsMutation>;
export type UpdateSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateSettingsMutation, UpdateSettingsMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation updatePassword($input: UpdatePasswordInput!) {
  updatePassword(input: $input)
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
 *      input: // value for 'input'
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
export const FinalizeAccountDocument = gql`
    mutation finalizeAccount($input: FinalizeAccountInput!) {
  finalizeAccount(input: $input) {
    user {
      id
    }
  }
}
    `;
export type FinalizeAccountMutationFn = Apollo.MutationFunction<FinalizeAccountMutation, FinalizeAccountMutationVariables>;

/**
 * __useFinalizeAccountMutation__
 *
 * To run a mutation, you first call `useFinalizeAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinalizeAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finalizeAccountMutation, { data, loading, error }] = useFinalizeAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFinalizeAccountMutation(baseOptions?: Apollo.MutationHookOptions<FinalizeAccountMutation, FinalizeAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FinalizeAccountMutation, FinalizeAccountMutationVariables>(FinalizeAccountDocument, options);
      }
export type FinalizeAccountMutationHookResult = ReturnType<typeof useFinalizeAccountMutation>;
export type FinalizeAccountMutationResult = Apollo.MutationResult<FinalizeAccountMutation>;
export type FinalizeAccountMutationOptions = Apollo.BaseMutationOptions<FinalizeAccountMutation, FinalizeAccountMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    user {
      id
    }
  }
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
 *      input: // value for 'input'
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
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const RegisterWithEmailDocument = gql`
    mutation registerWithEmail($input: RegisterWithEmailInput!) {
  registerWithEmail(input: $input) {
    token
    user {
      id
    }
  }
}
    `;
export type RegisterWithEmailMutationFn = Apollo.MutationFunction<RegisterWithEmailMutation, RegisterWithEmailMutationVariables>;

/**
 * __useRegisterWithEmailMutation__
 *
 * To run a mutation, you first call `useRegisterWithEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterWithEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerWithEmailMutation, { data, loading, error }] = useRegisterWithEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterWithEmailMutation(baseOptions?: Apollo.MutationHookOptions<RegisterWithEmailMutation, RegisterWithEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterWithEmailMutation, RegisterWithEmailMutationVariables>(RegisterWithEmailDocument, options);
      }
export type RegisterWithEmailMutationHookResult = ReturnType<typeof useRegisterWithEmailMutation>;
export type RegisterWithEmailMutationResult = Apollo.MutationResult<RegisterWithEmailMutation>;
export type RegisterWithEmailMutationOptions = Apollo.BaseMutationOptions<RegisterWithEmailMutation, RegisterWithEmailMutationVariables>;
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
export const StatsForStaffDocument = gql`
    query statsForStaff($days: Int!) {
  statsOfCreatedUsers(days: $days) {
    ...StatsByDayFragment
  }
  statsOfCreatedSchools(days: $days) {
    ...StatsByDayFragment
  }
  statsOfCreatedMembers(days: $days) {
    ...StatsByDayFragment
  }
  statsOfCreatedParents(days: $days) {
    ...StatsByDayFragment
  }
}
    ${StatsByDayFragmentFragmentDoc}`;

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
export const StatsForSchoolDocument = gql`
    query statsForSchool($schoolId: ID!, $days: Int!) {
  statsOfCreatedMembersInSchool(schoolId: $schoolId, days: $days) {
    ...StatsByDayFragment
  }
  statsOfInvitedMembersInSchool(schoolId: $schoolId, days: $days) {
    ...StatsByDayFragment
  }
  statsOfAcceptedMembersInSchool(schoolId: $schoolId, days: $days) {
    ...StatsByDayFragment
  }
}
    ${StatsByDayFragmentFragmentDoc}`;

/**
 * __useStatsForSchoolQuery__
 *
 * To run a query within a React component, call `useStatsForSchoolQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatsForSchoolQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatsForSchoolQuery({
 *   variables: {
 *      schoolId: // value for 'schoolId'
 *      days: // value for 'days'
 *   },
 * });
 */
export function useStatsForSchoolQuery(baseOptions: Apollo.QueryHookOptions<StatsForSchoolQuery, StatsForSchoolQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatsForSchoolQuery, StatsForSchoolQueryVariables>(StatsForSchoolDocument, options);
      }
export function useStatsForSchoolLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatsForSchoolQuery, StatsForSchoolQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatsForSchoolQuery, StatsForSchoolQueryVariables>(StatsForSchoolDocument, options);
        }
export type StatsForSchoolQueryHookResult = ReturnType<typeof useStatsForSchoolQuery>;
export type StatsForSchoolLazyQueryHookResult = ReturnType<typeof useStatsForSchoolLazyQuery>;
export type StatsForSchoolQueryResult = Apollo.QueryResult<StatsForSchoolQuery, StatsForSchoolQueryVariables>;
export const AuthWithTwitterDocument = gql`
    mutation authWithTwitter {
  authWithTwitter
}
    `;
export type AuthWithTwitterMutationFn = Apollo.MutationFunction<AuthWithTwitterMutation, AuthWithTwitterMutationVariables>;

/**
 * __useAuthWithTwitterMutation__
 *
 * To run a mutation, you first call `useAuthWithTwitterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthWithTwitterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authWithTwitterMutation, { data, loading, error }] = useAuthWithTwitterMutation({
 *   variables: {
 *   },
 * });
 */
export function useAuthWithTwitterMutation(baseOptions?: Apollo.MutationHookOptions<AuthWithTwitterMutation, AuthWithTwitterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthWithTwitterMutation, AuthWithTwitterMutationVariables>(AuthWithTwitterDocument, options);
      }
export type AuthWithTwitterMutationHookResult = ReturnType<typeof useAuthWithTwitterMutation>;
export type AuthWithTwitterMutationResult = Apollo.MutationResult<AuthWithTwitterMutation>;
export type AuthWithTwitterMutationOptions = Apollo.BaseMutationOptions<AuthWithTwitterMutation, AuthWithTwitterMutationVariables>;
export const RemoveTwitterDocument = gql`
    mutation removeTwitter($id: ID!) {
  removeTwitter(id: $id)
}
    `;
export type RemoveTwitterMutationFn = Apollo.MutationFunction<RemoveTwitterMutation, RemoveTwitterMutationVariables>;

/**
 * __useRemoveTwitterMutation__
 *
 * To run a mutation, you first call `useRemoveTwitterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTwitterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTwitterMutation, { data, loading, error }] = useRemoveTwitterMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveTwitterMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTwitterMutation, RemoveTwitterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTwitterMutation, RemoveTwitterMutationVariables>(RemoveTwitterDocument, options);
      }
export type RemoveTwitterMutationHookResult = ReturnType<typeof useRemoveTwitterMutation>;
export type RemoveTwitterMutationResult = Apollo.MutationResult<RemoveTwitterMutation>;
export type RemoveTwitterMutationOptions = Apollo.BaseMutationOptions<RemoveTwitterMutation, RemoveTwitterMutationVariables>;
export const EmailSettingsDocument = gql`
    query emailSettings {
  emailSettings {
    receivePostFlagged
  }
}
    `;

/**
 * __useEmailSettingsQuery__
 *
 * To run a query within a React component, call `useEmailSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmailSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmailSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEmailSettingsQuery(baseOptions?: Apollo.QueryHookOptions<EmailSettingsQuery, EmailSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmailSettingsQuery, EmailSettingsQueryVariables>(EmailSettingsDocument, options);
      }
export function useEmailSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmailSettingsQuery, EmailSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmailSettingsQuery, EmailSettingsQueryVariables>(EmailSettingsDocument, options);
        }
export type EmailSettingsQueryHookResult = ReturnType<typeof useEmailSettingsQuery>;
export type EmailSettingsLazyQueryHookResult = ReturnType<typeof useEmailSettingsLazyQuery>;
export type EmailSettingsQueryResult = Apollo.QueryResult<EmailSettingsQuery, EmailSettingsQueryVariables>;
export const UpdateEmailSettingsDocument = gql`
    mutation updateEmailSettings($input: UpdateEmailSettingsInput!) {
  updateEmailSettings(input: $input)
}
    `;
export type UpdateEmailSettingsMutationFn = Apollo.MutationFunction<UpdateEmailSettingsMutation, UpdateEmailSettingsMutationVariables>;

/**
 * __useUpdateEmailSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateEmailSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmailSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmailSettingsMutation, { data, loading, error }] = useUpdateEmailSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEmailSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEmailSettingsMutation, UpdateEmailSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEmailSettingsMutation, UpdateEmailSettingsMutationVariables>(UpdateEmailSettingsDocument, options);
      }
export type UpdateEmailSettingsMutationHookResult = ReturnType<typeof useUpdateEmailSettingsMutation>;
export type UpdateEmailSettingsMutationResult = Apollo.MutationResult<UpdateEmailSettingsMutation>;
export type UpdateEmailSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateEmailSettingsMutation, UpdateEmailSettingsMutationVariables>;
export const PostsDocument = gql`
    query posts($schoolId: ID, $page: PageInput, $filter: PostFilter) {
  posts(schoolId: $schoolId, page: $page, filter: $filter) {
    page {
      ...PageFragment
    }
    nodes {
      id
      createdAt
      url
      text
      flag {
        flagged
        reasons
      }
      user {
        id
        name
        email
        avatar {
          url
        }
      }
    }
  }
}
    ${PageFragmentFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      schoolId: // value for 'schoolId'
 *      page: // value for 'page'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const PostDocument = gql`
    query post($id: ID!) {
  post(id: $id) {
    id
    createdAt
    url
    text
    flag {
      flagged
      reasons
    }
    user {
      id
      name
      email
      avatar {
        url
      }
    }
    media {
      id
      url
      type
    }
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostCardsDocument = gql`
    query postCards($schoolId: ID) {
  totalPosts: posts(schoolId: $schoolId) {
    page {
      total
    }
  }
  flaggedPosts: posts(schoolId: $schoolId, filter: {flagged: true}) {
    page {
      total
    }
  }
}
    `;

/**
 * __usePostCardsQuery__
 *
 * To run a query within a React component, call `usePostCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostCardsQuery({
 *   variables: {
 *      schoolId: // value for 'schoolId'
 *   },
 * });
 */
export function usePostCardsQuery(baseOptions?: Apollo.QueryHookOptions<PostCardsQuery, PostCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostCardsQuery, PostCardsQueryVariables>(PostCardsDocument, options);
      }
export function usePostCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostCardsQuery, PostCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostCardsQuery, PostCardsQueryVariables>(PostCardsDocument, options);
        }
export type PostCardsQueryHookResult = ReturnType<typeof usePostCardsQuery>;
export type PostCardsLazyQueryHookResult = ReturnType<typeof usePostCardsLazyQuery>;
export type PostCardsQueryResult = Apollo.QueryResult<PostCardsQuery, PostCardsQueryVariables>;
export const namedOperations = {
  Query: {
    notifications: 'notifications',
    myUser: 'myUser',
    schools: 'schools',
    school: 'school',
    users: 'users',
    user: 'user',
    settings: 'settings',
    statsForStaff: 'statsForStaff',
    statsForSchool: 'statsForSchool',
    emailSettings: 'emailSettings',
    posts: 'posts',
    post: 'post',
    postCards: 'postCards'
  },
  Mutation: {
    readNotifications: 'readNotifications',
    loginWithEmail: 'loginWithEmail',
    createSchool: 'createSchool',
    updateSchool: 'updateSchool',
    updateUser: 'updateUser',
    prepareUpload: 'prepareUpload',
    updateImage: 'updateImage',
    removeImage: 'removeImage',
    createAddress: 'createAddress',
    updateAddress: 'updateAddress',
    removeAddress: 'removeAddress',
    createUserRole: 'createUserRole',
    removeUserRole: 'removeUserRole',
    updateSettings: 'updateSettings',
    updatePassword: 'updatePassword',
    finalizeAccount: 'finalizeAccount',
    resetPassword: 'resetPassword',
    forgotPassword: 'forgotPassword',
    registerWithEmail: 'registerWithEmail',
    contact: 'contact',
    authWithTwitter: 'authWithTwitter',
    removeTwitter: 'removeTwitter',
    updateEmailSettings: 'updateEmailSettings'
  },
  Fragment: {
    PageFragment: 'PageFragment',
    StatsByDayFragment: 'StatsByDayFragment'
  }
}