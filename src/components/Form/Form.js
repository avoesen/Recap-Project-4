import "./Form.css";

export default function Form({onAddActivity}) {
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target); 
        const data = Object.fromEntries(formData);
        const isForGoodWeather = data.isForGoodWeather === "on";

        const newActivity = {name: data.name, isForGoodWeather: isForGoodWeather}
        onAddActivity(newActivity)

        event.target.reset()
        event.target.name.focus()
    }
    return (
      <form className="form" onSubmit={handleSubmit}>
        <header>
          <h2>Add new Activity:</h2>
        </header>
        <main>
          <div className="form-insert">
            <label htmlFor="activity">Name of activity:</label>
            <input name="name" type="text" id="activity"></input>
          </div>
          <div className="form-insert">
            <label htmlFor="weather-checkbox">Good-weather activity:</label>
            <input
              name="isForGoodWeather"
              type="checkbox"
              id="weather-checkbox"
            ></input>
          </div>
          <button className="submit" type="submit">
            SUBMIT
          </button>
        </main>
      </form>
    );
}