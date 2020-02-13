// Описание задачи
// 1. Починить код
// 2. Добавить кнопку и функцию удаления задачи
// 3. Посмотреть на код и
// 3.1. Перечислить, что бы вы сделали по-другому
// 3.2. [опционально] Переписать код как душа просит
// Комментарии по ошибкам можно писать прямо в коде


// Для удобства изменен v-on:click на @click
import vue from "vue"; // Изменил require на import

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
  mounted() { // Была изменена функция из created на mounted
    var search = document.getElementById("search") || {};
    search.focus();
  },
  template: `
    <div>
        <input v-model="value" id="search" /> <!-- v-bind изменен на v-model -->
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
     // innerData.zadachi[innerData.zadachi.length + 1] = t; 
      this.innerData.zadachi.push(add);
    },
    remove(index) { // Активную задачу можно отправить в завершенную 
      var copy = this.innerData.zadachi.slice();
      copy[index].completed = true;
      this.$set(this.innerData, "zadachi", copy);
    },
    deleteTodo(index) { // Добавлена функция удаления задачи из завершенных задач
      var copy = this.innerData.zadachi.slice();
      copy.splice(index,1);
      this.$set(this.innerData, "zadachi", copy);
    },
    setFilter(filter) {
      this.$set(this.innerData, "activeFilter", filter);
    }
  }
});
