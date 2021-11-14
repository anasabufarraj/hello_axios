import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      URL: 'https://jsonplaceholder.typicode.com/posts',
      posts: [],
    };

    this.handleAdd = this.handleAdd.bind(this);
  }

  async componentDidMount() {
    const promise = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = promise.data;

    this.setState({ posts });
  }

  async handleAdd() {
    const item = { id: '', title: 'New', body: 'Lorem ipsum' };
    const promise = await axios.post(this.state.URL, item);
    const post = promise.data;

    const posts = [post, ...this.state.posts]; // TODO: Add at the beginning of the list
    this.setState({ posts });
  }

  handleUpdate(post) {
    console.log('Update', post);
  }

  handleDelete(post) {
    console.log('Delete', post);
  }

  render() {
    return (
      <React.Fragment>
        <p className="fw-light text-end">Viewing {this.state.posts.length} Entries</p>
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
