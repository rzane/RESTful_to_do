var React = require('react');
var ReactDOM = require('react-dom');

class Root extends React.Component {
  constructor() {
    super()

    this.state = {
      tasks: null,
      value: '',
      childVisible: false
    };
  }

  componentDidMount() {
    fetch('/task')
      .then((data) => {

        return data.json()
      })
      .then((json) => {
        console.log(json.tasks)
        this.setState({
          tasks: json.tasks
        })
      })
  }

  addTask(event) {
    event.preventDefault();
    var name = this.state.value
    console.log(name)
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
      }).then((data) => {
          return data.json()
        })
        .then((json) => {

          this.setState({
            childVisible: false,
            tasks: json.tasks,
            value: ''
          })

      })
    }
  }

  removeTask(event) {
    console.log(event)
    fetch('/task/', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: event
      })
    }).then((data) => {
        return data.json()
      })
      .then((json) => {
        console.log(json.tasks)
        this.setState({
          tasks: json.tasks
        })
      })
  }

  completeTask(event) {
    console.log(event)
    fetch('/task/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: event
      })
    }).then((data) => {
        return data.json()
      })
      .then((json) => {
        this.setState({
          tasks: json.tasks
        })
      })

  }

  onChange(event) {
    var counter = document.getElementById('task-name-form').value
    if (counter.length > 0 ) {
      this.setState({
        childVisible: true,
        value: event.target.value
      });
    } else {
      this.setState({
        childVisible: false,
        value: event.target.value
      });
    }
  }

    render() {
      if (this.state.tasks) {
        return (
          <div className='root-wrapper'>
            <Todo
              tasks={this.state.tasks}
              completeTask={this.completeTask.bind(this)}
              removeTask={this.removeTask.bind(this)}
              addTask={this.addTask.bind(this)}
              onChange={this.onChange.bind(this)}
              childVisible={this.state.childVisible}
              value={this.state.value}
            />
            <Completed />

          </div>
        )
      }
      return <p className='loading' > Loading tasks... </p>
    }

}

class Todo extends React.Component {

  render() {
    return (
        <div className='task-wrapper'>
          <div className='wrapper-form'>
            <Task_form onSubmit={this.props.addTask} onChange={this.props.onChange} childVisible={this.props.childVisible} value={this.props.value} />
          </div>
          <div className='wrapper-list'>
            <ul className='list' >
              {this.props.tasks
                .filter(task => task.completed === 0)
                .map((task, i) => <Task key={i} task={task.name} id={task.id} onCompleteTask={this.props.completeTask.bind(this, task.id)} />)
              }
            </ul>

          </div>

        </div>
    )
  }

}

class Task_form extends React.Component {

  render() {
    return (
      <form action="" onSubmit={this.props.onSubmit} >
        <input type='text' value={this.props.value} name='task' id='task-name-form' placeholder="Task" onChange={this.props.onChange} className='form-control' autoComplete="off"  / > <br/>
        {this.props.childVisible ? <Task_description />: null}
      </form>
    )
  }
}

//class TaskList extends React.Component {

  //render() {
      //if (task.completed == 0) {
        //return (
          //<ul className='list' >
           //{this.props.tasks.map((task, i) =>

            //<Task key={i} task={task.name} id={task.id} onRemoveTask={this.props.removeTask.bind(this, task.id)} onCompleteTask={this.props.completeTask.bind(this, task.id)} /> )}

          //</ul>
        //)
      //}
    //})
  //}
//}

class Task extends React.Component {

  render() {
    return (
      <div>
        <li className='task'>
          <ul className='nested-task-list'>
            <li className='nested-task-list-name'><p className='task-list-name'> {this.props.task}</p></li>
            <li className='nested-task-list-complete'><span className='complete' onClick={this.props.onCompleteTask}><span className='glyphicon glyphicon-ok glyphicon-large'></span></span></li>
            <li className='nested-task-list-button'><span className='remove' onClick={this.props.onRemoveTask}><span className='glyphicon glyphicon-remove glyphicon-large'></span></span></li>
          </ul>
        </li>
      </div>
    )
  }
}

class Task_description extends React.Component {
  render() {
    return <textarea id='task-description-form' className='form-control' type='text' placeholder='Description' / >
  }
}

class Completed extends React.Component {
  render() {
    return (
      <div className='completed'>

      </div>
    )
  }
}


ReactDOM.render( <Root / > , document.getElementById('root'));
