<template>
  <div>
    <div class="bg-modal">
      <div class="modal">
        <a href="#" class="cross" @click="closeModal()">
          <i class="fas fa-times"></i>
        </a>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  methods: {
    closeModal() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>

.cross {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px;
  font-size: 1.25em;
  transition: 0.25s color;
}

.cross:hover{
  color: var(--white)
}

.bg-modal{
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1ab0;
}

.modal {
  background-color: var(--black);
  padding: 75px 50px 50px 50px;
  text-align: center;
  position: relative;
}
</style>