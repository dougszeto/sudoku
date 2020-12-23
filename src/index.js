import React from 'react';
import ReactDOM from 'react-dom';
import games from './games';
import {validBoard, finishedBoard, solveBoard, gridify, degridify} from './utils';
import './index.css';

function Square(props){
    let value = props.value === 0 || props.value === '0' ? '' : props.value;
    return (
        <button
            disabled={!props.editable}
            className="square" 
            onClick={() => props.onClick() }
        >
            {value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        const rand = Math.floor(Math.random()*50);
        const squaresAsChar = Array.from(games[rand]);
        const squares = squaresAsChar.map( x => parseInt(x, 10));
        let editable = [];
        for(let i=0; i<squares.length; i++) {
            if(squares[i] === 0) editable.push(true);
            else editable.push(false);
        }
        
        this.state = {
            squares: squares,
            editable: editable,
            original: squares,
        }
    }

    renderSquare(i) {
        const value = this.state.squares[i];
        const editable = this.state.editable[i];
        return <Square value={value} editable={editable} onClick={() => this.handleClick(i)} />;
    }

    handleClick(i) {
        const newSquares = this.state.squares.slice();
        newSquares[i] = (newSquares[i] + 1) % 10;
        this.setState({
            squares: newSquares,
        })
        
    }

    renderRow(rowNum) {
        let location = rowNum * 9;
        let row = Array(9);
        for(let i=0; i<9; i++) {
            
            row[i] = <td key={location}>{this.renderSquare(location)}</td>
            location++;
        }

        return(<tr>{row}</tr>);

    }

    validate() {
        const valid = validBoard(this.state.squares);
        const finished = finishedBoard(this.state.squares);
        let message;
        if(valid && finished) message = "congratulations you WON!";
        else {
            const status = valid ? "VALID" : "INVALID";
            const fin = finished ? "COMPLETE" : "INCOMPLETE";
            message = `The current board is ${status} and is ${fin}`;
        }
 
        alert(message);
    }

    solve() {
        const squares = this.state.original.slice();
        let grid = gridify(squares);        
        solveBoard(grid);
        const newSquares = degridify(grid);
        this.setState({
            squares: newSquares,
        });
    }

    render() {
        return (
            <div className="board">
                <table>
                    <tbody>
                        {this.renderRow(0)}
                        {this.renderRow(1)}
                        {this.renderRow(2)}
                        {this.renderRow(3)}
                        {this.renderRow(4)}
                        {this.renderRow(5)}
                        {this.renderRow(6)}
                        {this.renderRow(7)}
                        {this.renderRow(8)}
                    </tbody>
                </table>
                <br></br>
                <button className="btn" onClick={() => this.validate()}> Validate </button>
                <button className="btn" onClick={() => this.solve()}> Solve </button>
            </div>
        )
    }
}

class Game extends React.Component {
    render() {
        return (
            <div>
                <center><h1>Sudoku</h1></center>
                
                <div className="parent">
                    <div className="box">
                        <h4>The Rules of Sudoku</h4>
                        <p>The rules of the game are simple: each of the nine blocks has to contain all the numbers 1-9 within its squares. Each number can only appear once in a row, column or box.</p>
                        <p>The difficulty lies in that each vertical nine-square column, or horizontal nine-square line across, within the larger square, must also contain the numbers 1-9, without repetition or omission.</p>
                        <p>Every puzzle has just one correct solution.</p>
                        <br></br>
                    </div>
                    <Board className="box" />
                    <div className="box">
                        <h4>How to play:</h4>
                        <ul>
                            <li>Click on a square to increase its value (grey numbers cannot be changed).</li>
                            <li>Try to fill the board based on the rules of the game!</li>
                            <li>Use the 'Validate' button to see if your moves are valid (no repeating numbers in a row, column, or subsquare).</li>
                            <li>Give up? Try the 'Solve' button to have the board solved for you.</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
// ---------------------------------------------------------------------------------------
ReactDOM.render(<Game />, document.getElementById('root'));

