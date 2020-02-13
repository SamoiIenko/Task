
import vue from "vue"; 

window.app = new vue({
  el: "#app",

  data() {
    return {
      innerData: {
        zadachi: [],
        activeFilter: ""
      },
      value: ""
    };
  },
  mounted() { 
    var search = document.getElementById("search") || {};
    search.focus();
  },
  template: `
    <div>
        <input v-model="value" id="search" />
        <button @click="todo(value)">Добавить задачу</button>
        <div v-if="innerData.activeFilter == 'active'">
          <div v-for="(todo, index) in innerData.zadachi" v-if="todo.completed != true">
            {{ todo.name }}
            <button @click="remove(index)">Завершить</button>
          </div>
        </div>

        <div v-if="innerData.activeFilter == 'all'">
          <div v-for="todo in innerData.zadachi">
            {{ todo.name }}
            <div @click="remove(todo)"></div>
          </div>
        </div>

        <div v-if="innerData.activeFilter == 'completed'">
          <div v-for="(todo, index) in innerData.zadachi" v-if="todo.completed == true">
            {{ todo.name }}
            <button @click="deleteTodo(index)">Удалить</button>
          </div>
        </div>
 
        <div>
        <span @click="setFilter('active')">Активные</span>
        <span @click="setFilter('all')">Все</span>
        <span @click="setFilter('completed')">Завершенные</span>
        </div>
    </div>
  `,

  methods: {
    todo(t) {
      const add = {
        name: t,
        completed: false
      };
  
      this.innerData.zadachi.push(add);
    },
    remove(index) { 
      var copy = this.innerData.zadachi.slice();
      copy[index].completed = true;
      this.$set(this.innerData, "zadachi", copy);
    },
    deleteTodo(index) { 
      var copy = this.innerData.zadachi.slice();
      copy.splice(index,1);
      this.$set(this.innerData, "zadachi", copy);
    },
    setFilter(filter) {
      this.$set(this.innerData, "activeFilter", filter);
    }
  }
});
