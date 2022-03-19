import Link from '@components/link';
import React from 'react';

type Props = {
  href: string;
  btnProps: React.ButtonHTMLAttributes<any>;
  isAuthorized: boolean;
};

const AuthMenu: React.FC<Props> = ({
  isAuthorized,
  href,
  btnProps,
  children,
}) => {
  return isAuthorized ? (
    <Link
      href={href}
      className="text-sm lg:text-base text-skin-base font-normal focus:outline-none ms-2"
    >
      {children}
    </Link>
  ) : (
    <button
      className="text-sm lg:text-base text-skin-base font-normal focus:outline-none ms-2"
      aria-label="Authentication"
      {...btnProps}
    />
  );
};

export default AuthMenu;
