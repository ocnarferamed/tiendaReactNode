import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Main.css';
import NavBar from './NavBar';

const cookies = new Cookies();
const urlBase = 'http://localhost:3000/api/products/all';


export default class Main extends Component {
    state = {

        products:[]
    }    

    cerrarSesion(){
        cookies.remove('loggedUser', {path:"/"});
        window.location.href = "./";
    }

    componentWillMount(){
        axios.get(urlBase)
        .then(response=>{
           this.setState({ products : response.data})
           console.log(this.state.products)

        })
        .catch(err=> console.log(err))
    }


    componentDidMount(){
        if(!cookies.get('loggedUser')){
            window.location.href = "./";
        }
    }

render(){
    console.log(cookies.get('loggedUser'));
    return(
        <div className="container">
            <NavBar />
            
                {this.state.products.map((prod)=>(

                   <div className="card mt-3 ml-4 " style={{width: '18rem'}}>
                   <img className="card-img-top"  src="" alt="producto"></img>
                   <div className="card-body">
                     <h5 className="card-title" >{prod.name}</h5>
                     <p className="card-text"><strong>Precio: </strong>{prod.price}</p>
                     <p className="card-text"><strong>Unidades Disponibles: </strong>{prod.stock}</p>
                     
           
                    
                   <a type="button"  href="/" className="btn btn-primary" >
                     Ver mas
                   </a>
           
                 
                     <a  href="/" type="submit" className=" ml-2 btn btn-warning" >Agregar</a> 
                       <input type="number" className="ml-1"   id="cantidad"  name="cantidad" min="0" max={prod.stock} ></input>
                   </div>
                 </div>
                ))}
            
                    
        </div>
    );
}
}