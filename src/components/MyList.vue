<template>
  <div class="float-container">
    <div class="float-child float-child1">
      <h2 class="section-heading">Todo List</h2>
      <ul class="task-list">
        <li v-for="task in openTasks" :key="task.id">
          <div class="task-row">
            <div class="task-details">
              <span v-if="!task.editMode" class="task-title">{{ task.title }}</span>
              <input v-if="task.editMode" v-model="task.updatedTitle" class="edit-input" @keydown.enter="saveTaskUpdate(task)" @keydown.esc="cancelTaskUpdate(task)">
              <span class="date">Added on {{ formatDate(task.createdAt) }}</span>
            </div>
            <div v-if="task.editMode" class="task-buttons">
              <button @click="updateTask(task)" class="update-button">OK</button>
            </div>
            <div v-else class="task-buttons">
              <button @click="completeTask(task.id)" class="complete-button">Done</button>
              <button @click="toggleEditMode(task)" class="update-button">Edit</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="float-child float-child2">
      <h2 class="section-heading">Completed</h2>
      <ul class="task-list">
        <li v-for="task in completedTasks" :key="task.id">
          <div class="task-row">
            <span class="task-title">{{ task.title }}</span>
            <span class="date">Completed on {{ formatDate(task.completedAt) }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['tasks'],
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    completeTask(id) {
      this.$emit('completeTask', id);
    },
    toggleEditMode(task) {
      task.editMode = !task.editMode;
      if (task.editMode) {
        task.updatedTitle = task.title;
      }
    },
    saveTaskUpdate(task) {
      this.updateTask(task);
    },
    updateTask(task) {
      axios.patch(`http://localhost:3000/tasks/${task.id}`, { title: task.updatedTitle })
        .then(response => {
          console.log('Task title updated successfully:', response.data);
          task.title = task.updatedTitle;
          task.editMode = false;
        })
        .catch(error => {
          console.error('Error updating task title:', error);
        });
    },
    cancelTaskUpdate(task) {
      task.editMode = false;
    },
  },
  computed: {
    openTasks() {
      return this.tasks.filter(task => !task.completed);
    },
    completedTasks() {
      return this.tasks.filter(task => task.completed);
    },
  },
};
</script>

<style scoped>
.float-container {
  display: flex;
}

.float-child {
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
}

.float-child1 {
  border-right: 1px solid #526D82;
}

.section-heading {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px;
}

.task-list {
  list-style-type: none;
  padding: 0;
}

.task-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #526D82;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 25px;
}

.task-details {
  display: flex;
  align-items: center;
}

.task-title {
  font-weight: bold;
}

.edit-input {
  width: 70%;
  padding: 8px;
  border: 1px solid #526D82;
  border-radius: 5px;
}

.date {
  color: #27374D;
  margin-left: 10px;
}

.task-buttons {
  display: flex;
  align-items: center;
}

.complete-button{
  background-color: #D21312;
  color: white;
  flex: 1; 
  margin: 0 5px; 
  overflow: hidden; 
  white-space: nowrap;
  border-radius :25px;
  
}
.update-button {
  background-color: #ED2B2A;
  color: white;
  flex: 1; 
  margin: 0 5px; 
  overflow: hidden; 
  white-space: nowrap;
  border-radius :25px;
  
}
</style>
