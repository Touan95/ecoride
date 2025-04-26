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
  htmlFor?: string;
};

export const VARIANT_TO_TAG: Record<VariantType, HTMLTag> = {
  title: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  cardTitle: 'h3',
  cardTitleSm: 'h3',
  small: 'p',
  paragraph: 'p',
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
  color = 'primary',
  gradiant,
  customColor,
  customColorClass,
  withCarriageReturn,
  marginClassName,
  customClassName,
  fontFamily,
  htmlFor
}: Props) => {
  const CustomTag = htmlFor ? 'label' : tag ? tag : (variant && VARIANT_TO_TAG[variant]) || 'p';
  const appliedColor = customColor || undefined;

  return (
    <CustomTag
      data-testid="typography"
      style={{ color: appliedColor }}
      htmlFor={htmlFor}
      className={clsxm(
        'align-left font-normal ',
        marginClassName,
        customClassName,
        [
          variant === 'title' && 'font-medium text-[38px]',
          variant === 'h1' && 'font-900 text-3xl',
          variant === 'h2' && 'font-900 text-2xl',
          variant === 'h3' && 'font-900 text-xl',
          variant === 'h4' && 'font-900 text-lg',
          variant === 'h5' && 'font-900 text-md',
          variant === 'cardTitle' && 'text-xl font-semibold',
          variant === 'cardTitleSm' && 'text-md font-semibold',
          variant === 'paragraph' && 'font-500 text-base',
          variant === 'small' && 'text-sm',
          variant === 'extraSmall' && 'text-[10px]'
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
          color === 'secondary' && 'text-secondary-500',
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
          color === 'darkBlue' && 'text-slate-900',
          color === 'placeholder' && 'text-placeholder'
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
