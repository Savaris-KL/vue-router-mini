import Bar from "../components/Bar.vue";
import Foo from "../components/Foo.vue";

// 需要编译器版本
// const Bar = { template: `<div>I'm bar</div>` };
// const Foo = { template: `<div>I'm foo</div>` };

const routes = [
  { path: "/foo", component: Foo },
  { path: "/bar", component: Bar },
];

export default {
  routes,
};
