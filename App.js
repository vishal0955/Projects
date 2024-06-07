import "./App.css";
function Add() { }

function App() {


  return (
  <div className='container'>
    <div className = 'heading'>
      <h2>Increment && Decrement</h2>
    </div>
    <button onClick ={Clickadd}>
      +
      </button >

      <button onClick = {subtract}>
        -
      </button>

      <button>Reset</button>
  </div>
  );
}

export default App;
