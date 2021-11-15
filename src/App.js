import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiEndpoint: 'https://jsonplaceholder.typicode.com/posts',
      posts: [],
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  // componentDidMount() {
  //   const promise = axios.get(this.state.apiEndpoint);
  //   promise.then((res) => {
  //     const posts = res.data;
  //     this.setState({ posts });
  //   });
  // }

  // handleAdd() {
  //   const item = { id: '', title: 'Lorem', body: 'Lorem ipsum' };
  //   const promise = axios.post(this.state.apiEndpoint, item);
  //   promise.then((res) => {
  //     const post = res.data;
  //     const posts = [post, ...this.state.posts];
  //     this.setState({ posts });
  //   });
  // }

  // handleUpdate(post) {
  //   post.title = 'Updated';
  //   const promise = axios.patch(`${this.state.apiEndpoint}/${post.id}`, post);
  //   promise.then((res) => {
  //     const posts = this.state.posts;
  //     const index = posts.indexOf(res.data);
  //     posts[index] = post;
  //     this.setState({ posts });
  //   });
  // }

  async componentDidMount() {
    const { data: posts } = await axios.get(this.state.apiEndpoint);
    this.setState({ posts });
  }

  async handleAdd() {
    const item = { id: '', title: 'Lorem', body: 'Lorem ipsum' };
    const { data: post } = await axios.post(this.state.apiEndpoint, item);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  }

  async handleUpdate(post) {
    post.title = 'UPDATED';
    await axios.patch(`${this.state.apiEndpoint}/${post.id}`, post);
    const posts = this.state.posts;
    const index = posts.indexOf(post);
    posts[index] = post;
    this.setState({ posts });
  }

  handleDelete(post) {
    console.log('Delete', post);
  }

  render() {
    return (
      <React.Fragment>
        <p className="fw-light text-end">Viewing {this.state.posts.length} entries</p>
        <button className="btn btn-primary mb-2" onClick={this.handleAdd}>
          Add Post
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th colSpan={2}>Handle Data</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button className="btn btn-secondary btn-sm" onClick={() => this.handleUpdate(post)}>
                    Update
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(post)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
