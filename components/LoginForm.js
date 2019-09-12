import { loginUser } from '../lib/auth';
import Router from 'next/router';

class LoginForm extends React.Component {
  state = {
    email: 'Sincere@april.biz',
    password: 'hildegard.org',
    error: '',
    isLoading: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    const { email, password } = this.state;
    event.preventDefault();
    this.setState({ error: '', isLoading: true });
    loginUser(email, password)
      .then(() => {
        Router.push('/profile');
      })
      .catch(this.showError);
  };

  showError = err => {
    const error = (err.response && err.response.data) || err.message;
    this.setState({ error, isLoading: false });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <button disabled={this.state.isLoading} type="submit">
          {this.state.isLoading ? 'Sending' : 'Submit'}
        </button>
        {this.state.error && <div>{this.state.error}</div>}
      </form>
    );
  }
}

export default LoginForm;
