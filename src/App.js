import React from 'react'; 
import './App.css';

export default class App extends React.Component
{
  state = {
    rows: 6,
    columns: 7,
  }


  
  renderBoard() //Builds the board
  {
    const { rows, columns } = this.state;
    const rowsViews = [];

    for(let row = 0; row < this.state.rows; row += 1) //Loop that will go up to 6
    {
      const columnViews = [];
      for(var column = 0; column < this.state.columns; column += 1) //Loop that will go up to 7
      {
        columnViews.push( //Setting the columns
          <div style={{width: 100, height: 100, backgroundColor: 'black', border: '1px solid white'}}> </div>)
      };
      rowsViews.push( //Setting the rows
        <div style={{ display: 'flex', flexDirection: 'row'}}>{columnViews} </div>
      );
    }
    return(
      <div style={{ backgroundColor: 'red' , display: 'flex', flexDirection: 'column'}} > 
          {rowsViews}
      </div>
  )
  } 

  render(){
    const { style } = this.props;

    return(
      <div style = {style ? Object.assign({}, styles.container, style) : styles.container}> 
        {this.renderBoard()}
      </div>
    );
  }
}

const styles = {
  container: {
    height: '100%',
    padding: 5,
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
  }
};