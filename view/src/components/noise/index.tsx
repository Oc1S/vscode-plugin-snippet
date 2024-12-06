import { publicPath } from '@/utils';

const noise = publicPath('./noise.png');

export const Noise = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${noise})`,
        backgroundSize: '109px',
      }}
      className="z-max pointer-events-none fixed left-0 top-0 h-screen w-screen bg-cover bg-repeat opacity-5"
    />
  );
};
