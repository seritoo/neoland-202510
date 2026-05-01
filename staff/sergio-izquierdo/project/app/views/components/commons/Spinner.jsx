import { logger } from '../../../logger'

export const Spinner = () => {
    logger.debug('Spinner -> call')
    logger.debug('Spinner -> render')

    return <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center">
        <img className="w-40 h-40 object-cover" src="https://cssbud.com/wp-content/uploads/2022/05/pendulum.gif" />
    </div>
}
