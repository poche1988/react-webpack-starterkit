import React, { Component } from 'react';
import { getPlayers } from '../services/fakePlayersService'
import Pagination from '../Common/Pagination';

class Players extends Component {
    state = {
        players: getPlayers(),
        pageSize: 4,
        currentPage: 1
    }

    handleDelete = (player) => {
        const players = this.state.players.filter(p => p.id !== player.id);
        this.setState({ players })
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });
    }

    render() {
        const { length : count } = this.state.players;
        const { pageSize, currentPage } = this.state;

        if (count === 0)
            return <p>No hay jugadores</p>;
        
        return (
            <React.Fragment>
                <p>jugadores: { count }</p>
                <table className = "table">   
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Equipo</th>
                            <th>Posición</th>
                            <th>Altura</th>
                            <th>Fecha</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.players.map(player =>(
                        <tr key={player.id}>
                            <td> { player.name } </td>
                            <td> { player.team.name } </td>
                            <td> { player.position }</td>
                            <td> { player.height }</td>
                            <td> { player.birthDate }</td>
                            <td><button onClick={() => this.handleDelete(player)} className="btn btn-danger btn-sm">Delete</button></td>
                        </tr>
                        ))}
                    </tbody>
                </table>  
                <Pagination itemsCount={count} 
                pageSize={pageSize} 
                currentPage = {currentPage}
                onPageChange={this.handlePageChange}
                />
            </React.Fragment>
            
        )
    }
}

export default Players