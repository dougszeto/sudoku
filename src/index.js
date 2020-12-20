import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <input className="square" maxLength="1"></input>
        )
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={i}/>;
    }

    renderRow(rowNum) {
        let currentVal = rowNum * 9;
        let row = Array(9);
        for(let i=0; i<9; i++) {
            
            row[i] = <td>{this.renderSquare(currentVal)}</td>
            currentVal++;
        }

        return(<tr>{row}</tr>);

    }
    render() {
        return (
            <div>
                <div className="status">Status</div>
                <br />

                <table>
                    {this.renderRow(0)}
                    {this.renderRow(1)}
                    {this.renderRow(2)}
                    {this.renderRow(3)}
                    {this.renderRow(4)}
                    {this.renderRow(5)}
                    {this.renderRow(6)}
                    {this.renderRow(7)}
                    {this.renderRow(8)}

                </table>
                {/* <div className="row">{this.renderRow(0)}</div>
                <div className="row">{this.renderRow(1)}</div>
                <div className="row">{this.renderRow(2)}</div>
                <div className="row">{this.renderRow(3)}</div>
                <div className="row">{this.renderRow(4)}</div>
                <div className="row">{this.renderRow(5)}</div>
                <div className="row">{this.renderRow(6)}</div>
                <div className="row">{this.renderRow(7)}</div>
                <div className="row">{this.renderRow(8)}</div> */}
            </div>
        )
    }
}

ReactDOM.render(<Board />, document.getElementById('root'));