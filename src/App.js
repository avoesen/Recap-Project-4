import './App.css';
import Form from "./components/Form/Form"
import {useState} from "react"
import {uid} from "uid"

function App() {
   const [activities, setActivities] = useState([]);

   function handleAddActivity(newActivity) {
      setActivities([{newActivity, id: uid()}, ...activities])
   }

  return (
    <div className="App">
      <Form onAddActivity={handleAddActivity} />
    </div>
  );
}

export default App;