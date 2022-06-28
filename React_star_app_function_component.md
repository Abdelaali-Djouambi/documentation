# React star app using function components
In this document we will describe the different steps to create simple calculation game based on react function components.

## .Startup App

Here is we will have the startup elements for our app. This is plain html and baasic javascript, we wont have any react components.


```js
// STAR MATCH - Starting Template

const StarMatch = () => {
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />
        </div>
        <div className="right">
          <button className="number">1</button>
          <button className="number">2</button>
          <button className="number">3</button>
          <button className="number">4</button>
          <button className="number">5</button>
          <button className="number">6</button>
          <button className="number">7</button>
          <button className="number">8</button>
          <button className="number">9</button>
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

ReactDOM.render(<StarMatch />, mountNode);

```

#### 1. Extracting component
Our first app has multiple stuff that we can upgrade, and we will also start defining our components, in order to make our code better using react.

 . Here we define a component that will replace the 9 buttons by mapping the number of elements to react component called PlayNymber, and also replace the stars div with a mapping of the number of stars to show.

```js
// STAR MATCH - V2
const PlayNumber= (props) => {
  return (
    //The javascript concept that helps enables 9 different click handlers is closure, it will give each event a unique closure closing over its block scope
  <button className="number" onClick={() => console.log('Num', props.number)}>{props.number}</button>
    )
}
//Here is the replacement to the div containing the 9 number buttons
const StarMatch = () => {
	const [stars, setStars] = useState(utils.random(1, 9));
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {utils.range(1, stars).map(starId =>
          	<div key={starId} className="star" />
          )}
        </div>
        <div className="right">
        	{utils.range(1, 9).map(number =>
          	<PlayNumber key={number} number={number} />
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};
```

#### 2. Defining UI logic
In the number pannel, the user will click and sum numbers to get the exact number of stars displayed. A candidate number is blue (a number that is < than the stars number), a wrong number is red (number is > stars or the sum is > stars), an already validated number is green and 
