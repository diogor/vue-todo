<template>
  <div class="home">
    <FieldGroup label="Novo todo:">
        <Input @keyup.enter="addToDo" v-model="newTodoText" should-fit-container placeholder="texto do todo"/>
        <Button @click="addToDo" :is-disabled="!newTodoText">Criar</Button>
    </FieldGroup>
    <div class="todos">
      <div class="todo" v-for="(todo, i) in todos" :key="i">
        <Button @click="removeTodo(i)" spacing="none"><CheckCircleOutlineIcon slot="icon-before"/></Button>
        <MultiLineEditableRenderer :icon="false" @save-requested="(value, callback) => { saveTodo(i, value, callback) }" :value="todo.text" />
      </div>
    </div>
  </div>
</template>

<script>
import { MultiLineEditableRenderer, Button, Input, FieldGroup, CheckCircleOutlineIcon } from '@spartez/vue-atlaskit';

export default {
  name: 'Home',
  components: {
    FieldGroup, Input, Button, MultiLineEditableRenderer, CheckCircleOutlineIcon
  },
  data() {
    return {
      todos: this.$store.state.todos,
      newTodoText: ""
    }
  },
  methods: {
    addToDo() {
      if (this.newTodoText) {
        this.todos.push({
          completed: false,
          text: this.newTodoText
        })
        this.newTodoText = ""
        this.$store.commit("setTodos", this.todos)
      }
    },
    removeTodo(i) {
      this.todos.splice(i, 1)
      this.$store.commit("setTodos", this.todos)
    },
    saveTodo(i, value, callback) {
      this.todos[i].text = value
      this.$store.commit("setTodos", this.todos)
      callback()
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 860px;
  margin: auto;
  padding: 20px;
}
.todos {
  margin-top: 20px;
}
.todo {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin-bottom: 10px;
}
.todo > button {
  margin-right: 10px;
}
</style>