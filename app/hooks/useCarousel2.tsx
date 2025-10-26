'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Types
interface CarouselItem {
  id: number;
  url: string;
  title: string;
}

interface UseCarousel2Options {
  itemCount: number;
  initialIndex?: number;
  visibleRange?: number;
}

interface UseCarousel2Return {
  activeIndex: number;
  goToIndex: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  getCarouselProps: () => {
    className: string;
  };
  getItemProps: (index: number) => {
    onClick: () => void;
    className: string;
    style: React.CSSProperties;
    'data-active': boolean;
    'data-visible': boolean;
  };
  getNavigationProps: (direction: 'prev' | 'next') => {
    onClick: () => void;
    className: string;
    'aria-label': string;
  };
  getDotProps: (index: number) => {
    onClick: () => void;
    className: string;
    'aria-label': string;
    'data-active': boolean;
  };
}

// Custom Hook
export function useCarousel2({
  itemCount,
  initialIndex = 2,
  visibleRange = 2,
}: UseCarousel2Options): UseCarousel2Return {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const getPosition = useCallback((index: number) => {
    return index - activeIndex;
  }, [activeIndex]);

  const goToIndex = useCallback((index: number) => {
    if (index >= 0 && index < itemCount) {
      setActiveIndex(index);
    }
  }, [itemCount]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev === itemCount - 1 ? 0 : prev + 1));
  }, [itemCount]);

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? itemCount - 1 : prev - 1));
  }, [itemCount]);

  const getCarouselProps = useCallback(() => ({
    className: 'perspective-1000',
  }), []);

  const getItemProps = useCallback((index: number) => {
    const position = getPosition(index);
    const isActive = position === 0;
    const isAdjacent = Math.abs(position) === 1;
    const isVisible = Math.abs(position) <= visibleRange;

    return {
      onClick: () => goToIndex(index),
      className: `transition-all absolute duration-700 ease-out cursor-pointer ${
        isActive ? 'z-30' : isAdjacent ? 'z-20' : 'z-10'
      }`,
      style: {
        transform: `
          translateX(${position * 280}px)
          translateZ(${-Math.abs(position) * 200}px)
          scale(${isActive ? 1 : 0.7 - Math.abs(position) * 0.15})
          rotateY(${position * 15}deg)
        `,
        opacity: isActive ? 1 : 0.5 - Math.abs(position) * 0.1,
        display: isVisible ? 'block' : 'none',
      },
      'data-active': isActive,
      'data-visible': isVisible,
    };
  }, [activeIndex, visibleRange, goToIndex, getPosition]);

  const getNavigationProps = useCallback((direction: 'prev' | 'next') => ({
    onClick: direction === 'next' ? goToNext : goToPrevious,
    className: 'bg-white/10 hover:bg-white/20 text-white rounded-full p-4 backdrop-blur-sm transition-all duration-300 hover:scale-110',
    'aria-label': direction === 'next' ? 'Next image' : 'Previous image',
  }), [goToNext, goToPrevious]);

  const getDotProps = useCallback((index: number) => ({
    onClick: () => goToIndex(index),
    className: `w-2 h-2 rounded-full transition-all duration-300 ${
      index === activeIndex
        ? 'bg-purple-400 w-8'
        : 'bg-white/30 hover:bg-white/50'
    }`,
    'aria-label': `Go to image ${index + 1}`,
    'data-active': index === activeIndex,
  }), [activeIndex, goToIndex]);

  return {
    activeIndex,
    goToIndex,
    goToNext,
    goToPrevious,
    getCarouselProps,
    getItemProps,
    getNavigationProps,
    getDotProps,
  };
}