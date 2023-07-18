import logo from './logo.svg';
import './App.css';

function App(props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Conference</th>
          </tr>
          {props.attendees && props.attendees.map(attendee => {
            return (
              <tr key = {attendee.href}>
                <td>{ attendee.name }</td>
                <td>{ attendee.conference }</td>
              </tr>
            );
          })}
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  );
}

export default App
