// helpers;
import { LoadingState } from '../../store/slices/users-slice';

//types;
import { type UserUiType } from '../response-from-server/user';

type LoadingType = `${LoadingState}`;

export interface CurrentUserState {
  data: UserUiType;
  loading: LoadingType;
  error: string | null;
}
