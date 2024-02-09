import './App.css';
import Form from "./components/Form/Form"
import {useEffect, useState} from "react"
import {uid} from "uid"
import List from "./components/List/List"
import useLocalStorageState from "use-local-storage-state";

function App() {
   const [activities, setActivities] = useLocalStorageState("activities", {defaultValue: []});
   const [weather, setWeather] = useState()
   const [temperature, setTemperature] = useState()
   const [condition, setCondition] = useState()

   function handleAddActivity(newActivity) {
      setActivities([{...newActivity, id: uid()}, ...activities])
   }
   
   const goodWeatherActivities = activities.filter((activity) => activity.isForGoodWeather === true)
   const badWeatherActivities = activities.filter((activity) => activity.isForGoodWeather === false)

   useEffect(()=> {
     async function fetchWeather() {
      const response = await fetch("https://example-apis.vercel.app/api/weather");
      const data = await response.json()
      setWeather(data.isGoodWeather)
      setTemperature(data.temperature)
      setCondition(data.condition)
    }
    fetchWeather()
   }, [])

   function handleDeleteActivity(id) {
    const deleteActivities = activities.filter((activity) => activity.id !== id)
    // console.log(deleteActivities)
    setActivities(deleteActivities)
   }
  
  return (
    <div className="App">
      <List
              goodWeatherActivities={goodWeatherActivities}
              badWeatherActivities={badWeatherActivities}
              condition={condition}
              temperature={temperature}
              weather={weather}
              onDeleteActivity={handleDeleteActivity}
            />
      <Form onAddActivity={handleAddActivity} />
    </div>
  );
}

export default App;