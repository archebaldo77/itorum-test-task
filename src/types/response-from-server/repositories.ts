import { type Endpoints } from '@octokit/types';

export type RepositoriesApiType =
  Endpoints[`GET /users/{username}/repos`][`response`];

export interface RepositoriesUiType {
  id: number;
  name: string;
  htmlUrl: string;
  description: string | null;
  language: string | null | undefined;
  update: string | null | undefined;
}
