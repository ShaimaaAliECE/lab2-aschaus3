import React from 'react'; 
import './App.css';

let count = 0; //Needed this to be global

export default class App extends React.Component
{
  state = {
    rows: 6,
    columns: 7,
    moves: [], //Starts the game with an empty board
    playerTurn: 'red',
  };

  resetBoard = () => {
    this.setState({ moves: [], winner: null, draw: false }) //Resets the board to empty and resets the winner
    count = 0;
  }

  getPeice = (x,y) => { //Checks if there a square has a peice in it
    const list = this.state.moves.filter((item) => {
      return (item.x === x && item.y === y);
    });

    return list[0];
  }

  checkForWin = (x,y, player) =>  //Functions checks for a winner by checking every time a move is made, it checks if the same colour is on either side or above or below
  {
    let winnigMoves = [{ x, y }];
    for(let column = x+1; column < x+4; column++) //Checks the 3 spaces to the right 
    {
      const checkPeice = this.getPeice(column, y);
      if(checkPeice && checkPeice.player === player){
        winnigMoves.push({x: column, y: y});
      }
      else{
        break;
      } 
    }

    for(let column = x-1; column > x-4; column--)//Checks the 3 spaces to the left
    {
      const checkPeice = this.getPeice(column, y);
      if(checkPeice && checkPeice.player === player){
        winnigMoves.push({x: column, y: y});
      }
      else{
        break;
      } 
    }

    if(winnigMoves.length > 3) //Checks if there is a winner to the right or left
    {
      this.setState({winner: player, winnigMoves});
    }

    winnigMoves = [{ x, y }];
    for(let row = y+1; row < y+4; row++) //Checks the 3 spaces above
    {
      const checkPeice = this.getPeice(x, row);
      if(checkPeice && checkPeice.player === player){
        winnigMoves.push({x: x, y: row});
      }
      else{
        break;
      } 
    }

    for(let row = y-1; row > y-4; row--) //Checks the 3 spaces below
    {
      const checkPeice = this.getPeice(x, row);
      if(checkPeice && checkPeice.player === player){
        winnigMoves.push({x: x, y: row});
      }
      else{
        break;
      } 
    }

    if(winnigMoves.length > 3)
    {
      this.setState({winner: player, winnigMoves});
    }
 
  }

  addMove = (x, y) => { //This adds red or yellow to an empty button

    const { playerTurn } = this.state;
    const nextPlayerTurn = playerTurn === 'red' ? 'yellow' : 'red'; //Switches player turn between red and yellow
    let availableYPosition = null;
    for(let position = this.state.rows-1; position >= 0; position--) //Finds the lowest avalible postion in the clicked on column
    {
      if(!this.getPeice(x, position))
      {
        availableYPosition = position;
        break;
      }
    }

    if(availableYPosition !== null) //If there is an open position in the clicked on column
    {
      this.setState({ moves: this.state.moves.concat({x, y: availableYPosition, player: playerTurn}), playerTurn: nextPlayerTurn}, () => this.checkForWin(x,availableYPosition,playerTurn)); //Adds a move to our state and changes player turn to the next player
      count++; //Used to determine when theres a draw, addes one every time a peice is placed
    }

    if(count === 42) //Sets the state of draw to true
    {
      this.setState({draw: true});
    }
  }

  renderBoard() //Builds the board 
  {
    const { rows, columns, winner, draw} = this.state;
    const rowsViews = [];

    for(let row = 0; row < this.state.rows; row += 1) //Loop that will go up to 6
    {
      const columnViews = [];
      for(let column = 0; column < this.state.columns; column += 1) //Loop that will go up to 7
      {
        const piece = this.getPeice(column, row);
        columnViews.push( //Setting the columns
          <div onClick={() => {this.addMove(column, row)}} style={{width: '8vw', height: '8vw', backgroundColor: 'black', display: 'flex', padding: 5, cursor: 'pointer'}}> 
            <div style={{ borderRadius: '50%', display: 'flex', backgroundColor: 'white', flex: 1}}>
              {piece ? <div style={{ backgroundColor: piece.player, flex: 1, borderRadius: '50%', border: '1px solid #333'}}/> : undefined}
            </div>
          </div>
        );
      };
      rowsViews.push( //Setting the rows
        <div style={{ display: 'flex', flexDirection: 'row'}}>{columnViews} </div>
      );
    }
    return(
      <div style={{ backgroundColor: 'red' , display: 'flex', flexDirection: 'column'}} > 
          {winner && <div onClick={this.resetBoard} style={{position: 'absolute', zIndex: 3, left: 0, right: 0, bottom: 0, top: 0, backgroundColor: 'blue',
           justifyContent: 'center',display: 'flex', alignItems: 'center'}}>WIN!! click to reset</div>} 
           {draw && <div onClick={this.resetBoard} style={{position: 'absolute', zIndex: 3, left: 0, right: 0, bottom: 0, top: 0, backgroundColor: 'blue',
           justifyContent: 'center',display: 'flex', alignItems: 'center'}}>DRAW click to reset</div>}
          {rowsViews}
      </div>
  )
  } //Makes the winner or draw screen

  render(){
    const { style } = this.props;

    return(
      <div style = {style ? Object.assign({}, styles.container, style) : styles.container}> 
        {this.renderBoard()}
        <button onClick={this.resetBoard} style={{padding: 5}}>Clear Board</button> 
      </div>
    ); //Renders the board and the resetBoard button
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