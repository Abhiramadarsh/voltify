/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'phone' | 'led' | 'gaming' | 'gadgets';
  image: string;
  rating: number;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  // Phone Accessories
  {
    id: 'p1',
    name: 'VoltCharge GaN 65W',
    description: 'Ultra-compact fast charger for smartphones and laptops.',
    price: 129,
    category: 'phone',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    featured: true
  },
  {
    id: 'p2',
    name: 'ArmorCase Pro',
    description: 'Military-grade protection with a sleek carbon fiber finish.',
    price: 69,
    category: 'phone',
    image: 'https://images.unsplash.com/photo-1623393945964-8f5d573f9358?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.5
  },
  {
    id: 'p3',
    name: 'MagLink Braided Cable',
    description: '2-meter USB-C to USB-C heavy-duty braided cable.',
    price: 49,
    category: 'phone',
    image: 'https://images.unsplash.com/photo-1595756630452-736bc8ef3693?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.9
  },

  // LED Lights
  {
    id: 'l1',
    name: 'RGB Lamb',
    description: '5m adhesive RGBIC LED strip with app and voice control.',
    price: 89,
    category: 'led',
    image: 'https://images.unsplash.com/photo-1621177555630-b861919c864f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.7,
    featured: true
  },
  {
    id: 'l2',
    name: 'GlowBar Ambient Light',
    description: 'Dual smart bars for synchronized TV and monitor lighting.',
    price: 159,
    category: 'led',
    image: 'https://plus.unsplash.com/premium_photo-1673468922209-036f7659642f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.6
  },

  // Gaming Desk
  {
    id: 'g1',
    name: 'Apex RGB Mousepad',
    description: 'Extra-large professional gaming surface with 12 lighting modes.',
    price: 99,
    category: 'gaming',
    image: 'https://images.unsplash.com/photo-1636036758527-266adfee3fcf?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.8,
    featured: true
  },
  {
    id: 'g2',
    name: 'SonicRest Headphone Stand',
    description: 'Aluminum stand with built-in USB 3.0 ports.',
    price: 119,
    category: 'gaming',
    image: 'https://images.unsplash.com/photo-1760377821978-636dcc65eb48?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.4
  },

  // Gadgets
  {
    id: 'bt1',
    name: 'VoltBuds Air',
    description: 'Active noise cancelling wireless earbuds with 30h battery life.',
    price: 199,
    category: 'gadgets',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    featured: true
  },
  {
    id: 'bt2',
    name: 'MiniBeam Projector',
    description: 'Portable 1080p LED projector with Wi-Fi screen mirroring.',
    price: 349,
    category: 'gadgets',
    image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.3
  }
];
