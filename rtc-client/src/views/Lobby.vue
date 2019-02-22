<template>
  <div class="lobby">
    <h1>Catch Game</h1>
    <v-stage :config="{width:800,height:600}" style="border: black 1px solid;">
      <v-layer>
        <v-circle v-for="g in $store.state.players" :key="g.sId" :config="g"></v-circle>
      </v-layer>
    </v-stage>
  </div>
</template>
<script>
export default {
  name: "lobby"
};
</script>
