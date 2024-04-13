import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Stars() {
  return (
    <span>
      <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
      <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
      <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
      <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
      <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
    </span>
  );
}
