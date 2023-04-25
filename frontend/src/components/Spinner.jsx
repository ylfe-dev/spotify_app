import './Spinner.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

function Spinner() {
  return (
    <div className="app-spinner">
      <FontAwesomeIcon icon={faCircleNotch}/>
    </div>
  );
}

export default Spinner;
