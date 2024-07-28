// libraries;
import { Octokit } from 'octokit';

// helpers;
import { adapter } from '../helpers/adapter/transform-data';
import { RENDER_USERS_PER_PAGE } from '../helpers/const';

// types;
import {
  type UsersApiType,
  type UsersResponseType,
} from '../types/response-from-server/users';
import {
  type RepositoriesApiType,
  type RepositoriesUiType,
} from '../types/response-from-server/repositories';
import {
  type UserApiType,
  type UserUiType,
} from '../types/response-from-server/user';

const createApi = () => {
  const apiInstance = new Octokit({
    auth: process.env.AUTH_TOKEN || ``,
  });

  return {
    getUsersByLogin: async ({
      login,
      page = 1,
    }: {
      login: string;
      page: number;
    }): Promise<UsersResponseType> => {
      try {
        const { data }: UsersApiType = await apiInstance.request(
          'GET /search/users',
          {
            q: login,
            page,
            per_page: RENDER_USERS_PER_PAGE,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28',
            },
          }
        );

        const users = adapter.transformUsers(data.items);

        return { totalCount: data.total_count, users };
      } catch (error) {
        throw Error(`Something went wrong!`);
      }
    },

    getUserByLogin: async (login: string): Promise<UserUiType> => {
      try {
        const { data }: UserApiType = await apiInstance.request(
          `GET /users/{username}`,
          {
            username: login,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28',
            },
          }
        );

        return adapter.transformUser(data);
      } catch (error) {
        throw Error(`Something went wrong!`);
      }
    },

    getRepositoriesByLogin: async (
      login: string
    ): Promise<RepositoriesUiType[]> => {
      try {
        const { data }: RepositoriesApiType = await apiInstance.request(
          'GET /users/{username}/repos',
          {
            username: login,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28',
            },
          }
        );

        return adapter.transformRepositories(data);
      } catch (error) {
        throw Error(`Something went wrong!`);
      }
    },
  };
};

export const api = createApi();
export type ApiType = typeof api;
