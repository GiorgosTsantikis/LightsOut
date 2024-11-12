import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

static defaultProps={
    nrows:6,
    ncols:6,
    chanceLightsStartsOn:0.2
};

  constructor(props) {
    super(props);
    let x=[];
    for(let i=0;i<this.props.nrows;i++){
        x[i]=Array(this.props.ncols);
        for(let j=0;j<this.props.ncols;j++){
            x[i][j]=Math.random()<=this.props.chanceLightsStartsOn
            ?true:false;            
        }
    }
    this.state={lights:x,hasWon:false}
    this.flipCellsAround=this.flipCellsAround.bind(this);
    

    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    return this.state.lights;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(x,y) {
    let {ncols,nrows}=this.props;
   
    let board = this.state.board;
    //let [y, x] = coord.split("-").map(Number);
    let n=this.state.lights.map(x=>x);
    n[x][y]=!this.state.lights[x][y];


    if (x-1>=0)
        n[x-1][y]=!n[x-1][y];

    if (x+1<this.props.nrows)
        n[x+1][y]=!n[x+1][y];

    if (y-1>=0)
        n[x][y-1]=!n[x][y-1];

    if (y+1<this.props.ncols)
        n[x][y+1]=!n[x][y+1];


    let won=true;
    for(let i=0;i<this.props.nrows;i++){
        this.state.lights[i].forEach(x=>{
            if(x)
                won=false;
        })
    }
    console.log(won);
   

    this.setState({
        lights:n,
        hasWon:won

    })
    
    
    
    



    //function flipCell(y, x) {
      // if this coord is actually on board, flip it

      //if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
      //  board[y][x] = !board[y][x];
      //}
   // }

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won
    
  }


  /** Render game board or winning message. */

  withHtml(board){
    let x=[];
    
    for(let i=0;i<this.props.nrows;i++){
        x[i]=Array(this.props.ncols);
        x[i]=<tr>{[...board[i]]}</tr>
        
    }
    
    return x;
  }
  showGameBoard(){
    let htmlBoard=[];
    let text="";
    for(let i=0;i<this.props.nrows;i++){
        htmlBoard[i]=Array(this.props.ncols);
        for(let j=0;j<this.props.ncols;j++){
            htmlBoard[i][j]=<Cell isLit={
                //Math.random()<=this.props.chanceLightsStartsOn
                //?true:false
                this.state.lights[i][j]
            }flipCellsAroundMe={this.flipCellsAround}
            x={i}y={j}key={`${i},${j}`}/>;       
        }
    }
    const x=this.withHtml(htmlBoard);
    
    return x;
  }
  render() {
    return(

    <div>
        <div className="Board-title">
        <h1 className="neon-orange">{this.state.hasWon?"YOU WIN!!":""}</h1>
        <div className="neon-orange">Lights</div>
        <div className="neon-blue">out</div>
        </div>
        
      <table className="Board">
        <tbody>{this.showGameBoard()}</tbody>
        </table>
    </div>
    )

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board
    

    // TODO
  }
}


export default Board;
