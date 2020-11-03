import  React,{Component} from 'react';
import '../css/Login.css';
import  axios from 'axios';
import Cookies from 'universal-cookie';


const baseUrl = 'http://localhost:3001/api/users/login';
const cookies = new Cookies();

export default class Login extends Component{

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


    iniciarSesion = async()=>{
        if(this.state.form.email==="" || this.state.form.password === ""){
            alert('Por favor complete todos lo campos');
            return;
        }
        await axios.post(baseUrl,{params:{email: this.state.form.email, password: this.state.form.password}})
       
        .then(response=> {
            if(response!==""){
                cookies.set('loggedUser', this.state.form.email, {path:'/'});
                window.location.href = './main';
            }else{
                alert('Usuario o contraseña incorrectos');
            }
        })
        .catch(e=>{
            console.log(e);
        })
    }

    signup(){
        window.location.href = './signup';
    }

        componentDidMount(){
            if(cookies.get('loggedUser')){
                window.location.href = "./main";
            }
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
                        <div class="form-group">
                            <label for="exampleInputPassword1">Contraseña</label>
                            <input type="password" className="form-control" name='password' id="exampleInputPassword1" placeholder="Contraseña" onChange={this.handleChange}></input>
                        </div>
                        
                        <button type="submit" className="btn btn-primary " onClick={this.iniciarSesion}>Ingresar</button>
                        <button type="button" className="btn btn-warning ml-5" onClick={this.signup}>Registrarme</button>
                    </form>

                  </div>
                </div>
            </div>
            

        );
    }
}
