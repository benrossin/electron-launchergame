import Vue from 'vue'
import Vuex from 'vuex'
import mgames from '@/models/games.model'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    games: []
  },
  mutations: {
    SET_GAMES: (state, games) => {
      state.games = games
    },
    ADD_GAME: (state, game) => {
      state.games.push(game)
    },
    EDIT_GAME: (state, game) => {
      state.games = _.map(state.games, g => {
        return g.id === game.id ? game : g;
      })
    },
    DELETE_GAME: (state, game) => {
      state.games.splice(_.indexOf(state.games, game), 1)
    }
  },
  getters: {
    games: state => {
      return state.games
    }
  },
  actions: {
    getGames: context => {
      context.state.games = []
      mgames.getGames()
        .then(res => {
          console.log(res)
          context.commit('SET_GAMES', res)
        }).catch(err => {
          console.log(err)
        })
    },
    addGame: (context, game) => {
      mgames.saveGame(game)
        .then(res => {
          game.id = res
          console.log(game)
          context.commit('ADD_GAME', game)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editGame: (context, game) => {
      mgames.saveGame(game)
        .then(res => {
          console.log(res)
          context.commit('EDIT_GAME', game)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteGame: (context, game) => {
      mgames.deleteGame(game)
        .then(res => {
          console.log(res)
          context.commit('DELETE_GAME', game)
        }).catch(err => {
          console.log(err)
        })
    }
  }
})