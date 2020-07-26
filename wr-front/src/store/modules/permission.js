import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  // debugger
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // generateRoutes({ commit }, data) {//roles是用户所带的权限
  //             return new Promise(resolve => {
  //                 const { roles } = data;
  //                 const accessedRouters = asyncRoutes.filter(v => {
  //                     // if (roles.indexOf('admin') >= 0) {
  //                     //     return true;
  //                     // };
  //                     if (hasPermission(roles, v)) {
  //                         if (v.children && v.children.length > 0) {
  //                             v.children = v.children.filter(child => {
  //                                 if (hasPermission(roles, child)) {
  //                                     return child
  //                                 }
  //                                 return false;
  //                             });
  //                             return v
  //                         } else {
  //                             return v
  //                         }
  //                     }
  //                     return false;
  //                 });
  //                 commit('SET_ROUTERS', accessedRouters);
  //                 resolve();
  //             })
  //         }
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      //   // debugger
      // } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      // debugger
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
