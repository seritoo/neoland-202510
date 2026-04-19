import { Layout } from './components/commons/Layout'
import { Header } from './components/commons/Header'
import { Paragraph } from './components/commons/Paragraph'
import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { PasswordField} from './components/commons/PasswordField'
import { Button } from './components/commons/Button'
import { Footer } from './components/commons/Footer'
import { Anchor } from './components/commons/Anchor'





export function Login(){
	return <Layout>
		<Header title='Login'>
			
		</Header>

		<Form>
			<Field alias='username' type='text'>Username:</Field>
			<PasswordField alias='password'>Password:</PasswordField>
			<Button>Login</Button>
		</Form>

		<Footer>
			<Anchor>Register</Anchor>
		</Footer>
	</Layout>

}
