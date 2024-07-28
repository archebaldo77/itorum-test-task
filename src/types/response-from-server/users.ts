import { type Endpoints } from '@octokit/types';

export type UsersApiType = Endpoints[`GET /search/users`][`response`];

export interface UsersUiType {
  id: number;
  login: string | null | undefined;
  avatarUrl: string;
  htmlUrl: string;
  type: string;
}

export interface UsersResponseType {
  users: UsersUiType[];
  totalCount: number;
}
