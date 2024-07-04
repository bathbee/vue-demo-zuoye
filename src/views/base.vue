<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: Li Cheng
 * @Date: 2024-06-24 15:18:28
 * @LastEditors: Li Cheng
 * @LastEditTime: 2024-06-24 15:22:19
-->
<template>
  <!-- <h1 :class="'text-' + age" class="font-size-20">
    {{ name }} - {{ age === 16 ? '少年' : '成年人' }} - {{ sex(0) }}
  </h1>

  <h1 v-bind="obj">{{ name }} - {{ age === 16 ? '少年' : '成年人' }} - {{ sex(0) }}</h1>

  <h1 v-if="hasBro">有弟弟：王钢蛋</h1>
  <h2 v-if="hasBro">{{ state.name }} - {{ state.age }} - {{ state.sex }}</h2>
  <h1 v-else>没有弟弟</h1>
  <button @click="isBro">疑问？</button>
  <button @click="change">切换</button>

  <h1 :class="[isActive ? 'active' : '']">李四</h1>
  <button @click="isActive = !isActive">选中李四</button>

  <h1 :style="{ color: fontColor }">李四</h1>
  <div v-if="type === 1">1</div>
  <div v-else-if="type === 2">2</div>
  <div v-else-if="type === 3">3</div>
  <div v-else>4</div> -->
  <div>
    <div class="title">学生名单</div>
    <div class="text-5xl h-16 bg-red-600">学生名单by tailwind</div>
    <div>
      {{ userList.map(item => {
          return item.userName;
        }).join('、')
      }}
    </div>
  </div>

</template>

<script setup>
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const { userList } = storeToRefs(userStore);

const name = ref('铁锤妹妹🔨');
const age = ref(18);
function sex(sex) {
  return sex === 1 ? '男' : '女';
}

const obj = {
  class: 'text-16',
  id: 'font-size-24'
};

let hasBro = ref(false);
console.log(hasBro);

function isBro() {
  alert('到底有没有？');
  console.log(age);
}

const state = reactive({
  name: '王钢蛋',
  age: 16,
  sex: '男'
});

const change = () => {
  hasBro.value = !hasBro.value;
  console.log(hasBro);
  state.age = 17;
  console.log(state);
};

console.log(state);
const isActive = ref(true);

const fontColor = ref('red');

const type = ref(5);
</script>

<style scoped>
.title {
  height: 64px;
  background-color: red;
  margin-bottom: 24px;
}
.text-16 {
  color: red;
}

.text-18 {
  color: blue;
}

.font-size-20 {
  font-size: 20px;
}

#font-size-24 {
  font-size: 24px;
}

.active {
  color: green;
}

.text-gray {
  color: gray;
}
</style>
