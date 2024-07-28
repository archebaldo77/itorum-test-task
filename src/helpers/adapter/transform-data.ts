// types;
import {
  type UsersApiType,
  type UsersUiType,
} from '../../types/response-from-server/users';

import {
  type UserApiType,
  type UserUiType,
} from '../../types/response-from-server/user';

import {
  type RepositoriesApiType,
  type RepositoriesUiType,
} from '../../types/response-from-server/repositories';

export const adapter = {
  transformUser: ({
    id,
    avatar_url,
    login,
    name,
    html_url,
  }: UserApiType[`data`]): UserUiType => {
    return {
      id,
      avatarUrl: avatar_url,
      login,
      name,
      htmlUrl: html_url,
    };
  },

  transformUsers: (users: UsersApiType[`data`][`items`]): UsersUiType[] => {
    return users.map(({ id, login, avatar_url, html_url, type }) => ({
      id,
      avatarUrl: avatar_url,
      htmlUrl: html_url,
      login,
      type,
    }));
  },

  transformRepositories: (
    repositories: RepositoriesApiType[`data`]
  ): RepositoriesUiType[] => {
    return repositories.map(
      ({ id, name, html_url, description, language, updated_at }) => ({
        id,
        name,
        htmlUrl: html_url,
        description,
        language,
        update: updated_at,
      })
    );
  },
};
