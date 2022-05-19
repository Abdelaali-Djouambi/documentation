const CardList = ({profiles}) => {
  console.log(Object.values(profiles));
  const array = Object.values(profiles);
  return <div>
  	{array.map(profile => <Card key={profile.id} {...profile}/>)}
	</div>
};


function Card(props) {
  	const profile = props;
  	return (
    	<div className="github-profile">
    	  <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
    	</div>
    );
  }

function Form (props){
	const [userName, setUserName] = useState('');
	const handleSubmit = async (event) => {
  	event.preventDefault();
    const response= await axios.get(`https://api.github.com/users/${userName}`);
    props.onSubmit(response.data);
    setUserName('');
  };
  	return (
    	<form onSubmit={handleSubmit}>
    	  <input 
          type="text" 
          value={userName}
          onChange={event => setUserName(event.target.value )}
          placeholder="GitHub username" 
          required 
        />
        <button>Add card</button>
    	</form>
    );
}

function App(props) {
  
  const [profiles, setProfiles] = useState([]);
  const addNewProfile = (profileData) => {
     setProfiles( profiles => [...profiles, profileData]);
  };
	
  	return (
    	<div>
    	  <div className="header">{props.title}</div>
        <Form onSubmit = {addNewProfile}/>
        <CardList profiles={profiles} />
    	</div>
    );
}

ReactDOM.render(
	<App title="The GitHub Cards App" />,
  mountNode,
);