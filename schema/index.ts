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

export type Action = {
  __typename?: 'Action';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  user?: Maybe<User>;
};

export const ActionEnum = {
  MarkAsAcceptable: 'MARK_AS_ACCEPTABLE',
  MarkAsNotAcceptable: 'MARK_AS_NOT_ACCEPTABLE',
  NotifyStudent: 'NOTIFY_STUDENT',
  TakeDownPost: 'TAKE_DOWN_POST'
} as const;

export type ActionEnum = typeof ActionEnum[keyof typeof ActionEnum];
export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  formatted: Scalars['String'];
  id: Scalars['ID'];
  state: Scalars['String'];
  street: Scalars['String'];
  zip: Scalars['String'];
};

export const AnalysisItemSeverityEnum = {
  High: 'HIGH',
  Low: 'LOW',
  None: 'NONE'
} as const;

export type AnalysisItemSeverityEnum = typeof AnalysisItemSeverityEnum[keyof typeof AnalysisItemSeverityEnum];
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
  receivePostHighSeverity: Scalars['Boolean'];
  receivePostLowSeverity: Scalars['Boolean'];
  receivePostNoneSeverity: Scalars['Boolean'];
};

export type Facebook = {
  __typename?: 'Facebook';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type Flag = {
  __typename?: 'Flag';
  reasons: Array<Scalars['String']>;
  severity: AnalysisItemSeverityEnum;
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

export type ImportStudentsAndParentsHeader = {
  parentEmail: Scalars['String'];
  studentEmail: Scalars['String'];
};

export type ImportStudentsAndParentsInput = {
  header: ImportStudentsAndParentsHeader;
  type: PreviewImportTypeEnum;
  uploadId: Scalars['ID'];
};

export type Instagram = {
  __typename?: 'Instagram';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type InvitedRole = {
  __typename?: 'InvitedRole';
  isNewUser: Scalars['Boolean'];
  schoolLogoURL?: Maybe<Scalars['String']>;
  schoolName?: Maybe<Scalars['String']>;
  type: UserRoleTypeEnum;
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
  authWithSocial: Scalars['String'];
  contact: Scalars['Boolean'];
  createAddress: Address;
  createSchool: School;
  createUserRole: User;
  executeAction: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  importStudentsAndParents: Scalars['Boolean'];
  loginWithEmail: UserWithToken;
  prepareUpload: Upload;
  previewImport: PreviewImport;
  readNotifications: Scalars['Boolean'];
  registerWithEmail: UserWithToken;
  removeAddress: Scalars['Boolean'];
  removeImage: Scalars['Boolean'];
  removeSocial: Scalars['Boolean'];
  removeUserRole: Scalars['Boolean'];
  resetPassword: UserWithToken;
  respondToInvitedRole: UserWithToken;
  updateAddress: Address;
  updateEmailSettings: Scalars['Boolean'];
  updateImage: Image;
  updatePassword: Scalars['Boolean'];
  updateSchool: School;
  updateSettings: Scalars['Boolean'];
  updateUser: User;
  updateUserParentalApproval: Scalars['Boolean'];
};


export type MutationAuthWithSocialArgs = {
  name: SocialNameEnum;
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


export type MutationExecuteActionArgs = {
  postId: Scalars['ID'];
  type: ActionEnum;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationImportStudentsAndParentsArgs = {
  input: ImportStudentsAndParentsInput;
  schoolId: Scalars['ID'];
};


export type MutationLoginWithEmailArgs = {
  input: LoginWithEmailInput;
};


export type MutationPreviewImportArgs = {
  input: PreviewImportInput;
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


export type MutationRemoveSocialArgs = {
  name: SocialNameEnum;
};


export type MutationRemoveUserRoleArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationRespondToInvitedRoleArgs = {
  accept: Scalars['Boolean'];
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
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


export type MutationUpdateUserParentalApprovalArgs = {
  approve: Scalars['Boolean'];
  id: Scalars['ID'];
  signatureUploadId?: InputMaybe<Scalars['ID']>;
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
  actions: Array<Action>;
  createdAt: Scalars['DateTime'];
  flag?: Maybe<Flag>;
  id: Scalars['ID'];
  latestAction?: Maybe<Scalars['String']>;
  manualReview: Scalars['Boolean'];
  media: Array<Media>;
  platform?: Maybe<SocialNameEnum>;
  severity: AnalysisItemSeverityEnum;
  text: Scalars['String'];
  url: Scalars['String'];
  user: User;
};

export type PostFilter = {
  severity?: InputMaybe<AnalysisItemSeverityEnum>;
};

export type PostPage = {
  __typename?: 'PostPage';
  nodes: Array<Post>;
  page: Page;
};

export type PreviewImport = {
  __typename?: 'PreviewImport';
  headers: Array<Scalars['String']>;
  rows: Array<PreviewImportRow>;
};

export type PreviewImportInput = {
  type: PreviewImportTypeEnum;
  uploadId: Scalars['ID'];
};

export type PreviewImportRow = {
  __typename?: 'PreviewImportRow';
  values: Array<Scalars['String']>;
};

export const PreviewImportTypeEnum = {
  Csv: 'CSV',
  Excel: 'EXCEL'
} as const;

export type PreviewImportTypeEnum = typeof PreviewImportTypeEnum[keyof typeof PreviewImportTypeEnum];
export type Query = {
  __typename?: 'Query';
  emailSettings: EmailSettings;
  invitedRole: InvitedRole;
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


export type QueryInvitedRoleArgs = {
  token: Scalars['String'];
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
  userId?: InputMaybe<Scalars['ID']>;
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
  Coach: 'COACH',
  Student: 'STUDENT'
} as const;

export type SchoolRoleTypeEnum = typeof SchoolRoleTypeEnum[keyof typeof SchoolRoleTypeEnum];
export type Settings = {
  __typename?: 'Settings';
  enableSignUps: Scalars['Boolean'];
};

export type Social = Facebook | Instagram | TikTok | Twitter;

export const SocialNameEnum = {
  Facebook: 'FACEBOOK',
  Instagram: 'INSTAGRAM',
  Tiktok: 'TIKTOK',
  Twitter: 'TWITTER'
} as const;

export type SocialNameEnum = typeof SocialNameEnum[keyof typeof SocialNameEnum];
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

export type TikTok = {
  __typename?: 'TikTok';
  id: Scalars['ID'];
  username: Scalars['String'];
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
  receivePostHighSeverity?: InputMaybe<Scalars['Boolean']>;
  receivePostLowSeverity?: InputMaybe<Scalars['Boolean']>;
  receivePostNoneSeverity?: InputMaybe<Scalars['Boolean']>;
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
  id: Scalars['ID'];
  name: Scalars['String'];
  notificationCount: Scalars['Int'];
  parentalApproval?: Maybe<Scalars['Boolean']>;
  platforms: Array<Social>;
  roles: Array<UserRole>;
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
  Coach: 'COACH',
  Parent: 'PARENT',
  Staff: 'STAFF',
  Student: 'STUDENT'
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
type SocialFragment_Facebook_Fragment = { __typename?: 'Facebook', id: string, username: string };

type SocialFragment_Instagram_Fragment = { __typename?: 'Instagram', id: string, username: string };

type SocialFragment_TikTok_Fragment = { __typename?: 'TikTok', id: string, username: string };

type SocialFragment_Twitter_Fragment = { __typename?: 'Twitter', id: string, username: string };

export type SocialFragmentFragment = SocialFragment_Facebook_Fragment | SocialFragment_Instagram_Fragment | SocialFragment_TikTok_Fragment | SocialFragment_Twitter_Fragment;

export type NotificationsQueryVariables = Exact<{
  page?: InputMaybe<PageInput>;
}>;


export type NotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationPage', page: { __typename?: 'Page', index: number, size: number, count: number, total: number }, nodes: Array<{ __typename?: 'Notification', id: string, createdAt: string, body: string, url?: string | null }> } };

export type ReadNotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type ReadNotificationsMutation = { __typename?: 'Mutation', readNotifications: boolean };

export type MyUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MyUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, name: string, notificationCount: number, avatar?: { __typename?: 'Image', id: string, url: string } | null, roles: Array<{ __typename?: 'AnyUserRole', id: string, type: UserRoleTypeEnum } | { __typename?: 'ParentRole', id: string, type: UserRoleTypeEnum } | { __typename?: 'SchoolRole', id: string, type: UserRoleTypeEnum, school: { __typename?: 'School', id: string, name: string, logo?: { __typename?: 'Image', url: string } | null, cover?: { __typename?: 'Image', url: string } | null } }>, platforms: Array<{ __typename?: 'Facebook', id: string, username: string } | { __typename?: 'Instagram', id: string, username: string } | { __typename?: 'TikTok', id: string, username: string } | { __typename?: 'Twitter', id: string, username: string }> } };

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


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'UserPage', page: { __typename?: 'Page', index: number, size: number, count: number, total: number }, nodes: Array<{ __typename?: 'User', id: string, createdAt: string, name: string, email: string, parentalApproval?: boolean | null, platforms: Array<{ __typename?: 'Facebook', id: string, username: string } | { __typename?: 'Instagram', id: string, username: string } | { __typename?: 'TikTok', id: string, username: string } | { __typename?: 'Twitter', id: string, username: string }>, avatar?: { __typename?: 'Image', url: string } | null, roles: Array<{ __typename?: 'AnyUserRole', id: string, type: UserRoleTypeEnum, status: UserRoleStatusEnum } | { __typename?: 'ParentRole', id: string, type: UserRoleTypeEnum, status: UserRoleStatusEnum, childUser: { __typename?: 'User', id: string } } | { __typename?: 'SchoolRole', id: string, type: UserRoleTypeEnum, status: UserRoleStatusEnum, school: { __typename?: 'School', id: string, name: string } }> }> } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, createdAt: string, name: string, email: string, avatar?: { __typename?: 'Image', id: string, url: string } | null, roles: Array<{ __typename?: 'AnyUserRole', id: string, type: UserRoleTypeEnum, status: UserRoleStatusEnum } | { __typename?: 'ParentRole', id: string, type: UserRoleTypeEnum, status: UserRoleStatusEnum, childUser: { __typename?: 'User', id: string } } | { __typename?: 'SchoolRole', id: string, type: UserRoleTypeEnum, status: UserRoleStatusEnum, school: { __typename?: 'School', id: string } }>, platforms: Array<{ __typename?: 'Facebook', id: string, username: string } | { __typename?: 'Instagram', id: string, username: string } | { __typename?: 'TikTok', id: string, username: string } | { __typename?: 'Twitter', id: string, username: string }> } };

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

export type AuthWithSocialMutationVariables = Exact<{
  name: SocialNameEnum;
}>;


export type AuthWithSocialMutation = { __typename?: 'Mutation', authWithSocial: string };

export type RemoveSocialMutationVariables = Exact<{
  name: SocialNameEnum;
}>;


export type RemoveSocialMutation = { __typename?: 'Mutation', removeSocial: boolean };

export type EmailSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type EmailSettingsQuery = { __typename?: 'Query', emailSettings: { __typename?: 'EmailSettings', receivePostNoneSeverity: boolean, receivePostLowSeverity: boolean, receivePostHighSeverity: boolean } };

export type UpdateEmailSettingsMutationVariables = Exact<{
  input: UpdateEmailSettingsInput;
}>;


export type UpdateEmailSettingsMutation = { __typename?: 'Mutation', updateEmailSettings: boolean };

export type PostsQueryVariables = Exact<{
  schoolId?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['ID']>;
  page?: InputMaybe<PageInput>;
  filter?: InputMaybe<PostFilter>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostPage', page: { __typename?: 'Page', index: number, size: number, count: number, total: number }, nodes: Array<{ __typename?: 'Post', id: string, createdAt: string, url: string, text: string, platform?: SocialNameEnum | null, latestAction?: string | null, severity: AnalysisItemSeverityEnum, manualReview: boolean, flag?: { __typename?: 'Flag', severity: AnalysisItemSeverityEnum, reasons: Array<string> } | null, user: { __typename?: 'User', id: string, name: string, email: string, avatar?: { __typename?: 'Image', url: string } | null }, media: Array<{ __typename?: 'Media', id: string }> }> } };

export type PostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: string, createdAt: string, url: string, text: string, platform?: SocialNameEnum | null, severity: AnalysisItemSeverityEnum, manualReview: boolean, flag?: { __typename?: 'Flag', reasons: Array<string> } | null, user: { __typename?: 'User', id: string, name: string, email: string, avatar?: { __typename?: 'Image', url: string } | null }, media: Array<{ __typename?: 'Media', id: string, url: string, type: MediaTypeEnum }>, actions: Array<{ __typename?: 'Action', id: string, createdAt: string, name: string, user?: { __typename?: 'User', id: string, name: string, email: string, avatar?: { __typename?: 'Image', url: string } | null } | null }> } };

export type PostCardsQueryVariables = Exact<{
  schoolId?: InputMaybe<Scalars['ID']>;
}>;


export type PostCardsQuery = { __typename?: 'Query', severityNonePosts: { __typename?: 'PostPage', page: { __typename?: 'Page', total: number } }, severityLowPosts: { __typename?: 'PostPage', page: { __typename?: 'Page', total: number } }, severityHighPosts: { __typename?: 'PostPage', page: { __typename?: 'Page', total: number } } };

export type ExecuteActionMutationVariables = Exact<{
  type: ActionEnum;
  postId: Scalars['ID'];
}>;


export type ExecuteActionMutation = { __typename?: 'Mutation', executeAction: boolean };

export type UpdateUserParentalApprovalMutationVariables = Exact<{
  id: Scalars['ID'];
  approve: Scalars['Boolean'];
  signatureUploadId?: InputMaybe<Scalars['ID']>;
}>;


export type UpdateUserParentalApprovalMutation = { __typename?: 'Mutation', updateUserParentalApproval: boolean };

export type PreviewImportMutationVariables = Exact<{
  input: PreviewImportInput;
}>;


export type PreviewImportMutation = { __typename?: 'Mutation', previewImport: { __typename?: 'PreviewImport', headers: Array<string>, rows: Array<{ __typename?: 'PreviewImportRow', values: Array<string> }> } };

export type ImportStudentsAndParentsMutationVariables = Exact<{
  schoolId: Scalars['ID'];
  input: ImportStudentsAndParentsInput;
}>;


export type ImportStudentsAndParentsMutation = { __typename?: 'Mutation', importStudentsAndParents: boolean };

export type InvitedRoleQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type InvitedRoleQuery = { __typename?: 'Query', invitedRole: { __typename?: 'InvitedRole', type: UserRoleTypeEnum, schoolName?: string | null, schoolLogoURL?: string | null, isNewUser: boolean } };

export type RespondToInvitedRoleMutationVariables = Exact<{
  token: Scalars['String'];
  accept: Scalars['Boolean'];
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;


export type RespondToInvitedRoleMutation = { __typename?: 'Mutation', respondToInvitedRole: { __typename?: 'UserWithToken', token: string, user: { __typename?: 'User', id: string } } };

export const SocialFragmentFragmentDoc = gql`
    fragment SocialFragment on Social {
  ... on Facebook {
    id
    username
  }
  ... on Twitter {
    id
    username
  }
  ... on Instagram {
    id
    username
  }
  ... on TikTok {
    id
    username
  }
}
    `;
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
    name
    notificationCount
    avatar {
      id
      url
    }
    roles(status: ACCEPTED) {
      ... on AnyUserRole {
        id
        type
      }
      ... on SchoolRole {
        id
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
        id
        type
      }
    }
    platforms {
      ...SocialFragment
    }
  }
}
    ${SocialFragmentFragmentDoc}`;

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
      parentalApproval
      platforms {
        ...SocialFragment
      }
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
    ${PageFragmentFragmentDoc}
${SocialFragmentFragmentDoc}`;

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
    platforms {
      ...SocialFragment
    }
  }
}
    ${SocialFragmentFragmentDoc}`;

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
export const AuthWithSocialDocument = gql`
    mutation authWithSocial($name: SocialNameEnum!) {
  authWithSocial(name: $name)
}
    `;
export type AuthWithSocialMutationFn = Apollo.MutationFunction<AuthWithSocialMutation, AuthWithSocialMutationVariables>;

/**
 * __useAuthWithSocialMutation__
 *
 * To run a mutation, you first call `useAuthWithSocialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthWithSocialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authWithSocialMutation, { data, loading, error }] = useAuthWithSocialMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAuthWithSocialMutation(baseOptions?: Apollo.MutationHookOptions<AuthWithSocialMutation, AuthWithSocialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthWithSocialMutation, AuthWithSocialMutationVariables>(AuthWithSocialDocument, options);
      }
