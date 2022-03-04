import React, { Component } from "react";
import axios from 'axios'
import Main from "./main";


const headerProps = {
    icon: 'users',
    title:'Usuários',
    subtitle: 'Cadastro de usuários: Listas, criar, alterar e excluir'
}

const baseUrl = 'http://localhost:3000/users'
const iniaState = {
    user:{ name:'', email:''},
    list:[]
}

export default class UserCrud extends Component{
    
    state = {...iniaState}

    componentWillMount(){
        axios(baseUrl).then(resp=> {
            this.setState({list:resp.data})
        })
    }

    clear(){
        this.setState({user:iniaState.user})
    }

    save(){
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url,user)
        .then(resp =>{
            const list = this.getUpdateList(resp.data)
            this.setState({user: iniaState.user, list})
        })
    }

    getUpdateList(user){
        const list = this.state.list.filter(u => u.id !== user.id)
        if(user) list.unshift(user)
        return list
    }
 
    updateField(event){
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({user})
    }

    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name" value={this.state.user.name}
                            onChange={e=> this.updateField(e)} placeholder="Digite o nome..."/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control" name="email" value={this.state.user.email }
                            onChange={e=> this.updateField(e)} placeholder="Digite o email..."/>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2"
                        onClick={e=> this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user){
        this.setState({user})

    }

    remover(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp=>{
            const list = this.getUpdateList(null)
            this.setState({list})
        })
    }

    renderTable (){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Nome
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return(
            this.state.list.map(user=>{
                return(
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <button className="btn btn-warning" onClick={()=>this.load(user)}>
                                <i className="fa fa-pencil"></i>    
                            </button>
                            <button className="btn btn-danger" onClick={()=>this.remove(user)}>
                                <i className="fa fa-trash"></i>    
                            </button>
                        </td>
                    </tr>
                )
            })
        )
    }
    render(){
        return(
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}