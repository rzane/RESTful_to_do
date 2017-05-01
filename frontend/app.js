var React = require('react');
var ReactDOM = require('react-dom');

class TaskList extends React.Component {
    constructor() {
      super()

      this.state = {
        tasks: null,
        childVisible: false
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
      if (name == '') {
        alert('you must write something')
      } else {

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
        this.setState({
        childVisible: false
        });
        this.componentDidMount();
      }

      }

    removeTask(event) {
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

    onChange() {
      var counter = document.getElementById('task-name-form').value
      if (counter.length > 0 ) {
        this.setState({
        childVisible: true
        });
      } else {
          this.setState({
          childVisible: false
          });
        }
    }

    renderTaskList() {
        if (this.state.tasks) {
          return (
              <div className='wrapper'>
                <div className='completed-tab'>

                </div>
                <div className='wrapper-form'>
                  <form action="" onSubmit={this.addTask.bind(this)} >
                    <input type='text' ref ="name" name='task' id='task-name-form' placeholder="Task" onChange={this.onChange.bind(this)} className='form-control' autoComplete="off"  / > <br/>
                    {this.state.childVisible ? <Task_description />: null}
                  </form>
                </div>
                <div className='wrapper-list'>
                  <ul className='list' > {this.state.tasks.map((task, i) => <Task key={i} task={task.name} id={task.id} onClick={this.removeTask.bind(this, task.id)} /> )} </ul>
                </div>

              </div>
          )
        }
        return <p className='loading' > Loading tasks... </p>
      }

          render() {
            return (
              <div >
              {
                this.renderTaskList()
              }
              </div>
            );
          }
}

class Task extends React.Component {

  render() {
    return (
      <div>
        <li className='task'>
          <ul className='nested-task-list'>
            <li className='nested-task-list-name'><p className='task-list-name'> {this.props.task}</p></li>
            <li className='nested-task-list-complete'><span className='complete'><span className='glyphicon glyphicon-ok glyphicon-large'></span></span></li>
            <li className='nested-task-list-button'><span className='remove' onClick={this.props.onClick}><span className='glyphicon glyphicon-remove glyphicon-large'></span></span></li>
          </ul>
        </li>
      </div>
    )
  }
}


class Task_description extends React.Component {
  render() {
    return <textarea id='task-description-form' className='form-control' type='text' ref='description' placeholder='Description' / >
  }
}

class Completed extends React.Component {

}

ReactDOM.render( <TaskList / > , document.getElementById('root'));
