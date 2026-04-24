export function Form({ children, onSubmit }) {
    return <form className='flex flex-col items-center gap-2 mt-5 w-full max-w-70 mx-auto' onSubmit={onSubmit}>
        {children}
    </form>
}
