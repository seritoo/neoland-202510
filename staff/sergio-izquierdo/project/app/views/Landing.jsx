import { ArtButton } from './components/ArtButton'
import { Layout } from './components/commons/Layout'
import { Header } from './components/commons/Header'
import { Paragraph } from './components/commons/Paragraph'
import { Anchor } from './components/commons/Anchor'
import { Footer } from './components/commons/Footer'




export function Landing() {
	return <Layout>
		<Header isLanding={true}>
			<Paragraph>What art would you like to enjoy today...?</Paragraph>
		</Header>
		<main className='mt-15'>
			<ArtButton>Short Stories</ArtButton>
		</main>
		<Footer className="mt-auto w-full px-12">
			<Anchor>Login</Anchor> <Anchor>Register</Anchor>
		</Footer>
	</Layout>
}
