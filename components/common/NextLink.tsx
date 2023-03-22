import Link, { LinkProps } from 'next/link'

type NextLinkProps = {
  children: JSX.Element
  href: LinkProps['href']
}

export function NextLink(props: NextLinkProps) {
  return (
    <Link href={props.href} passHref legacyBehavior>
      {props.children}
    </Link>
  )
}
