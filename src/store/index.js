import { createStore } from 'vuex'

const urlBase = 'https://pecorademo-jwt.herokuapp.com/';

export default createStore({
  state: {
    token: null
  },
  mutations: {
    setToken(state, payload)
    {
      state.token = payload;
    }
  },
  actions: {
    async login({commit}, usuario)
    {
      console.log(usuario);

      try
      {
        const res = await fetch(`${urlBase}api/user/login`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(usuario)
        })
        
        const userDB = await res.json();
        console.log(userDB);

        commit('setToken', userDB.data.token);

        localStorage.setItem('token', userDB.data.token);
      }
      catch (error)
      {
        console.log(error);
      }
    },
    getToken({commit})
    {
      if (localStorage.getItem('token'))
      {
        commit('setToken', localStorage.getItem('token'));
      }
      else
      {
        commit('setToken', null);
      }
    },
    logout({commit}){
      localStorage.removeItem('token');
      commit('setToken', null);
    }
  },
  modules: {

  }
})
