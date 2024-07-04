<template>
  <div class="text-left">
    <div class="text-3xl text-center h-16 leading-loose">同学列表</div>
    <div class="flex justify-end">
      <a-button class="add-btn" type="primary" @click="addUser">新增</a-button>
    </div>
    <ul>
      <li>
        <span class="No">序号</span>
        <span class="study-code">学号</span>
        <span class="name">姓名</span>
        <span class="year">年龄</span>
        <div class="operation">操作</div>
      </li>
      <li v-for="(item, index) in userList" :key="item.id">
        <span class="No">{{ index + 1 }}.</span>
        <span class="study-code">{{ item.id }}</span>
        <span class="name">{{ item.userName }}</span>
        <span class="year">{{ item.age }}</span>
        <div class="operation">
          <a-button @click="deleteUser(index)">删除</a-button>
          <a-button @click="editUser(index)">编辑</a-button>
          <a-button @click="getYourName(item.id)">问名字</a-button>
        </div>
      </li>
    </ul>

    <!-- <div class="pop-blank" v-if="showDiv">
      <h2>{{isEdit ? '编辑同学' : '新增同学'}}</h2>
      <div class="blank-body">
        <div class="blank-item">
          <span>学号</span>
          <input type="text" v-model="studyNum">
        </div>
        <div class="blank-item">
          <span>姓名</span>
          <input type="text" v-model="name">
        </div>
        <div class="blank-item">
          <span>年龄</span>
          <input type="text" v-model="year">
        </div>
      </div>
      <div class="footer">
        <button type="primary" @click="showFlag = false">取消</button>
        <button type="primary" @click="submitFn">确定</button>
      </div>
    </div> -->

    <a-modal
      v-model:open="showFlag"
      :title="isEdit ? '编辑同学' : '新增同学'"
      ok-text="确认"
      cancel-text="取消"
      @ok="submitFn"
    >
      <a-space
        style="width: 100%;"
        direction="vertical"
      >
        <a-input
          v-model:value="studyNum"
          placeholder="请输入学号"
          :max-length="25"
        />
        <a-input v-model:value="name" placeholder="请输入姓名">
          <template #prefix>
            <user-outlined />
          </template>
          <template #suffix>
            <a-tooltip title="学生姓名">
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </a-tooltip>
          </template>
        </a-input>
        <a-input-number placeholder="请输入年龄" v-model:value="year" :min="18" :max="22" style="width: 100%"/>
      </a-space>
    </a-modal>
    <div class="testCharts w-screen h-96">
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
// import { Modal } from 'ant-design-vue';
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '@/store/user';
import * as echarts from 'echarts';

const userStore = useUserStore();
const { userList } = storeToRefs(userStore);
// 方法不需要是响应式的 storeToRefs 不会去处理方法 需要去userStore结构
const { setUserList } = userStore;

let showFlag = ref(false);
let isEdit = ref(false);
let curIdx = ref(0);

let studyNum = ref(0);
let name = ref('');
let year = ref(0);
let myChart = reactive(null);
// let list = reactive(userList);


const deleteUser = index => {
  userStore.userList.splice(index, 1);
};

const addUser = () => {
  isEdit.value = false;
  showFlag.value = true;
  studyNum.value = '';
  name.value = '';
  year.value = '';
}

const editUser = index => {
  isEdit.value = true;
  curIdx.value = index;
  const item = userStore.userList[index];
  // item.age = 22;
  // todo: 拿到的item信息填入弹窗对应的输入框里
  studyNum.value = item.id;
  name.value = item.userName;
  year.value = item.age;
  showFlag.value = true;
};

const checkList = (code) => {
  for (let index = 0; index < userStore.userList.length; index++) {
    const element = userStore.userList[index];
    if (Number(code) === element.id) {
      return true;
    }
  }
  return false;
}

const addNum2name = (name) => {
  // 将姓名后面追加最新编号
  let total = 0;
  userStore.userList.map(item => {
    if (item.userName.indexOf(name) !== -1) {
      let tempItem = item;
      let tempItemName = tempItem.userName.split('');
      tempItemName.splice(0, name.length);
      let checkItem = isNum(tempItemName.join(''));
      console.log('tempItemName is num:', checkItem);
      if (tempItemName.length === 0 || checkItem) {
        total++;
      }
    }
  })
  return `${name}${total === 0 ? '' : total}`;
}

const isNum = (val) => {
  let exg = /^\d+$/;
  if (!exg.test(val)) {
    return false;
  }
  return true;
}

const submitFn = () => {
  // 输入内容校验
  let studyNumCheck = isNum(studyNum.value);
  if (!studyNumCheck) {
    alert('学号需要为纯数字');
    return;
  }
  let tempName = addNum2name(name.value);
  if (isEdit.value) { // 编辑
    userStore.userList.splice(curIdx.value, 1);
    tempName = name.value;
  }
  let isStudyNumExist = checkList(studyNum.value);
  if (isStudyNumExist) {
    alert('学号已存在');
    return;
  }
  userStore.userList.unshift({
    id: studyNum.value,
    userName: tempName,
    age: year.value
  })
  console.log(userStore.userList);
  showFlag.value = false;
}

const getYourName = id => {
  const student = userStore.userList.find(item => item.id === id);
  alert(student.userName);
};

const refreshEchart = () => {
  // 绘制图表
  myChart.setOption({
    xAxis: {
      type: 'category',
      data: userStore.userList.map(item => {
        return item.userName;
      })
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: userStore.userList.map(item => {
          return item.age;
        }),
        type: 'bar'
      }
    ]
  });
}

watch(
  () => userStore.userList,
  (newValue, oldValue) => {
    refreshEchart();
  },
  { deep: true } // 确保能正确监听到 里面所有变化
);

onMounted(() => {
  myChart = echarts.init(document.getElementsByClassName('testCharts')[0]);
  refreshEchart();
})
</script>

<style lang="less" scoped>

.add-btn {
  background-color: rgba(42, 46, 54, 0.48);
  color: #ffffff;
  width: 90px;
  margin-right: 24px;
}
ul {
  padding-left: 0;
  padding: 0 24px;
  text-align: center;
}
.pop-blank {
  position: absolute;
  background-color: #ffffff;
  border-radius: 8px;
  left: 50%;
  top: 50%;
  width: 50%;
  height: 50vh;
  transform: translate(-50%, -50%);
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
  h2 {
    text-align: center;
  }
  .blank-body {
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .blank-item {
      height: 72px;
      font-size: 24px;
      display: flex;
      span {
        margin-right: 12px;
        width: 60px;
      }
      input {
        height: 36px;
        flex-grow: 1;
        flex-shrink: 1;
        font-size: 16px;
        // width: 100%;
      }
    }
  }
  .footer {
    // position: absolute;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    button {
      background-color: #1677FF;
      color: #ffffff;
    }
    & > button:nth-child(1) {
      margin-right: 12px;
      background-color: #ffffff;
      border: 1px solid #1677FF;
      color: #1677FF;
    }
  }
}
li {
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // margin-bottom: 24px;
  height: 64px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  &:nth-child(1) {
    color: aliceblue;
    background-color: rgba(42, 46, 54, 0.48);
  }
  .No {
    width: 18%;
  }
  .study-code {
    width: 18%;
  }
  .name {
    width: 18%;
  }
  .year {
    width: 18%;
  }
  .operation {
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    & > button {
      background-color: #314659;
      color: #ffffff;
      width: 90px;
    }
  }
}
</style>
