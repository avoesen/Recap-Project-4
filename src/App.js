import './App.css';
import Form from "./components/Form/Form"
import {useState} from "react"
import {uid} from "uid"
import List from "./components/List/List"
import useLocalStorageState from "use-local-storage-state";

function App() {
   const [activities, setActivities] = useLocalStorageState("activities", {defaultValue: []});

   function handleAddActivity(newActivity) {
      setActivities([{...newActivity, id: uid()}, ...activities])
   }

  return (
    <div className="App">
      <Form onAddActivity={handleAddActivity} />
      <List activities={activities}/>
    </div>
  );
}

export default App;