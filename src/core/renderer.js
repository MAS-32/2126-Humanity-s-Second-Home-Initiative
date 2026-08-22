/* 基础：renderer/scene/camera/controls/composer/灯光
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L251-290，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { CONFIG } from './config.js';

/* ================= 基础 ================= */
const R = 50;
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x02040a);

const camera = new THREE.PerspectiveCamera(48, innerWidth/innerHeight, 0.05, 8000);
camera.position.set(-40, 90, 340);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 64;
controls.maxDistance = 700;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.45;
// 电脑端：左键拖动旋转 / 滚轮缩放；移动端：单指旋转 / 双指捏合缩放
controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);   // 地表城市模式会切换 renderPass.scene
composer.addPass(renderPass);
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.5, 0.45, 0.82);
composer.addPass(bloom);
composer.addPass(new OutputPass());

const sunDir = new THREE.Vector3(0.78, 0.32, 0.54).normalize();
const sun = new THREE.DirectionalLight(0xfff0dd, 2.4);
sun.position.copy(sunDir).multiplyScalar(400);
scene.add(sun);
scene.add(new THREE.AmbientLight(0x46536a, 0.32));
scene.add(new THREE.HemisphereLight(0x8fb4d8, 0x3a2418, 0.35));

export { R, renderer, scene, camera, controls, composer, renderPass, sunDir, sun };
