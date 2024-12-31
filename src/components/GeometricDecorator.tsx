interface GeometricDecoratorProps {
  type?: 'vertical-lines' | 'grid' | 'dots';
  className?: string;
}

const GeometricDecorator = ({ type = 'vertical-lines', className = '' }: GeometricDecoratorProps) => {
  const patterns = {
    'vertical-lines': 'vertical-lines',
    'grid': 'geometric-bg',
    'dots': 'bg-dots'
  };

  return (
    <div className={`absolute inset-0 opacity-10 pointer-events-none ${patterns[type]} ${className}`} />
  );
};

export default GeometricDecorator;