import { type Endpoints } from '@octokit/types';

export type UserApiType = Endpoints[`GET /users/{username}`][`response`];

export interface UserUiType {
  id: number | null;
  login: string | null;
  name: string | null;
  avatarUrl: string | null;
  htmlUrl: string | null;
}
