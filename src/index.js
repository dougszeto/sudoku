import React from 'react';
import ReactDOM from 'react-dom';
import games from './games';
import {verifyWin, gridify} from './utils';
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
    render() {
        return (
            <div>
                <h1>SUDOKU!</h1>
                <br />

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
            </div>
        )
    }
}
// ---------------------------------------------------------------------------------------
ReactDOM.render(<center><Board /></center>, document.getElementById('root'));

