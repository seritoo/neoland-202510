export function Form({ children, onSubmit }) {
    return <form className='flex flex-col items-center w-full gap-2 mt-5 w-full max-w-[280px] mx-auto' onSubmit={onSubmit}>
        {children}
    </form>
}
