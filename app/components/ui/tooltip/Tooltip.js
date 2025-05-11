export default function Tooltip({ message, children, direction = 'left', className }) {

    return (
        <div className={"group relative flex items-center " + className}>
            {children}
            <span
                className={"dark:invert invisible group-hover:visible transition-all absolute whitespace-nowrap rounded bg-gray-900 mx-3 px-2 py-2 text-sm text-white " + direction + "-10 " }>
                {message}
            </span>
        </div>
    )
}