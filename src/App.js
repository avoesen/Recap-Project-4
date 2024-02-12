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
   const [timer, setTimer] = useState(5)

   function handleAddActivity(newActivity) {
      setActivities([ ...activities, {...newActivity, id: uid()}])
   }
   
   const filteredWeatherActivities = activities.filter((activity) => activity.isForGoodWeather === weather)

   useEffect(()=> {
     async function fetchWeather() {
      const response = await fetch("https://example-apis.vercel.app/api/weather");
      const data = await response.json()
      setWeather(data.isGoodWeather)
      setTemperature(data.temperature)
      setCondition(data.condition)
      setTimer(5)
    }
    fetchWeather()
    const interval = setInterval(fetchWeather, 5000)
    const refreshInterval = setInterval(() => {
      setTimer((seconds) => seconds - 1);
    }, 1000);

    return () =>{ 
      clearInterval(interval);
      clearInterval(refreshInterval);
    }
   }, [])

   function handleDeleteActivity(id) {
    setActivities(activities.filter((activity) => activity.id !== id))
   }
  
  return (
    <div className="App">
      <List
        activities={filteredWeatherActivities}
        condition={condition}
        temperature={temperature}
        weather={weather}
        onDeleteActivity={handleDeleteActivity}
      />
      <Form onAddActivity={handleAddActivity} />
      <span>change the weather in ...{timer} sec</span>
    </div>
  );
}

export default App;