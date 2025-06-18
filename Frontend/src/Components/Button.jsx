import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-full text-sm font-semibold transition duration-200 border';

  const variants = {
    primary: 'bg-[#594a47] text-white border-[#594a47] hover:bg-white hover:text-[#594a47]',
    secondary: 'bg-white text-[#594a47] border-[#594a47] hover:bg-[#594a47] hover:text-white',
    outline: 'bg-transparent text-[#594a47] border-[#594a47] hover:bg-[#594a47] hover:text-white',
  };

  return (
    <button
      {...props}
      className={clsx(baseStyles, variants[variant], className)}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  className: PropTypes.string,
};

export default Button;
