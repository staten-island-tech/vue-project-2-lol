<template>
  <div>
    <div class="card">
      <div class="left">
        <img :src="imageURL" alt="" />
      </div>

      <div class="right">
        <h1 class="name">{{ title }} {{ name }}</h1>
        <h2>{{ description }}</h2>
      </div>
      <button @click="remove">Remove</button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  props: {
    imageURL: String,
    name: String,
    description: String,
    title: String,
  },
  methods: {
    remove: function () {
      console.log("ok");
      this.store.commit("deleteChamp", this.name);
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  width: 90rem;
  background-color: lightcoral;
  border: 1px solid black;
  height: 50rem;
  border-radius: 8px;
  margin-top: 5rem;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
.left {
  width: 65%;
  object-fit: scale-down;
  border-radius: 8px;
}
.right {
  width: 30%;
  font-size: 3rem;
}
.name {
  font-size: 4rem;
}
button {
  position: absolute;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  border-radius: 500px;
  transition-property: background-color, border-color, color, box-shadow, filter;
  transition-duration: 0.3s;
  border: 1px solid red;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  font-weight: 700;
  text-align: center;
  padding: 16px 14px 18px;
  color: red;
  box-shadow: inset 0 0 0 2px red;
  background-color: white;
  height: 48px;
}
button:hover {
  color: #fff;
  background-color: red;
}
</style>
