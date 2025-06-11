<template>
  <div class="burger">
    <div class="line"></div>
  </div>
</template>

<style lang="scss" scoped>
.burger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 20px;
  position: relative;
  cursor: pointer;

  .line,
  .line::before,
  .line::after {
    content: "";
    position: absolute;
    width: 25px;
    height: 3px;
    border-radius: 25px;
    background: #fff;
    transition: all 0.3s ease;
  }

  .line {
    background: #fff;

    &::before {
      transform: translateY(-8px);
    }

    &::after {
      transform: translateY(8px);
    }
  }
}
</style>
