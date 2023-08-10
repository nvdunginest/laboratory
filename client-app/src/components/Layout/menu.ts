import { IconProp } from '@fortawesome/fontawesome-svg-core';
type MenuModel = {
  id: number;
  path: string;
  text: string;
  icon: IconProp;
}

export const menu: MenuModel[] = [
  { id: 0, path: '/', text: 'Trang chủ', icon: 'home' },
  { id: 1, path: '/search', text: 'Tra cứu yêu cầu', icon: 'search' },
];