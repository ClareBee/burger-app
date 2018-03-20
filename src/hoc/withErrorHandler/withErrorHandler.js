import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {

  //anonymous class
  return class extends React.Component {
    state = {
      error: null
    }
    componentWillMount(){
      axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      axios.interceptors.response.use(null, error => {
        //error set by Firebase
        this.setState({error: error});
      });
    }
    errorConfirmedHandler = () => {
      this.setState({
        error: null
      });
    }
    render(){
      return (
      <Aux>
        <Modal
          show={this.state.error}
          modalClosed={this.errorConfirmedHandler}>
          {this.state.error ? this.state.error.message : null}
        </Modal>
        <WrappedComponent {...this.props} />
      </Aux>
      );
    }
  }
}

export default withErrorHandler;
