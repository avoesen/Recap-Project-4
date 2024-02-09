import "./Form.css";

export default function Form({onAddActivity}) {
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target); 
        const data = Object.fromEntries(formData);
        const form = event.target
      
        const isForGoodWeather = data.isForGoodWeather === "on"? true : false;

        const newActivity = {name: data.name, isForGoodWeather: isForGoodWeather}
        onAddActivity(newActivity)

        form.reset()
    }
    return (
      <form className="form" onSubmit={handleSubmit}>
        <header>
          <h1>Add new Activity:</h1>
        </header>
        <main>
          <div>            
                <label htmlFor="activity">Name of activity:</label>
                <input name="name" type="text" id="activity"></input>
            </div> 
         <div>
          <label htmlFor="weather-checkbox">Good-weather activity:</label>
          <input
            name="isForGoodWeather"
            type="checkbox"
            id="weather-checkbox"
          ></input>
        </div>
          <button type="submit">Submit</button>
        </main>
      </form>
    );
}