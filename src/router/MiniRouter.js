/**
 * 1. H5 API, History pushState, popstate event
 * 2. implement install method for building a vue plugin
 * 3. routeMap manage between paths and components relationship
 */

let _Vue = null;
export default class MiniRouter {
  static install(Vue) {
    // 检查安装情况
    if (this.install.installed) return;
    this.install.installed = true;

    // 挂载到全局，以供后续使用
    _Vue = Vue;

    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;
          this.$router.init(); // this -> vm
        }
      },
    });
  }

  constructor(options) {
    this.options = options;
    this.routeMap = {};
    this.data = _Vue.observable({
      current: "/",
    });
  }

  init() {
    this.initRouteMap();
    this.initComponent();
    this.initEvent();
  }

  initComponent() {
    _Vue.component(`router-link`, {
      props: {
        to: String,
      },
      render(h) {
        return h(
          `a`,
          {
            attrs: {
              href: this.to,
            },
            on: {
              click: this.handleClick,
            },
          },
          [this.$slots.default]
        );
      },
      methods: {
        handleClick(e) {
          window.history.pushState({}, "", this.to);
          this.$router.data.current = this.to;
          e.preventDefault();
        },
      },
    });

    const self = this;
    _Vue.component(`router-view`, {
      render(h) {
        const component = self.routeMap[self.data.current];
        return h(component);
      },
    });
  }

  initEvent() {
    window.addEventListener(`popstate`, () => {
      this.data.current = window.location.pathname;
    });
  }

  initRouteMap() {
    this.options.routes.forEach((route) => {
      this.routeMap[route.path] = route.component;
    });
  }
}
