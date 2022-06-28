# React 

In this document we will have a synthese of new features of modern javascript crash course exposed in pluralsight course React: getting started

# React class based component
##### Defining components tree:
The point to start with in a react application or view, we need to detect our components, this can change with time.

### Creating an app using class components
##### 1. Class syntax for components:
To define a class for a component, we define a simple class, and then we extend React.Component class, this extending makes the app a java script class and a react component. Class components map data to view, the two main concepts to do so are constructor and this keyword.
A class compoent also needs a render function, this render function returns the virtual dom description of the component.
When we define a class component, we will be creating instances of them, and each instance gets its properties and state.

```js
class Card extends React.Component {
	render() {
  	return (
    	<div className="github-profile">
    	  <img src="https://placehold.it/75" />
        <div className="info">
          <div className="name">Name here...</div>
          <div className="company">Company here...</div>
        </div>
    	</div>
    );
  }
}

class App extends React.Component {
	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <Card />
    	</div>
    );
  }	
}

ReactDOM.render(
	<App title="The GitHub Cards App" />,
  mountNode,
);
```
##### 2. JavaScript styles:
React gives a powerful way to inject styles in its components, the standard way to style our components is to have a css file to define the style of each of our css classes, but we also can style our components using the style property.
style={{font-wight: 'bold'}}, the first {} are a jsx dynamique syntax for a dynamique value, and the nested {} are to define an object literal.
Javascript styles are excelent for conditional styling, so using a mix between javascript styles and css files is okay.


```js
class ConditionalStyle extends React.Component {
	render() {
  	return (
    	<div style={{ color: Math.random() < 0.5 ? 'green': 'red' }}>
    	  How do you like this?
    	</div>
    );
  }	
}

ReactDOM.render(
	<ConditionalStyle />,
  mountNode,
);
```
##### 3. Working with data:
Reacts gives us the possibility to pass data to components through properties, in the following example we will display a list of cards, to do so, we define a new component called CardList, that will display our cards. We will also be using an array of testData, that will contain objects with properties.

```diff
- We can add send data to a component like so <Component {...dataObjectInstance} /> this will send the whole data object instance as a parameter, and can be accessed using the key word this.props, if our Component is a class, or by simply using the key word props.
- We can also set a specific property directly when displaying a component, by setting the value of the property like so: <Component name="ADI" />, and this property will by accessed by this.props.name if we are in a class component, or props.name if we are in a function component.

```

```js
	const testData = [
			{name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
      {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  		{name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
	];


const CardList = (props) => {
  return (
  <div>
    <Card {...testData[0]}/>
    <Card {...testData[1]}/>
  </div>
)
};

class Card extends React.Component {
	render() {
    const profile = this.props;
  	return (
    	<div className="github-profile">
    	  <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name} here...</div>
          <div className="company">{profile.company}</div>
        </div>
    	</div>
    );
  }
}

class App extends React.Component {
	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <CardList />
    	</div>
    );
  }	
}

ReactDOM.render(
	<App title="The GitHub Cards App" />,
  mountNode,
);
```

The last example, displays the cards as we want, but the problem is that we need to give the displayed property for each card component manually, so the thing to do here is to map the dataList into card elements. To do so, given the array of data testData, we will modify our CardList component to map the data array to Card components like this :

```js
const CardList = (props) => {
  return (
  <div>
      {testData.map(profile => <Card {...profile}/>)}
  </div>
)
//Since card is a class extending React.Component, each <Card /> is a React.createElement() calls. 
};
```

##### 4. Initializing and reading the state object:
In the example, we want to fetch the user to display its card, by adding new component with a form, an input and a button. The form component will be displayed by adding it to the App component, because its logic is different from the CardList component, and both components need to share the profiles data (we wont be using the static dataList from each component, we will set it in the parrent and send it to the child components), so the profiles data array needs to be passed to the App component state, so it can be accessed by its child compoenents.
Given a new Form component for our form, the modification to be made to the App component to add the testData list to its state are the followings :

```js
class App extends React.Component {
/*

  constructor(props){
    //this super method is the constructor of the react.Component class, so we start by giving the props to superClass constructor.
    super(props);
    //here we have access to the state of the component, unlike useState for function components, we use this.state
    //the state property has to be an object unlike useState that can take Strings or ints
    this.state= {
      profiles: testData
    }
  }
*/
//The following code is the replacement of the above, react uses babel to transcript the react code to js code
    state = {
      profiles: testData,
    };
	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <Form />
        <CardList profiles={this.state.profiles}/>
    	</div>
    );
  }	
}
```

##### 5. Taking input:
 * Reading inputs from the DOM using ref:
 In our form we will define the behavior of onSubmit the form, by preventing the default submit behavior (refresh the page), and getting the value from our input.
