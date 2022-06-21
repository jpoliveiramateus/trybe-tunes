import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <span
        style={ { color: 'white',
          textAlign: 'center' } }
      >
        Carregando...

      </span>
    );
  }
}

export default Loading;