export type AuthWithSocialMutationHookResult = ReturnType<typeof useAuthWithSocialMutation>;
export type AuthWithSocialMutationResult = Apollo.MutationResult<AuthWithSocialMutation>;
export type AuthWithSocialMutationOptions = Apollo.BaseMutationOptions<AuthWithSocialMutation, AuthWithSocialMutationVariables>;
export const RemoveSocialDocument = gql`
    mutation removeSocial($name: SocialNameEnum!) {
  removeSocial(name: $name)
}
    `;
export type RemoveSocialMutationFn = Apollo.MutationFunction<RemoveSocialMutation, RemoveSocialMutationVariables>;

/**
 * __useRemoveSocialMutation__
 *
 * To run a mutation, you first call `useRemoveSocialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSocialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSocialMutation, { data, loading, error }] = useRemoveSocialMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRemoveSocialMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSocialMutation, RemoveSocialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSocialMutation, RemoveSocialMutationVariables>(RemoveSocialDocument, options);
      }
export type RemoveSocialMutationHookResult = ReturnType<typeof useRemoveSocialMutation>;
export type RemoveSocialMutationResult = Apollo.MutationResult<RemoveSocialMutation>;
export type RemoveSocialMutationOptions = Apollo.BaseMutationOptions<RemoveSocialMutation, RemoveSocialMutationVariables>;
export const EmailSettingsDocument = gql`
    query emailSettings {
  emailSettings {
    receivePostNoneSeverity
    receivePostLowSeverity
    receivePostHighSeverity
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
    query posts($schoolId: ID, $userId: ID, $page: PageInput, $filter: PostFilter) {
  posts(schoolId: $schoolId, userId: $userId, page: $page, filter: $filter) {
    page {
      ...PageFragment
    }
    nodes {
      id
      createdAt
      url
      text
      platform
      latestAction
      severity
      manualReview
      flag {
        severity
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
 *      userId: // value for 'userId'
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
    platform
    severity
    manualReview
    flag {
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
    actions {
      id
      createdAt
      name
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
  severityNonePosts: posts(schoolId: $schoolId, filter: {severity: NONE}) {
    page {
      total
    }
  }
  severityLowPosts: posts(schoolId: $schoolId, filter: {severity: LOW}) {
    page {
      total
    }
  }
  severityHighPosts: posts(schoolId: $schoolId, filter: {severity: HIGH}) {
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
export const ExecuteActionDocument = gql`
    mutation executeAction($type: ActionEnum!, $postId: ID!) {
  executeAction(type: $type, postId: $postId)
}
    `;
export type ExecuteActionMutationFn = Apollo.MutationFunction<ExecuteActionMutation, ExecuteActionMutationVariables>;

/**
 * __useExecuteActionMutation__
 *
 * To run a mutation, you first call `useExecuteActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExecuteActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [executeActionMutation, { data, loading, error }] = useExecuteActionMutation({
 *   variables: {
 *      type: // value for 'type'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useExecuteActionMutation(baseOptions?: Apollo.MutationHookOptions<ExecuteActionMutation, ExecuteActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ExecuteActionMutation, ExecuteActionMutationVariables>(ExecuteActionDocument, options);
      }
export type ExecuteActionMutationHookResult = ReturnType<typeof useExecuteActionMutation>;
export type ExecuteActionMutationResult = Apollo.MutationResult<ExecuteActionMutation>;
export type ExecuteActionMutationOptions = Apollo.BaseMutationOptions<ExecuteActionMutation, ExecuteActionMutationVariables>;
export const UpdateUserParentalApprovalDocument = gql`
    mutation updateUserParentalApproval($id: ID!, $approve: Boolean!, $signatureUploadId: ID) {
  updateUserParentalApproval(
    id: $id
    approve: $approve
    signatureUploadId: $signatureUploadId
  )
}
    `;
export type UpdateUserParentalApprovalMutationFn = Apollo.MutationFunction<UpdateUserParentalApprovalMutation, UpdateUserParentalApprovalMutationVariables>;

/**
 * __useUpdateUserParentalApprovalMutation__
 *
 * To run a mutation, you first call `useUpdateUserParentalApprovalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserParentalApprovalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserParentalApprovalMutation, { data, loading, error }] = useUpdateUserParentalApprovalMutation({
 *   variables: {
 *      id: // value for 'id'
 *      approve: // value for 'approve'
 *      signatureUploadId: // value for 'signatureUploadId'
 *   },
 * });
 */
export function useUpdateUserParentalApprovalMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserParentalApprovalMutation, UpdateUserParentalApprovalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserParentalApprovalMutation, UpdateUserParentalApprovalMutationVariables>(UpdateUserParentalApprovalDocument, options);
      }
export type UpdateUserParentalApprovalMutationHookResult = ReturnType<typeof useUpdateUserParentalApprovalMutation>;
export type UpdateUserParentalApprovalMutationResult = Apollo.MutationResult<UpdateUserParentalApprovalMutation>;
export type UpdateUserParentalApprovalMutationOptions = Apollo.BaseMutationOptions<UpdateUserParentalApprovalMutation, UpdateUserParentalApprovalMutationVariables>;
export const PreviewImportDocument = gql`
    mutation previewImport($input: PreviewImportInput!) {
  previewImport(input: $input) {
    headers
    rows {
      values
    }
  }
}
    `;
export type PreviewImportMutationFn = Apollo.MutationFunction<PreviewImportMutation, PreviewImportMutationVariables>;

/**
 * __usePreviewImportMutation__
 *
 * To run a mutation, you first call `usePreviewImportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePreviewImportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [previewImportMutation, { data, loading, error }] = usePreviewImportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePreviewImportMutation(baseOptions?: Apollo.MutationHookOptions<PreviewImportMutation, PreviewImportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PreviewImportMutation, PreviewImportMutationVariables>(PreviewImportDocument, options);
      }
export type PreviewImportMutationHookResult = ReturnType<typeof usePreviewImportMutation>;
export type PreviewImportMutationResult = Apollo.MutationResult<PreviewImportMutation>;
export type PreviewImportMutationOptions = Apollo.BaseMutationOptions<PreviewImportMutation, PreviewImportMutationVariables>;
export const ImportStudentsAndParentsDocument = gql`
    mutation importStudentsAndParents($schoolId: ID!, $input: ImportStudentsAndParentsInput!) {
  importStudentsAndParents(schoolId: $schoolId, input: $input)
}
    `;
export type ImportStudentsAndParentsMutationFn = Apollo.MutationFunction<ImportStudentsAndParentsMutation, ImportStudentsAndParentsMutationVariables>;

/**
 * __useImportStudentsAndParentsMutation__
 *
 * To run a mutation, you first call `useImportStudentsAndParentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportStudentsAndParentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importStudentsAndParentsMutation, { data, loading, error }] = useImportStudentsAndParentsMutation({
 *   variables: {
 *      schoolId: // value for 'schoolId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useImportStudentsAndParentsMutation(baseOptions?: Apollo.MutationHookOptions<ImportStudentsAndParentsMutation, ImportStudentsAndParentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImportStudentsAndParentsMutation, ImportStudentsAndParentsMutationVariables>(ImportStudentsAndParentsDocument, options);
      }
export type ImportStudentsAndParentsMutationHookResult = ReturnType<typeof useImportStudentsAndParentsMutation>;
export type ImportStudentsAndParentsMutationResult = Apollo.MutationResult<ImportStudentsAndParentsMutation>;
export type ImportStudentsAndParentsMutationOptions = Apollo.BaseMutationOptions<ImportStudentsAndParentsMutation, ImportStudentsAndParentsMutationVariables>;
export const InvitedRoleDocument = gql`
    query invitedRole($token: String!) {
  invitedRole(token: $token) {
    type
    schoolName
    schoolLogoURL
    isNewUser
  }
}
    `;

/**
 * __useInvitedRoleQuery__
 *
 * To run a query within a React component, call `useInvitedRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvitedRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvitedRoleQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useInvitedRoleQuery(baseOptions: Apollo.QueryHookOptions<InvitedRoleQuery, InvitedRoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvitedRoleQuery, InvitedRoleQueryVariables>(InvitedRoleDocument, options);
      }
export function useInvitedRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvitedRoleQuery, InvitedRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvitedRoleQuery, InvitedRoleQueryVariables>(InvitedRoleDocument, options);
        }
export type InvitedRoleQueryHookResult = ReturnType<typeof useInvitedRoleQuery>;
export type InvitedRoleLazyQueryHookResult = ReturnType<typeof useInvitedRoleLazyQuery>;
export type InvitedRoleQueryResult = Apollo.QueryResult<InvitedRoleQuery, InvitedRoleQueryVariables>;
export const RespondToInvitedRoleDocument = gql`
    mutation respondToInvitedRole($token: String!, $accept: Boolean!, $name: String, $password: String) {
  respondToInvitedRole(
    token: $token
    accept: $accept
    name: $name
    password: $password
  ) {
    token
    user {
      id
    }
  }
}
    `;
export type RespondToInvitedRoleMutationFn = Apollo.MutationFunction<RespondToInvitedRoleMutation, RespondToInvitedRoleMutationVariables>;

/**
 * __useRespondToInvitedRoleMutation__
 *
 * To run a mutation, you first call `useRespondToInvitedRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRespondToInvitedRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [respondToInvitedRoleMutation, { data, loading, error }] = useRespondToInvitedRoleMutation({
 *   variables: {
 *      token: // value for 'token'
 *      accept: // value for 'accept'
 *      name: // value for 'name'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRespondToInvitedRoleMutation(baseOptions?: Apollo.MutationHookOptions<RespondToInvitedRoleMutation, RespondToInvitedRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RespondToInvitedRoleMutation, RespondToInvitedRoleMutationVariables>(RespondToInvitedRoleDocument, options);
      }
export type RespondToInvitedRoleMutationHookResult = ReturnType<typeof useRespondToInvitedRoleMutation>;
export type RespondToInvitedRoleMutationResult = Apollo.MutationResult<RespondToInvitedRoleMutation>;
export type RespondToInvitedRoleMutationOptions = Apollo.BaseMutationOptions<RespondToInvitedRoleMutation, RespondToInvitedRoleMutationVariables>;
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
    postCards: 'postCards',
    invitedRole: 'invitedRole'
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
    resetPassword: 'resetPassword',
    forgotPassword: 'forgotPassword',
    registerWithEmail: 'registerWithEmail',
    contact: 'contact',
    authWithSocial: 'authWithSocial',
    removeSocial: 'removeSocial',
    updateEmailSettings: 'updateEmailSettings',
    executeAction: 'executeAction',
    updateUserParentalApproval: 'updateUserParentalApproval',
    previewImport: 'previewImport',
    importStudentsAndParents: 'importStudentsAndParents',
    respondToInvitedRole: 'respondToInvitedRole'
  },
  Fragment: {
    SocialFragment: 'SocialFragment',
    PageFragment: 'PageFragment',
    StatsByDayFragment: 'StatsByDayFragment'
  }
}