In react we can access html dom elements using the ref={} that gives each element a unique id, to do so we need to instanciate an object, and its value is the following:

const inputRef = React.createRef();
then our element will have it like so: <input ref={this.inputRef}>

```js
class Form extends React.Component{
  //We create a method to call onSubmit of the form
  //All the methods that are available on the native event object, are also available on this react event (that we can call whatever we want)
  handleSubmit= (event) => {
    //here we prevent the default submit behavior that will refresh our page
    event.preventDefault();
    console.log(this.userNameInput.current.value)
  }
userNameInput = React.createRef();
  render(){
    return (
    <form onSubmit={this.handleSubmit}>
        <input type="text" placeHolder="GitHub username" ref={this.userNameInput}/>
        <button> Add card </button>
        </form>
      )
  }
}
```
 * Reading inputs using react :
 This method is labeled as controlled components, and it has some advantages, because react will be managing our element, and will be aware of its state.
 ```js
 class Form extends React.Component{
  //we define a state object and in the state  object we define an element to handle the input field
  state = {
    userName:''
  };
  handleSubmit= (event) => {
    event.preventDefault();
    console.log(this.state.userName);
  }
  //In the input element we use the 'value' property and give it the state attribute userName that we defined (Using value only, will not let us type on the input field because it will be managed by react)
  //We also need to set the 'onChange' property of the input element so that the dom can tell react that somthing has changed and it should be reflected in the DOM
  render(){
    return (
    <form onSubmit={this.handleSubmit}>
        <input type="text" placeHolder="GitHub username" value={this.state.userName}
          onChange={event => this.setState({userName: event.target.value})}/>
        <button> Add card </button>
        </form>
      )
  }
}
 ```

 ##### 6. Passing data from child component to parent component using a function:
 In the last example, we got a form that has an input to fetch a profile data from github, and then show it.
 For now we made react handle the input element, so that we know the state of the input, and what we need to do now is fetch a profile using the value of the input after clicking on the submit button, and then pass it to our app component.
 To do, react gives the possibility to pass a function from parent component to child component, so that the child component can pass data to the parent using that function.

```js
class Form extends React.Component {
	state = { userName: '' };
	handleSubmit = async (event) => {
  	event.preventDefault();
    //here we use axios to perform a get request to the github api and get the profile using the input value from the state as we defined it
    //axios.get returns a promess, so to consume the promess we need to await it, and make the function asynchronous
    const response= await axios.get(`https://api.github.com/users/${this.state.userName}`);
    //here we pass the response data from child component to parrent component using the method 'onSubmit' that we passed from the App component to the Form component
    this.props.onSubmit(response.data);
  };
	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
    	  <input 
          type="text" 
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="GitHub username" 
          required 
        />
        <button>Add card</button>
    	</form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: testData,
  };
  addNewProfile = (profileData) => {
    console.log('App', profileData);
  }
	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        //Here we pass the addNewProfile function as a parameter to the form component, and we call the Form property for the function onSubmit (from Form component we will use this.props.onSubmit(dataToReturn))
        <Form onSubmit = {this.addNewProfile}/>
        <CardList profiles={this.state.profiles} />
    	</div>
    );
  }	
}
```
 ##### 7. Adding data to state data:
 Now that we sent our data (searched github profile) from child component Form to parent component App, we need to add it to the list of profiles that we have in the state of the App component, to do so we need to set the state of the app and update it by adding our profile element to the profiles list in the state.
 ```js
 class Form extends React.Component {
	state = { userName: '' };
	handleSubmit = async (event) => {
  	event.preventDefault();
    const response= await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(response.data);
    //Here we reset our input after submitting the profile that we got from our Get request
    this.setState({ userName: ''});
  };
	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
    	  <input 
          type="text" 
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="GitHub username" 
          required 
        />
        <button>Add card</button>
    	</form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: [],
  };
  addNewProfile = (profileData) => {
    //Here we update the state of the component, to add the data to the profiles list
  	this.setState(prevState => ({
    	profiles: [...prevState.profiles, profileData],
    }));
  };
	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <Form onSubmit = {this.addNewProfile}/>
        <CardList profiles={this.state.profiles} />
    	</div>
    );
  }	
}
 ```
##### 8. Keys to list of Components :
In the console of the browser we can see this :
```diff
-Warning: Each child in a list should have a unique "key" prop.
```
This is react telling us that each element of the components lists should have its own unique key. Reacts need unique keys whenever it renders a dynamique list of children components. Reacts needs the key for the position of each element, if we don't give a key to each component, react will assume that the key of each element is its identity, and that may cause problems if we start reordoring these elements.

```js
const CardList = (props) => (
	<div>
  //here we set the key and give it the id of each profile as value because it is unique
  	{props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
	</div>
);

```