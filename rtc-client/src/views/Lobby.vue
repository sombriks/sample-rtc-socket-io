<template>
  <div>
    <h1>Catch Game</h1>
    <div class="box">
      <v-stage @click="handleClick" :config="{width:800,height:600}">
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
  name: "lobby",
  methods: {
    handleClick(e) {
      const { layerX, layerY } = e.evt;
      const { sId, x, y } = this.$store.state.guest;
      this.$store.commit("moveTo", { sId, layerX, layerY, x, y });
    }
  }
};
</script>
<style scoped>
.box {
  border: black 1px solid;
  max-width: 800px;
  max-height: 600px;
}
</style>

