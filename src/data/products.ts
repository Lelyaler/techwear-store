import { Product } from '../types';

import jacketImg from '../assets/jacket.webp';
import chestRigImg from '../assets/chest-rig.webp';
import backpackImg from '../assets/backpack.webp';
import visorImg from '../assets/visor.webp';
import glovesImg from '../assets/gloves.webp';
import sneakersImg from '../assets/sneakers.webp';
import maskImg from '../assets/mask.webp';
import trenchImg from '../assets/trench.webp';
import vestImg from '../assets/vest.webp';
import slingImg from '../assets/sling.webp';
import exoGlovesImg from '../assets/exo-gloves.webp';
import bootsImg from '../assets/boots.webp';
import shadowVisorImg from '../assets/shadow-visor.webp';
import legExoImg from '../assets/leg-exo.webp';
import stealthCloakImg from '../assets/stealth-cloak.webp';

export const PRODUCTS: Product[] = [
  {
    id: 'mod-jacket-x1',
    name: 'X-1 Shadow Shell Jacket',
    price: 289,
    image: jacketImg,
    category: 'SHELL',
    badge: 'Shell Module',
    badgeClass: 'blue',
    specs: ['Waterproof 20,000mm', 'Cordura 500D Ripstop', 'Molle Quick-Mount Clips'],
    description: 'Мембранная штормовая куртка с водонепроницаемыми молниями YKK Aquaguard и модульными точками крепления навесных карманов.',
    material: '3-Layer eVent + Cordura 500D',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'mod-rig-c3',
    name: 'C-3 Chest Harness Rig',
    price: 145,
    image: chestRigImg,
    category: 'CORE',
    badge: 'Core Module',
    badgeClass: 'pink',
    specs: ['Tactical Webbing', 'Laser Cut Molle', 'Fidlock V-Buckle'],
    description: 'Анатомический нагрудный риг с быстросбросами Fidlock для оперативного доступа к снаряжению и планшету.',
    material: 'Mil-Spec Nylon 1000D',
    sizes: ['ONE-SIZE']
  },
  {
    id: 'mod-backpack-b5',
    name: 'B-5 Modular Assault Pack 25L',
    price: 195,
    image: backpackImg,
    category: 'CARGO',
    badge: 'Cargo Module',
    badgeClass: 'green',
    specs: ['Waterproof Zip', '25L Volume', 'Modular Pouch Rails'],
    description: 'Городской рюкзак с отделением под защищенный ноутбук до 16 дюймов и расширяемыми внешними рельсами под подсумки.',
    material: 'X-Pac VX21 + Hypalon',
    sizes: ['ONE-SIZE']
  },
  {
    id: 'mod-visor-g9',
    name: 'G-9 Tactical Anti-Glare Visor',
    price: 95,
    image: visorImg,
    category: 'CORE',
    badge: 'Core Module',
    badgeClass: 'blue',
    specs: ['Photochromic Tint', 'Anti-Fog Hydrophobic', 'UV400 Filter'],
    description: 'Легкий баллистический визор с адаптивным светофильтром и защитой глаз от осадков, ультрафиолета и ветра.',
    material: 'Polycarbonate Optical Grade',
    sizes: ['ONE-SIZE']
  },
  {
    id: 'mod-gloves-gl2',
    name: 'GL-2 Reinforced Tactical Gloves',
    price: 75,
    image: glovesImg,
    category: 'SHELL',
    badge: 'Shell Module',
    badgeClass: 'pink',
    specs: ['Carbon Knuckle Guard', 'Touchscreen Conductive', 'High-Grip Palm'],
    description: 'Перчатки с усиленной углепластиковой защитой костяшек и сенсорным напылением на указательном и большом пальцах.',
    material: 'Goatskin + Kevlar Threading',
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'mod-sneakers-s7',
    name: 'S-7 Modular Cyber Sneakers',
    price: 220,
    image: sneakersImg,
    category: 'CARGO',
    badge: 'Cargo Module',
    badgeClass: 'green',
    specs: ['Vibram MegaGrip', 'Reflective Accents', 'Quick-Lace BOA Dial'],
    description: 'Внедорожные городские кроссовки с системой быстрой затяжки BOA и подошвой с глубоким протектором.',
    material: 'Cordura Mesh + TPU Welds',
    sizes: ['40', '41', '42', '43', '44', '45']
  },
  {
    id: 'mod-mask-m1',
    name: 'M-1 Rebreather Urban Mask',
    price: 120,
    image: maskImg,
    category: 'CORE',
    badge: 'Core Module',
    badgeClass: 'pink',
    specs: ['HEPA H13 Filtration', 'Dual Exhalation Valves', 'Neoprene Seal'],
    description: 'Урбанистический респиратор с клапанами быстрого выдоха и сменными фильтрами стандарта защиты N99/HEPA.',
    material: 'Medical Silicone + Neoprene',
    sizes: ['M', 'L']
  },
  {
    id: 'mod-trench-x2',
    name: 'X-2 Modular Commuter Trench',
    price: 310,
    image: trenchImg,
    category: 'SHELL',
    badge: 'Shell Module',
    badgeClass: 'blue',
    specs: ['Schoeller NanoSphere', 'Detachable Storm Hood', 'Internal Sling'],
    description: 'Технологичный тренч удлиненного кроя со скрытыми стропами для ношения через плечо в сложенном виде.',
    material: 'Schoeller Dryskin 3XDRY',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'mod-vest-v8',
    name: 'V-8 Recon Lightweight Vest',
    price: 180,
    image: vestImg,
    category: 'CORE',
    badge: 'Core Module',
    badgeClass: 'pink',
    specs: ['Laser-Cut Hypalon', 'Modular Pockets', 'Mesh Ventilation'],
    description: 'Вентилируемый жилет с модульным креплением утилитарных карманов и быстрой регулировкой по бокам.',
    material: 'Cordura 330D + Spacer Mesh',
    sizes: ['S/M', 'L/XL']
  },
  {
    id: 'mod-sling-b6',
    name: 'B-6 Cobra Messenger Sling',
    price: 135,
    image: slingImg,
    category: 'CARGO',
    badge: 'Cargo Module',
    badgeClass: 'green',
    specs: ['AustriAlpin Cobra', 'Ambush Zip Opening', 'Weatherproof Body'],
    description: 'Слинг-сумка с оригинальной пряжкой AustriAlpin Cobra 25mm и быстрым доступом на ходу.',
    material: 'Ballistic Nylon 1050D',
    sizes: ['ONE-SIZE']
  },
  {
    id: 'mod-gloves-gl5',
    name: 'GL-5 Exo Reinforcement Gloves',
    price: 95,
    image: exoGlovesImg,
    category: 'SHELL',
    badge: 'Shell Module',
    badgeClass: 'pink',
    specs: ['TPU Finger Ribs', 'Kevlar Palm Shield', 'Thermal Lining'],
    description: 'Утепленные демисезонные перчатки с сегментированной полимерной защитой пальцев.',
    material: 'Kevlar + Pittards Leather',
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 'mod-boots-bt9',
    name: 'BT-9 High-Traction Armored Boots',
    price: 260,
    image: bootsImg,
    category: 'CARGO',
    badge: 'Cargo Module',
    badgeClass: 'green',
    specs: ['Composite Toe Box', 'SympaTex Membrane', 'Shock Absorption Heel'],
    description: 'Высокие тактические ботинки с влагозащитной мембраной SympaTex и защитным носком из композита.',
    material: 'Full-Grain Leather + Cordura 1000D',
    sizes: ['41', '42', '43', '44', '45']
  },
  {
    id: 'mod-visor-shadow',
    name: 'M-9 Obsidian Tactical HUD Visor',
    price: 450,
    image: shadowVisorImg,
    category: 'BLACKMARKET',
    badge: 'Black Market',
    badgeClass: 'pink',
    specs: ['Polarized OLED HUD', 'Integrated Telemetry', 'Titanium Frame'],
    description: 'Лимитированная серия визора с поляризованной титановой оправой и проекционной индикацией состояния.',
    material: 'Grade 5 Titanium + Carbon',
    sizes: ['ONE-SIZE']
  },
  {
    id: 'mod-leg-exo',
    name: 'EXO-7 Kinetic Leg Exoskeleton',
    price: 750,
    image: legExoImg,
    category: 'BLACKMARKET',
    badge: 'Black Market',
    badgeClass: 'pink',
    specs: ['Carbon Fiber Struts', 'Kinetic Energy Recoil', 'Quick Quick-Release'],
    description: 'Кинетическая навесная система для разгрузки коленных суставов при длительных пеших переходах.',
    material: 'Pre-Preg Carbon Fiber + 7075 Aluminum',
    sizes: ['M', 'L']
  },
  {
    id: 'mod-cloak-stealth',
    name: 'N-3 Spectral Urban Cloak',
    price: 600,
    image: stealthCloakImg,
    category: 'BLACKMARKET',
    badge: 'Black Market',
    badgeClass: 'pink',
    specs: ['IR Heat Dispersion', 'Magnetic Closure Pins', 'Featherweight Fabric'],
    description: 'Эксклюзивная накидка-пончо с экранирующим металлизированным слоем и рассеиванием теплового следа.',
    material: 'Graphene Infused Polyamide',
    sizes: ['ONE-SIZE']
  }
];

export const AVAILABLE_PROMOS: Record<string, number> = {
  'TECH20': 20,
  'NEOHACK20': 20,
  'TACTICAL15': 15,
  'RECON10': 10
};
