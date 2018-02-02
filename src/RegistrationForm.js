import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './RegistrationForm.css';
import Post from './Post';

class RegistrationForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          email: '',
          phoneNumber: '',
          password: '',
          confPassword: '',
          fieldValidationErrorClass: {'email': '', 'phoneNumber': '', 'password': '', 'confPassword': ''},
          formValid: {'hasError': true, 'Message': ''},
          post: {},
          isLoading: true
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({[name]: value}, () => { this.validateField(name, value) } );
    }
  
    handleSubmit(event) {
      
        let hasError = false, Message = '';


        if( this.state.fieldValidationErrorClass.email            === ''
            &&  this.state.fieldValidationErrorClass.phoneNumber  === ''
            &&  this.state.fieldValidationErrorClass.password     === ''
            &&  this.state.fieldValidationErrorClass.confPassword === ''){

            hasError = false;
            Message = 'Congrats, we have received your data!';
        }
        else{
            hasError = true;
            Message = "Sorry, please check the your input again...";
        }

        this.setState({
            formValid: {'hasError': hasError, 'Message': Message}
        });

        event.preventDefault();
    }

    errorClass(error) {
        return(error === '' ? '' : 'has-error');
     }

    // This function validates for errors in the input. 
    validateField(fieldName, value) {
        this.setState({formValid: ''});
        let fieldValidationErrorClass = this.state.fieldValidationErrorClass;

        switch(fieldName) { 
        case 'email':
            let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrorClass.email = emailValid ? '' : ' is not invalid';
            break;
        case 'password':
            let passwordValid = value.match(/([0-9])/) && value.match(/([a-z])/);
            console.log(passwordValid);
            fieldValidationErrorClass.password = passwordValid ? '': ' is not valid';
            break;
        case 'confPassword':
            fieldValidationErrorClass.confPassword = (this.state.password == value) ? '': ' password do not match';
            break;
        default:
            break;
        }
        console.log(fieldValidationErrorClass.confPassword);
        this.setState({
            fieldValidationErrorClass: {
                'email': fieldValidationErrorClass.email, 
                'phoneNumber': fieldValidationErrorClass.phoneNumber, 
                'password': fieldValidationErrorClass.password,
                'confPassword': fieldValidationErrorClass.confPassword
            }
        });
    }

    componentDidMount(){
       
        fetch('https://jsonplaceholder.typicode.com/posts/1')
             .then(response => response.json())
             .then(json => {
                 this.setState({post: json, isLoading: false})
                 console.log(this.state.post); 
             })
    }

    isLoading() {
        if( this.state.isLoading ){
            return <p><br />Loading post, please wait...</p>;
        }
    }
  
    render() {
      return (
        <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Register to see more</h1>
            </header>
            <div className="App-intro">
              <FormMessage form={this.state.formValid}/>
              <div className="container">
                <form onSubmit={this.handleSubmit}>
                 <div>
                    <input type="email" name="email" value={this.state.email} 
                           onChange={this.handleChange} placeholder="Email" 
                           className={this.errorClass(this.state.fieldValidationErrorClass.email)} required
                    />                                                  
                    <input type="text" name="phoneNumber" value={this.state.phoneNumber} 
                           onChange={this.handleChange} placeholder="phone number (optional)" 
                           className={this.errorClass(this.state.fieldValidationErrorClass.phoneNumber)}
                    />
                 </div>

                  <div>
                    <input type="password" name="password" value={this.state.password} 
                           onChange={this.handleChange} placeholder="password" 
                           className={this.errorClass(this.state.fieldValidationErrorClass.password)} required
                    />
                    <input type="password" name="confPassword" value={this.state.confPassword} 
                           onChange={this.handleChange} placeholder="comfirm password" 
                           className={this.errorClass(this.state.fieldValidationErrorClass.confPassword)} required
                    />
                  </div>
                    
                    <br />
                    <input type="submit" value="Submit" />
                </form>
             </div>

             <section className="wrapper">
                <Post post={this.state.post}/>  
                <Post post={this.state.post}/>
                <Post post={this.state.post}/>
                <Post post={this.state.post}/>
                <Post post={this.state.post}/>
                <Post post={this.state.post}/>
                <Post post={this.state.post}/>
                <Post post={this.state.post}/>
             </section>

            </div>
        </div>
      );
    }
  }

  function FormMessage(props) {

    let errorClass = props.form.hasError ? 'error' : 'success';

    return (
        <div className="info">
           <span className={errorClass}>{props.form.Message}</span>
        </div>
    );
  }

export default RegistrationForm;