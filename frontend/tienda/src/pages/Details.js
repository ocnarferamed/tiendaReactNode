import React,{Component} from 'react';
import axios from 'axios';
import Images from './imgSources';

const urlBase = 'http://localhost:3001/api/products/all';


export default class Details extends Component{

    
    state ={
        products:[],
        prod:[]
    }

    

    componentDidMount(){
        
        const { id } = this.props.match.params;
        

        axios.get(urlBase)
        .then(response=>{
            this.setState({products:response.data});
            
            this.buscarProducto(id);
        })
        .catch(e=> console.log(e));
        
    }


    buscarProducto(id){
        this.setState({prod:this.state.products.filter(product=>product._id === id)});
        console.log(this.state.prod[0].name)
    }

    setImg(name){
        for (let index = 0; index < Images.length; index++) {
            if (Images[index].name === name) {
                name = Images[index].img;
                return name;
            }
        }
    }

    render(){
        return ( 
            
            <div>
                {this.state.prod.map((prod)=>(
                <div className="jumbotron">
                    <h1 className="display-4">{this.state.prod[0].name}</h1>
                    <p className="lead">Este producto ha sido obtenido bajo los mas altos estandares de calidad</p>
                    <img className="img- fluid" alt="imagen" src={this.setImg(this.state.prod[0].name)}></img>
                    <hr className="my-4"></hr>
                    <h4>Precio : {this.state.prod[0].price}</h4>
                    <h4>Unidades disponibles : {this.state.prod[0].stock}</h4>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" href="/main" role="button">Cerrar</a>
                    </p>
                </div>
                ))}
            </div>
        );
    }
}