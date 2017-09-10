import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Root extends Component {
    static propTypes = {
      name: PropTypes.string,
    };

    static defaultProps = {
      name: 'Name',
    };

    render() {
      const { name } = this.props;
      return (
        <div>{`Hello  ${name}`}</div>
      );
    }
}

export default Root;
