<template>
  <div class="spinner">
    <img src="../../assets/images/spinner.gif" alt="spinner">
  </div>
</template>

<script>
export default {
  name: 'SpinnerComponent'
}
</script>

<style scoped lang="scss">
.spinner {
  margin: 20px auto;
  width: 50px;

  img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }
}
</style>
