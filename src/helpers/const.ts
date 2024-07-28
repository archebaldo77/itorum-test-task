export enum PagePath {
  MAIN = `/`,
  DETAILS = `/details/:login`,
  NOT_FOUND = `*`,
}

export enum SearchParam {
  LOGIN = `login`,
  PAGE = `page`,
}

export const RENDER_USERS_PER_PAGE = 24;
export const LIMIT_USERS = 1000;
