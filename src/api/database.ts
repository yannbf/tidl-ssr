import { ITask } from '@ltid/types'
import { mockData } from './mock-data'
import { Observable, BehaviorSubject } from 'rxjs'

class LocalStoragy {
  get(key) {
    return Promise.resolve(JSON.parse(localStorage.getItem(key)))
  }

  set(key, item) {
    localStorage.setItem(key, JSON.stringify(item))
    return Promise.resolve(item)
  }
}

const localStoragy = new LocalStoragy()

class Database {
  public tasks
  private tasksSubject: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>(null)
  private initialized = false

  init() {
    if (!this.initialized) {
      this.getTaskList().then(data => this.tasksSubject.next(data))

      this.initialized = true
    }
  }

  get tasks$(): Observable<ITask[]> {
    return this.tasksSubject.asObservable()
  }

  getTaskList(): Promise<ITask[]> {
    return new Promise<ITask[]>(resolve => {
      if (this.tasks) {
        resolve(this.tasks)
      } else {
        localStoragy.get('mytasks').then(tasks => {
          this.tasks = tasks || []
          resolve(this.tasks)
        })
      }
    })
  }

  updateTasks(tasks: ITask[]) {
    this.tasks = tasks
    this.tasksSubject.next(tasks)
  }

  sort(tasks) {
    if (tasks.length > 1) {
      return tasks.sort((first: ITask, second: ITask) => {
        const a = first.date
        const b = second.date
        return a > b ? -1 : a < b ? 1 : 0
      })
    } else {
      return tasks
    }
  }

  list() {
    return (
      this.getTaskList()
        // .then(this.sort)
        .then(tasks => this.updateTasks(tasks))
    )
  }

  save(myTask: ITask) {
    return this.getTaskList().then((tasks: ITask[]) => {
      let index = tasks.indexOf(tasks.find(item => item.id === myTask.id))
      if (index != -1) {
        // Already existing task
        tasks[index] = myTask
        return localStoragy.set('mytasks', tasks).then(() => this.updateTasks(tasks))
      } else {
        // New task
        myTask.id = Math.random() * 12345
        tasks.push(myTask)
        return localStoragy.set('mytasks', tasks).then(() => this.updateTasks(tasks))
      }
    })
  }

  delete(task: ITask) {
    return (
      this.getTaskList()
        // .then(this.sort)
        .then((tasks: ITask[]) => {
          let index = tasks.indexOf(tasks.find(item => item.id === task.id))
          if (index != -1) {
            tasks.splice(index, 1)
            return localStoragy.set('mytasks', tasks).then(() => this.updateTasks(tasks))
          } else {
            throw new Error('Task not found')
          }
        })
    )
  }

  fetchData(): Promise<ITask[]> {
    return Promise.resolve(mockData)
  }
}

export const database = new Database()
