import { Outfit, Roboto } from 'next/font/google';

export const outfit = Outfit({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-outfit',
  style: ['normal']
});

export const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
  style: ['normal']
});

export const FontInitializer = () => {
  return (
    <style>{`
      h1,
      h2,
      h3 {
        font-family: ${outfit.style.fontFamily};
      }
      a,
      p {
        font-family: ${roboto.style.fontFamily};
      }
    `}</style>
  );
};
