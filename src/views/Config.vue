<template>
  <div class="pad-layout">
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Path</td>
          <td>Image</td>
          <td class="form-right">Edit</td>
          <td class="form-right">Delete</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.id">
          <td>{{game.name}}</td>
          <td>{{game.path}}</td>
          <td>{{game.img}}</td>
          <td class="form-right"><a href="#" @click.prevent="editGame(game)"><i class="fas fa-pen"></i></a></td>
          <td class="form-right"><a href="#" @click.prevent="deleteGame(game)"><i class="fas fa-trash"></i></a></td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-game btn-add-game" @click="showAddGame = true"><i class="fas fa-plus"></i></button>
    <modal v-if="showAddGame" @close="showAddGame = false">
      <AddGame @close="showAddGame = false"></AddGame>
    </modal>
    <modal v-if="showEditGame" @close="delEditGame()">
      <EditGame :game="gameToEdit" @close="delEditGame()"></EditGame>
    </modal>
  </div>
</template>

<script>

import store from '@/store/GameStore'
import Vuex from 'vuex'
import AddGame from '@/components/AddGame'
import EditGame from '@/components/EditGame'
import Modal from '@/components/Modal'

export default {
  store: store,
  name: "Config",
  components: {
    AddGame, EditGame, Modal
  },
  data(){
    return{
      showAddGame: false,
      showEditGame: false,
      gameToEdit: null
    }
  },
  methods: {
    ...Vuex.mapActions({
      deleteGameStore: 'deleteGame'
    }),
    editGame(game){
      this.gameToEdit = game;
      this.showEditGame = true;
    },
    deleteGame(game){
      this.deleteGameStore(game)
    },
    delEditGame(){
      this.gameToEdit = null;
      this.showEditGame = false;
    }
  },
  computed: {
    ...Vuex.mapGetters(['games'])
  }
};
</script>

<style scoped>

table{
  width: 100%;
  border-collapse: collapse;
}

.form-right{
  text-align: right;
}

td{
  padding: 5px 0;
}

thead tr{
  border-bottom: 1px solid var(--grey-light);
}

tbody::before{
  content: '';
  display: block;
  height: 15px;
}

.btn-add-game{
  margin-top: 15px;
  width: 100%;
  padding: 10px 0;
}

.btn-add-game:hover{
  background-color: var(--light-blue)
}

</style>
