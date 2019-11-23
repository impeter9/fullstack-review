import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      button: true,
    }
  }

  componentDidMount() {
    $.ajax({
      method: "GET",
      url: "/repos",
      success: function(res) {
        console.log('success get')
      },
      error: function(error) {
        console.log(error)
      }
    }).then((res) => {
      var newRes = res.slice();
      // newRes.sort((a, b) => (a.forks < b.forks) ? 1: -1);
      this.setState({
        repos: newRes
      })
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      method: "POST",
      url: "/repos",
      data: { username: term },
      success: function(res) {
        console.log('success post')
      },
      error: function(error) {
        console.log(error)
      }
    }).then((res)=> {
      console.log('haha')
      let button = this.state.button;
      this.setState({
        button: !button
      })
    })

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));