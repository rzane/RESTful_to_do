var React = require('react');
var ReactDOM = require('react-dom');

class Root extends React.Component {
  constructor() {
    super()

    this.state = {
      tasks: null,
      taskName: '',
      taskDescription: '',
      childVisible: false,
      submitBar: false,
      taskFocus: 0,
      completedState: 0
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
    var name = this.state.taskName
    var description = this.state.taskDescription
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
          name: name,
          description: description
        })
      }).then((data) => {
          return data.json()
        })
        .then((json) => {

          this.setState({
            childVisible: false,
            tasks: json.tasks,
            taskName: '',
            taskDescription: ''
          })

      })
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
    }).then((data) => {
        return data.json()
      })
      .then((json) => {
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

  focusOnTask(event) {
    console.log('/task/' + event)
    if (this.state.taskFocus === 0) {
      fetch('/task/' + event)
       .then((data) => {
        return data.json()
      }).then((json) => {
        console.log(json.description)
      })
      this.setState({
        taskFocus: 1
      })
    } else if (this.state.taskFocus === 1) {
      this.setState({
        taskFocus: 0
      })
    }
  }

  onTaskChange(event) {
    this.setState({
      taskName: event.target.value,
    });
    if (event.target.value.length > 0) {
      this.setState({
        childVisible: true
      })
    } else {
      this.setState({
        submitBar: false,
        childVisible: false,
        taskDescription: ''
      })
    }
  }

  onDesciptionChange(event) {
    this.setState({
      taskDescription: event.target.value
    });
    if (event.target.value.length > 0) {
      this.setState({
        submitBar: true
      })
    } else {

      this.setState({
        submitBar: false,

      })
    }
  }

  changeTab(event) {
    if (this.state.completedState === 1) {
      this.setState({
        completedState: 0
      })
    } else if (this.state.completedState === 0) {
      this.setState({
        completedState: 1
      })
    }
  }

    render() {
      if (this.state.tasks && this.state.completedState === 0) {
        return (
          <div className='root-wrapper'>
            <CompletedTab
              tasks={this.state.tasks}
              completeTask={this.completeTask.bind(this)}
              removeTask={this.removeTask.bind(this)}
              completedState={this.state.completedState}
              changeTab={this.changeTab.bind(this)}
              focusOnTask={this.focusOnTask.bind(this)}
              taskFocus={this.state.taskFocus}
            />
            <Todo
              tasks={this.state.tasks}
              completeTask={this.completeTask.bind(this)}
              removeTask={this.removeTask.bind(this)}
              addTask={this.addTask.bind(this)}
              onTaskChange={this.onTaskChange.bind(this)}
              onDesciptionChange={this.onDesciptionChange.bind(this)}
              childVisible={this.state.childVisible}
              taskName={this.state.taskName}
              taskDescription={this.state.taskDescription}
              submitBar={this.state.submitBar}
              focusOnTask={this.focusOnTask.bind(this)}
              taskFocus={this.state.taskFocus}
            />
          </div>
        )
      } else if (this.state.tasks && this.state.completedState === 1) {
        return(
          <div className='root-wrapper'>
            <Completed
              tasks={this.state.tasks}
              completeTask={this.completeTask.bind(this)}
              removeTask={this.removeTask.bind(this)}
              completedState={this.state.completedState}
              changeTab={this.changeTab.bind(this)}
              focusOnTask={this.focusOnTask.bind(this)}
              tsakFocus={this.state.taskFocus}
            />
            <Todo
              tasks={this.state.tasks}
              completeTask={this.completeTask.bind(this)}
              removeTask={this.removeTask.bind(this)}
              addTask={this.addTask.bind(this)}
              onTaskChange={this.onTaskChange.bind(this)}
              onDesciptionChange={this.onDesciptionChange.bind(this)}
              childVisible={this.state.childVisible}
              taskName={this.state.taskName}
              taskDescription={this.state.taskDescription}
              submitBar={this.state.submitBar}
              focusOnTask={this.focusOnTask.bind(this)}
              taskFocus={this.state.taskFocus}
            />
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
          <Task_form
            submitBar={this.props.submitBar}
            onSubmit={this.props.addTask}
            onTaskChange={this.props.onTaskChange}
            onDesciptionChange={this.props.onDesciptionChange}
            childVisible={this.props.childVisible}
            taskName={this.props.taskName}
            taskDescription={this.props.taskDescription}
          />
        </div>
        <div className='wrapper-list'>
          <Task_list
            tasks={this.props.tasks}
            taskFocus={this.props.taskFocus}
            focusOnTask={this.props.focusOnTask}
            completeTask={this.props.completeTask}
            removeTask={this.props.removeTask}
          />
        </div>
      </div>
    )
  }
}

class Task_list extends React.Component {

  render() {
    if (this.props.taskFocus === 0) {
      return(
        <ul className='list' >
          {this.props.tasks
            .filter(task => task.completed === 0)
            .map((task, i) =>
              <Task
                key={i}
                task={task.name}
                description={task.description}
                id={task.id}
                onSelect={this.props.focusOnTask.bind(this, task.id)}
                taskFocus={this.props.taskFocus}
                onCompleteTask={this.props.completeTask.bind(this, task.id)}
                onRemoveTask={this.props.removeTask.bind(this, task.id)}
                focusOnTask={this.props.focusOnTask}
              />)
          }
        </ul>
      )
    } else if (this.props.taskFocus === 1) {
      return(
        <div>
          <ul className='list'>
            {this.props.tasks
              .filter(task => task.completed === 0)
              .map((task, i) =>
                <Task
                  key={i}
                  task={task.name}
                  description={task.description}
                  id={task.id}
                  onSelect={this.props.focusOnTask.bind(this, task.id)}
                  taskFocus={this.props.taskFocus}
                  onCompleteTask={this.props.completeTask.bind(this, task.id)}
                  onRemoveTask={this.props.removeTask.bind(this, task.id)}
                  focusOnTask={this.props.focusOnTask}
                />)
            }
          </ul>
          <div className='fuckyou'>
            <Focused_task onSelect={this.props.focusOnTask} tasks={this.props.tasks} />
          </div>
        <div>
      )
    }
  }
}


class Task extends React.Component {

  render() {
      return (
        <div>
          <li className='task' onClick={this.props.onSelect} >

              <span className='nested-task-list-name'><p className='task-list-name'> {this.props.task} </p></span>

          </li>

          <li className='nested-task-list-button'><span className='remove' onClick={this.props.onRemoveTask}><span className='glyphicon glyphicon-remove glyphicon-large'></span></span></li>

          <li className='nested-task-list-complete'><span className='complete' onClick={this.props.onCompleteTask}><span className='glyphicon glyphicon-ok glyphicon-large'></span></span></li>
        </div>
      )
    }
}

class Focused_task extends React.Component {
  render() {
    return (
      <div className='focused-task' onClick={this.props.onSelect}>
        <p> yo </p>
      </div>
    )
  }
}

class Task_form extends React.Component {

  render() {
    return (
      <div>
        <form action="" onSubmit={this.props.onSubmit} >
          <input type='text' value={this.props.taskName} onChange={this.props.onTaskChange} name='value' id='task-name-form' placeholder="Task" className='form-control' autoComplete="off"  / > <br/>
          </form>
        <form action="" onSubmit={this.props.onSubmit} >
          {this.props.childVisible ?
            <Task_description
              submitBar={this.props.submitBar}
              taskDescription={this.props.taskDescription}
              onDesciptionChange={this.props.onDesciptionChange}

            />: null}
        </form>
      </div>
    )
  }
}

class Task_description extends React.Component {
  render() {
    return (
      <div>
        <textarea
          value={this.props.taskDescription}
          onChange={this.props.onDesciptionChange}
          name='description'
          id='task-description-form'
          className='form-control'
          type='text'
          placeholder='Description'
        />
        {this.props.submitBar ? <Submit_bar />:null}
      </div>
    )
  }
}

class Submit_bar extends React.Component {
  render() {
    return (
      <button className='submit-bar'>
        <p> yo </p>
      </button>
    )
  }
}

class CompletedTab extends React.Component {
  render() {
    return (
      <div className='completed-tab' onClick={this.props.changeTab}>
      </div>
    )
  }
}

class Completed extends React.Component {
  render() {
    return (
      <div className='completed'>
        <h1 className='completed-header'>Completed Tasks </h1>
        <span className='remove' onClick={this.props.changeTab}><span className='glyphicon glyphicon-remove glyphicon-large'></span></span>
        <ul className='list completed-list' >
          {this.props.tasks
            .filter(task => task.completed === 1)
            .map((task, i) =>
            <Task
              key={i}
              task={task.name}
              id={task.id}
              onSelect={this.props.focusOnTask.bind(this, task.id)}
              onCompleteTask={this.props.completeTask.bind(this, task.id)}
              onRemoveTask={this.props.removeTask.bind(this, task.id)}
            />)
          }
        </ul>
      </div>
    )
  }
}



ReactDOM.render( <Root / > , document.getElementById('root'));
