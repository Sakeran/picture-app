import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Flash.css';

const FlashMessage = ({message, type, removeFn}) => (
  <li className={`Flash-item Flash-${type}`}>
    <span>{message}</span>
    <button className="Flash-remove-btn"
    onClick={removeFn}>
    (dismiss)
    </button>
  </li>
)

class Flash extends React.Component {

mapErrors(type) {
  return this.props[type].map(e => (
          <FlashMessage key={e}
                        type={type}
                        message={e}
                        removeFn={() => this.props.removeMsg(type, e)} />));
}

render() {
  const errorCount = this.props.error.length
                     + this.props.info.length
                     + this.props.success.length;

  return (!!errorCount &&
  (
    <div className="Flash">
      <ul className="Flash-list">
        {this.mapErrors('success')}
        {this.mapErrors('error')}
        {this.mapErrors('info')}
      </ul>
      {errorCount > 1 && (
        <div className="full-width centered">
        <button className="Flash-remove-btn"
        onClick={this.props.clearAll}>
        (dismiss all)
        </button>
        </div>
      )}
    </div>
  ));
}

};

Flash.propTypes = {
  error: PropTypes.array,
  info: PropTypes.array,
  success: PropTypes.array,
  removeMsg: PropTypes.func
};

const mapStateToProps = (state) => ({
  error: state.flash.error,
  info: state.flash.info,
  success: state.flash.success
});

const mapDispatchToProps = (dispatch) => ({
  removeMsg: (category, message) => dispatch({
    type:'CLEAR_FLASH_MESSAGE',
    category,
    message}),
  clearAll: () => dispatch({type: 'CLEAR_ALL_FLASH'})
});

export { Flash };
export default connect(mapStateToProps, mapDispatchToProps)(Flash);
