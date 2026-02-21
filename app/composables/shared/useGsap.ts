import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export const useGsap = () => {
  return {
    gsap,
    ScrollTrigger,
    SplitText,
  };
};
