<template>
  <div>
    <canvas ref="canvasRef" class="canvas"></canvas>
    <div ref="polarChartRef" class="polar-chart"></div> 
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
import '@babylonjs/inspector';
import navList from '../utils/navList';
import * as echarts from 'echarts';

let loopIndex = 0;
const canvasRef = ref(null);
const chartRef = ref(null);
const camera = ref(null);
const polarChartRef = ref(null);
const activeKey = ref(0);
const cacheName = reactive([]);

const showModel = ({ position, target }) => {
  animateCamera('position', new BABYLON.Vector3(...position), camera.value);
  animateCamera('target', new BABYLON.Vector3(...target), camera.value);
};

const animateCamera = (type, newPos, camera) => {
  const speed = 60;
  const frameCount = 240;

  const ease = new BABYLON.CubicEase();
  ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
  BABYLON.Animation.CreateAndStartAnimation(
    'animation',
    camera,
    type,
    speed,
    frameCount,
    camera[type],
    newPos,
    0,
    ease
  );
};

const selectModel = (names, animation, scene) => {
  scene.meshes.forEach(mesh => {
    if (cacheName.includes(mesh.name)) {
      mesh.material.albedoColor = scene.cacheMeshColor;
    }
    if (names.includes(mesh.name)) {
      scene.cacheMeshColor = mesh.material.albedoColor;
      cacheName.push(...names);
      mesh.material.albedoColor = new BABYLON.Color3(0, 221 / 255, 1);
      showModel(animation);
    }
  });
};

const ground = scene => {
  const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 12, height: 12 }, scene);
  ground.material = new BABYLON.StandardMaterial('groundMat', scene);
  ground.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
  ground.material.backFaceCulling = false;
  return ground;
};

const addSphere = scene => {
  const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);
  sphere.position.set(0, 3, 0);
  sphere.actionManager = new BABYLON.ActionManager(scene);
  sphere.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
      alert('sphere clicked');
    })
  );
  return sphere;
};

const addDesk = scene => {
  const box = BABYLON.MeshBuilder.CreateBox(
    'box',
    {
      size: 4,
      width: 4,
      height: 0.2,
    },
    scene
  );
  box.position.set(0, 1.9, 0);

  const box1 = BABYLON.MeshBuilder.CreateBox(
    'box1',
    {
      size: 0.2,
      width: 0.2,
      height: 1.8,
    },
    scene
  );
  box1.position.set(1.9, 0.9, 1.9);

  const box2 = BABYLON.MeshBuilder.CreateBox(
    'box2',
    {
      size: 0.2,
      width: 0.2,
      height: 1.8,
    },
    scene
  );
  box2.position.set(-1.9, 0.9, 1.9);

  const box3 = BABYLON.MeshBuilder.CreateBox(
    'box3',
    {
      size: 0.2,
      width: 0.2,
      height: 1.8,
    },
    scene
  );
  box3.position.set(-1.9, 0.9, -1.9);

  const box4 = BABYLON.MeshBuilder.CreateBox(
    'box4',
    {
      size: 0.2,
      width: 0.2,
      height: 1.8,
    },
    scene
  );
  box4.position.set(1.9, 0.9, -1.9);

  const box5 = BABYLON.MeshBuilder.CreateBox(
    'box5',
    {
      size: 0.1,
      width: 3.8,
      height: 0.8,
    },
    scene
  );
  box5.position.set(0, 1.4, -1.95);

  const box6 = BABYLON.MeshBuilder.CreateBox(
    'box6',
    {
      size: 0.4,
      width: 0.2,
      height: 1.8,
    },
    scene
  );
  box6.position.set(-1.9, 0.9, 0);

  const box7 = BABYLON.MeshBuilder.CreateBox(
    'box7',
    {
      size: 0.4,
      width: 0.2,
      height: 1.8,
    },
    scene
  );
  box7.position.set(1.9, 0.9, 0);

  const box8 = BABYLON.MeshBuilder.CreateBox(
    'box8',
    {
      size: 0.1,
      width: 3.8,
      height: 0.8,
    },
    scene
  );
  box8.position.set(0, 1.4, 0);

  const box9 = BABYLON.MeshBuilder.CreateBox(
    'box9',
    {
      size: 0.1,
      width: 3.8,
      height: 0.8,
    },
    scene
  );
  box9.position.set(0, 2.4, 0);
  const boxMaterial = new BABYLON.StandardMaterial('box', scene);
  boxMaterial.diffuseTexture = new BABYLON.Texture('src/assets/zwdzjs.webp', scene);
  boxMaterial.diffuseTexture.uScale = 1;
  boxMaterial.diffuseTexture.vScale = 1;
  boxMaterial.specularColor = new BABYLON.Color3(1, 1, 0);
  box.material = boxMaterial;
  return box;
};

