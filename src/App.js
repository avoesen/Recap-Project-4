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
  
  return (
    <div className="App">
      <>
        {weather ? (
          <>
            <h1>
              {condition} {temperature}°C
            </h1>
            <p>go outside the API is trolling you</p>
            <List activities={goodWeatherActivities} />
          </>
        ) : (
          <>
            <h1>
              {condition} {temperature}°C
            </h1>
            <p>stay inside and do something like:</p>
            <List activities={badWeatherActivities} />
          </>
        )}
      </>

      <Form onAddActivity={handleAddActivity} />
    </div>
  );
}

export default App;

// if weather is good show first List if not show second  