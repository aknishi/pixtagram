import { connect } from 'react-redux';
import Posts from './posts';

const matchStateToProps = ( state ) => ({
  state
});

const matchDispatchToProps = dispatch => ({

})

export default connect(
  matchStateToProps,
  null
)(Posts);
