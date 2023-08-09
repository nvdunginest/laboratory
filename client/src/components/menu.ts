import { IconProp } from '@fortawesome/fontawesome-svg-core';
type MenuModel = {
  id: number;
  path: string;
  text: string;
  icon: IconProp;
}

export const guestMenu: MenuModel[] = [
  { id: 0, path: '/', text: 'Trang chủ', icon: 'home' },
  { id: 1, path: '/login', text: 'Đăng nhập', icon: 'sign-in-alt' },
  { id: 2, path: '/register', text: 'Đăng ký', icon: 'user-plus' },
//  { id: 3, path: '/help', text: 'Hướng dẫn', icon: 'question-circle' },
];

export const menu: MenuModel[] = [
  { id: 0, path: '/', text: 'Trang chủ', icon: 'home' },
  { id: 1, path: '/my-package-list', text: 'Gói thầu tham gia', icon: 'list-ul' },
  { id: 2, path: '/manage', text: 'Quản lý tài khoản', icon: 'user-cog' },
//  { id: 3, path: '/help', text: 'Hướng dẫn', icon: 'question-circle' },
];