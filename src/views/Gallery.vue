<template>
  <div>
    <Slider></Slider>
    <div class="filter pad-layout">
      <div class="content-filter">
        <label for="filter">Trier par :</label>
        <select name="filter" id="filter" class="filter-select" v-model="search.filter">
          <option
            v-for="filter in filters"
            :value="filter.value"
            :key="filter.value"
          >{{ filter.text }}</option>
        </select>
      </div>
      <div class="searchbar">
        <a class="search-icon" href="#">
          <i class="fas fa-search"></i>
        </a>
        <input
          class="search-input"
          name="search"
          type="text"
          placeholder="Rechercher"
          autocomplete="off"
          v-model="search.text"
        />
        <a v-if="search.text" class="cross-search" href="#" @click.prevent="delSearch()">
          <i class="fas fa-times"></i>
        </a>
      </div>
    </div>
    <div class="gallery">
      <div class="game pad-layout" v-for="game in filteredGames" :key="game.id">
        <div class="content-title-game">
          <a href="#" @click.prevent="startGame(game.path)" class="title-game">
            {{ game.name }}
            <i class="fas fa-chevron-right"></i>
          </a>
        </div>
        <a href="#" class="game-content" @click.prevent="startGame(game.path)">
          <img :src="game.img" :alt="game.name" class="img-fluid game-img" />
          <div class="btn btn-game">
            <span>Lancer</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import store from "@/store/GameStore";
import Vuex from "vuex";
import p from "path";
import child from "child_process";
import Slider from "@/components/Slider";

export default {
  store: store,
  name: "Gallery",
  components: {
    Slider
  },
  data() {
    return {
      search: {
        text: "",
        filter: "time"
      },
      filters: [
        {
          value: "time",
          text: "Récent"
        },
        {
          value: "alpha",
          text: "Alphabétique"
        }
      ]
    };
  },
  methods: {
    delSearch() {
      this.search.text = "";
    },
    startGame(path) {
      let nameFile = p.basename(path);
      let dirnameFile = p.dirname(path);
      let option = null;
      let start = path;

      if (nameFile.includes(".exe")) {
        option = { cwd: dirnameFile };
        start = nameFile;
      }

      child.exec(`start ${start}`, option, (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(data.toString());
      });
    }
  },
  computed: {
    ...Vuex.mapGetters(["games"]),
    filteredGames() {
      let gamesSearch = this.games;
      if (this.search.text.trim() !== "") {
        gamesSearch = _.filter(gamesSearch, game => {
          return game.name.toLowerCase().includes(this.search.text.toLowerCase());
        });
      }
      switch (this.search.filter) {
        case "alpha":
          return _.orderBy(gamesSearch, "name");
        default:
          return _.sortBy(gamesSearch, "date").reverse();
      }
    }
  }
};
</script>

<style scoped>
.searchbar {
  position: relative;
}

.filter {
  padding-top: 100px;
  padding-bottom: 15px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.filter-select {
  background-color: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  color: var(--grey-light);
  -webkit-appearance: none;
  outline: 0;
}

.search-icon {
  color: var(--white);
  padding: 10px;
}

.cross-search {
  position: absolute;
  right: 0;
  padding: 10px;
}

.search-icon {
  position: absolute;
  transform: translateX(-100%);
  background-color: var(--grey-dark);
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 150px;
}

.game {
  width: 33.33%;
  display: block;
  position: relative;
  margin-top: 45px;
}

.content-title-game {
  padding: 15px 0;
}

.title-game {
  transition: 0.25s color;
}

.title-game:hover {
  color: var(--white);
}

.fa-chevron-right {
  font-size: 7px;
  transition: 0.25s margin-left;
}

.title-game:hover .fa-chevron-right {
  margin-left: 5px;
}

.game-content:hover .btn-game {
  background-color: var(--light-blue);
}
</style>
