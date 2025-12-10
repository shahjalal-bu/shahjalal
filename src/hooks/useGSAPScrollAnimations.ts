import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export const useGSAPScrollAnimations = () => {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Animate elements with data-animate attribute
        const elements = document.querySelectorAll('[data-animate]');

        elements.forEach((element) => {
            gsap.fromTo(
                element,
                {
                    opacity: 0,
                    y: 60,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        });

        // Animate stagger children if they exist
        const staggerContainers = document.querySelectorAll('[data-animate-stagger]');

        staggerContainers.forEach((container) => {
            const children = container.children;

            gsap.fromTo(
                children,
                {
                    opacity: 0,
                    y: 40,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: container,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        });

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);
};
