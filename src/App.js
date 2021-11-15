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
    this.handleDelete = this.handleDelete.bind(this);
  }

  // DOC: List of Axios promise/then methods
  // componentDidMount() {
  //   const promise = axios.get(this.state.apiEndpoint);
  //   promise.then((res) => {
  //     const posts = res.data;
  //     this.setState({ posts });
  //   });
  // }
  //
  // handleAdd() {
  //   const item = { id: '', title: 'Lorem', body: 'Lorem ipsum' };
  //   const promise = axios.post(this.state.apiEndpoint, item);
  //   promise.then((res) => {
  //     const post = res.data;
  //     const posts = [post, ...this.state.posts];
  //     this.setState({ posts });
  //   });
  // }
  //
  // handleUpdate(post) {
  //   post.title = 'Updated';
  //   const promise = axios.patch(`${this.state.apiEndpoint}/${post.id}`, post);
  //   promise.then(() => {
  //     const posts = this.state.posts;
  //     const index = posts.indexOf(post);
  //     posts[index] = post;
  //     this.setState({ posts });
  //   });
  // }
  //
  //
  // handleDelete(post) {
  //   const promise = axios.delete(`${this.state.apiEndpoint}/${post.id}`);
  //   promise.then(() => {
  //     const posts = this.state.posts.filter((_p) => _p.id !== post.id);
  //     this.setState({ posts });
  //   });
  // }

  async componentDidMount() {
    // DOC: Read data form the API endpoint and update the view
    const { data: posts } = await axios.get(this.state.apiEndpoint);
    this.setState({ posts });
  }

  async handleAdd() {
    // DOC: Create a post on the endpoint, then update the view
    const item = { title: 'Lorem', body: 'Lorem ipsum' };
    const { data: post } = await axios.post(this.state.apiEndpoint, item);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  }

  async handleUpdate(post) {
    // DOC: Update a post on the endpoint, then update the view
    post.title = 'UPDATED';
    await axios.patch(`${this.state.apiEndpoint}/${post.id}`, post);

    const posts = this.state.posts;
    const index = this.state.posts.indexOf(post);
    posts[index] = post;
    this.setState({ posts });
  }

  async handleDelete(post) {
    // DOC: Optimistically deletes an item. Then try a DELETE request, if failed, reverts the state.
    const posts = this.state.posts.filter((_p) => _p.id !== post.id);
    this.setState({ posts });

    const revert = this.state.posts;

    try {
      await axios.delete(`${this.state.apiEndpoint}/${post.id}`);
      console.info('Operation succeeded');
    } catch (err) {
      this.setState({ posts: revert });
      console.error('Operation failed');
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="row align-items-end">
          <div className="col">
            <button className="btn btn-primary mb-2" onClick={this.handleAdd}>
              Add Post
            </button>
          </div>
          <div className="col">
            <p className="fw-light text-end">Viewing {this.state.posts.length} entries</p>
          </div>
        </div>
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
