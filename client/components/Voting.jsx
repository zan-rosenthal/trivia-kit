import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Vote_Buttons from './Vote_Buttons';
import Winner from './Winner';

class Voting extends Component{
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render (){
    if(this.props.winner){
      return  <Winner ref="winner" winner={this.props.winner}/>
    }else{
      return <Vote {...this.props} />
    }
  }
}

export default Voting;
