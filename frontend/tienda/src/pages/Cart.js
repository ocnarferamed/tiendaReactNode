import React,{Component} from 'react';
import axios from 'axios';
import Images from './imgSources';

 const urlBase = 'http://localhost:3001/api/products/all';


export default class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {
            products:[]
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
                        resp[j].stock= resp[j].stock - cartFinal[i].quantity;
                        resp[j].img = 'flag';
                    }
                }
                
            }
            for(let i =0; i<cart.length;i++){
                for(let i =0; i<resp.length;i++){
                if(resp[i].img!=='flag'){
                     resp.splice(i,1);
                }
            }
        }
            console.log(resp)
           this.setState({ products : resp})
           
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

    render(){
        return ( 
            
            <div>
                {this.state.products.map((prod)=>(
               <h1> {prod.name}</h1>
               ))}
            </div>
            
            
        );
    }
}