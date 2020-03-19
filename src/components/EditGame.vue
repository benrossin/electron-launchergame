<template>
  <div>
    <h1>Edit Game</h1>
    <form class="form-modal" @submit.prevent="editGame()">
      <div class="form-content">
        <div class="form-input">
          <label for="name">Name :</label>
          <input type="text" id="name" name="name" v-model="gameToEdit.name" />
        </div>
        <div class="form-input">
          <label for="path">Path :</label>
          <input type="file" id="path" name="path" @change="chooseFile"/>
        </div>
        <div class="form-input">
          <label for="img">Image :</label>
          <input type="file" name="img" id="img" @change="chooseImg"/>
        </div>
      </div>
      <div class="form-buttons">
        <button class="btn btn-cancel" type="reset">Annuler</button>
        <button class="btn btn-confirm" type="submit">Editer</button>
      </div>
    </form>
  </div>
</template>

<script>
import Vuex from "vuex";
import store from "@/store/GameStore";
import moveFile from "move-file";

export default {
  store: store,
  name: "EditGame",
  props: {
    game: Object
  },
  data() {
    return {
      gameToEdit: null
    };
  },
  methods: {
    ...Vuex.mapActions({
      editGameStore: "editGame"
    }),
    chooseFile(event) {
      this.gameToEdit.path = event.target.files[0].path;
    },
    chooseImg(event) {
      this.gameToEdit.img = event.target.files[0];
    },
    editGame() {
      (async () => {
        await moveFile(
          this.gameToEdit.img.path,
          `public/assets/img/${this.gameToEdit.img.name}`
        );
        console.log("its ok");
      })();

      this.gameToEdit.img = `assets/img/${this.gameToEdit.img.name}`;

      this.editGameStore(this.gameToEdit);
      
      this.$emit("close");
    }
  },
  created() {
    this.gameToEdit = Object.assign({}, this.game);
  }
};
</script>

<style scoped>
input {
  flex: 1;
  margin-left: 15px;
}

label {
  min-width: 50px;
  text-align: right;
}
</style>