import { cx } from '@/utils'

export const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const { className, ...rest } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cx('h-6 w-6', className)}
      width={24}
      height={24}
      color="#000000"
      fill="none"
      {...rest}
    >
      <path
        d="M12 4V20M20 12H4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
