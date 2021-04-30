import { Commit, createStore } from 'vuex'

export default createStore({
  state: {
    auth: false,
    forgotPassword: false,
    resetPassword: false,
    login: false,
    logout: false,
    register: false,
    halloweenFeature: false
  },
  mutations: {
    setAuth: (state: {auth: boolean}, auth : boolean) => state.auth = auth,
    setForgotPassword: (state: {forgotPassword: boolean}, forgotPassword : boolean) => state.forgotPassword = forgotPassword,
    setLogout: (state: {logout: boolean}, logout : boolean) => state.logout = logout,
    setResetPassword: (state: {resetPassword: boolean}, resetPassword : boolean) => state.resetPassword = resetPassword,
    setLogin: (state: {login: boolean}, login : boolean) => state.login = login,
    setRegister: (state: {register: boolean}, register : boolean) => state.register = register,
    setHalloweenFeature: (state: {halloweenFeature: boolean}, halloweenFeature : boolean) => state.halloweenFeature = halloweenFeature,

  },
  actions: {
    setAuth: ({commit}: {commit: Commit}, auth: boolean) => commit('setAuth', auth),
    setForgotPassword: ({commit}: {commit: Commit}, forgotPassword: boolean) => commit('setForgotPassword', forgotPassword),
    setLogout: ({commit}: {commit: Commit}, logout: boolean) => commit('setLogout', logout),
    setResetPassword: ({commit}: {commit: Commit}, resetPassword: boolean) => commit('setResetPassword', resetPassword),
    setLogin: ({commit}: {commit: Commit}, login: boolean) => commit('setLogin', login),
    setRegister: ({commit}: {commit: Commit}, register: boolean) => commit('setRegister', register),
    setHalloweenFeature: ({commit}: {commit: Commit}, halloweenFeature: boolean) => commit('setHalloweenFeature', halloweenFeature),

  },
  modules: {
  },
  getters: {
    forgotPassword: state => state.forgotPassword,
    logout: state => state.logout,
    resetPassword: state => state.resetPassword,
    login: state => state.login,
    register: state => state.register,
    halloweenFeature: state => state.halloweenFeature,
  }
})
