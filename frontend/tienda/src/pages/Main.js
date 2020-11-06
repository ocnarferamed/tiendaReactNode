import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Main.css';
import NavBar from './NavBar';
import Images from './imgSources';
import CatalogueNav from './CatalogueNav';


const cookies = new Cookies();
const urlBase = 'http://localhost:3001/api/products/all';
var cart = [];


export default class Main extends Component {

   constructor(props){
       super(props)
       
        this.state = {

            products:[],
            chip:0,
            onCart: [],
            search:""
            
        }   

        this.handleSearch = this.handleSearch.bind(this)
    }
     
     

    setImg(name){
        for (let index = 0; index < Images.length; index++) {
            if (Images[index].name === name) {
                name = Images[index].img;
                return name;
            }
        }
    }
    
    cerrarSesion(){
        cookies.remove('loggedUser', {path:"/"});
        window.location.href = "./";
    }


    componentDidMount(){
        if(!cookies.get('loggedUser')){
            window.location.href = "./";
        }
        axios.get(urlBase)
        .then(response=>{
           this.setState({ products : response.data})
           
        })
        .catch(err=> console.log(err))
    }

updateCantidad(event){
event.preventDefault()
    let productOnCart={
        name:event.target.name,
        quantity:event.target.value,
        buy: false,
        id: event.target.id
    }
    
    if(cart.length===0){
        cart.push(productOnCart);
    }else{
        for(let i=0;i<cart.length;i++){
            if(cart[i].name === productOnCart.name){
                cart[i].quantity= productOnCart.quantity;
                
                return;
            }                
            
        }
        cart.push(productOnCart);
    }
    
}


addToCart(prod){    
    
    
    this.setState({
        chip: cart.length   
        
    });
    for(let i = 0; i<cart.length;i++){
        if(cart[i].name === prod.name){
            cart[i].buy = true
           
        }
    }
    
    this.setState({
        onCart: cart
    })
    console.log(this.state.onCart)
}





handleSearch = (e)=>{
    this.setState({ search: e.target.value})
  }


render(){


    const resultProducts =[];
    for( let product of this.state.products){
      if(product.name.indexOf(this.state.search) !== -1){
        resultProducts.push(product);
      }
    }
   


   const styleImg = {
       width:'20rem',
       height:'13rem'
   }
   const a = true
    return(
        <div className="container-fluid mainContainer">
        <div className="container">
        
            <NavBar chip={this.state.chip} cart={JSON.stringify(this.state.onCart)} />
                       
            <CatalogueNav  handleSearch={this.handleSearch}/>
            <div className="row">
                
                
                {resultProducts.map((prod)=>(
                    <div   className="col-4">
                        <div className="card mt-3 ml-4 " style={{width: '18rem'}}>
                        <img className="card-img-top img-fluid" style={styleImg} src={this.setImg(prod.name)} alt="producto"></img>
                        <div className="card-body">
                        <h5 className="card-title" >{prod.name}</h5>
                        <p className="card-text"><strong>Precio: </strong>{prod.price}</p>
                        <p className="card-text"><strong>Unidades Disponibles: </strong>{prod.stock}</p>              
                        <a type="button"  href={"/details/"+prod._id} className="btn btn-primary" >
                        Ver mas
                        </a>

                        <button type="button"  onClick={()=>this.addToCart(prod)} className=" ml-2 btn btn-warning" >Agregar</button> 
                            <input type="number" id={prod._id}  price={prod.price} name={prod.name} onChange={this.updateCantidad.bind(this)} className="ml-1"  style={{width:'3.5rem'}}  min="0" max={prod.stock} />
                        </div>
                        </div>
                        </div> ))}
                </div>               
            
            </div>        
        </div>
    );
}
}