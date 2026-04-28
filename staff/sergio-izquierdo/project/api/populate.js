import bcrypt from 'bcryptjs'

import { database, UserModel, StoryModel } from './models.js'

database.connect('mongodb://localhost:27017/product')
	.then(() => bcrypt.hash('123123123', 10))
	.then(hash => {
		const jack = new UserModel({ name: 'Jack Skellington', email: 'jack@halloween.com', username: 'Jack', password: hash, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjF4anZ5dzI0djZqZXZvN3JlNjBva2RzbjIya3F4MzJyOG9yazZpOCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/K4Ov4XqbqUSf6/giphy.gif', description: 'I am Jack Skellington, the Pumpkin King, and I craft eerie tales with theatrical flair. I adore writing stories that twist fear into art, where shadows dance and whispers linger, turning every fright into a hauntingly beautiful narrative.' })
		const sally = new UserModel({ name: 'Sally Skellington', email: 'sally@halloween.com', username: 'Sally', password: hash, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjF1bWRkdXI2eTBvNGJjczBycmcycHZ2ZWo2ZjVidXAxbXd5em12biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6al4KiQHvcaeN9P0uN/giphy.gif', description: 'I am Sally, stitched with care and quiet strength, and I write stories filled with longing and heart. My tales weave emotions and fragile hopes, where every word seeks warmth, truth, and a gentle escape from the darkness around me.' })
		const oggie = new UserModel({ name: 'Oogie Boogie', email: 'oogie@halloween.com', username: 'Oogie', password: hash, image: 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3b2NseXc4OGJlcW9jNHJvYWxpd3IzeWFqbmRpbTkzNm1pbjUwbjRvYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AyhlWMWWBUMuI/giphy.gif', description: 'I am Oogie Boogie, the master of fright and chance, and I spin wicked tales for fun. I love writing stories driven by chaos, luck, and mischief, where every roll of fate brings a new thrill and keeps the reader guessing till the end.' })
		const emily = new UserModel({ name: 'Emily', email: 'emily@corpsebride.com', username: 'Emi', password: hash, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmEzMm5jYTl6MjVnY2V6NXFqZ21ic3Q1cXl0YTBuajVzZXZsYjJsbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/FqRgAIMvPAbaU/giphy.gif', description: 'I am Emily, a bride with a broken past, and I write stories of love that lingers beyond life. My tales are filled with sorrow, hope, and devotion, where even the deepest heartbreak can bloom into something beautifully eternal.' })

		return Promise.all([jack.save(), sally.save()])
			.then(([jack, sally, oogie, emily]) => {
				console.log(jack, sally, oogie, emily)

				const story1 = new StoryModel({
					owner: jack.id, tittle: "Jack's Lament", shortStory: `There are few who'd deny, at what I do I am the best
For my talents are renowned far and wide
When it comes to surprises in the moonlit night
I excel without ever even trying
With the slightest little effort of my ghostlike charms
I have seen grown men give out a shriek
With the wave of my hand, and a well-placed moan
I have swept the very bravest off their feet

Yet year after year, it's the same routine
And I grow so weary of the sound of screams
And I, Jack, the Pumpkin King
Have grown so tired of the same old thing

Oh, somewhere deep inside of these bones
An emptiness began to grow
There's something out there, far from my home
A longing that I've never known

I'm a master of fright, and a demon of light
And I'll scare you right out of your pants
To a guy in Kentucky, I'm Mister Unlucky
And I'm known throughout England and France

And since I am dead, I can take off my head
To recite Shakespearean quotations
No animal nor man can scream like I can
With the fury of my recitations

But who here would ever understand
That the Pumpkin King with the skeleton grin
Would tire of his crown, if they only understood
He'd give it all up if he only could

Oh, there's an empty place in my bones
That calls out for something unknown
The fame and praise come year after year
Does nothing for these empty tears`})


				const story2 = new StoryModel({
					owner: sally.id, title: `Sally's song`, shortStory: `I sense there's something in the wind
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
For I am not the one` })

				const story3 = new StoryModel({
					owner: oogie.id, tittle: `Oogie Boogie's Song`, shortStory: `Well, well, well, what have we here?
Sandy claws, huh?
Oh, I'm really scared
So you're the one everybody's talkin' about, ha, ha

You're jokin', you're jokin'
I can't believe my eyes
You're jokin' me, you gotta be
This can't be the right guy
He's ancient, he's ugly
I don't know which is worse
I might just split a seam now
If I don't die laughing first

Mr. Oogie boogie says
There's trouble close at hand
You'd better pay attention now
'Cause I'm the boogie man
And if you aren't shakin'
Then there's something very wrong
'Cause this may be the last time
You hear the boogie song, ohhh

[Three bats]
Ooh
[Oogie boogie]
Ooh
[Seven lizards]
Ooh
[Oogi boogie]
Ooh
[Seven lizards]
Ooh, he's the oogie boogie man

[Oogie boogie]
Well if I'm feelin' antsy
And there's nothin' much to do
I might just cook a special batch
Of snake and spider stew
And don't ya know the one thing
That would make it work so nice?
A roly-poly sandy claws to add a little spice

[Three skeletons]
Ohhh
[Oogie boogie]
Oh, yeah
[Three bats]
Ohhh
[Oogie boogie]
Ohhh
[Three bats]
Ohhh
[Oogie boogie and three skeletons]
Oh, yeah, I'm (he's) the oogie boogie man

[Santa]
Release me now
Or you must face the dire consequences
The children are expecting me
So please, come to your senses

[Oogie boogie]
You're jokin', you're jokin'
I can't believe my ears
Would someone shut this fella up
I'm drownin' in my tears
It's funny, I'm laughing
You really are too much
And now, with your permission
I'm going to do my stuff

[Santa]
What are you going to do?

[Oogie boogie]
I'm gonna do the best I can
Oh, the sound of rollin' dice
To me is music in the air
'Cause I'm a gamblin' boogie man
Although I don't play fair

It's much more fun, I must confess
When lives are on the line
Not mine, of course, but yours, old boy
Now that'd be just fine

[Santa]
Release me fast or you will have to
Answer for this heinous act

[Oogie boogie]
Oh, brother, you're something
You put me in a spin
You aren't comprehending
The position that you're in
It's hopeless, you're finished
You haven't got a prayer
'Cause I'm mr. Oogie boogie
And you ain't going nowhere`})

				const story4 = new StoryModel({
					owner: emily.id, tittle: `Tears To Shed`, shortStory: `[Maggot]
What does that whispy little brat have that you don't have double?

[Black widow]
She can't hold a candle to the beauty of your smile

[Corpse bride]
How about a pulse?

[Maggot]
Overrated by a mile

[Black widow]
Overbearing

[Maggot]
Overblown

[Maggot and black widow]
If he only knew the you that we know

[Black widow]
And that silly little creature isn't wearing his ring

[Maggot]
And she doesn't play piano

[Maggot and black widow]
Or dance

[Maggot]
Or sing

[Maggot and black widow]
No she doesn't compare

[Corpse bride]
But she still breathes air

[Black widow]
Who cares?

[Maggot]
Unimportant

[Black widow]
Overrated

[Maggot]
Overblown

[Maggot and black widow]
If only he could see
How special you can be
If he only knew the you that we know

[Corpse bride]
If I touch a burning candle I can't feel the pain
If you cut me with a knife it's still the same
And I know her heart is beating
And I know that I am dead
Yet the pain here that I feel
Try and tell me it's not real
For it seems that I still have a tear to shed

[Maggot]
The sure redeeming feature
From that little creature
Is that she's alive

[Black widow]
Overrated

[Maggot]
Overblown

[Black widow]
Everybody knows that's just a temporary state
Which is cured very quickly when we meet our fate

[Maggot]
Who cares?

[Black widow]
Unimportant

[Maggot]
Overrated

[Black widow]
Overblown

[Maggot and black widow]
If only he could see
How special you can be
If he only knew the you that we know

[Corpse bride]
If I touch a burning candle I can feel no pain
In the ice or in the Sun it's all the same
Yet I feel my heart is aching
Though it doesn't beat it's breaking
And the pain here that I feel
Try and tell me it's not real
I know that I am dead
Yet it seems that I still have some tears to shed`})

				const story5 = new StoryModel({
					owner: jack.id, title: `What's This?`, shortStory: `What's this? What's this?
There's color everywhere
What's this?
There's white things in the air
What's this?
I can't believe my eyes
I must be dreaming
Wake up, Jack, this isn't fair
What's this?

What's this? What's this?
There's something very wrong
What's this?
There's people singing songs

What's this?
The streets are lined with
Little creatures laughing
Everybody seems so happy
Have I possibly gone daffy?
What is this?
What's this?

There are children throwing snowballs here
Instead of throwing heads
They're busy building toys
And absolutely no one's dead

There's frost on every window
Oh, I can't believe my eyes
And in my bones I feel the warmth
That's coming from inside

Oh, look
What's this?
They're hanging mistletoe, they kiss
Why that looks so unique, inspired
They're gathering around to hear a story
Roasting chestnuts on a fire
What's this?
What's this?

In here they've got a little tree, how queer
And who would ever think
And why?

They're covering it with tiny little things
They've got electric lights on strings
And there's a smile on everyone
So, now, correct me if I'm wrong
This looks like fun
This looks like fun
Oh, could it be I got my wish?
What's this?

Oh my, what now?
The children are asleep
But look, there's nothing underneath
No ghouls, no witches here to scream and scare them
Or ensnare them, only little cozy things
Secure inside their dreamland
What's this?

The monsters are all missing
And the nightmares can't be found
And in their place there seems to be
Good feeling all around

Instead of screams, I swear
I can hear music in the air
The smell of cakes and pies
Are absolutely everywhere

The sights, the sounds
They're eveywhere and all around
I've never felt so good before
This empty place inside of me is filling up
I simply cannot get enough

I want it, oh, I want it
Oh, I want it for my own
I've got to know
I've got to know
What is this place that I have found?
What is this?

Christmas Town? Hmm`})

				const story6 = new StoryModel({
					owner: oogie.id, tittle: `Das Oogie Boogie Lied`, shortStory: `Ei, ei, ei wer kommt denn da?
Nickigraus? Uhhh! Ich sterbe vor Angst!
Ach, du bist der, von dem sie alle reden?
Wie komisch, wie komisch, den Augen trau' ich kaum
Du ziehst mich aus, ich schwöre

Glaub', der Falsche steht im Raum
So alt und so hässlich, er ist so groß und rot!
Ich platze aus den Nähten
Und vielleicht lach' ich mich tot!

Wenn der Oogie Boogie sagt
Jetzt bist du auch gleich dran!
Hör ihm gut zu und merke wohl
Ich bin der Boogie Mann!

Und fängst du an zu zittern
Gehört sich's, wie man sieht
Kann sein, es ist das letzte Mal
Du hörst das Boogie Lied

[Oogie]
Uhhu, ohho, uhhuu, ohhooo
Uhhhuuu! Oooohhooo!
Mr. Oogie Boogie Mann!

[Santa]
Lass mich jetzt los, sonst wird es dir
Noch sehr, sehr schlecht ergeh'n!
Die Kinder, sie erwarten mich!
Das musst du doch versteh'n!

[Oogie]
Zu witzig! Zu witzig! Den Ohren trau' ich kaum!
Ich ersauf' in meinen Tränen
Ist das alles nur ein Traum?
Ich lach' mich zu Tode
Und du bist schuld, doch nun
Ist die Zeit für mich gekommen
Meine Schuldigkeit zu tun!

[Santa]
Was willst du denn tun?

[Oogie]
Das Beste, was ich kann! Ohhhhhoo!

Ich würfle wirklich gern
Das ist mein größter Zeitvertreib
Ich spiel zwar meistens falsch
Doch gewiss, dass ich ein Spieler bleib'
Es macht mehr Spaß, muss ich gesteh'n
Wenn's um ein Leben geht, nicht meins
Doch deins dafür, das auf dem Spiele steht!

[Santa]
Lass mich jetzt geh'n, sonst bist du schuld
An allem, was dir noch geschieht!

[Oogie]
Oh Junge, wie ulkig
Ich könnt' vor Spaß vergeh'n
Du sitzt jetzt in der Patsche
Kannst denn du das nicht versteh'n?
Es ist nichts mehr zu machen
Dir hilft nicht Mann noch Maus
Denn ich bin der Oogie Boogie
Und mit dir ist es bald aus!`})

				return Promise.all([story1.save(), story2.save(), story3.save(), story4.save(), story5.save()])
			})
			.then(([story1, story2, story3, story4, story5, story6]) => console.log(story1, story2, story3, story4, story5, story6))

	})
	.catch(error => console.error(error))
	.finally(() => database.disconnect())
