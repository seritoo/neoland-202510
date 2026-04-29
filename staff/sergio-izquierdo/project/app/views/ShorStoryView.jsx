import { Layout } from "./components/commons/Layout";
import { Header } from './components/commons/Header'
import { BackButton } from "./components/commons/lucide/BackButton"
import { Avatar } from './components/commons/Avatar'


import { logger } from "../logger";
import { AvatarProfile } from "./components/commons/AvatarProfile";


export function ShortStoryView({ onGoToLanding }) {
	logger.debug('Short story view -> call')

	logger.debug('Short story view -> render')

	return <Layout className="h-screen overflow-hidden flex flex-col items-stretch" >
		<div className='sticky top-0 z-50 w-full bg-[#E5D6D6] shrink-0 shadow-md pb-6'>
			<Header title='Short Story' />
		</div>
		<main className="flex-1 overflow-y-auto p-6 bg-[#E5D6D6] flex flex-col items-center">

			{/* 2. Tu nuevo componente AvatarProfile (Usando datos de prueba por ahora) */}
			<section className="mt-4 mb-5">
				<AvatarProfile
					image={null} // Aquí irá story.author.image
					username="Sally" // Aquí irá story.author.name
					speciality="The Nightmarish Ragdoll" // Aquí puedes poner el aboutMe
				/>
			</section>
			<p className="font-['Inknut_Antiqua'] italic text-[#3F295F] text-sm opacity-80 text-center max-w-xs px-4 mb-5 leading-relaxed">
				"I sense there's something in the wind, that feels like tragedy's at hand..."
			</p>
			{/* 3. El Relato */}
			<article className="w-full  bg-white p-8 rounded-3xl shadow-sm border border-[#E94E77]">
				<div className="mb-8 border-b border-[#E5D6D6] pb-4">
					<h1 className="font-['Inknut_Antiqua'] text-[#3F295F] text-2xl mb-1">
						Sally's Song
					</h1>
					<p className="text-[10px] uppercase tracking-wider text-[#3F295F] opacity-50 font-bold">
						29 de Abril, 2026
					</p>
				</div>
				<p className="text-base leading-relaxed text-[#3F295F] whitespace-pre-line">
					{`I sense there's something in the wind
					That feels like tragedy's at hand
					And though I'd like to stand by him
					Can't shake this feeling that I have
					The worst is just around the bend

					And does he notice my feelings for him?
					And will he see how much he means to me?
					I think it's not to be

					What will become of my dear friend?
					Where will his actions lead us then?
					Although I'd like to join the crowd
					In their enthusiastic cloud
					Try as I may, it doesn't last

					And will we ever end up together?
					No, I think not, it's never to become
					For I am not the one`}
				</p>
			</article>

		</main>
		<div className="fixed bottom-5 left-5 z-50">
			<BackButton  onClick={onGoToLanding} />
		</div>

	</Layout>

}
