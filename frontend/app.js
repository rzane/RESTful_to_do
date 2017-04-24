var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios')


console.log('you are successfully using react');

class TaskList extends React.Component {
    constructor() {
      super()

      this.state = {
        tasks: null,
        color: 'blue'
      };
    }

    componentDidMount() {
      fetch('/task')
        .then((data) => {
          return data.json()
        })
        .then((json) => {
          this.setState({
            tasks: json.tasks
          })
        })
    }

    addTask(event) {
      event.preventDefault();
      let name = this.refs.name.value;

      fetch('/task/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name
        })
      })
      this.refs.name.value = '';
      this.componentDidMount();
    }

    removeTask(event) {
      console.log(event);
      fetch('/task/', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: event
        })
      })
      this.componentDidMount();
    }

    renderTaskList() {
        if (this.state.tasks) {
          return (
            <div>
              <div className = 'wrapper' >
                <form action = "" onSubmit = {this.addTask.bind(this)} >
                  <input type = 'text' ref = "name" name = 'task' id = 'task-name' placeholder = "Task" / > < br / >
                  <textarea type = 'text' ref = 'description' placeholder = 'Description' / > < br / >
                  <input type = 'submit' id = 'task-submit' name = 'submit' value = 'Submit' /> < br / >
                </form>
                <ul className = 'list' > {this.state.tasks.map((task, i) => <Task key={i} task={task.name} id={task.id} onClick={this.removeTask.bind(this, task.id)} /> )} </ul>
              </div>
            </div>
          )
        }
        return <p className = 'list' > Loading tasks... < /p>
      }

          render() {
            return (
              <div >
              <h1 > Tasks < /h1> {
                this.renderTaskList()
              }
              </div>
            );
          }
}


class Task extends React.Component {

  render() {
    return <li className = 'task'><div><p> {this.props.task}</p><button className='remove' onClick={this.props.onClick} /></div>< /li>
  }
}


ReactDOM.render( < TaskList / > , document.getElementById('root'));
