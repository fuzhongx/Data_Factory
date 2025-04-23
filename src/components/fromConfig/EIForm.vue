<template>
  <el-form :inline="inline" :label-width="LabelWidth" class="demo-form-inline" :model="modelValue" ref="myFormRef" :rules="rules" >
    <template v-for="(item, index) in formItems" :key="index">
      <el-form-item :label="item.label" :prop="item.field">
    
        <template v-if="item.type === 'input'">
          <el-input :placeholder="item.placeholder" v-model="modelValue[item.field]" :class="item.inpWidthHeight" :disabled="item.disabled"/>
        </template>

        <template v-else-if="item.type === 'textarea'">
          <el-input :placeholder="item.placeholder" :type="item.type" v-model="modelValue[item.field]" :class="item.inpWidthHeight" />
        </template>

        <template v-else-if="item.type == 'input' || item.type === 'password'">
          <el-input :placeholder="item.placeholder" :show-password="item.type === 'password'"
            v-model="modelValue[item.field]" class="active" />
        </template>

        <template v-else-if="item.type === 'select'">
          <el-select :placeholder="item.placeholder"  v-model="modelValue[item.field]" :class="item.inpWidthHeight"
           :loading="loadingOptions[item.field]"
           @focus="loadOptions(item)">
            <el-option 
            v-for="opt in dynamicOptions[item.field] || []"
            :key="opt.value"
            :label="opt.label"
            :value="opt.label"
            >
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
          :class="item.inpWidthHeight"/>
        </template>
 
        <!-- <template v-else-if="item.type === 'checkbox'">
          <el-checkbox-group v-model="modelValue[item.field]">
            <el-checkbox :label="items.label" :name="item.label" :value="items.value" v-for="items in item.checkbox" :key="items.value"/>
          </el-checkbox-group>
        </template> -->
       
        <template v-else-if="item.type === 'button'">
          <el-button @click="handleRandom" class="btn" :disabled="item.disabled">自动生成</el-button>
        </template>

      </el-form-item>
    </template>

    <slot name='footer'></slot>
  </el-form>
</template>

<script setup>
import { defineProps, computed,defineExpose,ref,defineEmits, onMounted } from 'vue'
import { dateValue } from '@/ulit/getDate';
import {randomCode} from '@/components/fromConfig/randomNum'
 
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
  },
  rules:{
    type:Object
  },
  options:{
    type:() => Promise
  }

})

onMounted(()=>{

})
const emit = defineEmits(['update:modelValue'])

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const myFormRef=ref()

/**
 * 自动生成编码
 */
const handleRandom=()=>{
  randomCode(modelValue)
}

const dynamicOptions = ref({}); // 存储动态选项
const loadingOptions = ref({}); // 加载状态

// 加载异步选项
const loadOptions = async (item) => {
  if (item.options && typeof item.options === 'function') {
    try {
      loadingOptions.value[item.field] = true;
      dynamicOptions.value[item.field] = await item.options();
      
    } finally {
      loadingOptions.value[item.field] = false;
    }
  }
};


//重置
const reset=()=>{
  myFormRef.value?.resetFields()
}

//抛出方法，父组件调用子组件方法
defineExpose({
  reset,
  randomCode,
  loadOptions
})

</script>
<style lang="scss" scoped>
.active {
  width: 215px;
  height: 32px;
}
.activeForm {
  width: 250px;
  height: 36px;
}
</style>

<style>
.el-button.is-disabled{
  background-color: #598df5;
  color: #fff;
}
.el-button.is-disabled:hover{
  background-color: #598df5;
  color: #fff;
}
.textarea{
  width: 300px;
}
.btn{
  padding: 0px 20px;
  color: #fff;
  background-color: #3671e8;
  border: 1px solid #3671e8;
}
.btn:hover{
  background-color: #598df5;
  color: #fff;
}
.el-form-item__label {
  font-weight: 1000 !important;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #202123;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-dialog__title {
    font-weight: 800 !important;
}
</style>
