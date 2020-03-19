<template>
  <div>
    <h1>Add Game</h1>
    <form class="form-modal" @submit.prevent="addGame()">
      <div class="form-content">
        <div class="form-input">
          <label for="name">Name :</label>
          <input type="text" id="name" name="name" v-model="game.name" />
        </div>
        <div class="form-input">
          <label for="path">Path :</label>
          <input type="file" id="path" name="path" @change="chooseFile" />
        </div>
        <div class="form-input">
          <label for="img">Image :</label>
          <input type="file" name="img" id="img" @change="chooseImg" />
        </div>
      </div>
      <div class="form-buttons">
        <button class="btn btn-cancel" type="reset">Annuler</button>
        <button class="btn btn-confirm" type="submit">Ajouter</button>
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
  name: "AddGame",
  data() {
    return {
      game: {
        name: "",
        path: null,
        img: null,
        date: null
      }
    };
  },
  methods: {
    ...Vuex.mapActions({
      addGameStore: "addGame"
    }),
    chooseFile(event) {
      this.game.path = event.target.files[0].path;
    },
    chooseImg(event) {
      this.game.img = event.target.files[0];
    },
    addGame() {
      (async () => {
        await moveFile(
          this.game.img.path,
          `public/assets/img/${this.game.img.name}`
        );
        console.log("its ok");
      })();

      this.game.img = `assets/img/${this.game.img.name}`;
      this.game.date = Date.now().toString();

      this.addGameStore(this.game);
      this.$emit("close");
    }
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