const addTable = scene => {
  const cylinder = BABYLON.MeshBuilder.CreateCylinder('cylinder', { height: 0.2, diameter: 2 }, scene);
  cylinder.position.set(3, 1, 0);
  const cylinder1 = BABYLON.MeshBuilder.CreateCylinder('cylinder1', { height: 0.9, diameter: 0.2 }, scene);
  cylinder1.position.set(2.5, 0.45, 0.5);
  const cylinder2 = BABYLON.MeshBuilder.CreateCylinder('cylinder2', { height: 0.9, diameter: 0.2 }, scene);
  cylinder2.position.set(2.5, 0.45, -0.5);
  const cylinder3 = BABYLON.MeshBuilder.CreateCylinder('cylinder3', { height: 0.9, diameter: 0.2 }, scene);
  cylinder3.position.set(3.5, 0.45, 0.5);
  const cylinder4 = BABYLON.MeshBuilder.CreateCylinder('cylinder4', { height: 0.9, diameter: 0.2 }, scene);
  cylinder4.position.set(3.5, 0.45, -0.5);
};

const initEngine = async () => {
  if (canvasRef.value) {
    const engine = new BABYLON.Engine(canvasRef.value, true);
    const scene = new BABYLON.Scene(engine);
    camera.value = new BABYLON.ArcRotateCamera('camera', Math.PI / 10, Math.PI / 3, 20, BABYLON.Vector3.Zero(), scene);

    camera.value.attachControl(canvasRef.value);
    camera.value.lowerBetaLimit = 0;
    camera.value.upperBetaLimit = Math.PI / 2;
    camera.value.lowerRadiusLimit = 3;
    camera.value.upperRadiusLimit = 40;

    const light = new BABYLON.HemisphericLight('HemisphericLight', new BABYLON.Vector3(0, 1, 0), this);
    light.intensity = 1;
    light.specular = new BABYLON.Color3(1, 1, 0);

    BABYLON.SceneLoader.Append('/model/', 'library_draco.glb', scene, meshes => {
      console.log(meshes);
      showModel(animation);
    });

    engine.runRenderLoop(() => {
      scene.render();
    });

    scene.debugLayer.show({
      embedMode: true,
    });

    window.addEventListener('resize', () => {
      engine.resize();
    });

    initChart();
  }
};

const initChart = () => {
  const chart = echarts.init(chartRef.value);
  const option = {
    backgroundColor: 'transparent',
    textStyle: {
    color: '#ffffff' // 设置全局文字颜色为白色
  },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
  };
  
  chart.setOption(option);
  const polarChart = echarts.init(polarChartRef.value);
  const polarOption = {
    title: [
      {
        text: 'Tangential Polar Bar '
      }
    ],
    polar: {
      radius: [30, '80%']
    },
    angleAxis: {
      max: 4,
      startAngle: 75
    },
    radiusAxis: {
      type: 'category',
      data: ['a', 'b', 'c', 'd']
    },
    tooltip: {},
    series: {
      type: 'bar',
      data: [2, 1.2, 2.4, 3.6],
      coordinateSystem: 'polar',
      label: {
        show: true,
        position: 'middle',
        formatter: '{b}: {c}'
      }
    }
  };
  polarChart.setOption(polarOption);
  
};


onMounted(() => {
  initEngine();
});
</script>

<style scoped>
.canvas {
  width: 100%;
  height: 100vh;
}

.chart {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
  height: 200px;
  background-color: rgba(157, 157, 209, 0.5); /* 透明的蓝色 */
}
.polar-chart {
  position: absolute;
  top: 200px;
  left: 20px;
  width: 300px;
  height: 200px;
  background-color: rgba(157, 157, 209, 0.5); /* 透明的蓝色 */
}

</style>
