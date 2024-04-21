export const categories = [
  {
    id: 1,
    title: 'Placas base',
    imageUrl: 'https://cdn.pccomponentes.com/img/repositorio/familia/familia-placas_base-500x500-producto.jpg',
  },
  {
    id: 2,
    title: 'Procesadores',
    imageUrl: 'https://cdn.pccomponentes.com/img/repositorio/familia/familia-procesadores-500x500-producto.jpg',
  },
  {
    id: 3,
    title: 'Disco duro (HDD/SSD)',
    imageUrl: 'https://cdn.pccomponentes.com/img/repositorio/familia/familia-discos_duros-500x500-producto.jpg',
  },
  {
    id: 4,
    title: 'Tarjeta gráfica (GPU)',
    imageUrl: 'https://cdn.pccomponentes.com/img/repositorio/familia/familia-tarjetas_graficas-500x500-producto.jpg',
  },
  {
    id: 5,
    title: 'Memoria RAM',
    imageUrl: 'https://cdn.pccomponentes.com/img/repositorio/familia/familia-memorias_ram-500x500-producto.jpg',
  },
  {
    id: 6,
    title: 'Ventilador/Cooler',
    imageUrl: 'https://img.pccomponentes.com/pcblog/1690754400000/componetes-refrigeracion-liquida-500x500.png',
  },
  {
    id: 7,
    title: 'Tarjeta de sonido',
    imageUrl: 'https://cdn.pccomponentes.com/img/repositorio/familia/familia-tarjetas_sonido-500x500-producto.jpg',
  },
  {
    id: 8,
    title: 'Gabinetes',
    imageUrl: 'https://cdn.pccomponentes.com/img/repositorio/familia/familia-torres_cajas-500x500-producto.jpg',
  },
  {
    id: 9,
    title: 'Fuente de alimentación (PSU)',
    imageUrl: 'https://cdn.pccomponentes.com/img/repositorio/familia/familia-fuentes_alimentacion-500x500-producto.jpg',
  },
  {
    id: 10,
    title: 'Unidad de disco óptico (DVD/Blu-ray)',
    imageUrl:
      'https://thumb.pccomponentes.com/w-530-530/articles/8/84595/lg-ultra-slim-gp57es40-grabadora-externa-dvd-silver-1.jpg',
  },
  {
    id: 11,
    title: 'Tarjeta de red (Ethernet/Wi-Fi)',
    imageUrl: 'https://media.owcnow.com/image/upload/w_1400,f_auto,q_auto/owc-10g-ethernet-pcie-network-card-hero-left',
  },
];

export const products = [
  {
    categoryId: 2,
    items: [
      {
        id: 1,
        title: 'AMD Ryzen 7 7800X3D 4.2 GHz/5 GHz AMD Ryzen 7 7800X3D 4.2 GHz/5 GHz AMD Ryzen 7 7800X3D 4.2 GHz/5 GHz',
        price: 799000,
        imageUrl:
          'https://thumb.pccomponentes.com/w-530-530/articles/1066/10665103/1575-amd-ryzen-7-7800x3d-42-ghz-5-ghz.jpg',
        stock: 30,
      },
      {
        id: 2,
        title: 'AMD Ryzen 7 5800X 3.8GHz',
        price: 559000,
        imageUrl: 'https://thumb.pccomponentes.com/w-530-530/articles/32/328473/168-amd-ryzen-7-5800x-38ghz.jpg',
        stock: 25,
      },
      {
        id: 3,
        title: 'Intel Core i5-12400F 2.5 GHz',
        price: 330000,
        imageUrl: 'https://thumb.pccomponentes.com/w-530-530/articles/83/834922/1636-intel-core-i5-12400f-44-ghz.jpg',
        stock: 18,
      },
    ],
  },
];

export const userTypes = [
  {
    id: 1,
    userType: "seller",
    description: "Vendedor",
  },
  {
    id: 2,
    userType: "buyer",
    description: "Comprador",
  },
];

export const adminScreens = [
  {
    id: 1,
    screen: 'products',
    description: "Products",
  },
  {
    id: 2,
    screen: 'users',
    description: "Usuarios",
  },
];
