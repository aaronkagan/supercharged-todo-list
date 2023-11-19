import bgMobileLight from './assets/images/bg-mobile-light.jpg';
import bgMobileDark from './assets/images/bg-mobile-dark.jpg';
import bgDesktopLight from './assets/images/bg-desktop-light.jpg';
import bgDesktopDark from './assets/images/bg-desktop-dark.jpg';

export const lightTheme = {
  bgColor: '#FAFAFA',
  backgroundImageMobile: bgMobileLight,
  backgroundImageDesktop: bgDesktopLight,
  checkCircle: '#e3e4f1',
  todoBg: '#fff',
  todoColor: '#494C6B',
  todoPlaceholderColor: '#9495A5',
  todoListBottomColor: '#9495A5',
  todoListBoxShadow: '0px 35px 50px -15px rgba(194, 195, 214, 0.5)',
  todoItemBorder: '#E3E4F1'
};
export const darkTheme = {
  bgColor: '#000',
  backgroundImageMobile: bgMobileDark,
  backgroundImageDesktop: bgDesktopDark,
  checkCircle: '#393A4B',
  todoBg: '#25273D',
  todoColor: '#C8CBE7',
  todoPlaceholderColor: '#767992',
  todoListBottomColor: '#5B5E7E',
  todoListBoxShadow: 'unset',
  todoItemBorder: '#393A4B'
};
