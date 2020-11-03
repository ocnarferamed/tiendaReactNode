import React,{Component} from 'react';


export default class CatalogueNav extends Component{

  

 
    render() {
        return(
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light mt-5">
            <a className="navbar-brand" href="/">Catalogo de productos</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            
                <input className="form-control  col-3 offset-6" type="search" placeholder="Buscar producto" aria-label="Search"></input>
                
            
          </nav>
            
        );
    }
}