<template>
  <div id="app" class="container">
    <div class="header">
      <h1>
        AptCoder Assignment  
      </h1>
    </div>

    <div class="add-task">
      <h2>Add Task</h2>
      <div class="input-wrapper">
        <input v-model="newTask" placeholder="Write here..." />
        <button @click="addTask">Add</button>
      </div>
    </div>

    <my-list :tasks="tasks" @completeTask="completeTask"></my-list>
  </div>
</template>

<script>
import MyList from './components/MyList.vue';

export default {
  name: 'App',
  components: {
    MyList,
  },
  data() {
    return {
      tasks: [],
      newTask: '',
    };
  },
  methods: {
    async addTask() {
      try {
        const newTask = { title: this.newTask, createdAt: new Date(), completed: false };
        await this.$http.post('/tasks', newTask);
        this.fetchTasks();
        this.newTask = '';
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
    async completeTask(id) {
      try {
        await this.$http.patch(`/tasks/${id}`, { completed: true, completedAt: new Date() });
        this.fetchTasks();
      } catch (error) {
        console.error('Error completing task:', error);
      }
    },
    async fetchTasks() {
      try {
        const response = await this.$http.get('/tasks');
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>

<style>
.container {
  text-align: center;
}

.header {
  background-color: #27374D;
  color: white;
  padding: 10px;
}

h1 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.todo-icon {
  margin-left: 10px;
  width: 24px;
  height: 24px;
}

.add-task {
  margin-top: 20px;
}

.input-wrapper {
  display: flex;
  border-radius : 25px;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin: auto;
}

input {
  width: 70%;
  padding: 10px;
  border: 1px solid #666;
  border-radius: 25px 0 0 25px;
}

button {
  width: 30%;
  padding: 10px;
  border: 1px solid #666;
  border-radius: 0 25px 25px 0;
  background-color: #333;
  color: white;
  cursor: pointer;
}
.todo-icon {
  width: 50px; /* Adjust the size as needed */
  height: 50px;
}
</style>
