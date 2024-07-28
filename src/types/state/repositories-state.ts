// helpers;
import { LoadingState } from '../../store/slices/users-slice';

//types;
import { type RepositoriesUiType } from '../response-from-server/repositories';

type LoadingType = `${LoadingState}`;

export interface RepositoriesState {
  entities: RepositoriesUiType[];
  loading: LoadingType;
  error: string | null;
}
