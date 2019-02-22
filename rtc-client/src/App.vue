<template>
  <div>
    <div class="box">
      <v-stage @click="handleClick" :config="{width,height}">
        <v-layer>
          <v-circle v-for="g in $store.state.players" :key="g.sId" :config="g"></v-circle>
          <!-- <v-circle :config="$store.state.guest"></v-circle> -->
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>
<script>
export default {
  name: "catch-game",
  data: _ => ({
    width: 800,
    height: 600
  }),
  created() {
    this.res();
    window.addEventListener("resize", this.res);
  },
  methods: {
    res() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    handleClick(e) {
      const { layerX, layerY } = e.evt;
      const { sId, x, y } = this.$store.state.guest;
      this.$store.commit("moveTo", { sId, layerX, layerY, x, y });
    }
  }
};
</script>

<style>
body {
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;
}
#app {
  font-family: "Courier", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.box {
  border: solid 1px black;
}
</style>
