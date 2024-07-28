// helpers;
import { LoadingState } from '../../store/slices/users-slice';

//types;
import { type UsersUiType } from '../response-from-server/users';

type LoadingType = `${LoadingState}`;

export interface UserState {
  entities: UsersUiType[];
  totalCount: number | null;
  loading: LoadingType;
  error: string | null;
}
