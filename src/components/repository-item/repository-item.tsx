// types;
import { type RepositoriesUiType } from '../../types/response-from-server/repositories';

// styles;
import './repository-item.scss';

export const RepositoryItem = (props: RepositoriesUiType) => {
  const { name, language, description, htmlUrl, update } = props;

  return (
    <li className='repository-item'>
      <a href={htmlUrl} className='repository-item__link' target='__blank'>
        {name}
      </a>
      <p className='repository-item__language'>
        {language || `The language is not specified`}
      </p>
      <p className='repository-item__description'>{description}</p>
      <p className='repository-item__update'>
        Update:
        {update ? new Date(update).toLocaleDateString() : `The date is unknown`}
      </p>
    </li>
  );
};
