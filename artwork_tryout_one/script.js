(function(){
  
  Vue.component('refresh', {
    template: '#refresh-component'
  });
  
  var HomeComponent = Vue.extend({
    template: "#home-component-template",
    data() {
      return {
        lines: []
      }
    },
    methods: {
      setup: function () {
        this.lines = [];
        this.init();
        console.info('setup complete');
      },
      init: function () {
        for(let i = 0;i < 60; i++) {
          let start1 = Math.floor(Math.random() * window.innerWidth);
          let start2 = Math.floor(Math.random() * window.innerWidth);
          let end1 = Math.floor(Math.random() * window.innerHeight / 3);
          let end2 = Math.floor(Math.random() * window.innerHeight / 4);
          let horizontal = Boolean(Math.round(Math.random()));

          if(horizontal) {
            this.lines[i] = {
              pos1: {x: start1, y: start2},
              pos2: {x: end1, y: start2}
            };
          } else {
            this.lines[i] = {
              pos1: {x: start1, y: start2},
              pos2: {x: start1, y: end2}
            };
          }
        }
      }
    },
    computed: {
      screen: function () {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    },
    mounted() {
      this.setup();
    }
  });
  
  var TwoComponent = Vue.extend({
    template: "#two-component-template",
    data() {
      return {
        lines: []
      }
    },
    methods: {
      setup: function () {
        this.lines = [];
        this.init();
      },
      init: function () {
        let start1 = Math.floor(Math.random() * window.innerWidth);
        let start2 = Math.floor(Math.random() * window.innerWidth);
        let end1 = start1 + 20;
        let end2 = Math.floor(Math.random() * window.innerHeight / 4);
        let up = Boolean(Math.round(Math.random()));
        
        if(up) {
          this.lines.push({
            pos1: {x: start1, y: start2},
            pos2: {x: start1 + 20, y: start2 - 20}
          });
        } else {
          this.lines.push({
            pos1: {x: start1, y: start2},
            pos2: {x: start1 + 20, y: start2 + 20}
          });
        }
        if(this.lines.length < 600) {
          this.init();
        }
      },
    },
    computed: {
      screen: function () {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    },
    mounted() {
      this.setup();
    }
  });
  
  const routes = [
    { path: '/', component: HomeComponent, props: false },
    { path: '/two', component: TwoComponent, props: false }
  ];
  
  const router = new VueRouter({routes});
  
  var app = new Vue({
    router,
    computed: {
    }
  }).$mount('#app');
  
})();