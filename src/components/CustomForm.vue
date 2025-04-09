<template>
  <el-form :inline="inline" :label-width="LabelWidth" class="demo-form-inline" :model="modelValue" ref="myFormRef">
    <template v-for="(item, index) in formItems" :key="index">
      <el-form-item :label="item.label" :prop="item.field">

        <template v-if="item.type === 'input'">
          <el-input :placeholder="item.placeholder" v-model="modelValue[item.field]" class="active" />
        </template>

        <template v-else-if="item.type == 'input' || item.type === 'password'">
          <el-input :placeholder="item.placeholder" :show-password="item.type === 'password'"
            v-model="modelValue[item.field]" class="active" />
        </template>

        <template v-else-if="item.type === 'select'">
          <el-select :placeholder="item.placeholder" class="active" v-model="modelValue[item.field]">
            <el-option v-for="options in item.option" :key="options.value" :value="options.value"
              :label="options.label">
            </el-option>
          </el-select>
        </template>

        <template v-else-if="item.type === 'switch'">
          <el-switch v-model="modelValue[item.field]"></el-switch>
        </template>

        <template v-else-if="item.type === 'radio'">
          <el-radio-group v-model="modelValue[item.field]">
            <el-radio :label="radio.label" :value="radio.value" v-for="radio in item.radio" :key="radio.value" />
          </el-radio-group>
        </template>

        <template v-else-if="item.type === 'date'">
          <el-date-picker :type=item.type v-model="modelValue[item.field]" :placeholder="item.placeholder"
            class="active" />
        </template>
 
        <!-- <template v-else-if="item.type === 'checkbox'">
          <el-checkbox-group v-model="modelValue[item.field]">
            <el-checkbox :label="items.label" :name="item.label" :value="items.value" v-for="items in item.checkbox" :key="items.value"/>
          </el-checkbox-group>
        </template> -->

      </el-form-item>
    </template>
    <slot name='footer'></slot>
  </el-form>
</template>

<script setup>
import { defineProps, computed,defineExpose,ref,defineEmits } from 'vue'
const props = defineProps({
  LabelWidth: {
    type: String,
    default: '120px'
  },
  formItems: {
    type: Array,
  },
  modelValue: {
    type: Object
  },
  inline: {
    type: Boolean
  }
})

const emit = defineEmits(['update:modelValue'])

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const myFormRef=ref()

//重置
const reset=()=>{
  myFormRef.value?.resetFields()
}

//抛出方法，父组件调用子组件方法
defineExpose({
  reset
})
</script>

<style>
.el-form-item__label {
  font-weight: 700 !important;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
<style lang="scss" scoped>
.active {
  width: 215px;
  height: 32px;
}
</style>