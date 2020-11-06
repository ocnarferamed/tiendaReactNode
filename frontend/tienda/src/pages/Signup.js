import React,{Component} from 'react';
import axios from 'axios';


const baseUrl = 'http://localhost:3001/api/users/signup';


export default class Signup extends Component{

    state={
        form:{
            email: '',
            password: ''
        }
    }

    handleChange= async e=>{
      await  this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }


    registrarme = async()=>{
        await axios.post(baseUrl, {email: this.state.form.email, password: this.state.form.password})        
        .then(response=> {
            if(response!==""){
                
                window.location.href = './';
            }else{
                alert('Error al registrar usuario');
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }



   
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                <div className="col-4 offset-4">
                        <form>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Direccion de correo</label>
                            <input type="email" className="form-control" id="exampleInputEmail1"  name='email' placeholder="Ingresar mail" onChange={this.handleChange}></input>
                            
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Contraseña</label>
                            <input type="password" className="form-control" name='password' id="exampleInputPassword1" placeholder="Contraseña" onChange={this.handleChange}></input>
                        </div>
                        
                        <button type="submit" className="btn btn-primary " onClick={this.registrarme}>Registrarme</button>
                    </form>

                  </div>
                </div>
            </div>
        );
    }
}