<template>
    <svg :class="svgClass" aria-hidden="true" @click="svgClick">
        <use :xlink:href="iconNames"></use>
    </svg>
</template>

<script>
export default {
    props: {
    iconName: {
      type: String,
      required: true
    }
  },
  computed: {
    svgClass() {
      return `icon icon-${this.iconName}`;
    },
    iconNames() {
      return `#icon-${this.iconName}`;
    }
  }
    
}
</script>

<style  scoped>
.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>