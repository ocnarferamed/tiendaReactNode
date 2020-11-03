import React,{Component} from 'react';
import axios from 'axios';
import Images from './imgSources';

 const urlBase = 'http://localhost:3001/api/products/all';
const urlUpdate = 'http://localhost:3001/api/products/update/';

export default class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {
            products:[],
            total: 0
        }
    }

    
    componentWillMount(){
        
        
    }
    

    componentDidMount(){  
        const {cart} = this.props.match.params; 
        const cartFinal = JSON.parse(cart);
        
       
        axios.get(urlBase)
        .then(response=>{
            let resp = response.data;
            for( let i=0;i<cartFinal.length;i++){
                for(let j =0;j<resp.length;j++){
                    if(resp[j]._id===cartFinal[i].id && cartFinal[i].buy===true){
                        resp[j].stock= [resp[j].stock , cartFinal[i].quantity];
                        resp[j].img = 'flag';
                    }
                }
                
            }
            for(let i =0; i<cart.length;i++){
                for(let i =0; i<resp.length;i++){
                if(resp[i].img!==`flag`){
                     resp.splice(i,1);
                }
            }
        }
            
           this.setState({ products : resp})
           this.calculate(resp)
           
        })
        .catch(err=> console.log(err))
    }


   

    setImg(name){
        for (let index = 0; index < Images.length; index++) {
            if (Images[index].name === name) {
                name = Images[index].img;
                return name;
            }
        }
    }


    calculate(resp){
        for (let index = 0; index < resp.length; index++) {
            this.setState({
                total: this.state.total+(resp[index].price* resp[index].stock[1])
            })
            
        }
    }


updateStock(){
    
        for (let i = 0; i < this.state.products.length; i++) {
            let stock = this.state.products[i].stock[0]-this.state.products[i].stock[1];
            axios.put(urlUpdate+this.state.products[i]._id,{stock:stock})
            .then(res=> console.log(res))
            .catch(e=>console.log(e))
            
        }
    
}


    render(){
        const styleImg = {
            width:'10rem',
            height:'8rem'
        }
        return ( 
            
            <div className="row">
                {this.state.products.map((prod)=>(
               <div className="col-6  mt-5 offset-1">
               <div className="card "  >
                   <ul className="list-group list-group-flush">
                   <li className="list-group-item">
                       <img src={this.setImg(prod.name)} style={styleImg}  alt=" productIMG"className="img-fluid img-thumbnail" />  
                   <strong className="ml-2 mr-4">{prod.name}</strong>
                   <span className="mt-3">precio: $ {prod.price}</span>
                   <span className="ml-3">cantidad: {prod.stock[1]}</span> 
                   <span className="subtotal ml-3">subtotal: $ {prod.price*prod.stock[1]}</span>
                   </li>
                   </ul>
               </div>
           </div>
           
               ))}

                <div className="col-4 mt-5 offset-1">
                    <div className="card  " style={{width: '12rem'}}>
                        <div className="card-body">
                        <h5 className="card-title">Total</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{this.state.total}</h6>
                        <a type="button"  onClick={this.updateStock()} href="/main"className="btn btn-primary" >
                            Comprar
                        </a>
                        </div>
                    </div>
                    </div>
            </div>
            
            
        );
    }
}