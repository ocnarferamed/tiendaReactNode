import React,{Component} from 'react';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

export default class Main extends Component {

    cerrarSesion(){
        cookies.remove('loggedUser', {path:"/"});
        window.location.href = "./";
    }

    componentDidMount(){
        if(!cookies.get('loggedUser')){
            window.location.href = "./";
        }
    }

render(){
    console.log(cookies.get('loggedUser'));
    return(
        <div>
            Menu principal
            <button onClick={this.cerrarSesion}>Cerrar sesion</button>
            
        </div>
    );
}
}