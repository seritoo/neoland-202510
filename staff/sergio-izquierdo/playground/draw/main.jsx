const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)


function WazoswkiEye() {
	return <div
        class="w-40 h-40 bg-white rounded-full absolute left-30 top-18"
      >
        <div
          class="w-15 h-15 bg-black rounded-full absolute left-12 top-12"
        ></div>
      </div>
}

function WazoswkMouth() {
	return <div
        class="w-50 h-10 bg-red-500 absolute bottom-20 left-25 rounded-full"
      ></div>
}

function WazoswkiHead(){
	return <div class="h-100 w-100 bg-[greenyellow] absolute rounded-full">
		<WazoswkiEye />
		<WazoswkMouth />
		</div>
}


function PigEyeLeft(){
	return <div class="w-40 h-40 bg-white absolute top-10 left-5">
        <div class="w-20 h-20 bg-[greenyellow] absolute bottom-0"></div>
      </div>
}
function PigEyeRight() {
	return <div class="w-40 h-40 bg-white absolute top-10 right-5">
        <div class="w-20 h-20 bg-[greenyellow] absolute bottom-0"></div>
      </div>
}

function PigNose(){
	return <div class="w-40 h-30 bg-[palevioletred] absolute left-30 top-50">
        <div class="w-10 h-10 bg-black absolute top-10 left-5"></div>
        <div class="w-10 h-10 bg-black absolute top-10 right-5"></div>
      </div>
}

function PigMouth() {
	return <div class="w-30 h-10 bg-red-500 absolute bottom-5 left-35"></div>
}

function PigEarRight() {
	return <div class="w-15 h-50 bg-pink-300 absolute -right-15"></div>
}

function PigEarLeft() {
	return  <div class="w-15 h-50 bg-pink-300 absolute -left-15"></div>
}

function PigHead(){
	return <div class="w-100 h-100 bg-pink-300 absolute left-100 top-100">
	<PigEyeLeft />
	<PigEyeRight />
	<PigNose />
	<PigMouth />
	<PigEarRight />
	<PigEarLeft />
    </div>
	}

	root.render([<WazoswkiHead />, <PigHead />])

