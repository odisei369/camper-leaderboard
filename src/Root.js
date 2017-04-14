import React, { Component } from 'react';
import './style.css';

class Root extends React.Component
{
     handleSortClick(newSortBy) {
         this.getData("https://fcctop100.herokuapp.com/api/fccusers/top/" + newSortBy);
     }
    getData(url) {
        const request = new Request(url, {
            method: 'GET'});

        fetch(request).then(function (response) {
            return response.json();
        }).then(function (data) {
            this.setState({users: data});
            return data;
        }.bind(this));

    }

    constructor (props) {
        super(props);
        this.handleSortClick = this.handleSortClick.bind(this);
        this.state = {users: []}
    }
    componentDidMount(){
        this.getData("https://fcctop100.herokuapp.com/api/fccusers/top/" + "recent");
    }

    render(){
        return (<div className="root">
            <Header handleClick = {this.handleSortClick}/>
            <Table users = {this.state.users}/>
        </div>)
    }
}
class Table extends React.Component{
    constructor(props){
        super(props);
        console.log( "aaa");
        console.log(props);
    }
    render(){
        var count = 1;
        let rows = this.props.users.map(function (user) {
            return <User user={user} key={user.username} count={count++}/>
        });
        console.log(rows);
        return <div className="table">{rows}</div>
    }
}


class User extends React.Component{
    render(){
        return (<div className="user row">
            <div className="col-xs-1">{this.props.count}</div>
            <UserInfo user = {this.props.user} />
            <div className="col-xs-3">{this.props.user.recent}</div>
            <div className="col-xs-3">{this.props.user.alltime}</div>
        </div>)
    }
}

class Header extends React.Component{
    handleClick(e){
        this.props.handleClick(e.target.id);
        document.querySelector(".dashed").classList.remove("dashed");
        e.target.classList.add("dashed");
        console.log(e.target);

    }
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        return (<div className="header row">
            <div className="col-xs-1">#</div>
            <div className="col-xs-5">username</div>
            <div className="col-xs-3 dashed" id="recent" onClick={this.handleClick}>in the last 30 days</div>
            <div className="col-xs-3" id="alltime" onClick={this.handleClick}>in all time</div>
        </div>)
    }

}
class UserInfo extends React.Component
{
    render(){
        return (<div className="col-xs-5 userInfo">
            <img src={this.props.user.img} alt={this.props.user.img}></img>
            {this.props.user.username}
        </div> )
    }
}

export default Root;