import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  // let userName = ref('张三111');
  let userList = reactive([
    {
      id: 220812022,
      userName: '刘淑文',
      age: 18
    },
    {
      id: 220812008,
      userName: '蔡欣怡',
      age: 18
    },
    {
      id: 220812030,
      userName: '龙依依',
      age: 18
    },
    {
      id: 220812031,
      userName: '杨旭欣',
      age: 19
    },
    {
      id: 220812032,
      userName: '胡高雪',
      age: 19
    },
    {
      id: 220812033,
      userName: '屈卉',
      age: 20
    },
    {
      id: 220812034,
      userName: '朱思颖',
      age: 21
    }
  ]);
  
  // const setUserName = (newName) => {
  //   userName.value = newName;
  // };

  const setUserList = (newList) => {
    userList = newList;
  };

  return {
    // userName,
    userList,
    // setUserName,
    setUserList
  };
});