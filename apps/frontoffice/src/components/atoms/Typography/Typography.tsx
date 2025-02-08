import React from 'react';

import clsxm from '@/utils/clsxm';

import { outfit, roboto } from '@/components/atoms/FontInitializer';

import { BreakWords, FontFamily, FontWeight, Gradiant, HTMLTag, TextAlign, TextColor, TextTransform, VariantType } from './interface';
import { MarginRestrictedClassnames } from '@/utils/tailwind';

type Shade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type Props = {
  children: React.ReactNode;
  variant?: VariantType;
  tag?: HTMLTag;
  align?: TextAlign;
  breakWords?: BreakWords;
  ellipsis?: boolean;
  onClick?: () => void;
  transform?: TextTransform;
  weight?: FontWeight;
  color?: TextColor;
  gradiant?: Gradiant;
  customColor?: string;
  withCarriageReturn?: boolean;
  customColorClass?: `text-${TextColor}-${Shade}`;
  customClassName?: string;
  marginClassName?: MarginRestrictedClassnames;
  fontFamily?: FontFamily;
};

export const VARIANT_TO_TAG: Record<VariantType, HTMLTag> = {
  title: 'h1',
  heroTitle: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  cardTitle: 'h3',
  componentTitle: 'h1',
  componentSmallTitle: 'h1',
  small: 'p',
  paragraph: 'p',
  paragraph2: 'p',
  paragraph3: 'p',
  formTitle: 'p',
  extraSmall: 'p'
};

export const Typography = ({
  children,
  variant,
  tag,
  align,
  breakWords,
  ellipsis = false,
  weight,
  transform,
  color,
  gradiant,
  customColor,
  customColorClass,
  withCarriageReturn,
  marginClassName,
  customClassName,
  fontFamily
}: Props) => {
  const CustomTag = tag ? tag : (variant && VARIANT_TO_TAG[variant]) || 'p';
  const appliedColor = customColor || undefined;

  return (
    <CustomTag
      data-testid="typography"
      style={{ color: appliedColor }}
      className={clsxm(
        'align-left font-normal ',
        marginClassName,
        customClassName,
        [
          variant === 'title' && 'md:text-[58px] md:leading-[58px] font-medium text-[38px] leading-[38px]',
          variant === 'heroTitle' && 'font-medium text-[34px] leading-[34px] md:text-[58px] md:leading-[58px]',
          variant === 'h1' && 'font-900 text-3xl',
          variant === 'h2' && 'font-900 text-2xl',
          variant === 'h3' && 'font-900 text-xl',
          variant === 'h4' && 'font-900 text-lg',
          variant === 'h5' && 'font-900 text-md',
          variant === 'componentTitle' && 'md:text-[52px] md:leading-[62px] font-medium text-[28px] leading-[34px]',
          variant === 'componentSmallTitle' && 'md:text-[22px] md:leading-[29px] font-semibold text-xl',
          variant === 'cardTitle' && 'text-xl font-semibold',
          variant === 'paragraph' && 'font-500 text-base md:text-base leading-5',
          variant === 'paragraph2' && 'font-normal text-lg',
          variant === 'paragraph3' && 'font-normal text-base md:text-lg',
          variant === 'small' && 'md:text-base text-sm',
          variant === 'extraSmall' && 'text-[10px] leading-3'
        ],
        [breakWords === 'all' && 'break-all', breakWords === 'words' && 'break-words', breakWords === 'normal' && 'break-normal'],
        ellipsis && 'truncate',
        [
          align === 'left' && 'text-left',
          align === 'center' && 'text-center',
          align === 'right' && 'text-right',
          align === 'justify' && 'text-justify'
        ],
        [transform === 'capitalize' && 'capitalize', transform === 'uppercase' && 'uppercase', transform === 'lowercase' && 'lowercase'],
        [
          weight === 'light' && 'font-light',
          weight === 'regular' && 'font-normal',
          weight === 'medium' && 'font-medium',
          weight === 'semibold' && 'font-semibold',
          weight === 'bold' && 'font-bold',
          weight === 'extrabold' && 'font-extrabold'
        ],
        [
          color === 'primary' && 'text-primary-900',
          color === 'secondary' && 'text-secondary-900',
          color === 'tertiary' && 'text-tertiary-900',
          color === 'gray' && 'text-gray-700',
          color === 'darkGray' && 'text-[#6D6D88]',
          color === 'lightGray' && 'text-[#9393A8]',
          color === 'white' && 'text-white',
          color === 'black' && 'text-black',
          color === 'red' && 'text-[#EF4343]',
          color === 'orange' && 'text-orange-500',
          color === 'blue' && 'text-[#140B7C]',
          color === 'success' && 'text-[#2CB661]',
          color === 'darkBlue' && 'text-slate-900'
        ],
        [
          gradiant === 'primary' &&
            'from-secondary-600 via-primary-500 to-secondary-500 animate-text bg-gradient-to-r bg-clip-text text-transparent font-black',
          gradiant === 'secondary' &&
            'from-blue-600 via-[#140B7C] to-white animate-text bg-gradient-to-r bg-clip-text text-transparent font-black',
          gradiant === 'tertiary' &&
            'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-primary-800 via-red-400/60 to-secondary-700 animate-text bg-clip-text text-transparent font-black',
          gradiant === 'quatro' &&
            'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-400 to-rose-800 animate-text bg-clip-text text-transparent font-black',
          gradiant === 'cinquo' && 'bg-gradient-to-r from-white to-slate-600 animate-text bg-clip-text text-transparent font-black',
          gradiant === 'star' && 'bg-gradient-to-r from-white to-slate-300 animate-text bg-clip-text text-transparent font-black'
        ],
        [fontFamily === 'outfit' && `${outfit.variable} font-outfit`, fontFamily === 'roboto' && `${roboto.variable} font-roboto`],
        customColorClass && customColorClass,
        withCarriageReturn && 'whitespace-pre-line'
      )}
    >
      {children}
    </CustomTag>
  );
};
