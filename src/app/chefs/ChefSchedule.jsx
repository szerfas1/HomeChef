import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ChefSchedule extends React.Component {
  constructor({ chefId }) {
    super({ chefId });
    this.state = {
      schedule: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.getSchedule();
    }, 300);
  }

  getSchedule() {
    const { chefId } = this.props;
    axios.get('/api/chef/schedule', { params: { id: chefId } })
      .then((data) => {
        console.log(data.data)
        // save chefId to state to prevent unknown switching to different chefId number in render
        this.setState({ schedule: data.data, chefId });
      })
      .catch(err => console.log(err));
  }

  render() {
    // get chefId from state (set in getSchedule) to prevent unknown switch to diff chefId num
    const { schedule, chefId } = this.state;
    return (
      <div>
        <h3>Schedule</h3>
        <Link to={{
          pathname: '/chef/schedule/update',
          state: { chefId },
        }}
        >
          <button type="button">Add New Event</button>
        </Link>
        <Link to={{
          pathname: '/chef/menu/update',
          state: { chefId },
        }}
        >
          <button type="button">Update Menu</button>
        </Link>

        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Menu Items</th>
            </tr>
            {schedule.map((event) => {
              return (
                <tr key={event.eventId}>
                  <td>{event.date}</td>
                  <td>{event.startTime}</td>
                  <td>{event.endTime}</td>
                  <td>
                    <table>
                      <tbody>
                        <tr>
                          <th>Dish</th>
                          <th>Price</th>
                          <th>Total Quantity</th>
                          <th>Reservations</th>
                        </tr>
                        {event.menuItems.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.name}</td>
                              <td>
                                <span>$</span>
                                {item.price}
                              </td>
                              <td>{item.quantity}</td>
                              <td>{item.reservations}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <Link to={{
                      pathname: '/chef/schedule/update',
                      state: { event, chefId },
                    }}
                    >
                      <button type="button">Edit</button>
                    </Link>
                  </td>
                </tr>
              );
            })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default ChefSchedule;
