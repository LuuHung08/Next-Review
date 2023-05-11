import Link from 'next/link';
import React from 'react';

interface ICustomLink {
  children: React.ReactNode | string;
  href: string;
  className?: string;
}

const CustomLink = ({ children, href }: ICustomLink) => {
  return <Link href={href}>{children}</Link>;
};

CustomLink.displayName = 'CustomLink';

export default CustomLink;
