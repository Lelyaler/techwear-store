import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Сервис: 3D Просмотрщик (Three.js)
 * Инициализирует интерактивную WebGL сцену с процедурными 3D-моделями товаров.
 */
export const Viewer3D = {
  // Хранилище активных WebGL инстансов вьювера по ID товаров
  instances: new Map(),

  /**
   * Инициализация 3D сцены на переданном canvas
   * @param {HTMLCanvasElement} canvas - элемент холста
   * @param {string} productId - ID товара для рендеринга модели
   */
  init(canvas, productId) {
    // Перед созданием чистим старый инстанс для этого товара, если он был
    this.destroy(productId);

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 300;
    const height = rect.height || 400;

    // 1. Инициализация сцены
    const scene = new THREE.Scene();

    // 2. Инициализация камеры
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 3. WebGL Рендерер
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true // Делаем прозрачный фон, чтобы видеть цвет карточки
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Интерактивное управление (Вращение мышкой/свайпом)
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true; // Плавное замедление вращения
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;   // Отключаем зум, чтобы не ломать скролл страницы на мобилках
    controls.autoRotate = true;     // Автоматическое медленное вращение
    controls.autoRotateSpeed = 1.5;

    // 5. Освещение (Неоновая подсветка сцены)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    const dirLightBlue = new THREE.DirectionalLight(0x00f0ff, 0.85); // Cyber Blue
    dirLightBlue.position.set(5, 5, 5);
    scene.add(dirLightBlue);

    const dirLightPink = new THREE.DirectionalLight(0xff0055, 0.85); // Cyber Pink
    dirLightPink.position.set(-5, -5, 5);
    scene.add(dirLightPink);

    // 6. Создание процедурной геометрии товара
    const group = new THREE.Group();
    this.createModel(group, productId);
    scene.add(group);

    // 7. Цикл анимации (Рендеринг и парение)
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      // Эффект левитации в воздухе (плавный синус)
      group.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 8. Обработчик ресайза canvas
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Сохраняем ссылки для очистки при уничтожении
    this.instances.set(productId, {
      scene,
      renderer,
      camera,
      controls,
      animationFrameId,
      handleResize
    });
  },

  /**
   * Сборка 3D-модели товара из базовых примитивов
   */
  createModel(group, id) {
    // Базовый темный текстурированный металл
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x111316,
      metalness: 0.85,
      roughness: 0.2
    });

    // Светящиеся неоновые материалы (самосвечение)
    const blueNeonMaterial = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const pinkNeonMaterial = new THREE.MeshBasicMaterial({ color: 0xff0055 });
    const greenNeonMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff66 });

    switch (id) {
      case 'mod-jacket-x1': {
        // X-1 Jacket: модульный бронежилет
        // Корпус
        const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.45, 2.2, 8), metalMaterial);
        group.add(torso);

        // Плечи-модули
        const shoulderL = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 0.45), metalMaterial);
        shoulderL.position.set(-0.85, 0.8, 0);
        const shoulderR = shoulderL.clone();
        shoulderR.position.set(0.85, 0.8, 0);
        group.add(shoulderL, shoulderR);

        // Светящиеся полосы (Torus)
        const stripe1 = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.03, 8, 24), blueNeonMaterial);
        stripe1.rotation.x = Math.PI / 2;
        stripe1.position.y = 0.35;
        const stripe2 = stripe1.clone();
        stripe2.position.y = -0.35;
        group.add(stripe1, stripe2);
        break;
      }
      
      case 'mod-rig-c3': {
        // C-3 Rig: нагрудная плита с неоновым ядром
        const plate = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.3, 0.2), metalMaterial);
        group.add(plate);

        // Ремни
        const strapL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.0, 0.08), metalMaterial);
        strapL.position.set(-0.55, 0.2, 0);
        strapL.rotation.z = 0.12;
        const strapR = strapL.clone();
        strapR.position.set(0.55, 0.2, 0);
        strapR.rotation.z = -0.12;
        group.add(strapL, strapR);

        // Розовый энергетический круг
        const core = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.08, 16), pinkNeonMaterial);
        core.rotation.x = Math.PI / 2;
        core.position.set(0, 0, 0.11);
        group.add(core);
        break;
      }

      case 'mod-backpack-b5': {
        // B-5 Backpack: угловатый рюкзак с зелеными рамками
        const body = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.1, 0.8), metalMaterial);
        group.add(body);

        // Подсумки по бокам
        const pocketL = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.1, 0.5), metalMaterial);
        pocketL.position.set(-0.8, -0.2, 0);
        const pocketR = pocketL.clone();
        pocketR.position.set(0.8, -0.2, 0);
        group.add(pocketL, pocketR);

        // Зеленые неоновые контуры
        const line1 = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.04, 0.82), greenNeonMaterial);
        line1.position.y = 0.7;
        const line2 = line1.clone();
        line2.position.y = -0.7;
        group.add(line1, line2);
        break;
      }

      case 'mod-visor-g9': {
        // G-9 Visor: изогнутые очки
        const frame = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.12, 8, 24, Math.PI), metalMaterial);
        frame.rotation.x = Math.PI / 2;
        group.add(frame);

        // Светящееся неоновое стекло
        const glass = new THREE.Mesh(
          new THREE.CylinderGeometry(1.16, 1.16, 0.5, 24, 1, true, 0, Math.PI),
          blueNeonMaterial
        );
        glass.rotation.x = Math.PI / 2;
        glass.position.y = -0.15;
        group.add(glass);
        break;
      }

      case 'mod-gloves-gl2': {
        // GL-2 Gloves: тактическая накладка с неоновыми костяшками
        const basePlate = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.3, 0.15), metalMaterial);
        group.add(basePlate);

        // Розовые светящиеся сферы защиты
        for (let i = 0; i < 4; i++) {
          const knuckle = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), pinkNeonMaterial);
          knuckle.position.set(-0.45 + i * 0.3, 0.7, 0.1);
          group.add(knuckle);
        }

        const cuff = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.25, 0.25), metalMaterial);
        cuff.position.set(0, -0.6, 0);
        group.add(cuff);
        break;
      }

      case 'mod-sneakers-s7': {
        // S-7 Sneakers: футуристичный ботинок на зеленой платформе
        const sole = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.32, 1.0), greenNeonMaterial);
        sole.position.y = -0.75;
        group.add(sole);

        const body = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.85, 0.9), metalMaterial);
        body.position.y = -0.25;
        group.add(body);

        const ankle = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), metalMaterial);
        ankle.position.set(-0.35, 0.35, 0);
        group.add(ankle);
        break;
      }

      default: {
        // Универсальный модуль-контейнер
        const cube = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 1.4), metalMaterial);
        group.add(cube);
        
        const wire = new THREE.Mesh(new THREE.BoxGeometry(1.44, 1.44, 1.44), blueNeonMaterial);
        group.add(wire);
      }
    }
  },

  /**
   * Полное уничтожение сцены и освобождение ресурсов WebGL
   * @param {string} productId - ID товара
   */
  destroy(productId) {
    const instance = this.instances.get(productId);
    if (!instance) return;

    console.log(`🧹 [3D Viewer] Disposing WebGL resources for: ${productId}`);
    
    // Удаляем обработчик ресайза
    window.removeEventListener('resize', instance.handleResize);
    
    // Останавливаем цикл анимации
    cancelAnimationFrame(instance.animationFrameId);
    
    // Освобождаем OrbitControls
    instance.controls.dispose();
    
    // Освобождаем WebGLRenderer
    instance.renderer.dispose();
    
    // Очищаем вьюер из хэш-карты
    this.instances.delete(productId);
  }
};
