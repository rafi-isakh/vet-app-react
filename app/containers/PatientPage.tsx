import { connect } from 'react-redux';
import { counterStateType } from '../reducers/types';
import Patient from '../components/Patient';

function mapStateToProps(state: counterStateType) {
  return {
    drawer: state.drawer
  };
}

export default connect(mapStateToProps)(Patient);
