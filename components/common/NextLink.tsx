import Link from 'next/link'

type NextLinkProps = {
  children: JSX.Element
  href: string
}

export function NextLink(props: NextLinkProps) {
  return (
    <Link href={props.href} passHref legacyBehavior>
      {props.children}
    </Link>
  )
}
